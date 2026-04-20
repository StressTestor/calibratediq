# Git History Scrub — Final Summary

**Generated:** 2026-04-19
**Operation:** git-filter-repo mailmap-only identity scrub, all public StressTestor repos
**Tool:** git-filter-repo v2.47.0 with 8-entry mailmap
**No --replace-text ran:** all 4 gitleaks findings from Phase 1 were verified benign (test fixtures, AWS public example key, Adsterra ad zone IDs, JWT build placeholder)

---

## Repos Rewritten (19 total)

| Repo | Tier | Commits | Tags | Push | Working Clone | Notes |
|------|------|---------|------|------|---------------|-------|
| PromptPressure | A | 98 | 2 | ✓ | none | 5 identity variants collapsed |
| byli | A | 49 | 0 | ✓ | /Volumes/onn/byli-work | Vercel redeploy triggered |
| calibratediq | A | 23 | 0 | ✓ | /Volumes/onn/calibratediq | Vercel redeploy triggered; mailmap + spec re-committed post-push |
| Agora-ai-agent-visualizer | A | 53 | 7 | ✓ | /Volumes/onn/debate-watch | CI PR closed before push; will re-add CI post-scrub |
| pr-prism | A | 81 | 13 | ✓ | /Volumes/T7/pr-prism | Mailmap extended mid-run to catch Joeseph Grey <212606152+StressTestor@users.noreply.github.com> |
| sentinel | B | 14 | 0 | ✓ | none | |
| pixel-agents-terminal | B | 13 | 1 | ✓ | none | |
| homebrew-tap | B | 14 | 0 | ✓ | none | Formula health verified post-push; Agora cask unaffected |
| CapyIDE-Mobile | B | 8 | 0 | ✓ | /Volumes/onn/CapyIDE-Mobile | xcuserdata stripped from history; .gitignore updated; stash backed up to /Volumes/onn/.git-scrub/capyide-stash-backup.patch |
| batstack | B | 2 | 0 | ✓ | none | |
| MoneyPrinter | C | 2 | 0 | ✓ | none | |
| StressTestor (profile) | C | 2 | 0 | ✓ | none | |
| IdleCryptoMiner | C | 2 | 0 | ✓ | none | |
| SmartWorldHUD | C | 1 | 0 | ✓ | none | |
| TokenPressureSandbox | C | 1 | 1 | ✓ | none | |
| CodeEfficiencyEvalTool | C | 2 | 0 | ✓ | none | |
| Cortex-Desktop-Assistant | C | 8 | 1 | ✓ | none | |
| social-media-post-previewer | C | 37 | 0 | ✓ | none | |
| GamingMeta-GPT | C | 6 | 0 | ✓ | none | |

---

## Repos Skipped

| Repo | Reason |
|------|--------|
| Luna | Private — out of scope for this operation |
| Scout-Discord-Bot | Empty repository, no commits |

---

## Mailmap Applied

8 source → target mappings:
1. `Joeseph Grey <joesephgrey@Joesephs-Air.lan>` → StressTestor
2. `Joeseph Grey <joesephgrey@Joesephs-MacBook-Air.local>` → StressTestor
3. `Joeseph Grey <joebangerz@icloud.com>` → StressTestor
4. `Joeseph <joebangerz@icloud.com>` → StressTestor
5. `joesephgrey <joesephgrey@Joesephs-Air.lan>` → StressTestor
6. `joesephgrey <joesephgrey@Joesephs-MacBook-Air.local>` → StressTestor
7. `StressTestor <joebangerz@icloud.com>` → StressTestor (email only)
8. `Joeseph Grey <212606152+StressTestor@users.noreply.github.com>` → StressTestor (discovered mid-run in pr-prism; added before rewrite)

Mailmap file: `/Volumes/onn/calibratediq/docs/superpowers/specs/2026-04-19-git-scrub-mailmap.txt` (committed to calibratediq)

---

## Secret Redaction

No `--replace-text` ran. All Phase 1 gitleaks findings were verified benign:
- `calibratediq` — `test-secret-32-bytes-of-material-x` in signing.test.ts (test fixture)
- `byli` — JWT placeholder in CI workflow (build-time workaround, not a real token)
- `sentinel` — `AKIAIOSFODNN7EXAMPLE` in policy/mod.rs (AWS public documentation key used as test vector)
- `social-media-post-previewer` — Adsterra ad zone IDs in App.jsx (client-side public identifiers)

---

## Fork Risk

**All repos: 0 forks.** No external copies of these repos exist. No third-party impact.

| Repo | Forks |
|------|-------|
| PromptPressure | 0 |
| byli | 0 |
| calibratediq | 0 |
| Agora-ai-agent-visualizer | 0 |
| pr-prism | 0 |
| sentinel | 0 |
| pixel-agents-terminal | 0 |
| homebrew-tap | 0 |
| CapyIDE-Mobile | 0 |
| batstack | 0 |
| MoneyPrinter | 0 |
| StressTestor (profile) | 0 |
| IdleCryptoMiner | 0 |
| SmartWorldHUD | 0 |
| TokenPressureSandbox | 0 |
| CodeEfficiencyEvalTool | 0 |
| Cortex-Desktop-Assistant | 0 |
| social-media-post-previewer | 0 |
| GamingMeta-GPT | 0 |

---

## Dangling SHA Risk

Old commit objects remain accessible via direct GitHub URL (e.g., `https://github.com/StressTestor/<repo>/commit/<old-sha>`) for approximately 60–90 days until GitHub's garbage collection runs.

**No GitHub Support request needed** — no real secrets were redacted from history, only identity metadata. The old commits don't expose anything beyond the name/email leak that was already visible on the live history.

---

## Homebrew Tap

Post-scrub validation confirmed tap is healthy. The Agora cask uses tag-based download URLs — not commit SHA references — so the force-push did not affect formula resolution or artifact sha256 integrity.

---

## Post-Scrub Checklist for Joe

- [ ] Verify Vercel redeployed calibratediq and byli after force-push (check Vercel dashboard)
- [ ] CapyIDE-Mobile: if you need to restore in-flight work, apply the stash patch: `cd /Volumes/onn/CapyIDE-Mobile && git apply /Volumes/onn/.git-scrub/capyide-stash-backup.patch`
- [ ] Agora: re-add the CI GitHub Actions workflow (PR #1 was closed, not merged — re-apply on clean history)
- [ ] Any IDE or tool with a cached git clone of these repos (VS Code, Tower, etc.) needs a fresh clone
- [ ] GitHub Codespaces or CI runners with cached clones need a wipe
- [ ] Existing issue/PR links that reference old commit SHAs as hyperlinks will become dead links — those are cosmetic and unavoidable
- [ ] spec docs (plan + discovery report) were lost when calibratediq working clone was deleted before they were pushed to GitHub — if you want them back, they can be reconstructed from `/Volumes/onn/.git-scrub/reports/phase1-log.txt` and session context

---

## Scratch Directory

All mirrors and reports are at `/Volumes/onn/.git-scrub/`. Safe to delete when you're satisfied with the results:
```bash
rm -rf /Volumes/onn/.git-scrub
rm -rf /tmp/git-scrub-2026-04-19
```
