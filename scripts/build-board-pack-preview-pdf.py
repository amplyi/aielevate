#!/usr/bin/env python3
"""Build AI Elevate Board Briefing Pack PREVIEW (free funnel asset - not the full pack)."""

from __future__ import annotations

import importlib.util
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
_pack_spec = importlib.util.spec_from_file_location(
    "build_board_pack_pdf", ROOT / "scripts" / "build-board-pack-pdf.py"
)
_pack = importlib.util.module_from_spec(_pack_spec)
assert _pack_spec and _pack_spec.loader
_pack_spec.loader.exec_module(_pack)

HEADER_H = _pack.HEADER_H
PAGE_H = _pack.PAGE_H
PAGE_W = _pack.PAGE_W
build_overlay = _pack.build_overlay
build_page = _pack.build_page
draw_divider = _pack.draw_divider
list_chapters = _pack.list_chapters

OUTPUT_PDF = (
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-board-briefing-pack-preview.pdf"
)
LOGO_CANDIDATES = [
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue.png",
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue-test.png",
]

BG = HexColor("#070b12")
TEXT = HexColor("#f2f6fb")
MUTED = HexColor("#aab5c5")
MUTED_2 = HexColor("#7c8798")
ACCENT = HexColor("#8fd3ff")
ACCENT_2 = HexColor("#8f9aff")
LINE = HexColor("#2a3140")


def wrap_text(text: str, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
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


def draw_preview_cover(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.roundRect(0.65 * inch, 0.65 * inch, PAGE_W - 1.3 * inch, PAGE_H - 1.3 * inch, 18, fill=0, stroke=1)

    logo = next((p for p in LOGO_CANDIDATES if p.exists()), None)
    y = PAGE_H - 2.1 * inch
    if logo:
        try:
            c.drawImage(str(logo), 0.95 * inch, y - 0.15 * inch, width=0.55 * inch, height=0.55 * inch, mask="auto")
            tx = 1.65 * inch
        except Exception:
            tx = 0.95 * inch
    else:
        tx = 0.95 * inch

    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(tx, y + 0.22 * inch, "AI ELEVATE")
    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(0.95 * inch, PAGE_H - 1.55 * inch, "FREE PREVIEW  -  NOT THE FULL PACK")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(0.95 * inch, y - 0.55 * inch, "Board Briefing Pack")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(0.95 * inch, y - 0.95 * inch, "Enterprise Decision Memory Platform")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    body = (
        "Preview includes cover, executive summary, and one sample chapter. "
        "The full pack (40+ pages, slide deck, and delivery materials) is available as a paid program."
    )
    text = c.beginText(0.95 * inch, PAGE_H - 3.5 * inch)
    text.setLeading(16)
    for line in wrap_text(body, 88):
        text.textLine(line)
    c.drawText(text)

    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(0.95 * inch, 1.1 * inch, "AvL Consultancy  -  aielevate.xyz/#engage")


def draw_exec_summary_preview(c: canvas.Canvas) -> None:
    c.setFillColor(HexColor("#0f1420"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BG)
    c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(0.55 * inch, PAGE_H - 24, "AI ELEVATE  -  PREVIEW")
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(0.95 * inch, PAGE_H - 1.2 * inch, "EXECUTIVE SUMMARY (EXCERPT)")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(0.95 * inch, PAGE_H - 1.55 * inch, "The Missing Enterprise Memory Layer")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10.5)
    ty = PAGE_H - 1.95 * inch
    paras = [
        "Organizations preserve data, transactions, workflows, approvals, and AI outputs. "
        "Yet most do not preserve how important decisions were formed.",
        "As AI accelerates decision velocity, the inability to reconstruct why decisions were made "
        "becomes a governance, risk, continuity, and performance challenge.",
        "EDMP (Enterprise Decision Memory Platform) addresses this gap by preserving signal, reasoning, "
        "decision lineage, execution trace, and institutional memory.",
        "[Full executive summary, financial case, category thesis, and 13 chapters in the complete Board Briefing Pack.]",
    ]
    for para in paras:
        for line in wrap_text(para, 88):
            c.drawString(0.95 * inch, ty, line)
            ty -= 0.22 * inch
        ty -= 0.08 * inch


def draw_cta_page(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.95 * inch, PAGE_H - 2.0 * inch, "CONTINUE READING")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(0.95 * inch, PAGE_H - 2.5 * inch, "Purchase the Full Board Briefing Pack")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 12)
    c.drawString(0.95 * inch, PAGE_H - 2.95 * inch, "EUR 603.79 incl. VAT  -  digital delivery")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    ty = PAGE_H - 3.45 * inch
    for line in wrap_text(
        "Includes full PDF pack, slide deck, executive one-pager, and optional light customization. "
        "Available at aielevate.xyz/#engage",
        85,
    ):
        c.drawString(0.95 * inch, ty, line)
        ty -= 0.24 * inch


def main() -> None:
    chapters = list_chapters()
    chapter1 = chapters[0]
    reader = PdfReader(str(chapter1))
    first_page = reader.pages[0]
    w, h = float(first_page.mediabox.width), float(first_page.mediabox.height)
    if w != PAGE_W or h != PAGE_H:
        first_page.scale_to(PAGE_W, PAGE_H)
    first_page.merge_page(build_overlay(1, "Chapter 1 (sample)"))

    writer = PdfWriter()
    writer.add_page(build_page(draw_preview_cover))
    writer.add_page(build_page(draw_exec_summary_preview))
    writer.add_page(build_page(lambda c: draw_divider(c, 1, "Executive Summary")))
    writer.add_page(first_page)
    writer.add_page(build_page(draw_cta_page))

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PDF}")
    print(f"Total pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
