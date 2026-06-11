#!/usr/bin/env python3
"""Merge and brand Board Briefing Pack chapter PDFs into one AI Elevate document."""

from __future__ import annotations

import re
from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS_DIR = ROOT / "scripts" / "_chapter6-work"
OUTPUT_PDF = ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ai-elevate-board-briefing-pack.pdf"
LOGO_CANDIDATES = [
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue.png",
    ROOT / "ai-elevate-cockpit-plugin-v4-standalone" / "app" / "assets" / "ae-logo-blue-test.png",
]

# Brand tokens (scripts/ai-elevate-brand-rules.txt)
BG = HexColor("#070b12")
BG_MID = HexColor("#0f1420")
TEXT = HexColor("#f2f6fb")
MUTED = HexColor("#aab5c5")
MUTED_2 = HexColor("#7c8798")
ACCENT = HexColor("#8fd3ff")
ACCENT_2 = HexColor("#8f9aff")
LINE = HexColor("#2a3140")

PAGE_W, PAGE_H = letter
FOOTER_H = 34
HEADER_H = 38


def chapter_sort_key(path: Path) -> int:
    match = re.search(r"Chapter\s+(\d+)", path.name, re.I)
    return int(match.group(1)) if match else 999


def list_chapters() -> list[Path]:
    if not CHAPTERS_DIR.exists():
        raise FileNotFoundError(f"Chapters directory not found: {CHAPTERS_DIR}")
    files = sorted(CHAPTERS_DIR.glob("Chapter *.pdf"), key=chapter_sort_key)
    if not files:
        raise FileNotFoundError(f"No chapter PDFs in {CHAPTERS_DIR}")
    return files


def build_page(draw_fn) -> object:
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    draw_fn(c)
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def draw_cover(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.roundRect(0.65 * inch, 0.65 * inch, PAGE_W - 1.3 * inch, PAGE_H - 1.3 * inch, 18, fill=0, stroke=1)

    logo_path = next((p for p in LOGO_CANDIDATES if p.exists()), None)
    y = PAGE_H - 2.1 * inch
    if logo_path:
        try:
            c.drawImage(str(logo_path), 0.95 * inch, y - 0.15 * inch, width=0.55 * inch, height=0.55 * inch, mask="auto")
            text_x = 1.65 * inch
        except Exception:
            text_x = 0.95 * inch
    else:
        text_x = 0.95 * inch

    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(text_x, y + 0.22 * inch, "AI ELEVATE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(0.95 * inch, y - 0.55 * inch, "Board Briefing Pack")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 13)
    c.drawString(0.95 * inch, y - 0.95 * inch, "Enterprise Decision Memory Platform")

    c.setFillColor(ACCENT_2)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(0.95 * inch, PAGE_H - 3.35 * inch, "EDMP — The Missing Enterprise Memory Layer")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    body = (
        "A board-ready narrative on why organizations preserve data, workflows, and AI outputs "
        "but not how important decisions were formed — and why that gap becomes a governance, "
        "risk, and performance problem as AI adoption accelerates."
    )
    text = c.beginText(0.95 * inch, PAGE_H - 3.85 * inch)
    text.setLeading(16)
    for line in _wrap(body, 88):
        text.textLine(line)
    c.drawText(text)

    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 9)
    c.drawString(0.95 * inch, 1.35 * inch, "Sold by AvL Consultancy")
    c.drawString(0.95 * inch, 1.1 * inch, "info@aielevate.xyz  ·  +31 6 46438478  ·  aielevate.xyz")
    c.drawString(0.95 * inch, 0.85 * inch, "June 2026  ·  All prices in commercial materials include 21% VAT where applicable")


def draw_toc(c: canvas.Canvas, chapters: list[Path]) -> None:
    c.setFillColor(BG_MID)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    _draw_header(c, "Contents")
    y = PAGE_H - 1.45 * inch
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(0.95 * inch, y, "CONTENTS")
    y -= 0.35 * inch
    c.setFillColor(TEXT)
    c.setFont("Helvetica", 10)
    for idx, path in enumerate(chapters, start=1):
        title = _chapter_title(path)
        c.drawString(0.95 * inch, y, f"{idx}. {title}")
        y -= 0.28 * inch
        if y < 1.2 * inch:
            break
    _draw_footer(c, None)


def draw_divider(c: canvas.Canvas, chapter_num: int, title: str) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(2)
    c.line(0.95 * inch, PAGE_H / 2 + 0.4 * inch, 2.6 * inch, PAGE_H / 2 + 0.4 * inch)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.95 * inch, PAGE_H / 2 + 0.55 * inch, f"CHAPTER {chapter_num}")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 20)
    lines = _wrap(title, 42)
    y = PAGE_H / 2 - 0.1 * inch
    for line in lines:
        c.drawString(0.95 * inch, y, line)
        y -= 0.32 * inch
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawString(0.95 * inch, 1.1 * inch, "AI Elevate  ·  Enterprise Decision Memory Platform")
    _draw_footer(c, None)


def draw_back(c: canvas.Canvas) -> None:
    c.setFillColor(BG_MID)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.95 * inch, PAGE_H - 2 * inch, "AI ELEVATE")
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(0.95 * inch, PAGE_H - 2.45 * inch, "Continue the conversation")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    c.drawString(0.95 * inch, PAGE_H - 2.95 * inch, "Programs: Executive Briefing · EDMP Readiness Assessment · Board Briefing Pack")
    c.drawString(0.95 * inch, PAGE_H - 3.3 * inch, "Engage: https://aielevate.xyz/#engage")
    c.drawString(0.95 * inch, PAGE_H - 3.65 * inch, "Contact: info@aielevate.xyz  ·  AvL Consultancy")
    _draw_footer(c, None)


def _draw_header(c: canvas.Canvas, right_note: str | None = None) -> None:
    c.setFillColor(BG)
    c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.line(0, PAGE_H - HEADER_H, PAGE_W, PAGE_H - HEADER_H)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(0.55 * inch, PAGE_H - 24, "AI ELEVATE")
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 8)
    c.drawString(1.35 * inch, PAGE_H - 24, "Enterprise Decision Memory Platform")
    if right_note:
        c.drawRightString(PAGE_W - 0.55 * inch, PAGE_H - 24, right_note)


def _draw_footer(c: canvas.Canvas, page_num: int | None) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, FOOTER_H, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.line(0, FOOTER_H, PAGE_W, FOOTER_H)
    c.setFillColor(MUTED_2)
    c.setFont("Helvetica", 7.5)
    c.drawString(0.55 * inch, 12, "AvL Consultancy  ·  info@aielevate.xyz  ·  aielevate.xyz")
    if page_num is not None:
        c.drawRightString(PAGE_W - 0.55 * inch, 12, str(page_num))


def build_overlay(page_num: int, chapter_title: str | None = None) -> object:
    def draw(c: canvas.Canvas) -> None:
        _draw_header(c, chapter_title)
        _draw_footer(c, page_num)

    return build_page(draw)


def _chapter_title(path: Path) -> str:
    name = path.stem
    name = re.sub(r"^Chapter\s+\d+\s*-\s*", "", name, flags=re.I)
    name = re.sub(r"\s*\(\d+\)\s*$", "", name)
    return name.strip()


def _wrap(text: str, width: int) -> list[str]:
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


def merge_chapter(writer: PdfWriter, chapter_path: Path, chapter_num: int, page_counter: list[int]) -> None:
    reader = PdfReader(str(chapter_path))
    title = _chapter_title(chapter_path)
    writer.add_page(build_page(lambda c: draw_divider(c, chapter_num, title)))

    for page in reader.pages:
        page_counter[0] += 1
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        overlay = build_overlay(page_counter[0], title)
        if w != PAGE_W or h != PAGE_H:
            page.scale_to(PAGE_W, PAGE_H)
        page.merge_page(overlay)
        writer.add_page(page)


def main() -> None:
    chapters = list_chapters()
    writer = PdfWriter()
    page_counter = [0]

    writer.add_page(build_page(draw_cover))
    page_counter[0] += 1
    writer.add_page(build_page(lambda c: draw_toc(c, chapters)))
    page_counter[0] += 1

    for idx, chapter_path in enumerate(chapters, start=1):
        merge_chapter(writer, chapter_path, idx, page_counter)

    writer.add_page(build_page(draw_back))

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PDF}")
    print(f"Chapters merged: {len(chapters)}")
    print(f"Total pages: {len(writer.pages)}")


if __name__ == "__main__":
    main()
