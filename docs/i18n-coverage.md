# Aether OS UI-1.2 — 中文国际化实施与覆盖率

> 状态：**已在 UI-1.2 实施完成。**
> 产品策略：简体中文（`zh-CN`）为首次启动默认语言，English（`en-US`）为可切换语言；用户选择保存在浏览器本地设置中。

## 1. 实现摘要

- 不引入第三方国际化运行时，使用本地、类型安全的扁平字典 + React Context。
- 首次启动默认简体中文；`<html lang>`、文档标题、界面文案、演示数据、窗口标题、Dock Tooltip、ARIA Label 同步切换。
- 语言入口：**设置 → 外观 → 语言**，提供「简体中文 / English」两个选项，选择立即应用并持久化。
- 所有演示数据使用 `LocalizedText`（`{ 'zh-CN': string; 'en-US': string }`），在渲染层通过 `tr()` 解析；切换语言时已打开窗口、任务、记忆、通知一起更新。
- 中英文布局均通过 1920×1080 与 1366×768 的横向溢出检查；中文 Home 在 1366×768 首屏完整展示。
- 中文排版：取消 `.eyebrow` 的英文大写规则，中文正文使用更舒展的行高，不缩小字号来换取空间。

## 2. 翻译覆盖率

### 2.1 界面文案

| 模块 | Key 数 |
| --- | ---: |
| `common` | 58 |
| `shell`（TopBar / SideNav / Dock / 窗口 / Overlays） | 75 |
| `home` | 54 |
| `command` | 82 |
| `agents` | 32 |
| `tasks` | 51 |
| `apps` | 16 |
| `files` | 79 |
| `memory` | 55 |
| `settings` | 131 |
| `notes` | 32 |
| `weather` | 22 |
| **合计** | **687 keys / 语言** |

- 中文、英文 key 完全一致：**687 / 687（100%）**。
- 所有 value 非空（英文 `files.list.resultsSuffix` 为按语言拼接而刻意留空，已在测试中列为唯一例外）。
- 所有消息插值占位符 `{...}` 在中英文之间完全一致。
- 类型系统由英文模块的 key 推导 `TranslationKey`，中文模块使用 `satisfies Record<keyof enModule, string>`，缺失或多余 key 会直接编译失败。

### 2.2 演示数据

| 数据文件 | 双语字段数 |
| --- | ---: |
| `agents.ts` | 69 |
| `tasks.ts` | 99 |
| `files.ts` | 88 |
| `memories.ts` | 54 |
| `notifications.ts` | 12 |
| `navigation.ts` | 16 |
| `apps.ts` | 16 |
| `system.ts`（系统快照 + Weather） | 15 |
| **合计** | **369 个 `LocalizedText` 字段** |

- 每个字段都同时包含 `zh-CN` 与 `en-US` 值，不存在只翻译标题、正文仍是英文的情况。
- Agent 名称/角色/描述/活动、任务标题/描述/步骤/标签、文件名/摘要、记忆、通知、导航、Weather 数据均已双语化。
- 动态演示数据（Command Center 模拟计划、生成的任务、通知）在创建时同时生成中英文版本，语言切换后同步显示。
- 单元测试遍历全部静态 Mock Data，校验：**369 / 369 字段两种语言非空**，且英文数据不包含中文字符。

## 3. 覆盖范围

| 区域 | 状态 |
| --- | --- |
| Desktop / TopBar / SideNav / Wallpaper | ✅ 中文 / English |
| Home | ✅ 中文 / English |
| Command Center + 模拟计划 + 会话上下文 | ✅ 中文 / English |
| Agents / Tasks 页面与详情面板 | ✅ 中文 / English |
| Apps / Files / Memory | ✅ 中文 / English |
| Settings（含语言设置） | ✅ 中文 / English |
| Notes / Weather 窗口 | ✅ 中文 / English |
| Dock 名称、状态、Tooltip、ARIA | ✅ 中文 / English |
| 窗口标题、窗口按钮、置顶状态、ARIA | ✅ 中文 / English |
| Control Center / Notification Center / User Menu / Command Palette | ✅ 中文 / English |
| 空状态、按钮、提示、搜索框、无障碍名称、页面标题与 `<html lang>` | ✅ 中文 / English |
| 日期 / 时间格式 | ✅ `Intl` 按语言格式化；中文 24 小时制，英文 12 小时制 |

## 4. 语言与持久化行为

- 默认值：`DEFAULT_SETTINGS.language = 'zh-CN'`。
- 存储：沿用 `localStorage['aether-os-demo-settings-v1']` 的 `AetherSettings`，不新增存储层。
- 切换：`useI18n().setLocale('en-US' | 'zh-CN')` → `SettingsProvider.updateSetting('language')` → 全部 Provider 下游重新渲染。
- 刷新后保持；点击「重置演示」恢复简体中文。
- 首次 HTML 加载前，内联脚本会读取本地设置并设置 `<html lang>`，减少语言闪烁。
- 已打开窗口的标题、内容和 Dock 状态在切换时立即更新，无需刷新。

## 5. 中文视觉适配

- `html[lang='zh-CN'] .eyebrow`：取消 `text-transform: uppercase`，收窄字距。
- `html[lang='zh-CN'] .uppercase`：取消英文大写规则。
- 中文正文 `p / li` 行高从 1.5 调整到 1.68；字体栈保留 PingFang SC / Microsoft YaHei UI / Noto Sans CJK SC。
- 中英文均未使用字体缩放、CSS `zoom` 或强制压缩来规避溢出。
- 1920×1080 与 1366×768 均执行 Playwright 横向溢出检查；中文 Home 在 1366×768 首屏完整，无纵向截断。
- 少量刻意保留的拉丁字符：品牌 `Aether / Aether OS`、`AI`、`Wi-Fi`、`Aether-5G`、`iOS / macOS`、版本/阶段号 `UI-0 / UI-1 / Q4 / v3`、技术文件名与代码路径。语言名称本身会跟随界面语言（中文界面显示「简体中文 / 英语」，English 界面显示「Simplified Chinese / English」），不属于未翻译 UI。

## 6. 双语截图

截图均由 Playwright 在真实渲染下生成：`docs/screenshots/ui-1.2/`。

- 中文：`zh/page-*.png`，英文：`en/page-*.png`；共 62 张 PNG（31 张中文 + 31 张 English），另有 `capture-metrics.json`。
- 覆盖 8 个主页面 × 1920×1080 / 1366×768
- 额外覆盖：组合窗口、Files / Command / Notes / Weather 窗口、Control Center、Notification Center、User Menu、完成的 Command 模拟计划、生成后的 Tasks 页面

关键入口：

- [中文 Home 1920](screenshots/ui-1.2/zh/page-home-1920.png)
- [English Home 1920](screenshots/ui-1.2/en/page-home-1920.png)
- [中文 Home 1366](screenshots/ui-1.2/zh/page-home-1366.png)
- [English Home 1366](screenshots/ui-1.2/en/page-home-1366.png)
- [中文 Settings（语言卡）](screenshots/ui-1.2/zh/page-settings-1920.png)
- [English Settings](screenshots/ui-1.2/en/page-settings-1920.png)
- [中文 Command Center 完成态计划](screenshots/ui-1.2/zh/command-plan-ready-1920.png)
- [English Command Center 完成态计划](screenshots/ui-1.2/en/command-plan-ready-1920.png)

## 7. 自动验证

- `npm run typecheck`：通过，0 errors。
- `npm run lint`：通过，0 errors / 0 warnings。
- `npm test`：4 个测试文件 / 19 tests 通过，其中 i18n 测试覆盖 key parity、占位符一致性、双语数据完整性和语言默认值。
- `npm run build`：通过，Vite 生产产物写入 `dist/`。
- `npm run test:e2e`：Playwright 在 Edge 下执行 46 项检查（1920×1080 与 1366×768）：**44 passed / 2 skipped / 0 failed**。2 个 skip 均为高度 ≤820px 才适用的首屏高度断言；Laptop 项目实际通过。
- 截图：62 张真实渲染截图，覆盖中文/英文 × 8 个主页面 × 2 个视口，以及窗口、Overlays 和完成态计划。
