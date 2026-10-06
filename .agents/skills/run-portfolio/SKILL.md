---
name: run-portfolio
description: build, launch, and screenshot the portfolio website
---

This is a static portfolio website hosted on GitHub Pages. It is driven using a local Python server and `curl` for verification, or `chromium-cli` for visual screenshots.

## Prerequisites

No OS packages are required beyond `python3` (standard in this environment).

## Build

This is a static site. No build step is required.

## Run (agent path)

To verify the site content programmatically:

```bash
python3 -m http.server 8080 &
SERVER_PID=$!
curl -s http://localhost:8080/index.html
kill $SERVER_PID
```

To take a screenshot of the site (requires `chromium-cli`):

```bash
python3 -m http.server 8080 &
SERVER_PID=$!
chromium-cli screenshot http://localhost:8080/index.html portfolio-ss.png
kill $SERVER_PID
```

## Run (human path)

1. Run `python3 -m http.server 8080`
2. Open `http://localhost:8080` in a browser.
3. Press `Ctrl-C` to stop the server.

## Gotchas

- **Port Collisions:** If 8080 is taken, use `python3 -m http.server 8081`.

## Troubleshooting

- **404 Not Found:** Ensure you are running the server from the project root (`/home/lfernandes/Bureau/luis-fernandes.github.io`).
