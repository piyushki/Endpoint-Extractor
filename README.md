# Endpoint-Extractor
JavaScript snippet for extracting API endpoints and routes directly from a loaded web application using the browser console.

Designed for reconnaissance during web security testing and client-side analysis.

---

## What It Extracts

- Absolute URLs (`https://example.com/api`)
- Relative paths (`/api/v1/users`)
- `api/*` style routes
- Endpoints referenced in:
  - HTML source
  - Inline scripts
  - Loaded JavaScript files
  - XHR / fetch requests already executed

Static assets (images, fonts, CSS) are excluded.

---

## How It Works

1. Collects multiple runtime sources from the browser:
   - DOM HTML
   - Inline JavaScript
   - Loaded script URLs
   - Network resources (XHR / fetch)
2. Applies a regex to identify endpoint-like strings
3. Deduplicates results
4. Sorts and copies output to clipboard

---

## Usage

1. Open target site in a browser
2. Open DevTools → Console
3. Paste the contents of `Extract-endpoints.js`
4. Press Enter
5. Endpoints are copied to clipboard

---

## Output

- One endpoint per line
- Sorted
- Ready for:
  - Burp Suite
  - Wordlists
  - Endpoint categorization
  - Further fuzzing

---

## Limitations

- Only captures requests already triggered
- No authentication replay
- Regex-based, not AST-aware

---

## Use Case

- Client-side recon
- Bug bounty endpoint discovery
- SPA / React / Vue applications
- Quick mapping before manual testing
