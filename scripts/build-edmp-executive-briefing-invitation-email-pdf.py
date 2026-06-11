#!/usr/bin/env python3
"""Build AI Elevate branded EDMP Executive Briefing invitation email PDF (Asset 1)."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = (
    ROOT
    / "ai-elevate-cockpit-plugin-v4-standalone"
    / "app"
    / "assets"
    / "ai-elevate-edmp-executive-briefing-invitation-email.pdf"
)
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
PLACEHOLDER = HexColor("#5a6a7a")

PAGE_W, PAGE_H = letter
MARGIN_X = 0.95 * inch
TOP_Y = PAGE_H - 1.05 * inch
BOTTOM_Y = 0.72 * inch
FOOTER_H = 34
HEADER_H = 38

SUBJECT = "Executive Briefing: The Missing Enterprise Memory Layer"

SESSION_TOPICS = [
    "Why organizations repeatedly revisit the same decisions",
    "The hidden cost of lost reasoning",
    "The AI accountability paradox",
    "Executive continuity and institutional memory",
    "Why decision memory may become a new enterprise capability",
]

EMAIL_COPY = f"""Subject: {SUBJECT}

Dear [Name],

Organizations have invested heavily in preserving data, workflows, approvals, and operational activity.

Yet most organizations still struggle to preserve how important decisions were formed.

As AI accelerates decision velocity, the ability to reconstruct reasoning, accountability, and decision lineage is becoming increasingly important for boards, executives, governance leaders, and transformation sponsors.

I would like to invite you to a 90-minute Executive Briefing on Enterprise Decision Memory (EDMP).

The session explores:
- Why organizations repeatedly revisit the same decisions
- The hidden cost of lost reasoning
- The AI accountability paradox
- Executive continuity and institutional memory
- Why decision memory may become a new enterprise capability

The objective is not a software demonstration.

The objective is to explore whether decision memory represents a strategic opportunity or risk within your organization.

Kind regards,

Anthony van Lobbrecht
AI Elevate
Enterprise Decision Memory Platform
aielevate.xyz"""


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


class DocBuilder:
    def __init__(self) -> None:
        self.buf = BytesIO()
        self.c = canvas.Canvas(self.buf, pagesize=letter)
        self.y = TOP_Y
        self.page_num = 0

    def finish(self) -> PdfWriter:
        self._footer()
        self.c.save()
        self.buf.seek(0)
        reader = PdfReader(self.buf)
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        return writer

    def new_page(self) -> None:
        if self.page_num > 0:
            self._footer()
            self.c.showPage()
        self.page_num += 1
        self.c.setFillColor(BG_MID)
        self.c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        self._header()
        self.y = TOP_Y

    def ensure(self, needed: float) -> None:
        if self.y - needed < BOTTOM_Y:
            self.new_page()

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
        self.c.drawString(0.55 * inch, 12, "AvL Consultancy  -  info@aielevate.xyz  -  aielevate.xyz")
        self.c.drawRightString(PAGE_W - 0.55 * inch, 12, str(self.page_num))

    def section(self, title: str) -> None:
        self.ensure(0.5 * inch)
        self.y -= 0.08 * inch
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X, self.y, title.upper())
        self.y -= 0.28 * inch
        self.c.setStrokeColor(LINE)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_X, self.y + 0.08 * inch, PAGE_W - MARGIN_X, self.y + 0.08 * inch)

    def meta_row(self, label: str, value: str, italic: bool = False) -> None:
        self.ensure(0.26 * inch)
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica-Bold", 9.5)
        self.c.drawString(MARGIN_X, self.y, f"{label}:")
        if italic:
            self.c.setFillColor(PLACEHOLDER)
            self.c.setFont("Helvetica-Oblique", 10.5)
        else:
            self.c.setFillColor(TEXT)
            self.c.setFont("Helvetica", 10.5)
        for i, line in enumerate(wrap_text(value, 72)):
            self.c.drawString(MARGIN_X + 1.0 * inch if i == 0 else MARGIN_X + 1.0 * inch, self.y - i * 0.2 * inch, line)
        self.y -= 0.22 * inch + max(0, len(wrap_text(value, 72)) - 1) * 0.2 * inch

    def body(self, text: str, color=MUTED, size: float = 10.5) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for line in wrap_text(text, 88):
            if line == "":
                self.ensure(0.1 * inch)
                self.y -= 0.1 * inch
                continue
            self.ensure(0.2 * inch)
            self.c.drawString(MARGIN_X, self.y, line)
            self.y -= 0.2 * inch

    def bullets(self, items: list[str]) -> None:
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica", 10.5)
        for item in items:
            for i, line in enumerate(wrap_text(item, 84)):
                self.ensure(0.2 * inch)
                prefix = "-  " if i == 0 else "   "
                self.c.drawString(MARGIN_X, self.y, f"{prefix}{line}")
                self.y -= 0.2 * inch

    def signature_block(self) -> None:
        self.ensure(0.9 * inch)
        self.y -= 0.06 * inch
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.78 * inch, PAGE_W - 2 * MARGIN_X, 0.84 * inch, 8, fill=1, stroke=0)
        lines = [
            ("Kind regards,", MUTED),
            ("", None),
            ("Anthony van Lobbrecht", TEXT),
            ("AI Elevate", ACCENT),
            ("Enterprise Decision Memory Platform", MUTED),
            ("aielevate.xyz", ACCENT_2),
        ]
        ty = self.y - 0.12 * inch
        for text, color in lines:
            if not text:
                ty -= 0.06 * inch
                continue
            self.c.setFillColor(color or MUTED)
            self.c.setFont("Helvetica-Bold" if text == "Anthony van Lobbrecht" else "Helvetica", 10)
            self.c.drawString(MARGIN_X + 0.16 * inch, ty, text)
            ty -= 0.2 * inch
        self.y = ty - 0.1 * inch


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
    c.setFont("Helvetica-Bold", 22)
    c.drawString(0.95 * inch, y - 0.48 * inch, "Executive Invitation Email")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 14)
    c.drawString(0.95 * inch, y - 0.86 * inch, "EDMP Executive Briefing Package")

    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "Asset 1  -  Ready for Outlook, Gmail, or executive outreach")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    intro = (
        "Use page 2 as structured reference and page 3 as a copy-paste email block. "
        "Replace [Name] with the recipient before sending."
    )
    text = c.beginText(0.95 * inch, PAGE_H - 3.8 * inch)
    text.setLeading(16)
    for line in wrap_text(intro, 88):
        text.textLine(line)
    c.drawText(text)

    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(0.95 * inch, 1.35 * inch, "Sold by AvL Consultancy")
    c.drawString(0.95 * inch, 1.1 * inch, "info@aielevate.xyz  -  +31 6 46438478  -  aielevate.xyz")
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  -  Executive Briefing delivery material")


def draw_copy_page(c: canvas.Canvas) -> None:
    c.setFillColor(BG_MID)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BG)
    c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(0.55 * inch, PAGE_H - 24, "AI ELEVATE")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(1.35 * inch, PAGE_H - 24, "Paste into email body")

    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN_X, PAGE_H - 1.15 * inch, "EMAIL COPY BLOCK")
    c.setFillColor(PANEL)
    c.roundRect(MARGIN_X, 0.85 * inch, PAGE_W - 2 * MARGIN_X, PAGE_H - 1.55 * inch, 10, fill=1, stroke=0)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    ty = PAGE_H - 1.42 * inch
    for line in EMAIL_COPY.split("\n"):
        if ty < 0.95 * inch:
            break
        if line.strip() == "":
            ty -= 0.08 * inch
            continue
        for wrapped in wrap_text(line, 94):
            c.drawString(MARGIN_X + 0.12 * inch, ty, wrapped)
            ty -= 0.155 * inch

    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 7.5)
    c.drawString(0.55 * inch, 12, "AvL Consultancy  -  info@aielevate.xyz  -  aielevate.xyz")
    c.drawRightString(PAGE_W - 0.55 * inch, 12, "3")


def build_content() -> DocBuilder:
    b = DocBuilder()
    b.new_page()

    b.section("Executive Invitation Email")
    b.meta_row("Subject", SUBJECT)
    b.meta_row("To", "[Name]", italic=True)

    b.section("Opening")
    b.body(
        "Organizations have invested heavily in preserving data, workflows, approvals, "
        "and operational activity."
    )
    b.body(
        "Yet most organizations still struggle to preserve how important decisions were formed."
    )
    b.body(
        "As AI accelerates decision velocity, the ability to reconstruct reasoning, accountability, "
        "and decision lineage is becoming increasingly important for boards, executives, governance "
        "leaders, and transformation sponsors.",
    )

    b.section("Invitation")
    b.body(
        "I would like to invite you to a 90-minute Executive Briefing on Enterprise Decision Memory (EDMP).",
        color=TEXT,
    )
    b.body("The session explores:")
    b.bullets(SESSION_TOPICS)

    b.section("Objective")
    b.body("The objective is not a software demonstration.", color=TEXT)
    b.body(
        "The objective is to explore whether decision memory represents a strategic opportunity "
        "or risk within your organization.",
        color=ACCENT,
    )

    b.section("Signature")
    b.signature_block()

    return b


def main() -> None:
    writer = PdfWriter()

    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    draw_cover(c)
    c.save()
    buf.seek(0)
    writer.add_page(PdfReader(buf).pages[0])

    content = build_content().finish()
    for page in content.pages:
        writer.add_page(page)

    buf2 = BytesIO()
    c2 = canvas.Canvas(buf2, pagesize=letter)
    draw_copy_page(c2)
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
