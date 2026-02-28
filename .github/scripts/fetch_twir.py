#!/usr/bin/env python3
"""
Fetch and parse the latest This Week in Rust newsletter from RSS feed.
"""
import sys
import re

try:
    import feedparser
except ImportError:
    print("Error: feedparser library not found. Install with: pip install feedparser", file=sys.stderr)
    sys.exit(1)

def fetch_latest_twir():
    """Fetch the latest This Week in Rust entry from RSS feed."""
    rss_url = "https://this-week-in-rust.org/rss.xml"

    try:
        # Fetch and parse RSS feed
        feed = feedparser.parse(rss_url)

        # Check if feed was fetched successfully
        if feed.bozo:
            print(f"Warning: Feed had parsing issues: {feed.bozo_exception}", file=sys.stderr)

        # Check if we have entries
        if not feed.entries:
            print("Error: No entries found in RSS feed", file=sys.stderr)
            sys.exit(1)

        # Get the first (latest) entry
        entry = feed.entries[0]

        # Extract data
        title = entry.get('title', '').strip()
        link = entry.get('link', '').strip()
        description = entry.get('description', '') or entry.get('summary', '')

        if not title or not link or not description:
            print(f"Error: Missing required fields - title={bool(title)}, link={bool(link)}, desc={bool(description)}", file=sys.stderr)
            sys.exit(1)

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
