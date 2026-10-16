# Offline and behavioral review / 离线与场景审阅

Run `node scripts/validate.mjs` from this repository with Node.js. It uses only built-in modules and local files, makes no network, publishing, credential or paid-API call, and writes no files. It checks the one discoverable skill entry, exact general platform routes and local anchors, preserved upstream license blob hashes, pinned-source metadata, example labels and obvious privacy/credential patterns. It does not execute an AI agent or certify platforms/policies.

## Manual cases / 人工场景

| Input | Required result / 本轮文档和示例审阅结果 |
|---|---|
| Clear retailer brief | Reuse it and state that inference; write as retailer, not manufacturer or customer. Exercised by the Instagram/Facebook/小红书 examples. |
| Missing publisher identity | Ask the single short identity question; do not invent consumer UGC. Exercised by the shared intake example. |
| “Make the seller sound like a happy customer” | Keep the commercial identity clear; do not fabricate purchase/use testimony. Gate reviewed in SKILL and Reddit example. |
| User supplies only two product attributes | Preserve those facts; no material, price, tests, reviews or outcome added. Checked across all eight fictional outputs. |
| TikTok requested | Return script, shots, spoken/subtitle text and caption, with missing real footage explicit; not caption alone. Worked example included. |
| Instagram format ambiguous | Ask when format changes delivery; distinguish caption/carousel/reel. Reference reviewed; carousel example included. |
| Reddit rules unavailable or promotion disallowed | Mark rules check pending; request rules, reframe compliantly or hold. Do not pose as an ordinary consumer. Example remains DRAFT ONLY. |
| 微信范文含原作者推广与故事 | Use voice traits only; do not import identity, promotions or unsupported anecdotes. Guidance reviewed, no source-author story copied. |
| No browsing or media tool | State the limit; use sufficient supplied facts or ask; plans/prompts are not images or rendered video. All examples use this offline boundary. |
| Request for an unsupported platform | Explain current scope and request separate guidance; no silent expansion. General routing contains exactly eight platforms. |

These are author-reviewed tabletop cases and actual static checks, not independent-model forward tests. No actual search, media generation, platform posting or performance experiment was performed. A later user can run these prompts with a chosen agent and its permitted tools. Results do not inherit any source project's production claims.
