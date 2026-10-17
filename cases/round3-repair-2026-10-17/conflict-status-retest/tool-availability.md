# Tool availability and loaded rules

Actual tool used: functions.exec with exec_command (local PowerShell; supplied Python runtime for UTF-8 reads, checks, hashing and saves). Initial Get-Content output had damaged Unicode; subsequent reference reads used Python JSON with ASCII escaping.

Actual loaded rule SHA256:

- `skills/social-media-post-writer/SKILL.md`: `4896ac67a0a18350be9290f70a3a7b7d02d5b659f4aadf65bc8f5d7dd9f43969`
- `skills/social-media-post-writer/references/editorial-checks.md`: `fedc3e60d20191468af8fbcc788759f6a3495e6c3fbdb8c998ab712da16ea3a8`
- `skills/social-media-post-writer/references/platforms-en.md`: `07e0c91c3e3c120f33e7e7e84469c75a9ab2a7b927a70f4ded1a55dda0ed8e7f`

The English reference file was read in full in one local read; only its Facebook and Reddit sections were applied. No Chinese platform reference or optional examples were loaded.

Unexecuted tools/actions: network, browser, connectors, accounts, paid APIs, image tools, installs, Git mutation and business tools. They were prohibited. No community, timing, live platform-limit or visual checks were performed. No post-submission review or repair was performed.
