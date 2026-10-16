# social-media-post-writer-skill

Start with the [eight-platform fictional drafts](examples/general-eight-platforms.md), including publisher roles and media-plan limits. [Skill entry](skills/social-media-post-writer/SKILL.md) · [Review cases](VALIDATION.md). / 先看八平台已有文案示例。

**Platform-aware marketing writing / 按平台适配的营销写作**

A personal-use writing skill for an AI agent, with ongoing updates. Confirm who is speaking, use supported facts, then adapt the content to the requested platform and format. No account operation is included.

搭配 AI agent 使用：先确认发布者身份，再以可披露事实写作，并适配指定平台及体裁。个人自用并持续更新，支持品牌/零售渠道内容和个人专家推荐；不默认写成消费者 UGC，也不捏造使用经历。

## General entry / 通用入口

Use [social-media-post-writer](skills/social-media-post-writer/SKILL.md). Copy that entire folder into the agent's supported skill directory or provide the entrypoint explicitly. Only the following eight platforms are in this general skill:

| Language / 语言 | Platforms and typical deliverables / 平台及典型交付 |
|---|---|
| English | Instagram: caption, carousel copy or reel plan; TikTok: script, shots, subtitles and caption; X: post/thread; Facebook: page/group copy; Reddit: community-specific post. |
| 中文 | 小红书：标题、正文、话题及按需图文规划；微信公众号：标题、导语、正文及按需摘要；知乎：回答或专栏文章。 |

See [English platforms](skills/social-media-post-writer/references/platforms-en.md) and [中文平台](skills/social-media-post-writer/references/platforms-zh.md). Platform-specific account limits, current policies and community rules must be checked when material; the skill does not promise reach or algorithm outcomes.

The table gives draft-language defaults; discussion can use the user's language, and an explicit requested publication language takes precedence without adding platforms. / 表中语言是文案默认值，讨论可用用户语言；明确指定的发布语言优先，不因此扩展平台范围。

**Scope:** LinkedIn is outside this package. / **范围：**本通用包不包含 LinkedIn。

## Short intake / 简短前置问题

Reuse relevant approved accessible background first, and briefly state what was reused or inferred. Do not make the user complete a long questionnaire. Ask only for missing facts that change the work:

1. **Publisher:** brand owner, retail/channel seller, or an individual recommending as an expert? What relationship or sponsorship needs to be clear? / **发布者：**品牌方、零售渠道方，还是个人专家身份推荐？与产品/品牌有什么关系，需要怎样说明？关键身份不清楚时先问。
2. **Task:** platform/format, business goal, audience and relevant region/language. / **任务：**平台/体裁、业务目标、读者及适用地区/语言。
3. **Material and voice:** confirmed facts, permitted assets, claims to avoid, and a short style sample if available. / **素材与语气：**已确认事实、可用素材、禁说内容；有样文则优先匹配。

> A fictional retailer carries a desk tray. Write an English Instagram carousel for small-desk users. The supplied facts are two compartments and a removable divider. Speak as the retailer, not the manufacturer or a customer; do not invent material, pricing, tests or reviews.

> 虚构零售渠道销售一款收纳盘。请用零售方身份，为小桌面用户写小红书。已给事实只有两个分区、隔板可拆；不冒充品牌研发方或消费者，不编材质、价格、测评与用户反馈。

## Outputs and tool dependencies / 交付与工具依赖

Return editable copy in the requested format, brief source/claim notes, publisher/disclosure wording where relevant, and any unresolved item. For video, a script/shot/subtitle plan is not a produced video; a carousel layout or image prompt is not an image attachment.

交付指定体裁的可编辑文案、简短事实依据、必要身份/合作说明和未完成项。研究、读图、文件交付及实际图片/视频制作依赖宿主实际工具、访问权与已授权成本；不是安装技能就自动具备。无工具或证据不足应说明、复用充分的用户材料或补问，不假装联网或产图。默认只做内容策划、写作和审阅。

The core workflow can use supplied evidence without paid APIs. External research requires actual permitted search/browsing; visual inspection requires access and image-reading ability. If real image work is requested and tools are available, inspect and deliver the actual result, otherwise clearly provide a plan/prompts only. No specific model, installation script or external writer is required.

## Boundaries / 边界

- No login, publishing, scheduling, commenting, DMs or engagement automation. / 不登录、不发布、不排期、不评论或私信。
- No fake consumer persona, fabricated expert credentials, undisclosed commercial voice or invented customer results. / 不假扮消费者、不编专家资历、不掩盖商业身份、不编成效。
- No guaranteed virality, fixed algorithm formulas or universal optimal posting frequency. / 不承诺爆款、不使用无依据算法保证或通用最佳频率。
- Current subreddit/community rules and commercial disclosure requirements are context-dependent. Missing rules mean a draft awaiting that check. / 社区规则与商业披露要求按具体场景核对；缺规则就标记待核，不称可直接发布。
- No source-author business data, private memory, production account configuration or original private skill is bundled. Examples are fictional. / 不包含原作者业务私密、私人记忆、账号配置或原自用技能；示例全部虚构。

See [worked examples](examples/general-eight-platforms.md), [review cases](VALIDATION.md), [provenance](PROVENANCE.md), [third-party notices](THIRD_PARTY_NOTICES.md) and [rights](RIGHTS.md). Run `node scripts/validate.mjs` for the available offline checks; it is not a model-behavior or live-platform certification. No new root license is assigned.

## Personal use and updates / 个人自用与持续更新

Maintained for personal use and updated as the workflow evolves. No new root open-source license is assigned; see [rights](RIGHTS.md) and [provenance](PROVENANCE.md). Identified third-party portions retain their own license permissions, including commercial use where granted. Personal-use positioning does not impose a non-commercial restriction on those portions.

个人自用，会持续更新。新增与适配部分未指定根开源许可证，详见权利与来源说明。实际采用的第三方部分继续适用其原许可；个人自用的定位不缩减原许可已授予的商用等权利。

Canonical repository: [social-media-post-writer-skill](https://github.com/HuiyangElsaXie/social-media-post-writer-skill). Related workflows: [EN/ZH blog](https://github.com/HuiyangElsaXie/website-blog-writer-enzh-skill), [RedNote](https://github.com/HuiyangElsaXie/rednote-writer-skill).
