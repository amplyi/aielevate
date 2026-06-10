"""Optimize PNG assets for web delivery (local fallback when npm/sharp unavailable)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ASSETS = Path("ai-elevate-cockpit-plugin-v4-standalone/app/assets")
PROFILES = {
    "world-map.png": {"max_width": 960, "rgb_background": (2, 6, 14)},
    "ae-logo-blue.png": {"max_width": 512, "rgb_background": None},
}
DEFAULT = {"max_width": 960, "rgb_background": None}


def format_kb(num_bytes: int) -> str:
    return f"{num_bytes / 1024:.1f} KB"


def get_profile(name: str) -> dict:
    return {**DEFAULT, **PROFILES.get(name, {})}


def optimize_file(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    profile = get_profile(path.name)

    with Image.open(path) as image:
        image = image.convert("RGBA")
        if image.width > profile["max_width"]:
            ratio = profile["max_width"] / image.width
            size = (profile["max_width"], round(image.height * ratio))
            image = image.resize(size, Image.Resampling.LANCZOS)

        if profile["rgb_background"]:
            background = Image.new("RGB", image.size, profile["rgb_background"])
            background.paste(image, mask=image.split()[3])
            image = background

        image.save(path, format="PNG", optimize=True, compress_level=9)

    after = path.stat().st_size
    saved_pct = round(((before - after) / before) * 100) if before else 0
    print(f"{path.name}: {format_kb(before)} -> {format_kb(after)} (-{saved_pct}%)")
    return before, after


def main() -> None:
    total_before = 0
    total_after = 0

    for path in sorted(ASSETS.glob("*.png")):
        before, after = optimize_file(path)
        total_before += before
        total_after += after

    saved_pct = round(((total_before - total_after) / total_before) * 100) if total_before else 0
    print(f"Total: {format_kb(total_before)} -> {format_kb(total_after)} (-{saved_pct}%)")


if __name__ == "__main__":
    main()
