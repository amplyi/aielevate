#!/usr/bin/env python3
"""Build AI Elevate branded EDMP Readiness Assessment framework PDF."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-edmp-readiness-assessment.pdf"
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
RISK = HexColor("#c9a0a8")

PAGE_W, PAGE_H = letter
MARGIN_X = 0.95 * inch
TOP_Y = PAGE_H - 1.05 * inch
BOTTOM_Y = 0.72 * inch
FOOTER_H = 34
HEADER_H = 38

DIMENSIONS = [
    {
        "num": 1,
        "title": "Decision Traceability",
        "question": "To what extent can important organizational decisions be reconstructed after they have been made?",
        "indicators": [
            "Decision rationale documented",
            "Alternatives preserved",
            "Assumptions recorded",
            "Decision ownership visible",
            "Evidence linked to decisions",
        ],
        "scores": [
            "1 = Decisions cannot be reconstructed",
            "2 = Reconstruction depends on individuals",
            "3 = Partial decision records exist",
            "4 = Most major decisions are traceable",
            "5 = Complete decision lineage available",
        ],
        "risks": [
            "Accountability gaps",
            "Governance exposure",
            "High dependency on individual memory",
        ],
    },
    {
        "num": 2,
        "title": "Institutional Memory Risk",
        "question": "How much organizational knowledge leaves when key individuals leave?",
        "indicators": [
            "Knowledge transfer quality",
            "Historical reasoning availability",
            "Documentation continuity",
            "Leadership transition resilience",
        ],
        "scores": [
            "1 = Knowledge resides primarily in people",
            "2 = Significant knowledge loss occurs",
            "3 = Partial continuity exists",
            "4 = Most reasoning survives transitions",
            "5 = Institutional memory largely independent of individuals",
        ],
        "risks": [
            "Key-person dependency",
            "Continuity risk",
            "Repeated organizational learning cycles",
        ],
    },
    {
        "num": 3,
        "title": "AI Governance Exposure",
        "question": "Can AI-assisted decisions be explained and defended?",
        "indicators": [
            "Human oversight visibility",
            "Recommendation traceability",
            "Accountability ownership",
            "Escalation pathways",
            "Governance controls",
        ],
        "scores": [
            "1 = No visibility",
            "2 = Limited oversight",
            "3 = Partial accountability",
            "4 = Strong governance structure",
            "5 = Full reasoning lineage and accountability",
        ],
        "risks": [
            "Regulatory exposure",
            "AI accountability gaps",
            "Governance uncertainty",
        ],
    },
    {
        "num": 4,
        "title": "Rework Exposure",
        "question": "How frequently does the organization recreate reasoning that already existed?",
        "indicators": [
            "Repeated discussions",
            "Repeated analysis",
            "Context rebuilding effort",
            "Decision rediscovery",
        ],
        "scores": [
            "1 = Constant recreation",
            "2 = Frequent rediscovery",
            "3 = Moderate rework",
            "4 = Limited rework",
            "5 = Decisions are reusable organizational assets",
        ],
        "risks": [
            "Productivity loss",
            "Excess meeting load",
            "Hidden operational cost",
        ],
    },
    {
        "num": 5,
        "title": "Signal-to-Decision Visibility",
        "question": "Can the organization connect decisions back to their originating signals?",
        "indicators": [
            "Trigger visibility",
            "Escalation traceability",
            "Intervention logic",
            "Root-cause continuity",
        ],
        "scores": [
            "1 = No signal visibility",
            "2 = Fragmented signals",
            "3 = Partial linkage",
            "4 = Strong visibility",
            "5 = Complete signal-to-decision continuity",
        ],
        "risks": [
            "Poor intervention quality",
            "Strategic drift",
            "Weak prioritization",
        ],
    },
    {
        "num": 6,
        "title": "Executive Continuity",
        "question": "Can new leaders rapidly understand historical decision logic?",
        "indicators": [
            "Executive onboarding speed",
            "Historical context availability",
            "Strategic continuity",
            "Governance continuity",
        ],
        "scores": [
            "1 = New leaders rebuild context manually",
            "2 = Significant transition delays",
            "3 = Moderate continuity",
            "4 = Strong continuity",
            "5 = Immediate understanding of historical reasoning",
        ],
        "risks": [
            "Leadership transition friction",
            "Strategic inconsistency",
            "Institutional memory loss",
        ],
    },
]

MATURITY_LEVELS = [
    {
        "level": 1,
        "name": "Reactive",
        "score": "6-10",
        "traits": [
            "Decisions are largely undocumented",
            "Memory resides in individuals",
            "High governance risk",
            "Significant rework",
        ],
    },
    {
        "level": 2,
        "name": "Fragmented",
        "score": "11-17",
        "traits": [
            "Partial records exist",
            "Reasoning fragmented across systems",
            "High continuity exposure",
        ],
    },
    {
        "level": 3,
        "name": "Structured",
        "score": "18-23",
        "traits": [
            "Consistent decision documentation",
            "Moderate governance visibility",
            "Some reusable reasoning assets",
        ],
    },
    {
        "level": 4,
        "name": "Governed",
        "score": "24-28",
        "traits": [
            "Strong traceability",
            "Executive continuity supported",
            "AI governance becoming mature",
        ],
    },
    {
        "level": 5,
        "name": "Decision Intelligent",
        "score": "29-30",
        "traits": [
            "Enterprise Decision Memory established",
            "Decisions treated as reusable assets",
            "Full reasoning lineage available",
            "High accountability and resilience",
        ],
    },
]

EXEC_OUTPUT = [
    ("Maturity Score", "Overall EDMP Readiness Score"),
    ("Heat Map", "Strongest and weakest dimensions"),
    ("Exposure Analysis", "Top continuity, governance, and rework risks"),
    ("Priority Recommendations", "90-Day Intervention Roadmap"),
    ("Executive Summary", "Board-ready interpretation and next actions"),
]


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
        self.ensure(0.55 * inch)
        self.y -= 0.1 * inch
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X, self.y, title.upper())
        self.y -= 0.28 * inch
        self.c.setStrokeColor(LINE)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_X, self.y + 0.08 * inch, PAGE_W - MARGIN_X, self.y + 0.08 * inch)

    def heading(self, title: str, size: float = 14) -> None:
        self.ensure(0.42 * inch)
        self.y -= 0.06 * inch
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", size)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.3 * inch

    def subheading(self, title: str) -> None:
        self.ensure(0.34 * inch)
        self.c.setFillColor(ACCENT_2)
        self.c.setFont("Helvetica-Bold", 10.5)
        self.c.drawString(MARGIN_X, self.y, title)
        self.y -= 0.26 * inch

    def body(self, text: str, color=MUTED, size: float = 10, leading: float = 14.5) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for line in wrap_text(text, 88):
            if line == "":
                self.ensure(leading / 72 * inch)
                self.y -= leading / 72 * inch * 0.45
                continue
            self.ensure(leading / 72 * inch)
            self.c.drawString(MARGIN_X, self.y, line)
            self.y -= leading / 72 * inch

    def bullets(self, items: list[str], color=TEXT, size: float = 10) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for item in items:
            for i, line in enumerate(wrap_text(item, 84)):
                self.ensure(0.19 * inch)
                prefix = "-  " if i == 0 else "   "
                self.c.drawString(MARGIN_X, self.y, f"{prefix}{line}")
                self.y -= 0.19 * inch

    def dimension_divider(self, num: int, title: str) -> None:
        self.ensure(0.65 * inch)
        self.y -= 0.08 * inch
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.38 * inch, PAGE_W - 2 * MARGIN_X, 0.44 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.1 * inch, f"DIMENSION {num}")
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN_X + 1.15 * inch, self.y - 0.1 * inch, title)
        self.y -= 0.52 * inch

    def dimension_block(self, dim: dict) -> None:
        self.dimension_divider(dim["num"], dim["title"])
        self.subheading("Assessment Question")
        self.body(dim["question"], color=TEXT)
        self.subheading("Indicators")
        self.bullets(dim["indicators"], color=MUTED)
        self.subheading("Score")
        self.c.setFillColor(PANEL)
        box_h = 0.19 * inch * len(dim["scores"]) + 0.14 * inch
        self.ensure(box_h + 0.1 * inch)
        self.c.roundRect(MARGIN_X, self.y - box_h + 0.1 * inch, PAGE_W - 2 * MARGIN_X, box_h, 6, fill=1, stroke=0)
        sy = self.y
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 9.5)
        for item in dim["scores"]:
            self.c.drawString(MARGIN_X + 0.14 * inch, sy, item)
            sy -= 0.19 * inch
        self.y = sy - 0.08 * inch
        self.subheading("Executive Risk")
        self.body("Low scores indicate:", color=RISK, size=9.5)
        self.bullets(dim["risks"], color=RISK, size=9.5)
        self.y -= 0.06 * inch

    def maturity_level(self, level: dict) -> None:
        self.ensure(0.85 * inch)
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.62 * inch, PAGE_W - 2 * MARGIN_X, 0.68 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT if level["level"] >= 4 else TEXT)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(
            MARGIN_X + 0.16 * inch,
            self.y - 0.12 * inch,
            f"Level {level['level']} - {level['name']}",
        )
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica", 9.5)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.32 * inch, f"Score: {level['score']}")
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 9.5)
        ty = self.y - 0.5 * inch
        for trait in level["traits"]:
            self.c.drawString(MARGIN_X + 0.16 * inch, ty, f"-  {trait}")
            ty -= 0.17 * inch
        self.y = ty - 0.1 * inch

    def output_row(self, title: str, desc: str) -> None:
        self.ensure(0.38 * inch)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, self.y, title)
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 9.5)
        self.c.drawString(MARGIN_X + 2.1 * inch, self.y, desc)
        self.y -= 0.28 * inch

    def closing_quote(self, paragraphs: list[str]) -> None:
        self.ensure(0.85 * inch)
        self.c.setStrokeColor(ACCENT)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_X, self.y + 0.12 * inch, MARGIN_X + 0.45 * inch, self.y + 0.12 * inch)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X, self.y - 0.08 * inch, "Closing Statement")
        self.y -= 0.35 * inch
        for para in paragraphs:
            self.body(para, color=TEXT, size=10.5)
            self.y -= 0.04 * inch


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
    c.drawString(0.95 * inch, y - 0.5 * inch, "EDMP Readiness Assessment")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(0.95 * inch, y - 0.88 * inch, "Enterprise Decision Memory Maturity Assessment")

    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "Six dimensions - Maturity scale - Executive output framework")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    intro = (
        "A structured method for evaluating an organization's ability to preserve, reconstruct, "
        "govern, and reuse decision formation across human and AI-assisted environments."
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
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  -  Assessment framework document")


def draw_contact(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN_X, PAGE_H - 1.35 * inch, "ENGAGE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN_X, PAGE_H - 1.8 * inch, "Start your EDMP Readiness Assessment")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN_X, PAGE_H - 2.25 * inch, "aielevate.xyz/#engage")
    c.drawString(MARGIN_X, PAGE_H - 2.55 * inch, "info@aielevate.xyz")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN_X, PAGE_H - 3.1 * inch, "Includes questionnaire, scored report, and 30-minute readout call.")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN_X, 0.45 * inch, "AvL Consultancy  -  Confidential assessment material")


def build_content() -> DocBuilder:
    b = DocBuilder()
    b.new_page()

    b.section("Executive Purpose")
    b.body(
        "The EDMP Readiness Assessment evaluates an organization's ability to preserve, reconstruct, "
        "govern, and reuse decision formation across human and AI-assisted environments."
    )
    b.body("The assessment identifies hidden exposure related to:")
    b.bullets(
        [
            "Decision traceability",
            "Institutional memory loss",
            "Governance accountability",
            "Organizational rework",
            "Executive continuity",
            "AI decision oversight",
        ],
        color=MUTED,
    )
    b.body("The objective is not compliance.", color=TEXT)
    b.body("The objective is organizational understanding.", color=ACCENT)

    for dim in DIMENSIONS:
        b.dimension_block(dim)

    b.section("Overall Maturity Scale")
    for level in MATURITY_LEVELS:
        b.maturity_level(level)

    b.section("Executive Output")
    b.body("The final report includes:")
    for title, desc in EXEC_OUTPUT:
        b.output_row(title, desc)

    b.closing_quote(
        [
            "Organizations already measure financial maturity, process maturity, and cybersecurity maturity.",
            "The next frontier is Decision Memory Maturity.",
            (
                "The EDMP Readiness Assessment provides a practical method for understanding where an "
                "organization stands today and what it must improve to preserve reasoning, accountability, "
                "and institutional continuity in an AI-enabled future."
            ),
        ]
    )

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
    draw_contact(c2)
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
