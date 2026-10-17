# Tool availability and execution

Execution used local PowerShell through functions.exec/exec_command and the mandated {PYTHON} -X utf8. Python standard-library pathlib, json and hashlib handled reads, encoding recovery, hashes and saves. All calls succeeded.

Web, browser, connector, account, image, installation, Git, paid API and business-tool actions were unexecuted, as prohibited. Tool visibility does not imply use or authorization. No media rendering or visual inspection was performed.

Actual loaded rule hashes (SHA-256 of file bytes):

- `SKILL.md`: `ce11bbe103f050511b96ef4b9df7e072e39ea3179cac101dd041a762ac12bd2b`
- `references/editorial-checks.md`: `24dff3aaeaf2ddd0163cfab80c2142a0dcc0b91db695d6a7ec1e13c51baf8615`
- `references/platforms-en.md`: `07e0c91c3e3c120f33e7e7e84469c75a9ab2a7b927a70f4ded1a55dda0ed8e7f`

The Chinese reference was not loaded. The full English reference was output, though only its TikTok section was relevant and applied. Initial PowerShell output had damaged Unicode; the entry was reread with json.dumps(..., ensure_ascii=True) through the required Python interpreter. commands.json is an explicitly reconstructed record, not native tool telemetry.
