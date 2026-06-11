#!/usr/bin/env python3
"""Build AI Elevate branded EDMP Executive Brief PDF (board / investor one-pager set)."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-edmp-executive-brief.pdf"
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

PAGE_W, PAGE_H = letter
MARGIN_X = 0.95 * inch
TOP_Y = PAGE_H - 1.05 * inch
BOTTOM_Y = 0.72 * inch
FOOTER_H = 34
HEADER_H = 38


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


class BriefBuilder:
    def __init__(self) -> None:
        self.buf = BytesIO()
        self.c = canvas.Canvas(self.buf, pagesize=letter)
        self.y = TOP_Y
        self.page_num = 0

    def save(self) -> PdfWriter:
        self.c.save()
        self.buf.seek(0)
        reader = PdfReader(self.buf)
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        return writer

    def new_content_page(self) -> None:
        if self.page_num > 0:
            self._footer()
            self.c.showPage()
        self.page_num += 1
        self.c.setFillColor(BG_MID)
        self.c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        self._header()
        self.y = TOP_Y

    def ensure_space(self, needed: float) -> None:
        if self.y - needed < BOTTOM_Y:
            self.new_content_page()

    def _header(self) -> None:
        self.c.setFillColor(BG)
        self.c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, fill=1, stroke=0)
        self.c.setStrokeColor(LINE)
        self.c.line(0, PAGE_H - HEADER_H, PAGE_W, PAGE_H - HEADER_H)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 8)
        self.c.drawString(0.55 * inch, PAGE_H - 24, "AI ELEVATE")
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica", 8)
        self.c.drawString(1.35 * inch, PAGE_H - 24, "Enterprise Decision Memory Platform")

    def _footer(self) -> None:
        self.c.setFillColor(BG)
        self.c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
        self.c.setStrokeColor(LINE)
        self.c.line(0, FOOTER_H, PAGE_W, FOOTER_H)
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica", 7.5)
        self.c.drawString(0.55 * inch, 12, "AvL Consultancy  ·  info@aielevate.xyz  ·  aielevate.xyz")
        self.c.drawRightString(PAGE_W - 0.55 * inch, 12, str(self.page_num))

    def section(self, title: str) -> None:
        self.ensure_space(0.55 * inch)
        self.y -= 0.12 * inch
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X, self.y, title.upper())
        self.y -= 0.28 * inch
        self.c.setStrokeColor(LINE)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_X, self.y + 0.08 * inch, PAGE_W - MARGIN_X, self.y + 0.08 * inch)

    def heading(self, title: str) -> None:
        self.ensure_space(0.45 * inch)
        self.y -= 0.08 * inch
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.32 * inch

    def subheading(self, title: str) -> None:
        self.ensure_space(0.38 * inch)
        self.c.setFillColor(ACCENT_2)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.28 * inch

    def body(self, text: str, size: float = 10.5, color=MUTED, leading: float = 15) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for line in wrap_text(text, 88):
            if line == "":
                self.ensure_space(leading / 72 * inch)
                self.y -= leading / 72 * inch * 0.5
                continue
            self.ensure_space(leading / 72 * inch)
            self.c.drawString(MARGIN_X, self.y, line)
            self.y -= leading / 72 * inch

    def bullets(self, items: list[str], prefix: str = "•", color=TEXT, size: float = 10.5) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for item in items:
            for i, line in enumerate(wrap_text(item, 84)):
                self.ensure_space(0.2 * inch)
                marker = f"{prefix}  " if i == 0 else "    "
                self.c.drawString(MARGIN_X, self.y, f"{marker}{line}")
                self.y -= 0.2 * inch

    def checklist(self, can: list[str], cannot: list[str]) -> None:
        col_w = (PAGE_W - 2 * MARGIN_X - 0.35 * inch) / 2
        start_y = self.y
        self.c.setFillColor(OK)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, start_y, "Most executives can answer:")
        y1 = start_y - 0.26 * inch
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica", 10)
        for item in can:
            self.c.drawString(MARGIN_X, y1, f"✓  {item}")
            y1 -= 0.22 * inch
        x2 = MARGIN_X + col_w + 0.35 * inch
        self.c.setFillColor(NO)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(x2, start_y, "Most organizations struggle to answer:")
        y2 = start_y - 0.26 * inch
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 10)
        for item in cannot:
            for i, line in enumerate(wrap_text(item, 38)):
                self.c.drawString(x2, y2, f"{'✗  ' if i == 0 else '    '}{line}")
                y2 -= 0.22 * inch
        self.y = min(y1, y2) - 0.1 * inch

    def value_chain(self, steps: list[str]) -> None:
        box_w = 4.6 * inch
        box_x = MARGIN_X + 0.4 * inch
        for i, step in enumerate(steps):
            self.ensure_space(0.5 * inch)
            self.c.setFillColor(PANEL)
            self.c.roundRect(box_x, self.y - 0.08 * inch, box_w, 0.34 * inch, 6, fill=1, stroke=0)
            self.c.setFillColor(ACCENT if i < len(steps) - 1 else TEXT)
            self.c.setFont("Helvetica-Bold" if i == len(steps) - 1 else "Helvetica", 11)
            self.c.drawCentredString(box_x + box_w / 2, self.y + 0.04 * inch, step)
            self.y -= 0.34 * inch
            if i < len(steps) - 1:
                self.ensure_space(0.18 * inch)
                self.c.setFillColor(MUTED_2)
                self.c.setFont("Helvetica-Bold", 10)
                self.c.drawCentredString(box_x + box_w / 2, self.y - 0.02 * inch, "↓")
                self.y -= 0.18 * inch
        self.y -= 0.08 * inch

    def category_row(self, abbr: str, label: str, highlight: bool = False) -> None:
        self.ensure_space(0.28 * inch)
        self.c.setFillColor(ACCENT if highlight else TEXT)
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN_X, self.y, abbr)
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 11)
        self.c.drawString(MARGIN_X + 0.75 * inch, self.y, f"= {label}")
        self.y -= 0.28 * inch

    def engagement_card(self, title: str, desc: str) -> None:
        self.ensure_space(0.72 * inch)
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.52 * inch, PAGE_W - 2 * MARGIN_X, 0.58 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10.5)
        self.c.drawString(MARGIN_X + 0.18 * inch, self.y - 0.12 * inch, title)
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 9.5)
        for i, line in enumerate(wrap_text(desc, 82)):
            self.c.drawString(MARGIN_X + 0.18 * inch, self.y - 0.34 * inch - i * 0.18 * inch, line)
        self.y -= 0.72 * inch

    def closing_quote(self, text: str) -> None:
        self.ensure_space(0.9 * inch)
        self.c.setStrokeColor(ACCENT)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_X, self.y + 0.15 * inch, MARGIN_X + 0.45 * inch, self.y + 0.15 * inch)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, self.y - 0.1 * inch, "Closing Statement")
        self.y -= 0.38 * inch
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 11)
        for para in text.split("\n\n"):
            for line in wrap_text(para, 84):
                self.ensure_space(0.22 * inch)
                self.c.drawString(MARGIN_X, self.y, line)
                self.y -= 0.22 * inch
            self.y -= 0.06 * inch


def draw_cover(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.roundRect(0.65 * inch, 0.65 * inch, PAGE_W - 1.3 * inch, PAGE_H - 1.3 * inch, 18, fill=0, stroke=1)

    logo = next((p for p in LOGO_CANDIDATES if p.exists()), None)
    y = PAGE_H - 2.0 * inch
    if logo:
        try:
            c.drawImage(str(logo), 0.95 * inch, y - 0.1 * inch, width=0.55 * inch, height=0.55 * inch, mask="auto")
            tx = 1.65 * inch
        except Exception:
            tx = 0.95 * inch
    else:
        tx = 0.95 * inch

    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(tx, y + 0.22 * inch, "AI ELEVATE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(0.95 * inch, y - 0.55 * inch, "EDMP")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 14)
    c.drawString(0.95 * inch, y - 0.95 * inch, "Enterprise Decision Memory Platform")
    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "The Missing Enterprise Memory Layer")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    summary = (
        "Executive brief for board, investor, and governance conversations — "
        "why organizations preserve outcomes but not decision formation, and why that gap "
        "becomes a governance, risk, and performance challenge as AI adoption accelerates."
    )
    text = c.beginText(0.95 * inch, PAGE_H - 3.85 * inch)
    text.setLeading(16)
    for line in wrap_text(summary, 88):
        text.textLine(line)
    c.drawText(text)

    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(0.95 * inch, 1.35 * inch, "Sold by AvL Consultancy")
    c.drawString(0.95 * inch, 1.1 * inch, "info@aielevate.xyz  ·  +31 6 46438478  ·  aielevate.xyz")
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  ·  Board-ready executive material")


def draw_contact_page(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN_X, PAGE_H - 1.35 * inch, "CONTACT")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN_X, PAGE_H - 1.85 * inch, "AI Elevate")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(MARGIN_X, PAGE_H - 2.25 * inch, "Enterprise Decision Memory Platform")
    c.setFillColor(ACCENT)
    c.setFont("Helvetica", 12)
    c.drawString(MARGIN_X, PAGE_H - 2.85 * inch, "info@aielevate.xyz")
    c.setFillColor(MUTED)
    c.drawString(MARGIN_X, PAGE_H - 3.2 * inch, "aielevate.xyz")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 10)
    c.drawString(MARGIN_X, PAGE_H - 3.75 * inch, "Programs: aielevate.xyz/#engage")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN_X, 0.45 * inch, "AvL Consultancy  ·  Confidential board briefing material")


def build_content() -> BriefBuilder:
    b = BriefBuilder()
    b.new_content_page()

    b.section("Executive Summary")
    b.body(
        "Organizations preserve data, transactions, workflows, approvals, and AI outputs. "
        "Yet most organizations do not preserve how important decisions were formed."
    )
    b.body(
        "As AI accelerates decision velocity, the inability to reconstruct why decisions were made "
        "is becoming a governance, risk, continuity, and performance challenge."
    )
    b.body("EDMP addresses this gap.", color=TEXT)
    b.body(
        "EDMP creates a persistent enterprise memory layer that preserves signal, reasoning, "
        "decision lineage, execution trace, and institutional memory."
    )

    b.section("The Executive Problem")
    b.checklist(
        can=[
            "What happened?",
            "Who approved it?",
            "What was implemented?",
            "What was the outcome?",
        ],
        cannot=[
            "Why was this decision made?",
            "What alternatives were considered?",
            "Which assumptions were accepted?",
            "Which risks were knowingly tolerated?",
            "What signal triggered intervention?",
            "What changed between version one and version five?",
        ],
    )
    b.body("The organization remembers the outcome. It forgets the reasoning.", color=TEXT)

    b.section("Why This Matters Now")
    b.subheading("Artificial intelligence is increasing:")
    b.bullets(["Decision volume", "Decision velocity", "Decision complexity"], color=MUTED)
    b.subheading("At the same time it often reduces:")
    b.bullets(
        ["Traceability", "Continuity", "Accountability", "Reasoning visibility"],
        color=MUTED,
    )
    b.body(
        "Organizations are making more decisions while understanding less about how those decisions were formed."
    )
    b.body("This is the AI accountability paradox.", color=ACCENT)

    b.section("EDMP Value Chain")
    b.value_chain(["Signal", "Structure", "Decision", "Execution Trace", "Institutional Memory"])
    b.body("EDMP preserves the entire progression rather than only the outcome.")
    b.body("Preserve why decisions happen, not merely what happened.", color=TEXT)

    b.section("Financial Impact")
    b.subheading("Risk Reduction")
    b.body("Support audit, governance, litigation, procurement, and regulatory defensibility.")
    b.subheading("Reduced Rework")
    b.body("Prevent organizations from repeatedly paying to recreate reasoning that already existed.")
    b.subheading("Executive Continuity")
    b.body("Convert personal memory into institutional memory.")
    b.subheading("AI Governance")
    b.body("Preserve accountability and reasoning lineage across AI-assisted decision environments.")

    b.section("Category Thesis")
    b.category_row("CRM", "Customer Memory")
    b.category_row("ERP", "Operational Memory")
    b.category_row("EDMP", "Decision Memory", highlight=True)
    b.bullets(
        [
            "Not another dashboard.",
            "Not another workflow platform.",
            "Not another AI tool.",
            "A new enterprise layer focused on preserving decision formation.",
        ],
        color=MUTED,
    )

    b.section("The 30-Second Investor Version")
    b.body(
        "Every organization stores data, transactions, and workflows. "
        "Almost no organization stores decision formation."
    )
    b.body(
        "As AI accelerates decision velocity, the inability to reconstruct why decisions were made "
        "becomes a governance, risk, and performance problem."
    )
    b.body(
        "EDMP creates the missing enterprise memory layer by preserving signal, reasoning, "
        "decision lineage, execution trace, and institutional memory."
    )
    b.body(
        "The result is reduced risk, preserved knowledge, faster onboarding, stronger governance, "
        "and reusable decision intelligence.",
        color=TEXT,
    )

    b.section("Engagement Options")
    b.engagement_card(
        "Executive Briefing",
        "90-minute board-level session exploring the business case and implications of Enterprise Decision Memory.",
    )
    b.engagement_card(
        "EDMP Readiness Assessment",
        "Structured evaluation of decision traceability, continuity, governance exposure, and organizational memory maturity.",
    )
    b.engagement_card(
        "Board Briefing Pack",
        "Board-ready PDF and presentation materials designed for executive, investor, and governance discussions.",
    )

    b.closing_quote(
        "Organizations already preserve what happened.\n\n"
        "The next competitive advantage belongs to organizations that preserve why it happened."
    )

    b._footer()
    return b


def main() -> None:
    writer = PdfWriter()

    # Cover
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    draw_cover(c)
    c.save()
    buf.seek(0)
    writer.add_page(PdfReader(buf).pages[0])

    builder = build_content()
    content_writer = builder.save()
    for page in content_writer.pages:
        writer.add_page(page)

    buf2 = BytesIO()
    c2 = canvas.Canvas(buf2, pagesize=letter)
    draw_contact_page(c2)
    c2.save()
    buf2.seek(0)
    writer.add_page(PdfReader(buf2).pages[0])

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PDF}")
    print(f"Total pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
