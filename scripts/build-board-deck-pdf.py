#!/usr/bin/env python3
"""Build AI Elevate branded Board Briefing Deck PDF (12 slides + speaker notes)."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-board-briefing-deck.pdf"
LOGO_CANDIDATES = [
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue.png",
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue-test.png",
]

BG = HexColor("#070b12")
BG_MID = HexColor("#0f1420")
PANEL = HexColor("#0e131e")
TEXT = HexColor("#f2f6fb")
MUTED = HexColor("#aab5c5")
MUTED_2 = HexColor("#7c8798")
ACCENT = HexColor("#8fd3ff")
ACCENT_2 = HexColor("#8f9aff")
LINE = HexColor("#2a3140")
OK = HexColor("#8fd3ff")
NO = HexColor("#c9a0a8")

SLIDE_W, SLIDE_H = landscape(letter)
NOTES_W, NOTES_H = letter
MARGIN = 0.72 * inch


SLIDES = [
    {
        "title": "EDMP",
        "subtitle": "The Missing Enterprise Memory Layer",
        "lines": [
            "Preserving how important decisions are formed, evolved, executed, and remembered.",
        ],
        "footer": True,
        "notes": (
            "Most organizations preserve data, workflows, approvals, transactions, and outcomes.\n\n"
            "Few preserve how important decisions were formed.\n\n"
            "This presentation examines why that gap is becoming increasingly expensive in an AI-enabled world."
        ),
    },
    {
        "title": "The Executive Blind Spot",
        "can": [
            "What happened?",
            "Who approved it?",
            "What was implemented?",
            "What was the outcome?",
        ],
        "cannot": [
            "Why was this decision made?",
            "What alternatives were considered?",
            "Which assumptions were accepted?",
            "Which risks were knowingly tolerated?",
        ],
        "notes": (
            "The issue is not information.\n\n"
            "The issue is reasoning.\n\n"
            "Most organizations remember conclusions.\n\n"
            "They forget the path that created them."
        ),
    },
    {
        "title": "The Cost of Forgetting",
        "bullets_left": [
            "CFO leaves",
            "Program manager leaves",
            "Strategy changes",
            "AI model changes",
            "Board changes",
        ],
        "bullets_right": [
            "PowerPoints",
            "Jira tickets",
            "Teams chats",
            "Emails",
            "SharePoint",
        ],
        "highlight": "Yet cannot reconstruct:\nSignal → Reasoning → Decision → Execution → Outcome",
        "notes": (
            "Institutional memory breaks long before information disappears.\n\n"
            "The organization remembers artifacts.\n\n"
            "It forgets understanding."
        ),
    },
    {
        "title": "Why AI Makes This Worse",
        "chain_before": "Human\n→ Decision",
        "chain_after": "Human\n→ AI\n→ Human\n→ Workflow\n→ Approval\n→ Decision",
        "result": ["↑ Decision Velocity", "↓ Decision Traceability"],
        "notes": (
            "AI is not the problem.\n\n"
            "AI magnifies an existing problem.\n\n"
            "Organizations make more decisions faster while understanding less about how those decisions were formed."
        ),
    },
    {
        "title": "The AI Paradox",
        "columns": [
            ["More Intelligence", "More Analysis", "More Recommendations", "More Automation"],
            ["Less Understanding", "Less Continuity", "Less Accountability", "Less Traceability"],
        ],
        "notes": (
            "This is the paradox.\n\n"
            "The same systems increasing decision speed often reduce reasoning visibility."
        ),
    },
    {
        "title": "EDMP Value Chain",
        "chain": ["Signal", "Structure", "Decision", "Execution Trace", "Institutional Memory"],
        "notes": (
            "EDMP preserves the complete decision journey.\n\n"
            "Not merely outcomes.\n\n"
            "Reasoning becomes inspectable, reusable, and accountable."
        ),
    },
    {
        "title": "Financial Case #1",
        "subtitle": "Risk Reduction",
        "bullets": [
            "Why decisions were made?",
            "Which evidence existed?",
            "Which risks were accepted?",
            "Who accepted accountability?",
        ],
        "tags": ["Audit", "Litigation", "Regulatory review", "Procurement disputes", "AI Governance"],
        "notes": (
            "The financial value is defensibility.\n\n"
            "Organizations increasingly need to explain decisions, not merely outcomes."
        ),
    },
    {
        "title": "Financial Case #2",
        "subtitle": "Reduced Rework",
        "timeline": ["2024: Decision Made", "2025: Same Discussion", "2026: Same Discussion", "2027: Same Discussion"],
        "question": "How much organizational effort is spent recreating decisions already made?",
        "notes": (
            "Organizations repeatedly pay for knowledge they already created.\n\n"
            "EDMP turns decisions into reusable assets."
        ),
    },
    {
        "title": "Financial Case #3",
        "subtitle": "Executive Continuity",
        "columns": [
            ["Person", "→ Knowledge", "→ Departure", "→ Context Loss"],
            ["Person", "→ Knowledge", "→ Decision Memory", "→ Institutional Continuity"],
        ],
        "column_labels": ["Without EDMP", "With EDMP"],
        "notes": (
            "People leaving should not mean reasoning leaving.\n\n"
            "Decision continuity becomes an organizational capability."
        ),
    },
    {
        "title": "Financial Case #4",
        "subtitle": "AI Governance",
        "quote_old": '"Did a decision occur?"',
        "quote_new": '"Can you explain how it was formed?"',
        "tags": ["AI Act", "Governance frameworks", "Audit expectations", "Board accountability"],
        "notes": (
            "AI Governance is likely the strongest entry market because it combines risk, accountability, and executive relevance."
        ),
    },
    {
        "title": "Category Creation",
        "categories": [
            ("CRM", "Customer Memory"),
            ("ERP", "Operational Memory"),
            ("EDMP", "Decision Memory"),
        ],
        "closing": [
            "Not another dashboard.",
            "Not another workflow tool.",
            "Not another AI platform.",
            "A new enterprise memory layer.",
        ],
        "notes": (
            "Categories emerge when organizations recognize an unmanaged asset.\n\n"
            "EDMP positions decision formation as that asset."
        ),
    },
    {
        "title": "Recommended Next Steps",
        "chain": [
            "Executive Briefing",
            "EDMP Readiness Assessment",
            "Decision Environment Exploration",
            "Enterprise Decision Memory Strategy",
        ],
        "closing": (
            "Organizations already preserve what happened.\n\n"
            "The next competitive advantage belongs to organizations that preserve why it happened."
        ),
        "notes": (
            "The purpose of EDMP is not software adoption.\n\n"
            "The purpose is organizational understanding.\n\n"
            "The question is no longer whether decisions are made.\n\n"
            "The question is whether they can still be understood years later."
        ),
    },
]


def build_page(size: tuple[float, float], draw_fn) -> object:
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=size)
    draw_fn(c, size[0], size[1])
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def wrap_text(text: str, width: int) -> list[str]:
    words = text.replace("\n", " \n ").split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        if word == "\n":
            if current:
                lines.append(" ".join(current))
                current = []
            lines.append("")
            continue
        trial = " ".join(current + [word])
        if len(trial) <= width:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def draw_slide_chrome(c: canvas.Canvas, w: float, h: float, slide_num: int, total: int = 12) -> float:
    c.setFillColor(BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.line(MARGIN, 0.52 * inch, w - MARGIN, 0.52 * inch)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN, h - 0.42 * inch, "AI ELEVATE")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN + 72, h - 0.42 * inch, "Enterprise Decision Memory Platform")
    c.drawRightString(w - MARGIN, h - 0.42 * inch, f"Slide {slide_num} / {total}")
    return h - 0.95 * inch


def draw_slide_title(c: canvas.Canvas, x: float, y: float, title: str, subtitle: str | None = None) -> float:
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(x, y, title)
    y -= 0.38 * inch
    if subtitle:
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(x, y, subtitle)
        y -= 0.32 * inch
    return y


def draw_bullets(c: canvas.Canvas, x: float, y: float, items: list[str], color=TEXT, size=13, leading=18) -> float:
    c.setFillColor(color)
    c.setFont("Helvetica", size)
    for item in items:
        c.drawString(x, y, f"•  {item}")
        y -= leading / 72 * inch
    return y


def draw_cover(c: canvas.Canvas, w: float, h: float) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    logo = next((p for p in LOGO_CANDIDATES if p.exists()), None)
    y = h - 2.2 * inch
    if logo:
        try:
            c.drawImage(str(logo), MARGIN, y, width=0.5 * inch, height=0.5 * inch, mask="auto")
            tx = MARGIN + 0.65 * inch
        except Exception:
            tx = MARGIN
    else:
        tx = MARGIN
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(tx, y + 0.2 * inch, "AI ELEVATE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(MARGIN, y - 0.45 * inch, "EDMP Board Briefing Deck")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 14)
    c.drawString(MARGIN, y - 0.85 * inch, "12 slides + speaker notes")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 10)
    c.drawString(MARGIN, 1.1 * inch, "AvL Consultancy  ·  info@aielevate.xyz  ·  aielevate.xyz")


def render_slide(c: canvas.Canvas, w: float, h: float, slide_num: int, data: dict) -> None:
    y = draw_slide_chrome(c, w, h, slide_num)
    x = MARGIN

    if slide_num == 1:
        y = draw_slide_title(c, x, y, data["title"], data["subtitle"])
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 14)
        for line in wrap_text(data["lines"][0], 70):
            c.drawString(x, y, line)
            y -= 0.24 * inch
        c.setFillColor(MUTED_2)
        c.setFont("Helvetica", 10)
        c.drawString(x, 1.0 * inch, "AI Elevate")
        c.drawString(x, 0.75 * inch, "Enterprise Decision Memory Platform")
        return

    if slide_num == 2:
        y = draw_slide_title(c, x, y, data["title"])
        col_w = (w - 2 * MARGIN - 0.4 * inch) / 2
        c.setFillColor(OK)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x, y, "Organizations can usually answer:")
        y1 = y - 0.28 * inch
        c.setFillColor(TEXT)
        c.setFont("Helvetica", 12)
        for item in data["can"]:
            c.drawString(x, y1, f"✓  {item}")
            y1 -= 0.24 * inch
        c.setFillColor(NO)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x + col_w + 0.4 * inch, y, "Organizations often cannot answer:")
        y2 = y - 0.28 * inch
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 12)
        for item in data["cannot"]:
            c.drawString(x + col_w + 0.4 * inch, y2, f"✗  {item}")
            y2 -= 0.24 * inch
        return

    if slide_num == 3:
        y = draw_slide_title(c, x, y, data["title"])
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x, y, "Three years later:")
        y = draw_bullets(c, x, y - 0.2 * inch, data["bullets_left"], MUTED, 12)
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x + 3.2 * inch, y + 1.0 * inch, "The organization still has:")
        draw_bullets(c, x + 3.2 * inch, y + 0.75 * inch, data["bullets_right"], TEXT, 12)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 12)
        for line in wrap_text(data["highlight"], 75):
            c.drawString(x, 1.35 * inch, line)
        return

    if slide_num == 4:
        y = draw_slide_title(c, x, y, data["title"])
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x, y, "Before AI:")
        c.setFillColor(TEXT)
        c.setFont("Helvetica", 13)
        for i, line in enumerate(data["chain_before"].split("\n")):
            c.drawString(x, y - 0.3 * inch - i * 0.22 * inch, line)
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x + 3.5 * inch, y, "After AI:")
        c.setFillColor(TEXT)
        c.setFont("Helvetica", 12)
        for i, line in enumerate(data["chain_after"].split("\n")):
            c.drawString(x + 3.5 * inch, y - 0.3 * inch - i * 0.2 * inch, line)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x, 1.55 * inch, "Result:")
        c.setFillColor(TEXT)
        c.setFont("Helvetica", 13)
        for i, line in enumerate(data["result"]):
            c.drawString(x + 0.6 * inch, 1.25 * inch - i * 0.24 * inch, line)
        return

    if slide_num == 5:
        y = draw_slide_title(c, x, y, data["title"])
        col_w = (w - 2 * MARGIN - 0.5 * inch) / 2
        draw_bullets(c, x, y - 0.1 * inch, data["columns"][0], ACCENT, 14, 22)
        c.setFillColor(MUTED_2)
        c.setFont("Helvetica-Bold", 20)
        c.drawString(x + col_w + 0.15 * inch, y - 0.55 * inch, "↓")
        draw_bullets(c, x + col_w + 0.5 * inch, y - 0.1 * inch, data["columns"][1], MUTED, 14, 22)
        return

    if slide_num == 6:
        y = draw_slide_title(c, x, y, data["title"])
        cy = y - 0.5 * inch
        for i, step in enumerate(data["chain"]):
            c.setFillColor(PANEL)
            c.roundRect(x + 1.8 * inch, cy - i * 0.62 * inch, 4.8 * inch, 0.42 * inch, 8, fill=1, stroke=0)
            c.setFillColor(TEXT if i == len(data["chain"]) - 1 else ACCENT)
            c.setFont("Helvetica-Bold" if i == len(data["chain"]) - 1 else "Helvetica", 13)
            c.drawCentredString(x + 4.2 * inch, cy - i * 0.62 * inch + 0.14 * inch, step)
            if i < len(data["chain"]) - 1:
                c.setFillColor(MUTED_2)
                c.setFont("Helvetica-Bold", 12)
                c.drawCentredString(x + 4.2 * inch, cy - i * 0.62 * inch - 0.28 * inch, "↓")
        return

    if slide_num in (7, 8, 9, 10):
        y = draw_slide_title(c, x, y, data["title"], data.get("subtitle"))
        if slide_num == 7:
            c.setFillColor(MUTED)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x, y, "Can your organization demonstrate:")
            y = draw_bullets(c, x, y - 0.22 * inch, data["bullets"], TEXT, 12)
            c.setFillColor(MUTED)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x, y - 0.1 * inch, "Applicable to:")
            draw_bullets(c, x, y - 0.35 * inch, data["tags"], ACCENT_2, 11)
        elif slide_num == 8:
            y = draw_bullets(c, x, y - 0.05 * inch, data["timeline"], TEXT, 13, 22)
            c.setFillColor(ACCENT)
            c.setFont("Helvetica-Bold", 12)
            c.drawString(x, 1.35 * inch, "Question:")
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 12)
            for line in wrap_text(data["question"], 85):
                c.drawString(x, 1.1 * inch, line)
        elif slide_num == 9:
            col_w = (w - 2 * MARGIN - 0.4 * inch) / 2
            for col, label in enumerate(data["column_labels"]):
                cx = x + col * (col_w + 0.4 * inch)
                c.setFillColor(ACCENT if col else MUTED)
                c.setFont("Helvetica-Bold", 11)
                c.drawString(cx, y, label)
                for i, line in enumerate(data["columns"][col]):
                    c.setFillColor(TEXT)
                    c.setFont("Helvetica", 12)
                    c.drawString(cx, y - 0.28 * inch - i * 0.24 * inch, line)
        elif slide_num == 10:
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 12)
            c.drawString(x, y, "The future question is not:")
            c.setFillColor(MUTED_2)
            c.drawString(x, y - 0.28 * inch, data["quote_old"])
            c.setFillColor(MUTED)
            c.drawString(x, y - 0.62 * inch, "The future question is:")
            c.setFillColor(ACCENT)
            c.setFont("Helvetica-Bold", 13)
            c.drawString(x, y - 0.9 * inch, data["quote_new"])
            c.setFillColor(MUTED)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x, y - 1.35 * inch, "Drivers:")
            draw_bullets(c, x, y - 1.58 * inch, data["tags"], TEXT, 12)
        return

    if slide_num == 11:
        y = draw_slide_title(c, x, y, data["title"])
        for i, (abbr, label) in enumerate(data["categories"]):
            c.setFillColor(ACCENT if abbr == "EDMP" else TEXT)
            c.setFont("Helvetica-Bold", 16)
            c.drawString(x, y - i * 0.55 * inch, f"{abbr}")
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 14)
            c.drawString(x + 0.9 * inch, y - i * 0.55 * inch, f"= {label}")
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 12)
        by = 1.45 * inch
        for line in data["closing"]:
            c.drawString(x, by, line)
            by -= 0.22 * inch
        return

    if slide_num == 12:
        y = draw_slide_title(c, x, y, data["title"])
        cy = y - 0.35 * inch
        for i, step in enumerate(data["chain"]):
            c.setFillColor(TEXT)
            c.setFont("Helvetica", 13)
            c.drawString(x + 1.5 * inch, cy - i * 0.48 * inch, step)
            if i < len(data["chain"]) - 1:
                c.setFillColor(MUTED_2)
                c.drawString(x + 3.8 * inch, cy - i * 0.48 * inch - 0.28 * inch, "↓")
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x, 1.45 * inch, "Closing:")
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 11)
        ty = 1.2 * inch
        for para in data["closing"].split("\n\n"):
            for line in wrap_text(para, 90):
                c.drawString(x, ty, line)
                ty -= 0.2 * inch
            ty -= 0.08 * inch


def render_notes(c: canvas.Canvas, w: float, h: float, slide_num: int, data: dict) -> None:
    c.setFillColor(BG_MID)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, h - 0.55 * inch, f"SPEAKER NOTES — SLIDE {slide_num}")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, h - 0.82 * inch, data["title"])
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    ty = h - 1.15 * inch
    for para in data["notes"].split("\n\n"):
        for line in wrap_text(para, 88):
            if line == "":
                ty -= 0.08 * inch
                continue
            c.drawString(MARGIN, ty, line)
            ty -= 0.22 * inch
        ty -= 0.1 * inch
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN, 0.45 * inch, "AI Elevate  ·  AvL Consultancy  ·  Confidential board briefing material")


def main() -> None:
    writer = PdfWriter()
    writer.add_page(build_page(letter, draw_cover))

    for i, slide in enumerate(SLIDES, start=1):
        writer.add_page(build_page((SLIDE_W, SLIDE_H), lambda c, w, h, n=i, d=slide: render_slide(c, w, h, n, d)))
        writer.add_page(build_page(letter, lambda c, w, h, n=i, d=slide: render_notes(c, w, h, n, d)))

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PDF}")
    print(f"Slides: {len(SLIDES)} (+ cover, + notes pages)")
    print(f"Total pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
