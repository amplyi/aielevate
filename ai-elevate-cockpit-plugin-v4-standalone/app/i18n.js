/**
 * AI Elevate i18n
 * EN | NL locale helper for chrome, homepage, marketing pages, and Contact.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'aielevate-locale';
  var SUPPORTED = { en: true, nl: true };
  /* Frontend toggle hidden for now; site stays English. Locale packs kept for later. */
  var UI_LOCALE_ENABLED = false;
  var PHRASE_ROOTS = '#services, #partners, #about, #edmp, #insights, #insight-article, #decision-room, #edmp-assessment, #engage, #terms, #privacy, #library, #cases';

  var I18N = {
    STORAGE_KEY: STORAGE_KEY,
    locale: 'en',
    dictionaries: {},
    listeners: [],

    register: function (locale, dictionary) {
      if (!SUPPORTED[locale] || !dictionary) return;
      this.dictionaries[locale] = dictionary;
    },

    getLocale: function () {
      return this.locale;
    },

    t: function (key, fallback) {
      var value = this.lookup(this.locale, key);
      if (value == null && this.locale !== 'en') value = this.lookup('en', key);
      if (value == null) return fallback != null ? fallback : key;
      return value;
    },

    lookup: function (locale, key) {
      var dict = this.dictionaries[locale];
      if (!dict || !dict.strings) return null;
      var parts = String(key || '').split('.');
      var cur = dict.strings;
      for (var i = 0; i < parts.length; i++) {
        if (cur == null || typeof cur !== 'object') return null;
        cur = cur[parts[i]];
      }
      return typeof cur === 'string' ? cur : null;
    },

    getPack: function (name) {
      var local = this.dictionaries[this.locale];
      var pack = local && local.packs && local.packs[name];
      if (pack) return pack;
      var en = this.dictionaries.en;
      return (en && en.packs && en.packs[name]) || null;
    },

    applyDomI18n: function (root) {
      var scope = root || document;
      var nodes = scope.querySelectorAll('[data-i18n]');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var key = el.getAttribute('data-i18n');
        if (!key) continue;
        var text = this.t(key);
        var attr = el.getAttribute('data-i18n-attr');
        if (attr) {
          var attrs = attr.split('|');
          for (var a = 0; a < attrs.length; a++) {
            var name = attrs[a].trim();
            if (name) el.setAttribute(name, text);
          }
        } else {
          el.textContent = text;
        }
      }
      var htmlNodes = scope.querySelectorAll('[data-i18n-html]');
      for (var h = 0; h < htmlNodes.length; h++) {
        var node = htmlNodes[h];
        var htmlKey = node.getAttribute('data-i18n-html');
        if (htmlKey) node.innerHTML = this.t(htmlKey);
      }
      this.applyPhraseMap(scope);
    },

    phrase: function (english) {
      if (!english) return english;
      if (this.locale !== 'nl') return english;
      var pack = this.getPack('phrases');
      return (pack && pack[english]) || english;
    },

    applyPhraseMap: function (root) {
      var phrases = this.getPack('phrases');
      if (!phrases && this.locale === 'nl') return;
      var scope = root || document;
      var roots = [];
      if (scope.nodeType === 1 && scope.matches && scope.matches(PHRASE_ROOTS)) {
        roots.push(scope);
      } else {
        var found = scope.querySelectorAll ? scope.querySelectorAll(PHRASE_ROOTS) : [];
        for (var r = 0; r < found.length; r++) roots.push(found[r]);
      }
      if (!roots.length && scope === document) return;

      var locale = this.locale;
      for (var i = 0; i < roots.length; i++) {
        var walker = document.createTreeWalker(roots[i], NodeFilter.SHOW_TEXT, null);
        var node;
        while ((node = walker.nextNode())) {
          var parent = node.parentElement;
          if (!parent) continue;
          var tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE') continue;
          if (parent.closest('[data-i18n-html]')) continue;
          if (parent.hasAttribute('data-i18n') && !parent.hasAttribute('data-i18n-attr')) continue;

          var raw = node.nodeValue;
          if (!raw || !raw.trim()) continue;
          var lead = raw.match(/^\s*/)[0];
          var trail = raw.match(/\s*$/)[0];
          var trimmed = raw.slice(lead.length, raw.length - trail.length).replace(/\s+/g, ' ').trim();
          if (trimmed.length < 2) continue;

          if (!node.__aieEn) node.__aieEn = trimmed;
          var en = node.__aieEn;
          var target = en;
          if (locale === 'nl' && phrases && phrases[en]) target = phrases[en];
          if (target === trimmed && lead + target + trail === raw) continue;
          node.nodeValue = lead + target + trail;
        }

        var labelled = roots[i].querySelectorAll('[aria-label], [placeholder], [title]');
        for (var a = 0; a < labelled.length; a++) {
          var el = labelled[a];
          if (el.hasAttribute('data-i18n') && el.getAttribute('data-i18n-attr')) continue;
          ['aria-label', 'placeholder', 'title'].forEach(function (attrName) {
            if (!el.hasAttribute(attrName)) return;
            var key = '__aieEn_' + attrName;
            var current = el.getAttribute(attrName);
            if (!current) return;
            if (!el[key]) el[key] = current;
            var enAttr = el[key];
            var next = locale === 'nl' && phrases && phrases[enAttr] ? phrases[enAttr] : enAttr;
            if (next !== current) el.setAttribute(attrName, next);
          });
        }
      }
    },

    syncToggle: function () {
      var buttons = document.querySelectorAll('[data-locale-set]');
      for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        var loc = btn.getAttribute('data-locale-set');
        var active = loc === this.locale;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      }
      var group = document.querySelector('[data-locale-toggle]');
      if (group) group.setAttribute('data-active-locale', this.locale);
    },

    setLocale: function (locale, options) {
      options = options || {};
      if (!SUPPORTED[locale]) locale = 'en';
      var changed = this.locale !== locale;
      this.locale = locale;
      try {
        global.localStorage.setItem(STORAGE_KEY, locale);
      } catch (_) { /* ignore */ }
      if (document.documentElement) document.documentElement.lang = locale;
      this.applyDomI18n(document);
      this.syncToggle();
      this.applyDocumentMeta();
      if (changed || options.force) {
        for (var i = 0; i < this.listeners.length; i++) {
          try { this.listeners[i](locale); } catch (_) { /* ignore */ }
        }
      }
      return this.locale;
    },

    applyDocumentMeta: function () {
      var title = this.t('meta.title');
      if (title && title !== 'meta.title') document.title = title;
      var desc = this.t('meta.description');
      var meta = document.querySelector('meta[name="description"]');
      if (meta && desc && desc !== 'meta.description') meta.setAttribute('content', desc);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      var ogDesc = document.querySelector('meta[property="og:description"]');
      var twTitle = document.querySelector('meta[name="twitter:title"]');
      var twDesc = document.querySelector('meta[name="twitter:description"]');
      var mt = this.t('meta.ogTitle');
      var md = this.t('meta.ogDescription');
      if (ogTitle && mt !== 'meta.ogTitle') ogTitle.setAttribute('content', mt);
      if (ogDesc && md !== 'meta.ogDescription') ogDesc.setAttribute('content', md);
      if (twTitle && mt !== 'meta.ogTitle') twTitle.setAttribute('content', mt);
      if (twDesc && md !== 'meta.ogDescription') twDesc.setAttribute('content', md);
    },

    onLocaleChange: function (fn) {
      if (typeof fn === 'function') this.listeners.push(fn);
    },

    bindToggle: function () {
      if (!UI_LOCALE_ENABLED) return;
      var self = this;
      document.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-locale-set]');
        if (!btn) return;
        event.preventDefault();
        self.setLocale(btn.getAttribute('data-locale-set'));
      });
    },

    init: function () {
      var initial = 'en';
      if (UI_LOCALE_ENABLED) {
        var stored = null;
        try { stored = global.localStorage.getItem(STORAGE_KEY); } catch (_) { stored = null; }
        initial = SUPPORTED[stored] ? stored : 'en';
      } else {
        try { global.localStorage.setItem(STORAGE_KEY, 'en'); } catch (_) { /* ignore */ }
      }
      this.bindToggle();
      this.setLocale(initial, { force: true });
    }
  };

  global.AIE_I18N = I18N;
})(typeof window !== 'undefined' ? window : globalThis);
