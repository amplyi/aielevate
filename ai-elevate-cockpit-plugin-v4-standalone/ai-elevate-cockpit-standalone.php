<?php
/**
 * Plugin Name: AI Elevate Cockpit Standalone
 * Description: Serves the AI Elevate cockpit as a standalone WordPress route so the theme wrapper does not break layout, sticky header, overlays, or widths.
 * Version: 1.4.4
 * Author: OpenAI
 * License: GPL2+
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AIE_COCKPIT_STANDALONE_URL', plugin_dir_url(__FILE__));
define('AIE_COCKPIT_STANDALONE_PATH', plugin_dir_path(__FILE__));

function aie_cockpit_standalone_activate() {
    aie_cockpit_register_rewrite();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'aie_cockpit_standalone_activate');

function aie_cockpit_standalone_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'aie_cockpit_standalone_deactivate');

function aie_cockpit_register_rewrite() {
    add_rewrite_rule('^ai-elevate-cockpit/?$', 'index.php?aie_cockpit_standalone=1', 'top');
}
add_action('init', 'aie_cockpit_register_rewrite');

function aie_cockpit_query_vars($vars) {
    $vars[] = 'aie_cockpit_standalone';
    return $vars;
}
add_filter('query_vars', 'aie_cockpit_query_vars');

function aie_cockpit_render_standalone() {
    if (get_query_var('aie_cockpit_standalone') != '1') {
        return;
    }

    $index_path = AIE_COCKPIT_STANDALONE_PATH . 'app/index.html';
    if (!file_exists($index_path)) {
        status_header(500);
        echo 'AI Elevate cockpit not found.';
        exit;
    }

    $html = file_get_contents($index_path);
    if ($html === false) {
        status_header(500);
        echo 'Unable to load AI Elevate cockpit.';
        exit;
    }

    $asset_base = AIE_COCKPIT_STANDALONE_URL . 'app/';
    $styles_ver = file_exists(AIE_COCKPIT_STANDALONE_PATH . 'app/styles.css') ? filemtime(AIE_COCKPIT_STANDALONE_PATH . 'app/styles.css') : time();
    $script_ver = file_exists(AIE_COCKPIT_STANDALONE_PATH . 'app/script.js') ? filemtime(AIE_COCKPIT_STANDALONE_PATH . 'app/script.js') : time();
    $html = str_replace('<head>', '<head><base href="' . esc_url($asset_base) . '"><meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">', $html);
    $html = str_replace('href="styles.css"', 'href="' . esc_url($asset_base) . 'styles.css?ver=' . esc_attr($styles_ver) . '"', $html);
    $html = str_replace('src="script.js"', 'src="' . esc_url($asset_base) . 'script.js?ver=' . esc_attr($script_ver) . '"', $html);
    $html = str_replace('src="assets/', 'src="' . esc_url($asset_base) . 'assets/', $html);
    $html = str_replace("src='assets/", "src='" . esc_url($asset_base) . "assets/", $html);
    $html = str_replace('url("assets/', 'url("' . esc_url($asset_base) . 'assets/', $html);
    $html = str_replace("url('assets/", "url('" . esc_url($asset_base) . "assets/", $html);

    status_header(200);
    nocache_headers();
    echo $html;
    exit;
}
add_action('template_redirect', 'aie_cockpit_render_standalone');

function aie_cockpit_admin_menu() {
    add_menu_page(
        'AI Elevate Cockpit Standalone',
        'AI Elevate Cockpit',
        'manage_options',
        'ai-elevate-cockpit-standalone',
        'aie_cockpit_admin_page',
        'dashicons-screenoptions',
        58
    );
}
add_action('admin_menu', 'aie_cockpit_admin_menu');

function aie_cockpit_admin_page() {
    $route = home_url('/ai-elevate-cockpit/');
    ?>
    <div class="wrap">
        <h1>AI Elevate Cockpit Standalone</h1>
        <p>This version does not run inside a normal WordPress page wrapper. It serves the cockpit through its own clean route, which preserves layout, sticky header behavior, overlays, widths, and mobile structure much better.</p>

        <h2>Open the cockpit</h2>
        <p><a class="button button-primary" href="<?php echo esc_url($route); ?>" target="_blank" rel="noopener">Open AI Elevate Cockpit</a></p>
        <p><code><?php echo esc_html($route); ?></code></p>

        <h2>After activation</h2>
        <ol>
            <li>If the route does not work immediately, go to <strong>Settings → Permalinks</strong> and click <strong>Save Changes</strong> once.</li>
            <li>Open the cockpit route directly, not inside the WordPress editor.</li>
            <li>Use this direct route in your menu or link buttons.</li>
        </ol>

        <h2>Why this version is better</h2>
        <ul>
            <li>No theme wrapper around the cockpit</li>
            <li>No page content container squeezing widths</li>
            <li>No iframe scrollbar problems</li>
            <li>Sticky cockpit header and overlays behave like the real build</li>
        </ul>
    </div>
    <?php
}
