#!/usr/bin/env python3
"""
Fetch and parse the latest This Week in Rust newsletter from RSS feed.
"""
import sys
import xml.etree.ElementTree as ET
import urllib.request
import html
import re

def fetch_latest_twir():
    """Fetch the latest This Week in Rust entry from RSS feed."""
    rss_url = "https://this-week-in-rust.org/rss.xml"

    try:
        # Fetch RSS feed
        with urllib.request.urlopen(rss_url) as response:
            rss_content = response.read()

        # Parse XML
        root = ET.fromstring(rss_content)

        # Find first item
        item = root.find('.//item')
        if not item:
            print("Error: No items found in RSS feed", file=sys.stderr)
            sys.exit(1)

        # Extract data
        title_elem = item.find('title')
        link_elem = item.find('link')
        description_elem = item.find('description')

        if not all([title_elem, link_elem, description_elem]):
            print("Error: Missing required fields in RSS item", file=sys.stderr)
            sys.exit(1)

        title = title_elem.text.strip()
        link = link_elem.text.strip()

        # Get description content (already contains the full HTML)
        description = description_elem.text or ""

        # Unescape HTML entities
        description = html.unescape(description)

        # Create slug from title
        slug = create_slug(title)

        # Output in a format easy to consume in bash
        print(f"TITLE={title}")
        print(f"LINK={link}")
        print(f"SLUG={slug}")
        print(f"--- CONTENT START ---")
        print(description)
        print(f"--- CONTENT END ---")

    except Exception as e:
        print(f"Error fetching RSS: {e}", file=sys.stderr)
        sys.exit(1)

def create_slug(title):
    """Create a URL-friendly slug from title."""
    # Convert to lowercase
    slug = title.lower()
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Remove anything that's not alphanumeric or hyphen
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    # Remove multiple consecutive hyphens
    slug = re.sub(r'-+', '-', slug)
    # Strip leading/trailing hyphens
    slug = slug.strip('-')
    return slug

if __name__ == "__main__":
    fetch_latest_twir()
