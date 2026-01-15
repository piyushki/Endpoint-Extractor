(() => {
  const endpointRegex =
    /(?:https?:\/\/[^\s"'<>]+|\/[a-zA-Z0-9_\-\/.?=&%]+|\bapi\/[a-zA-Z0-9_\-\/.?=&%]+)/g;

  const sources = new Set();

  // 1. HTML source
  sources.add(document.documentElement.innerHTML);

  // 2. Inline scripts
  Array.from(document.scripts)
    .filter(s => !s.src)
    .forEach(s => sources.add(s.innerText));

  // 3. Loaded JS (executed)
  performance.getEntriesByType("resource")
    .filter(r => r.initiatorType === "script")
    .forEach(r => sources.add(r.name));

  // 4. XHR / fetch requests already triggered
  performance.getEntriesByType("resource")
    .filter(r => ["xmlhttprequest", "fetch"].includes(r.initiatorType))
    .forEach(r => sources.add(r.name));

  // 5. Extract endpoints
  const endpoints = new Set();
  for (const src of sources) {
    const matches = String(src).match(endpointRegex);
    if (matches) {
      matches.forEach(e => {
        if (!e.match(/\.(png|jpg|jpeg|gif|svg|css|woff|woff2|ttf|eot)$/i)) {
          endpoints.add(e);
        }
      });
    }
  }

  // 6. Copy result
  copy([...endpoints].sort().join("\n"));
  console.log(`Extracted ${endpoints.size} endpoints. Copied to clipboard.`);
})();
