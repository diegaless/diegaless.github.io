#!/usr/bin/env python3

from __future__ import annotations

import html
import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from string import Template
from urllib.parse import urljoin, urlparse

from generate_gallery_webp import main as generate_gallery_webp
from generate_social_card import generate_social_card


REPO_ROOT = Path(__file__).resolve().parent.parent
TEMPLATE_PATH = REPO_ROOT / 'templates/page.html'
SITE_URL = 'https://diegaleesss.com/'
SOCIAL_IMAGE_PATH = 'assets/img/social-card.png'
GITHUB_URL = 'https://github.com/diegaless'
LINKEDIN_URL = 'https://www.linkedin.com/in/diego-ayala/'
SITE_ROOT_PATH = (urlparse(SITE_URL).path or '/')
if not SITE_ROOT_PATH.endswith('/'):
    SITE_ROOT_PATH = f'{SITE_ROOT_PATH}/'

NAV_ITEMS = [
    ('page-home', 'Home', 'index.html'),
    ('page-blog', 'Carrileos', 'blog/blog.html'),
    ('page-conferences', 'Conferencias', 'conferences/conferences.html'),
    ('page-excursions', 'Excursiones', 'excursions/excursions.html'),
    ('page-competitions', 'Competiciones', 'competitions/competitions.html'),
    ('page-about', 'About Me', 'about/about.html')
]


@dataclass(frozen=True)
class Page:
    path: str
    body_id: str
    title: str
    description: str
    keywords: str
    og_type: str
    page_title: str
    page_description: str
    data_script: str | None = None
    robots: str | None = None
    head_extra: str = ''


PAGES = [
    Page(
        path='index.html',
        body_id='page-home',
        title='diegaleesss.com | Home',
        description='Personal portfolio and blog of Diego Ayala (diegaless). Programming, automation, cybersecurity and technical education.',
        keywords='Programming, Automation, Cybersecurity, DevOps, Technical Education, Reverse Engineering, Scripting',
        og_type='website',
        page_title='diegaleesss.com Home',
        page_description='Portfolio and blog of Diego Ayala with projects, conferences, excursions, and personal background.'
    ),
    Page(
        path='about/about.html',
        body_id='page-about',
        title='diegaleesss.com | About Me',
        description='About Diego Ayala (diegaless). Work in progress.',
        keywords='Programming, Automation, Cybersecurity, DevOps, Teaching, Software Development',
        og_type='profile',
        page_title='About Diego Ayala',
        page_description='Página About Me en construcción.'
    ),
    Page(
        path='blog/blog.html',
        body_id='page-blog',
        title='diegaleesss.com | Carrileos',
        description='Carrileos de Diego Ayala sobre proyectos, operaciones, programación y ciberseguridad.',
        keywords='Programming, Automation, Cybersecurity, DevOps, Projects, Software Delivery',
        og_type='website',
        page_title='Carrileos',
        page_description='Listado de proyectos y notas de Diego Ayala en formato terminal.',
        data_script='data.js'
    ),
    Page(
        path='conferences/conferences.html',
        body_id='page-conferences',
        title='diegaleesss.com | Conferencias',
        description='Charlas y conferencias organizadas o impartidas por Diego Ayala sobre desarrollo y ciberseguridad.',
        keywords='Conferencias, Software Development, Cybersecurity, Teaching, DevOps, Automation',
        og_type='website',
        page_title='Conferencias',
        page_description='Listado de conferencias y charlas relacionadas con tecnología y ciberseguridad.',
        data_script='data.js'
    ),
    Page(
        path='competitions/competitions.html',
        body_id='page-competitions',
        title='diegaleesss.com | Competiciones',
        description='Competiciones y participación en eventos como SpainSkills, con foco en desarrollo web y formación profesional.',
        keywords='Competiciones, SpainSkills, Desarrollo Web, Formación Profesional, Talento Joven, Tecnología',
        og_type='website',
        page_title='Competiciones',
        page_description='Listado de competiciones y participación en eventos vinculados a formación profesional y desarrollo web.',
        data_script='data.js'
    ),
    Page(
        path='excursions/excursions.html',
        body_id='page-excursions',
        title='diegaleesss.com | Excursiones',
        description='Excursiones y visitas técnicas relacionadas con tecnología, infraestructura y salidas profesionales.',
        keywords='Excursiones, Infraestructura, Tecnología, Data Center, DevOps, Technical Visits',
        og_type='website',
        page_title='Excursiones',
        page_description='Listado de excursiones y visitas técnicas vinculadas al sector tecnológico.',
        data_script='data.js'
    ),
    Page(
        path='404.html',
        body_id='page-404',
        title='diegaleesss.com | 404 Not Found',
        description='Error 404: Signal Lost.',
        keywords='404, Error, diegaleesss.com',
        og_type='website',
        page_title='404 Not Found',
        page_description='The requested page was not found. Use the navigation links to return to the site.',
        robots='noindex,follow',
        head_extra=f'<base href="{html.escape(SITE_ROOT_PATH)}">'
    )
]


def get_relative_prefix(page_path: str) -> str:
    parent = Path(page_path).parent
    if str(parent) == '.':
        return ''
    return '../' * len(parent.parts)


def load_svg_icon(path: Path) -> str:
    svg = path.read_text(encoding='utf-8').strip()
    svg = re.sub(r'\s(width|height|fill|class)="[^"]*"', '', svg)
    return svg.replace('<svg ', '<svg class="nav-icon-svg" aria-hidden="true" fill="currentColor" ', 1)


def page_url(page: Page) -> str:
    if page.body_id == 'page-home':
        return SITE_URL
    return urljoin(SITE_URL, page.path)


def render_nav(page: Page, prefix: str) -> str:
    nav_lines: list[str] = []
    for body_id, label, target_path in NAV_ITEMS:
        href = f'{prefix}{target_path}'
        if body_id == page.body_id:
            nav_lines.append(f'            <a class="active" href="{href}" aria-current="page">{html.escape(label)}</a>')
        else:
            nav_lines.append(f'            <a href="{href}" class="nav-link" data-dest="{href}">{html.escape(label)}</a>')
    return '\n'.join(nav_lines)


def render_social_links(prefix: str) -> str:
    github_icon = load_svg_icon(REPO_ROOT / 'assets/icons/github.svg')
    linkedin_icon = load_svg_icon(REPO_ROOT / 'assets/icons/linkedin.svg')

    return '\n'.join([
        f'                <a class="nav-icon" href="{GITHUB_URL}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile of Diego Ayala">{github_icon}</a>',
        f'                <a class="nav-icon" href="{LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile of Diego Ayala">{linkedin_icon}</a>'
    ])


def build_json_ld(page: Page) -> str:
    canonical_url = page_url(page)
    payloads = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': page.page_title,
            'url': canonical_url,
            'description': page.description,
            'isPartOf': {
                '@type': 'WebSite',
                'name': 'diegaleesss.com',
                'url': SITE_URL
            }
        }
    ]

    person_schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Diego Ayala',
        'alternateName': 'diegaless',
        'url': urljoin(SITE_URL, 'about/about.html'),
        'sameAs': [GITHUB_URL, LINKEDIN_URL],
        'knowsAbout': ['Programming', 'Automation', 'Cybersecurity', 'DevOps', 'Technical education']
    }

    if page.body_id in {'page-home', 'page-about'}:
        payloads.append(person_schema)

    if page.body_id == 'page-home':
        payloads.append({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'diegaleesss.com',
            'url': SITE_URL,
            'description': page.description,
            'author': {
                '@type': 'Person',
                'name': 'Diego Ayala'
            },
            'inLanguage': 'es-ES'
        })

    return '\n'.join(
        f'    <script type="application/ld+json">{json.dumps(payload, ensure_ascii=False)}</script>'
        for payload in payloads
    )


def clean_generated_markup(markup: str) -> str:
    cleaned_lines = [line.rstrip() for line in markup.splitlines() if line.strip()]
    return '\n'.join(cleaned_lines) + '\n'


def render_page(page: Page, template: Template, social_image_url: str, social_image_alt: str) -> str:
    prefix = get_relative_prefix(page.path)
    data_script_tag = ''
    if page.data_script:
        data_script_tag = f'    <script src="{html.escape(page.data_script)}"></script>'

    meta_robots = f'    <meta name="robots" content="{html.escape(page.robots)}">' if page.robots else ''
    head_extra = f'    {page.head_extra}\n' if page.head_extra else ''

    page_markup = template.substitute(
        title=html.escape(page.title),
        head_extra=head_extra.rstrip(),
        asset_prefix=prefix,
        canonical=html.escape(page_url(page)),
        meta_description=html.escape(page.description),
        meta_keywords=html.escape(page.keywords),
        meta_author='Diego Ayala',
        meta_robots=meta_robots,
        og_type=html.escape(page.og_type),
        og_title=html.escape(page.title),
        og_description=html.escape(page.description),
        social_image=html.escape(social_image_url),
        social_image_alt=html.escape(social_image_alt),
        twitter_title=html.escape(page.title),
        twitter_description=html.escape(page.description),
        json_ld_scripts=build_json_ld(page),
        body_id=html.escape(page.body_id),
        nav_links=render_nav(page, prefix),
        social_links=render_social_links(prefix),
        page_title=html.escape(page.page_title),
        page_description=html.escape(page.page_description),
        data_script_tag=data_script_tag
    )

    return clean_generated_markup(page_markup)


def write_pages() -> None:
    template = Template(TEMPLATE_PATH.read_text(encoding='utf-8'))
    social_image_url = urljoin(SITE_URL, SOCIAL_IMAGE_PATH)
    social_image_alt = 'Terminal-style social card for diegaleesss.com'

    for page in PAGES:
        target_path = REPO_ROOT / page.path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(render_page(page, template, social_image_url, social_image_alt), encoding='utf-8')
        print(f'generated {page.path}')


def file_last_modified(path: Path) -> str:
    timestamp = datetime.fromtimestamp(path.stat().st_mtime)
    return timestamp.date().isoformat()


def write_sitemap() -> None:
    sitemap_entries = []
    for page in PAGES:
        if page.body_id == 'page-404':
            continue

        page_path = REPO_ROOT / page.path
        sitemap_entries.append(
            '  <url>\n'
            f'    <loc>{html.escape(page_url(page))}</loc>\n'
            f'    <lastmod>{file_last_modified(page_path)}</lastmod>\n'
            f'    <priority>{"1.0" if page.body_id == "page-home" else "0.8"}</priority>\n'
            '  </url>'
        )

    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n' \
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' \
        f'{"\n".join(sitemap_entries)}\n' \
        '</urlset>\n'

    (REPO_ROOT / 'sitemap.xml').write_text(sitemap_xml, encoding='utf-8')
    print('generated sitemap.xml')


def remove_unused_assets() -> None:
    unused_assets = [
        REPO_ROOT / 'assets/img/devtrack.png',
        REPO_ROOT / 'assets/img/devtrack_icon.svg',
        REPO_ROOT / 'assets/img/devtrack_preview.png',
        REPO_ROOT / 'assets/img/fctapp.png',
        REPO_ROOT / 'assets/img/fct_app_icon.svg',
        REPO_ROOT / 'assets/img/fct_logo.svg'
    ]

    for asset in unused_assets:
        if asset.exists():
            asset.unlink()
            print(f'removed {asset.relative_to(REPO_ROOT)}')


def main() -> None:
    generate_gallery_webp()
    social_image_path = generate_social_card()
    print(f'generated {social_image_path.relative_to(REPO_ROOT)}')
    write_pages()
    write_sitemap()
    remove_unused_assets()


if __name__ == '__main__':
    sys.exit(main())
