# AI Coding Model Guide — Cursor / GitHub Copilot

**Last verified:** September 11, 2026
**Verified by:** Claude, via live web search of official sources (see Sources section)
**Next review due:** ~December 2026 (or sooner — see "How to update this file" below)

**Stack context:** React.js, React Native, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, Terraform, Docker, OpenSearch, AWS Bedrock, Playwright, Puppeteer, multi-tenant SaaS, large existing codebases, REST APIs, CI/CD
**Primary tool:** Cursor · **Secondary tool:** GitHub Copilot

---

## How to update this file

This file goes stale fast — new models ship, prices change, and models get deprecated roughly monthly in this market. When you want a refresh, paste this prompt to an AI assistant with live web search enabled (Claude, ChatGPT, etc.):

> "Re-verify the AI coding model comparison table in this file against current official sources: Cursor's Models & Pricing docs (cursor.com/docs/models-and-pricing), GitHub Copilot's Supported AI Models doc (docs.github.com/en/copilot/reference/ai-models/supported-models), Anthropic's pricing docs (platform.claude.com/docs/en/about-claude/pricing) and model announcement pages, OpenAI's model pricing page, and Google's Gemini API pricing page. Flag: (1) any new models released since [last verified date], (2) any price changes to existing rows, (3) any models deprecated or removed from Cursor/Copilot, (4) whether my stack-specific recommendations (daily driver / frequent / sometimes / rarely) still hold given new releases. Update the table, the 'Last verified' date, and the changelog below. Keep the same column structure and intelligence-rating methodology."

**What specifically to re-check each time:**

| What changes often | Where to check |
|---|---|
| New model releases (new Claude/GPT/Gemini/Grok generations) | Vendor announcement blogs + Cursor's "Show more models" list |
| Price changes on existing models | Cursor Models & Pricing page (updates fastest and aggregates all three vendors); Anthropic/OpenAI/Google pricing pages directly |
| Model deprecations | GitHub Copilot changelog (docs.github.com/en/copilot/reference/ai-models/supported-models) — GitHub publishes explicit deprecation notices with replacement models |
| Context window changes | Vendor model cards / platform docs — these sometimes change independent of a version bump (e.g. a model gaining 1M context via a later update) |
| Which models are Cursor-only vs Copilot-only vs both | Cross-reference the Cursor pricing page against the GitHub Copilot supported-models table directly — don't rely on secondary blogs, which lag |
| Whether Cursor's "first-party" pool has changed | Cursor Models & Pricing page, "Cursor Models" section — this list has changed composition before (e.g. Grok joining after the SpaceX acquisition) |

**Red flags that mean this file needs an update sooner than the review date:**
- A new numbered version of GPT-5.x, Claude Sonnet/Opus/Haiku, Gemini 3.x, or Grok 4.x ships
- Cursor or Copilot announces a pricing model change (credit system, pool structure, multipliers)
- Any model in the table gets a deprecation notice
- You start a new project with different priorities (e.g. more mobile/React Native work, more data-heavy work) — the *rankings*, not just the data, may need to shift

## Context

SpaceX acquired Cursor's parent company (Anysphere) in a deal that closed August 14, 2026. Cursor now operates as a SpaceXAI subsidiary, and Grok models are now part of Cursor's first-party "Cursor Models" pool alongside Cursor's own Composer models — so the line between "Cursor's own models" and "xAI/Grok" has blurred. Grok usage in Cursor draws from a separate, more generous usage pool than third-party models (Claude, GPT, Gemini), and is exempt from Cursor's $0.25/M "Cursor Token Rate" surcharge that applies to third-party models on Teams/Enterprise plans.

GitHub Copilot deprecated six older models on September 1, 2026 (Claude Opus 4.5/4.6, Claude Sonnet 4.5/4.6, Gemini 3.1 Pro from some surfaces, Raptor mini) and has moved toward transparent per-model token pricing alongside its premium-request/credit system.

Pricing below is **API/list pricing per 1M tokens** as published by each vendor or reflected in Cursor's and Copilot's own model pricing pages. Actual cost inside Cursor or Copilot depends on your plan's included usage pool, on-demand overage rates, and (for Copilot) premium-request multipliers.

## Intelligence rating methodology

The Intelligence (/5) column is a synthesized rating — there is no single universal cross-vendor benchmark — built from SWE-bench Verified, Terminal-Bench, Artificial Analysis Intelligence Index, and Agents' Last Exam results as published by Anthropic, OpenAI, and third-party trackers, weighted toward coding/agentic performance rather than general knowledge or math. Opus 5 and Fable 5.1 tie at 5/5 on raw reasoning depth; Sonnet 5 and GPT-5.6 Sol sit at 4.5 because they trade a small amount of ceiling for much better speed/cost — which is why they're the better *daily* picks despite the slightly lower score.

## Full comparison table

| Rank | Model | Provider | Cursor | Copilot | Input $/1M | Output $/1M | Intelligence (/5) | Speed | Context | Best use | Recommended usage |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Claude Sonnet 5 | Anthropic | ✅ | ✅ | $2 | $10 | **4.5** | Fast | 1M (128K max out) | Daily agentic coding, refactors, PR-sized features | Daily driver |
| 2 | GPT-5.6 Sol | OpenAI | ✅ | ✅ | $2–4* | $10–20* | **4.5** | Med-Fast | 272K default / ~1M ext | Long-running agent sessions, terminal-heavy work | Daily driver |
| 3 | Composer 2.5 | Cursor (Kimi K2.5 base) | ✅ | ❌ | $0.50 / $3 (fast) | $2.50 / $15 (fast) | **3.5** | Very fast | 200K | High-volume tab/agent loops, cost control | Daily driver |
| 4 | Claude Opus 5 | Anthropic | ✅ | ✅ | $5 | $25 | **5** | Med | 1M (128K max out) | Architecture, hard production bugs, security review | Frequent |
| 5 | Grok 4.6 | xAI / SpaceXAI | ✅ | ✅ | $2 / $4 (fast) | $6 / $12 (fast) | **4** | Fast | 500K | Long-horizon multi-file agent runs | Frequent |
| 6 | GPT-5.6 Terra | OpenAI | ✅ | ✅ | $2 | $12 | **3.5** | Fast | 272K default | Everyday agentic coding, mid-tier cost | Frequent |
| 7 | Gemini 3.1 Pro | Google | ✅ | ✅ | $2 | $12 | **4** | Med | 1M (~1.05M) | Huge-repo ingestion, screenshot-to-UI, multimodal | Frequent |
| 8 | Grok 4.5 | xAI / SpaceXAI | ✅ | ✅ | $2 / $4 (fast) | $6 / $18 (fast) | **3.5** | Fast | 500K | Same niche as 4.6, now "previous gen" | Sometimes |
| 9 | Claude Haiku 4.5 | Anthropic | ✅ | ✅ | $1 | $5 | **3** | Very fast | 200K (64K max out) | Boilerplate, small fixes, test writing | Sometimes |
| 10 | GPT-5.6 Luna | OpenAI | ✅ | ✅ | $0.20 | $1.20 | **2.5** | Very fast | 272K | Trivial edits, high-volume subagent calls | Sometimes |
| 11 | Gemini 3.7 / 3.8 Flash | Google | ✅ (3.8) | ✅ (3.7 → 3.8) | $0.75 | $3.50–3.75 | **2.5** | Very fast | ~1M | Cheap large-context scans, quick checks | Sometimes |
| 12 | GPT-5.3-Codex | OpenAI | ✅ | ✅ (LTS fallback) | $1.75 | $14 | **3.5** | Med | ~272K legacy tier | Copilot's LTS fallback, solid pure coding | Rarely |
| 13 | Claude Fable 5.1 | Anthropic (Mythos-tier) | ✅ | ✅ (ZDR exemption thru 2026) | $10 | $50 | **5** | Slow | 1M (128K max out) | Only the hardest, highest-stakes reasoning | Rarely |
| 14 | GPT-5.5 | OpenAI | ✅ | ✅ | $5 | $30 | **3.5** | Med | 272K | Superseded by 5.6 family | Rarely |
| 15 | GPT-5 mini | OpenAI | ✅ | ✅ | $0.25 | $2 | **2** | Fast | ~128K–272K | Legacy cheap fallback | Not recommended |
| 16 | Legacy Claude (Opus/Sonnet 4.x), Kimi K2.7/K3, MAI-Code, Qwen2.5, Raptor mini | Mixed | Varies | Deprecated / niche | Varies | Varies | **1.5–2** | Varies | Varies | Deprecated or no edge for this stack | Not recommended |

\* GPT-5.6 Sol pricing varies by surface — Cursor's docs list $4/$20, GitHub's Copilot changelog lists a promotional $2/$10 (effective through part of Q3 2026).

## Recommended Cursor model-selection strategy

| Task | Model |
|---|---|
| Simple task (small fix, boilerplate, tests) | Composer 2.5 or Claude Haiku 4.5 |
| Normal development (day-to-day feature work) | Claude Sonnet 5 |
| Agentic task (multi-file feature implementation) | GPT-5.6 Sol or Grok 4.6 |
| Difficult debugging | Claude Opus 5 |
| Architecture | Claude Opus 5 (escalate to Claude Fable 5.1 only if Opus 5 stalls) |
| Huge codebase / long-context ingestion | Gemini 3.1 Pro |
| UI / screenshot-to-code | Gemini 3.1 Pro to interpret, Claude Sonnet 5 to implement |

## Final 3–5 model setup

1. **Claude Sonnet 5** — default for ~60% of work: normal dev, refactoring, debugging, code review
2. **Claude Opus 5** — escalate for architecture calls and hard production bugs
3. **Composer 2.5** — cheap/fast mode for boilerplate, tests, high-volume agent loops (separate Cursor usage pool)
4. **Gemini 3.1 Pro** — huge-repo context dumps and screenshot-to-UI work
5. *(optional)* **GPT-5.6 Sol** — very long multi-hour autonomous agent sessions where Sonnet 5 loses steam

## Sources

- Cursor Models & Pricing — https://cursor.com/docs/models-and-pricing
- GitHub Copilot Supported AI Models — https://docs.github.com/en/copilot/reference/ai-models/supported-models
- Anthropic — Claude Sonnet 5 announcement — https://www.anthropic.com/news/claude-sonnet-5
- Anthropic — Claude Haiku 4.5 announcement — https://www.anthropic.com/news/claude-haiku-4-5
- Anthropic — Claude Platform Pricing docs — https://platform.claude.com/docs/en/about-claude/pricing
- OpenAI — GPT-5.6 announcement — https://openai.com/index/gpt-5-6/
- Cursor — Introducing Grok 4.5 — https://cursor.com/blog/grok-4-5
- Cursor — Introducing Composer 2.5 — https://cursor.com/blog/composer-2-5
- Google Gemini API Pricing (via Google AI / OpenRouter listings, cross-checked against Cursor's model pricing page)

*Re-check this table quarterly — the coding-model market is moving fast enough that rankings and prices shift meaningfully every few months.*

---

## Changelog

| Date | Change |
|---|---|
| 2026-09-11 | Initial version. Full comparison of Anthropic, OpenAI, Google, Cursor/SpaceXAI, and xAI models across Cursor and GitHub Copilot, ranked for a React/RN/Node/TS/Postgres/AWS/Terraform multi-tenant SaaS stack. |

*(Add a new row each time this file is refreshed, noting what changed — new models, price changes, deprecations, or ranking shifts.)*
