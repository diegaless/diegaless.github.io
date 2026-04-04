#!/usr/bin/env python3

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = REPO_ROOT / 'assets/img/social-card.png'
FONT_REGULAR = REPO_ROOT / 'assets/fonts/ubuntu-mono-400.ttf'
FONT_BOLD = REPO_ROOT / 'assets/fonts/ubuntu-mono-700.ttf'


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(str(path), size=size)
    except OSError:
        return ImageFont.load_default()


def generate_social_card() -> Path:
    width, height = 1200, 630
    background = '#050505'
    green = '#28FE14'
    glow = '#113b0d'
    muted = '#90b58b'

    image = Image.new('RGB', (width, height), background)
    draw = ImageDraw.Draw(image)

    title_font = load_font(FONT_BOLD, 80)
    subtitle_font = load_font(FONT_REGULAR, 34)
    nav_font = load_font(FONT_REGULAR, 24)
    body_font = load_font(FONT_REGULAR, 30)

    draw.rectangle((40, 40, width - 40, height - 40), outline=green, width=3)
    draw.rectangle((40, 40, width - 40, 108), fill='#0d0d0d', outline=green, width=3)

    nav_items = ['Home', 'Carrileos', 'Conferencias', 'Excursiones', 'About Me']
    nav_x = 70
    for item in nav_items:
        draw.text((nav_x, 64), item, font=nav_font, fill=green)
        nav_x += draw.textlength(item, font=nav_font) + 42

    draw.text((86, 170), 'visitor@improveops.me:~$ whoami', font=body_font, fill=green)
    draw.text((86, 232), 'improveops.me', font=title_font, fill=green)
    draw.text((86, 340), 'Programming, automation, cybersecurity and technical education.', font=subtitle_font, fill=green)
    draw.text((86, 398), 'Static site. Terminal aesthetic. GitHub Pages friendly.', font=subtitle_font, fill=muted)

    prompt_block = (
        'Current focus:\n'
        '- automating repetitive workflows\n'
        '- practical software delivery\n'
        '- making systems simpler and more measurable'
    )
    draw.multiline_text((86, 470), prompt_block, font=nav_font, fill=green, spacing=12)

    draw.rectangle((760, 185, 1060, 470), outline=glow, width=2)
    draw.text((804, 300), 'cat about-me.txt', font=body_font, fill=green)
    draw.text((806, 352), 'diegaless', font=subtitle_font, fill=muted)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT_PATH, 'PNG', optimize=True)
    return OUTPUT_PATH


def main() -> None:
    output_path = generate_social_card()
    print(f'generated {output_path.relative_to(REPO_ROOT)}')


if __name__ == '__main__':
    main()
