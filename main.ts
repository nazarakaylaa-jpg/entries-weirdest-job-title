// Weirdest Job Title: Blind Judge Showdown — program/v1 entry.
//
// Writes one job title (1-60 characters, nothing else) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Deterministic: the same text on every
// run, no input, no randomness, no network, no clock.
//
// The title: "Senior Vice President of Apologizing to the Printer".
// Chosen from 8 candidates. It wins on the judge's own brief: it sounds
// like a real corporate job (Senior Vice President is a genuine title
// format), the twist is one hilariously specific duty (apologizing — a
// human social act — directed at a machine), and the picture lands on
// the first read: a suited executive saying sorry to a jammed printer.
// The rejected variants were either less of a real title ("Chief Apology
// Officer"), a condition rather than a duty ("Forgetting Why I Walked
// In Here"), or a less universal machine ("Photocopier", "Self-Checkout").
// At 51 characters it reads instantly.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The job title. 51 characters, one line, no trailing newline.
const ENTRY = "Senior Vice President of Apologizing to the Printer";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check, same as the competition's: 1-60 characters, one line,
// not whitespace only.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 60 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-60 characters, got ${chars}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
// Pure ASCII, so the gate's character count and the leaderboard's byte
// count agree; a stray non-ASCII edit would silently change the size.
if (!/^[\x20-\x7e]*$/.test(ENTRY)) {
  throw new Error("entry must be plain ASCII");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
