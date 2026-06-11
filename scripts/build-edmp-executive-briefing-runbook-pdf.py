#!/usr/bin/env python3
"""Build AI Elevate branded EDMP Executive Briefing Runbook (facilitator guide) PDF."""

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
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-edmp-executive-briefing-runbook.pdf"
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
QUOTE = HexColor("#8f9aff")

PAGE_W, PAGE_H = letter
MARGIN_X = 0.95 * inch
TOP_Y = PAGE_H - 1.05 * inch
BOTTOM_Y = 0.72 * inch
FOOTER_H = 34
HEADER_H = 38

SESSION_PARTS = [
    {
        "part": 1,
        "title": "Executive Context",
        "duration": "10 Minutes",
        "purpose": "Establish the problem.",
        "opening": (
            "How confident are you that your organization could reconstruct the reasoning "
            "behind a major strategic decision made three years ago?"
        ),
        "followup": ["Not the outcome.", "The reasoning."],
        "discussion": [
            "Leadership transitions",
            "Organizational memory",
            "Governance visibility",
            "AI acceleration",
        ],
        "success": "The audience recognizes the distinction between outcomes and reasoning.",
    },
    {
        "part": 2,
        "title": "The Cost Of Forgetting",
        "duration": "15 Minutes",
        "present": ["Executive Blind Spot", "Cost of Forgetting", "Rework Economics"],
        "questions": [
            "Which decisions are repeatedly revisited?",
            "Where does organizational context disappear?",
            "What knowledge leaves when people leave?",
            "Which discussions seem to repeat every few years?",
        ],
        "facilitator_note": "Capture responses. Do not challenge answers. Observe patterns.",
        "success": "Audience begins identifying existing symptoms.",
    },
    {
        "part": 3,
        "title": "The AI Accountability Paradox",
        "duration": "15 Minutes",
        "present": ["AI decision chains", "Explainability pressure", "Governance implications"],
        "core_increases": ["speed", "scale", "complexity"],
        "core_not": ["accountability", "continuity", "traceability"],
        "questions": [
            "Where is AI influencing decisions today?",
            "Who remains accountable?",
            "Could you explain those decisions to an auditor?",
            "Could you explain them to a regulator?",
        ],
        "success": "Audience recognizes governance implications.",
    },
    {
        "part": 4,
        "title": "EDMP Explained",
        "duration": "15 Minutes",
        "chain": ["Signal", "Structure", "Decision", "Execution Trace", "Institutional Memory"],
        "focus": ["decision continuity", "organizational memory", "governance", "accountability"],
        "avoid": "Avoid software discussions.",
        "questions": [
            "Which stage is weakest today?",
            "Which stage creates the most risk?",
            "Which stage consumes the most effort?",
        ],
        "success": "Audience maps EDMP to their own environment.",
    },
    {
        "part": 5,
        "title": "Decision Environment Discussion",
        "duration": "20 Minutes",
        "domains": ["Finance", "Governance", "Legal", "Procurement", "Talent", "Commercial"],
        "domain_questions": [
            ("Finance", "How are major investment decisions preserved today?"),
            ("Governance", "Can policy exceptions be reconstructed?"),
            ("Procurement", "Can vendor selections be defended years later?"),
            ("Talent", "Can hiring rationale be reconstructed?"),
            ("Commercial", "Can strategic market decisions be explained?"),
        ],
        "facilitator_note": "Capture examples. These become assessment opportunities.",
        "success": "Audience begins applying EDMP to real situations.",
    },
    {
        "part": 6,
        "title": "Executive Reflection",
        "duration": "10 Minutes",
        "questions": [
            "What surprised you most?",
            "Where do you see exposure?",
            "What would happen if key leaders left tomorrow?",
            "Which decisions would be hardest to explain?",
            "What would stronger decision memory enable?",
        ],
        "facilitator_note": "Do not pitch. Allow reflection.",
        "success": "Audience articulates value themselves.",
    },
]

NEXT_STEPS = [
    ("Option 1 - Executive Briefing Pack", "For internal board discussion."),
    ("Option 2 - EDMP Readiness Assessment", "To establish current maturity and exposure."),
    (
        "Option 3 - Decision Environment Workshop",
        "Focused exploration of one domain (AI Governance, Finance, Procurement, Legal).",
    ),
]

FACILITATOR_RULES = [
    "Never sell software.",
    "Never discuss platform features first.",
    "Never start with technology.",
    "Always begin with: decisions, continuity, accountability, memory.",
    "Technology is introduced only after the problem is understood.",
    'The briefing succeeds when executives say: "We have this problem."',
    'Not when they say: "Interesting software."',
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

    def label_value(self, label: str, value: str) -> None:
        self.ensure(0.24 * inch)
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica-Bold", 9.5)
        self.c.drawString(MARGIN_X, self.y, f"{label}:")
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica", 10)
        self.c.drawString(MARGIN_X + 1.05 * inch, self.y, value)
        self.y -= 0.24 * inch

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

    def bullets(self, items: list[str], color=TEXT, size: float = 10, numbered: bool = False) -> None:
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", size)
        for i, item in enumerate(items, start=1):
            for j, line in enumerate(wrap_text(item, 84)):
                self.ensure(0.19 * inch)
                if numbered and j == 0:
                    prefix = f"{i}.  "
                elif j == 0:
                    prefix = "-  "
                else:
                    prefix = "   "
                self.c.drawString(MARGIN_X, self.y, f"{prefix}{line}")
                self.y -= 0.19 * inch

    def quote_block(self, lines: list[str]) -> None:
        self.ensure(0.35 * inch * len(lines) + 0.2 * inch)
        self.c.setFillColor(PANEL)
        box_h = 0.28 * inch * len(lines) + 0.16 * inch
        self.c.roundRect(MARGIN_X, self.y - box_h + 0.12 * inch, PAGE_W - 2 * MARGIN_X, box_h, 6, fill=1, stroke=0)
        self.c.setStrokeColor(ACCENT)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_X, self.y + 0.1 * inch, MARGIN_X, self.y - box_h + 0.22 * inch)
        sy = self.y
        self.c.setFillColor(QUOTE)
        self.c.setFont("Helvetica-Oblique", 10)
        for line in lines:
            self.c.drawString(MARGIN_X + 0.2 * inch, sy, line)
            sy -= 0.28 * inch
        self.y = sy - 0.06 * inch

    def part_header(self, part: dict) -> None:
        self.ensure(0.55 * inch)
        self.y -= 0.06 * inch
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.38 * inch, PAGE_W - 2 * MARGIN_X, 0.44 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.1 * inch, f"PART {part['part']}")
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN_X + 0.85 * inch, self.y - 0.1 * inch, part["title"])
        self.c.setFillColor(MUTED_2)
        self.c.setFont("Helvetica", 9)
        self.c.drawRightString(PAGE_W - MARGIN_X - 0.16 * inch, self.y - 0.1 * inch, part["duration"])
        self.y -= 0.52 * inch

    def success_box(self, text: str) -> None:
        self.ensure(0.38 * inch)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(MARGIN_X, self.y, "Success Criteria:")
        self.c.setFillColor(TEXT)
        self.c.setFont("Helvetica", 9.5)
        self.c.drawString(MARGIN_X + 1.15 * inch, self.y, text)
        self.y -= 0.28 * inch

    def value_chain(self, steps: list[str]) -> None:
        box_w = 4.4 * inch
        box_x = MARGIN_X + 0.5 * inch
        for i, step in enumerate(steps):
            self.ensure(0.46 * inch)
            self.c.setFillColor(PANEL)
            self.c.roundRect(box_x, self.y - 0.08 * inch, box_w, 0.32 * inch, 6, fill=1, stroke=0)
            self.c.setFillColor(ACCENT if i < len(steps) - 1 else TEXT)
            self.c.setFont("Helvetica-Bold" if i == len(steps) - 1 else "Helvetica", 10.5)
            self.c.drawCentredString(box_x + box_w / 2, self.y + 0.04 * inch, step)
            self.y -= 0.32 * inch
            if i < len(steps) - 1:
                self.ensure(0.16 * inch)
                self.c.setFillColor(MUTED_2)
                self.c.setFont("Helvetica-Bold", 9)
                self.c.drawCentredString(box_x + box_w / 2, self.y - 0.02 * inch, "v")
                self.y -= 0.16 * inch
        self.y -= 0.06 * inch

    def next_step_card(self, title: str, desc: str) -> None:
        self.ensure(0.55 * inch)
        self.c.setFillColor(PANEL)
        self.c.roundRect(MARGIN_X, self.y - 0.42 * inch, PAGE_W - 2 * MARGIN_X, 0.48 * inch, 8, fill=1, stroke=0)
        self.c.setFillColor(ACCENT)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.1 * inch, title)
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 9.5)
        self.c.drawString(MARGIN_X + 0.16 * inch, self.y - 0.3 * inch, desc)
        self.y -= 0.58 * inch


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
    c.drawString(0.95 * inch, y - 0.48 * inch, "EDMP Executive Briefing Runbook")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(0.95 * inch, y - 0.86 * inch, "Facilitator Guide")

    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "90-minute session  -  6 parts  -  board-ready facilitation")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    intro = (
        "Educational executive briefing on the Decision Memory problem. "
        "Not a software demonstration. Not a sales presentation."
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
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  -  Confidential facilitator material")


def draw_contact(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN_X, PAGE_H - 1.35 * inch, "ENGAGE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN_X, PAGE_H - 1.8 * inch, "Book an Executive Briefing")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN_X, PAGE_H - 2.25 * inch, "aielevate.xyz/#engage")
    c.drawString(MARGIN_X, PAGE_H - 2.55 * inch, "info@aielevate.xyz")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN_X, PAGE_H - 3.1 * inch, "90 min live session  -  NL or EN  -  max 6 attendees")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN_X, 0.45 * inch, "AvL Consultancy  -  Confidential facilitator material")


def render_part(b: DocBuilder, part: dict) -> None:
    b.part_header(part)
    num = part["part"]

    if num == 1:
        b.subheading("Purpose")
        b.body(part["purpose"], color=TEXT)
        b.subheading("Opening Question")
        b.quote_block(wrap_text(part["opening"], 78))
        b.subheading("Follow-up")
        b.quote_block(part["followup"])
        b.subheading("Discussion Points")
        b.bullets(part["discussion"], color=MUTED)
        b.success_box(part["success"])
        return

    if num == 2:
        b.subheading("Present")
        b.bullets(part["present"], color=TEXT)
        b.subheading("Facilitator Questions")
        b.bullets(part["questions"], color=MUTED, numbered=True)
        b.body(part["facilitator_note"], color=ACCENT_2, size=9.5)
        b.success_box(part["success"])
        return

    if num == 3:
        b.subheading("Present")
        b.bullets(part["present"], color=TEXT)
        b.subheading("Core Message")
        b.body("AI increases:", color=MUTED)
        b.bullets(part["core_increases"], color=TEXT)
        b.body("It does not automatically increase:", color=MUTED)
        b.bullets(part["core_not"], color=MUTED)
        b.subheading("Discussion Questions")
        b.bullets(part["questions"], color=MUTED, numbered=True)
        b.success_box(part["success"])
        return

    if num == 4:
        b.subheading("Present")
        b.value_chain(part["chain"])
        b.subheading("Facilitator Notes")
        b.body(part["avoid"], color=ACCENT_2)
        b.body("Focus on:")
        b.bullets(part["focus"], color=TEXT)
        b.subheading("Discussion Questions")
        b.bullets(part["questions"], color=MUTED, numbered=True)
        b.success_box(part["success"])
        return

    if num == 5:
        b.subheading("Select relevant domains")
        b.bullets(part["domains"], color=TEXT)
        b.subheading("Facilitator Questions")
        for domain, question in part["domain_questions"]:
            b.ensure(0.22 * inch)
            b.c.setFillColor(ACCENT)
            b.c.setFont("Helvetica-Bold", 9.5)
            b.c.drawString(MARGIN_X, b.y, domain)
            b.c.setFillColor(MUTED)
            b.c.setFont("Helvetica", 9.5)
            b.c.drawString(MARGIN_X + 1.1 * inch, b.y, question)
            b.y -= 0.22 * inch
        b.body(part["facilitator_note"], color=ACCENT_2, size=9.5)
        b.success_box(part["success"])
        return

    if num == 6:
        b.subheading("Ask")
        b.bullets(part["questions"], color=MUTED, numbered=True)
        b.body(part["facilitator_note"], color=ACCENT_2, size=9.5)
        b.success_box(part["success"])


def build_content() -> DocBuilder:
    b = DocBuilder()
    b.new_page()

    b.section("Facilitator Guide")
    b.label_value("Duration", "90 Minutes")
    b.subheading("Audience")
    b.bullets(
        [
            "Board Members",
            "Executive Leadership Teams",
            "CIO, CFO, COO, CRO",
            "Governance Leaders",
            "Enterprise Architects",
            "Transformation Sponsors",
        ],
        color=MUTED,
    )
    b.subheading("Objective")
    b.body("Help executives understand:")
    b.bullets(
        [
            "The Decision Memory problem",
            "The cost of forgetting",
            "The AI accountability paradox",
            "The EDMP category",
            "Their own organizational exposure",
            "Potential next steps",
        ],
        color=TEXT,
    )
    b.body("The session is educational.", color=TEXT)
    b.body("Not a software demonstration.", color=MUTED)
    b.body("Not a sales presentation.", color=MUTED)

    b.section("Session Structure")
    for part in SESSION_PARTS:
        render_part(b, part)

    b.section("Closing")
    b.label_value("Duration", "5 Minutes")
    b.subheading("Closing Statement")
    b.body("Organizations already preserve:")
    b.bullets(["data", "workflows", "approvals", "transactions"], color=MUTED)
    b.body("The next enterprise capability may be preserving:", color=TEXT)
    b.quote_block(["reasoning."])
    b.body("The question is not:", color=MUTED)
    b.quote_block(['"Can your organization make decisions?"'])
    b.body("The question is:", color=MUTED)
    b.quote_block(['"Can it still understand them years later?"'])

    b.section("Possible Next Steps")
    for title, desc in NEXT_STEPS:
        b.next_step_card(title, desc)

    b.section("Facilitator Rules")
    for rule in FACILITATOR_RULES:
        b.ensure(0.22 * inch)
        b.c.setFillColor(TEXT)
        b.c.setFont("Helvetica", 10)
        b.c.drawString(MARGIN_X, b.y, rule)
        b.y -= 0.22 * inch

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
