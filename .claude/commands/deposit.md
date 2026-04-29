---
description: Add a deposit/withdrawal to mila.json or cate.json, build, commit, and push
argument-hint: <mila|cate> <YYYY-MM-DD> <amount> [description...]
---

Add a deposit entry from these arguments: $ARGUMENTS

Argument format: `<name> <date> <amount> [description...]`
- `name`: `mila` or `cate` — selects `src/mila.json` or `src/cate.json`
- `date`: `YYYY-MM-DD` — convert to `MM/DD/YYYY` with leading zeros (e.g. `2026-04-26` → `04/26/2026`)
- `amount`: number, negative means a withdrawal
- `description`: optional free-form text; everything after the amount token is the description

Execute end-to-end without asking for confirmation. If any step fails, stop and report.

## Steps

1. **Parse** the arguments. If `name` is not `mila` or `cate`, stop and tell the user.
2. **Read** the target file (`src/mila.json` or `src/cate.json`) with the Read tool. Note: `mila.json` uses tabs for indentation, `cate.json` uses 2 spaces — preserve whatever the file uses.
3. **Append the new entry** using the Edit tool. Find the last existing entry (the closing `}` immediately before the `]` of the `deposits` array) and replace it with itself + `,` + the new entry, matching the exact indentation of the surrounding entries. Include the `description` field only when the description argument is non-empty.

   Example new entry for `mila.json` (tabs):
   ```
   		{
   			"date": "04/26/2026",
   			"amount": -18,
   			"description": "independence day event"
   		}
   ```
4. **Build:** run `npm run build` from the project root. This regenerates `docs/`.
5. **Commit and push:** stage the JSON change and the `docs/` folder, commit with message `deposit` (matches existing history), and push to `origin`. Do NOT add a Claude co-author trailer — keep the commit message exactly `deposit` to match the repo's existing convention.
6. **Report**: tell the user the entry was added, built, and pushed, and remind them GitHub Pages will deploy in ~1-2 min.
