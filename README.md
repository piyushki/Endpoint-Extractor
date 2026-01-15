# Endpoint Discovery Workflow

## Phase 1 — Runtime Endpoint Extraction (Browser Console)

### Objective
Extract endpoints exposed during active application execution.

### Tool
`Endpoint-Extractor.js`

### Execution
- Open target in browser
- Open DevTools → Console
- Paste and execute `Endpoint-Extractor.js`

### Coverage
- DOM HTML
- Inline JavaScript
- In-memory loaded JavaScript
- XHR / fetch requests already fired

### Output
- One endpoint per line
- Deduplicated
- Sorted
- Copied to clipboard

### Properties
- Runtime-based
- Low noise
- Misses dormant or gated routes

---

## Phase 2 — Static JavaScript Enumeration (Katana)

### Objective
Extract endpoints embedded in JavaScript that are not executed in the current session.

### Preparation
- Gather all `.js` URLs from:
  - `<script src>` tags
  - Dynamically injected scripts

### Tool
Katana

### Execution Logic
- Feed collected JavaScript URLs into Katana
- Enable JavaScript parsing and endpoint discovery

### Coverage
- Untriggered API routes
- Feature-flagged endpoints
- Admin-only paths
- Legacy and fallback APIs
- Commented or dead routes

### Output
- Raw endpoint candidates
- Requires filtering and validation

### Properties
- Static analysis
- High recall
- High noise

---

## Recon Model

- Phase 1: What the application is using
- Phase 2: What the application contains

Combined output approximates full client-side attack surface.

---

## Order Constraint

Phase 1 precedes Phase 2.  
Runtime context guides static validation.
