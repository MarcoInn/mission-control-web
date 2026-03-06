# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Reliability Policy (active)

### Learning/Log file updates

For `.learnings/LEARNINGS.md` and similar log files, use this default write flow:
1) Try `edit` first (minimal diff)
2) If `edit` fails (non-unique/mismatch), immediately fallback to:
   - `read` full file
   - apply change in-memory
   - `write` full file
3) Run a quick verification read on the changed section
4) Commit with a clear message

This is the default standard to reduce failed updates from strict patch matching.
