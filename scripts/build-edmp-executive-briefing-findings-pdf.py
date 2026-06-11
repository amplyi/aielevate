#!/usr/bin/env python3
"""Build AI Elevate branded Post-Briefing Executive Findings Report template PDF."""

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
    / "ai-elevate-edmp-executive-briefing-findings-report.pdf"
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

FINDINGS = [
    {
        "num": 1,
        "title": "Decision Traceability",
        "observation": "Describe current-state visibility into reasoning and decision lineage.",
        "impact": "Governance, audit, accountability implications.",
    },
    {
        "num": 2,
        "title": "Institutional Memory",
        "observation": "Describe dependency on individuals and continuity risks.",
        "impact": "Leadership transition and organizational resilience implications.",
    },
    {
        "num": 3,
        "title": "AI Governance",
        "observation": "Describe current AI oversight and explainability posture.",
        "impact": "Regulatory and accountability implications.",
    },
]

REFLECTION_QUESTIONS = [
    "Which decisions are hardest to reconstruct today?",
    "What reasoning is most vulnerable to loss?",
    "Which governance environments carry the highest exposure?",
]

NEXT_STEPS = [
    ("Option A", "Board Briefing Pack"),
    ("Option B", "EDMP Readiness Assessment"),
    ("Option C", "Decision Environment Workshop"),
]

OBSERVATION_EXAMPLE = (
    "The leadership team demonstrated strong awareness of governance obligations and operational "
    "complexity. Discussion revealed recurring challenges related to decision traceability, "
    "executive continuity, and reconstruction of historical rationale."
)


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
        self.ensure(0.52 * inch)
        self.y -= 0.08 * inch
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X, self.y, title.upper())
        self.y -= 0.28 * inch
        self.c.setStrokeColor(LINE)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_X, self.y + 0.08 * inch, PAGE_W - MARGIN_X, self.y + 0.08 * inch)

    def subheading(self, title: str) -> None:
        self.ensure(0.34 * inch)
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.28 * inch

    def label(self, title: str) -> None:
        self.ensure(0.26 * inch)
        self.c.setFillColor(ACCENT_2)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.24 * inch

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

    def fill_line(self, label: str, placeholder: str) -> None:
        self.ensure(0.28 * inch)
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica-Bold", 9.5)
        self.c.drawString(MARGIN_X, self.y, f"{label}:")
        self.c.setFillColor(PLACEHOLDER)
        self.c.setFont("Helvetica-Oblique", 10.5)
        self.c.drawString(MARGIN_X + 1.05 * inch, self.y, placeholder)
        self.y -= 0.28 * inch

    def write_area(self, label: str, hint: str, lines: int = 3) -> None:
        self.ensure(0.22 * inch + lines * 0.22 * inch)
        self.label(label)
        box_h = lines * 0.22 * inch + 0.12 * inch
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - box_h + 0.08 * inch, PAGE_W - 2 * MARGIN_X, box_h, 6, fill=1, stroke=0)
        self.c.setFillColor(PLACEHOLDER)
        self.c.setFont("Helvetica-Oblique", 9.5)
        self.c.drawString(MARGIN_X + 0.14 * inch, self.y - 0.02 * inch, hint)
        self.y -= box_h + 0.1 * inch

    def bullets(self, items: list[str]) -> None:
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 10.5)
        for item in items:
            for i, line in enumerate(wrap_text(item, 84)):
                self.ensure(0.2 * inch)
                prefix = "-  " if i == 0 else "   "
                self.c.drawString(MARGIN_X, self.y, f"{prefix}{line}")
                self.y -= 0.2 * inch

    def finding_block(self, finding: dict) -> None:
        self.ensure(1.35 * inch)
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 1.28 * inch, PAGE_W - 2 * MARGIN_X, 1.34 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.1 * inch, f"FINDING {finding['num']}")
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN_X + 1.05 * inch, self.y - 0.1 * inch, finding["title"])
        self.c.setFillColor(ACCENT_2)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.38 * inch, "Observation:")
        self.c.setFillColor(PLACEHOLDER)
        self.c.setFont("Helvetica-Oblique", 9.5)
        oy = self.y - 0.58 * inch
        for line in wrap_text(finding["observation"], 82):
            self.c.drawString(MARGIN_X + 0.16 * inch, oy, line)
            oy -= 0.17 * inch
        self.c.setFillColor(ACCENT_2)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X + 0.16 * inch, oy - 0.04 * inch, "Impact:")
        self.c.setFillColor(PLACEHOLDER)
        self.c.setFont("Helvetica-Oblique", 9.5)
        iy = oy - 0.24 * inch
        for line in wrap_text(finding["impact"], 82):
            self.c.drawString(MARGIN_X + 0.16 * inch, iy, line)
            iy -= 0.17 * inch
        self.y = iy - 0.14 * inch

    def opportunity_lines(self, count: int = 3) -> None:
        for i in range(1, count + 1):
            self.write_area(f"Opportunity {i}", "[Describe opportunity identified during the briefing]", lines=2)

    def next_step_card(self, option: str, title: str) -> None:
        self.ensure(0.42 * inch)
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.32 * inch, PAGE_W - 2 * MARGIN_X, 0.36 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.1 * inch, option)
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica", 10.5)
        self.c.drawString(MARGIN_X + 1.05 * inch, self.y - 0.1 * inch, title)
        self.y -= 0.46 * inch

    def closing_box(self) -> None:
        self.ensure(1.0 * inch)
        self.c.setStrokeColor(ACCENT)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_X, self.y + 0.1 * inch, MARGIN_X + 0.45 * inch, self.y + 0.1 * inch)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, self.y - 0.08 * inch, "Closing Statement")
        self.y -= 0.35 * inch
        self.body("The organization demonstrates clear strengths in [areas].", color=TEXT)
        self.body(
            "The primary opportunity identified is the preservation of decision formation as a "
            "reusable organizational asset.",
            color=TEXT,
        )
        self.body(
            "Further exploration is recommended through a structured EDMP Readiness Assessment.",
            color=ACCENT,
        )


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
    c.setFont("Helvetica-Bold", 20)
    c.drawString(0.95 * inch, y - 0.48 * inch, "Post-Briefing Executive Findings Report")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(0.95 * inch, y - 0.86 * inch, "Executive Briefing Summary")

    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "Asset 3  -  Client delivery template after live briefing")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    intro = (
        "Complete this report within two business days after the Executive Briefing session. "
        "Replace bracketed placeholders with client-specific observations and findings."
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
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  -  Confidential client delivery material")


def build_content() -> DocBuilder:
    b = DocBuilder()
    b.new_page()

    b.section("Executive Briefing Summary")
    b.fill_line("Client", "[Organization]")
    b.fill_line("Date", "[Date]")
    b.fill_line("Facilitator", "Anthony van Lobbrecht")
    b.y -= 0.06 * inch

    b.section("Executive Observation")
    b.body("Summary of key themes discussed during the briefing.")
    b.label("Example")
    b.body(OBSERVATION_EXAMPLE, color=PLACEHOLDER, size=10)
    b.write_area("Session summary", "[Complete with client-specific executive observation]", lines=4)

    b.section("Key Findings")
    for finding in FINDINGS:
        b.finding_block(finding)

    b.section("Identified Opportunities")
    b.opportunity_lines(3)

    b.section("Executive Reflection")
    b.body("Questions emerging from the session:")
    b.bullets(REFLECTION_QUESTIONS)
    b.write_area("Reflection notes", "[Capture themes raised in discussion]", lines=3)

    b.section("Recommended Next Step")
    for option, title in NEXT_STEPS:
        b.next_step_card(option, title)
    b.write_area("Recommendation", "[Select and justify recommended next step for this client]", lines=2)

    b.closing_box()

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

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PDF}")
    print(f"Total pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
