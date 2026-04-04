#!/usr/bin/env python3

from pathlib import Path
from PIL import Image

SOURCE_ROOT = Path('assets/img')
OUTPUT_ROOT = SOURCE_ROOT / 'optimized'
SOURCE_DIRS = ['charla1', 'charla2', 'charla3', 'excursion1', 'excursion2', 'competition1']
MAX_SIZE = (1200, 1000)
QUALITY = 80


def iter_source_images():
    for folder_name in SOURCE_DIRS:
        for path in sorted((SOURCE_ROOT / folder_name).glob('*')):
            if path.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
                continue
            yield path


def build_output_path(source_path: Path) -> Path:
    relative = source_path.relative_to(SOURCE_ROOT).with_suffix('.webp')
    return OUTPUT_ROOT / relative


def should_generate(source_path: Path, output_path: Path) -> bool:
    if not output_path.exists():
        return True
    return source_path.stat().st_mtime > output_path.stat().st_mtime


def generate_image(source_path: Path, output_path: Path) -> tuple[int, int]:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as image:
        image = image.convert('RGB')
        image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
        width, height = image.size
        image.save(output_path, 'WEBP', quality=QUALITY, method=6)
        return width, height


def main():
    generated = 0

    for source_path in iter_source_images():
        output_path = build_output_path(source_path)
        if not should_generate(source_path, output_path):
            continue

        width, height = generate_image(source_path, output_path)
        generated += 1
        print(f'generated {output_path} ({width}x{height})')

    print(f'completed: {generated} file(s) generated or updated')


if __name__ == '__main__':
    main()
