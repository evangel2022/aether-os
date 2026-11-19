# Aether OS 国际化评估与实施方案

> 状态：**方案已在 UI-1.2 实施完成**（本文保留为设计依据与迁移记录）。
> 实施详情、翻译覆盖率与双语截图见 [i18n-coverage.md](i18n-coverage.md)。
> 目标：中文（`zh-CN`）为默认语言，英文（`en-US`）为可选语言；保持现有布局、动效与交互测试稳定。

## 1. 现状评估

当前 UI 是完整的英文界面，文案主要分布在三个层级：

1. **界面文案**：8 个页面、4 个桌面 Overlay、2 个 Mini-App、窗口标题栏和 Dock Tooltip 中的标题、按钮、状态、帮助文本。
2. **演示数据**：Agent 名称/描述/活动、任务、文件、记忆、通知、系统信息等 Mock Data 内部还有大量英文内容。
3. **格式与术语**：日期、时间、相对时间（"5m ago"）、数量与复数（"2 agents"）、大小写标签（"CURRENT FOCUS"、"WORK IN MOTION"）、产品专有名词。

因此不能只替换 JSX 字符串。需要同时处理**文案、数据、日期/数字格式、字体排版与布局回归**。

当前基础是友好的：字体栈已经包含 `PingFang SC`、`Microsoft YaHei UI`，布局以 Flex/Grid 为主，多数卡片不是固定高度。主要风险是微标签的 `uppercase + letter-spacing`、部分固定宽度控件以及数据字符串无法直接翻译。

## 2. 推荐架构

采用**轻量、类型安全的本地消息字典**，不引入新的运行时 i18n 框架。两种语言、单一产品、无服务端，使用 React Context + TypeScript 已足够；如果未来需要翻译工作流或复数/日期能力，再评估 `i18next`。

```text
src/i18n/
├─ index.ts                  # locale 类型、Provider、useI18n、t()
├─ messages/
│  ├─ zh-CN.ts               # 默认语言
│  └─ en-US.ts
├─ format.ts                 # Intl 日期、时间、数字、相对时间
└─ glossary.ts               # 产品术语表（Agent / Memory / Command Center ...）
```

建议类型形状：

```ts
export type Locale = 'zh-CN' | 'en-US';

export interface Messages {
  nav: Record<PageId, string>;
  common: {
    open: string;
    close: string;
    demoData: string;
    simulated: string;
  };
  home: {
    greeting: (name: string, partOfDay: string) => string;
    commandTitle: string;
    commandPlaceholder: string;
  };
  // ...
}
```

- `I18nProvider`：保存 `locale`，写入 `document.documentElement.lang`，并被 `Settings` 的本地偏好持久化。
- `useI18n()`：提供 `t(key, params)`、`locale`、`setLocale`，不接受未定义的 key。
- **首次进入默认 `zh-CN`**；用户可在 Settings 中切换为 English，选择保存到现有 `localStorage` 设置对象。可选地跟随 `navigator.language` 仅在用户设置不存在时判断，但产品要求默认中文，因此首选项必须是显式中文。
- 所有可访问名称、窗口标题、Dock Tooltip 使用同一套 key，不复制英文硬编码。

## 3. 文案与数据分层

### 3.1 界面文案

按页面/功能区建立命名空间，而不是一个巨型字典：

`nav.*`、`home.*`、`command.*`、`agents.*`、`tasks.*`、`apps.*`、`files.*`、`memory.*`、`settings.*`、`windows.*`、`overlays.*`、`notes.*`、`weather.*`。

### 3.2 演示数据

Mock Data 中的可展示文案需要本地化，建议把数据内容与 UI 分离：

```ts
interface LocalizedText {
  'zh-CN': string;
  'en-US': string;
}

interface Agent {
  id: AgentId;
  name: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  // 数值、状态、日期类型保持语言无关
}
```

Agent 名称、任务标题与描述、文件名词与摘要、记忆内容、通知正文都需要双语版本；文件扩展名、大小、状态枚举等保持语言无关。这样不会出现“英文界面里混中文数据”或反过来的半本地化界面。

专有名词通过术语表统一，例如：

| 概念 | 中文建议 | English |
| --- | --- | --- |
| Agent | Agent（产品术语，或“智能体”统一选一个） | Agent |
| Command Center | Command Center（或“指挥中心”） | Command Center |
| Memory | 记忆 | Memory |
| Context | 上下文 | Context |
| Simulated plan | 模拟计划 | Simulated plan |
| Demo data | 演示数据 | Demo data |

建议保留 “Aether OS / Command Center / Agent” 等品牌/产品术语的英文形态，避免直译后品牌感下降；其余功能词用中文。

## 4. 日期、时间与数量

- 时间和日期统一使用 `Intl.DateTimeFormat(locale, ...)`：
  - `zh-CN`：24 小时制，例如 `01:44`、`11月20日 周五`。
  - `en-US`：现有格式，例如 `1:44 AM`、`FRI, NOV 20`。
- 相对时间（任务/活动/通知）由存储的时间戳 + `Intl.RelativeTimeFormat` 生成，例如“5 分钟前” / “5m ago”；不要把本地化后的字符串写死在 Mock Data。
- 数量与复数：中文使用“2 个工作、1 个等待中”；英文用 `Intl.PluralRules` 处理 `agent/agents`。
- 文件大小、CPU/存储百分比使用同一数字格式化函数，避免中文和英文各自拼接字符串。

## 5. 排版与布局适配

中文不是英文的“逐字替换”，需要同时调整排版规则：

1. **微标签**：现有 `.eyebrow`、`uppercase`、`tracking-[...]` 是 Latin 风格。中文下应取消 uppercase 并减少字距，例如：
   ```css
   :lang(zh-CN) .eyebrow {
     text-transform: none;
     letter-spacing: 0.05em;
   }
   ```
   同时为中文行高提高约 10–15%（正文 1.65–1.75），避免大写字母的视觉节奏直接套用到汉字上。
2. **字重与字体**：保留现有系统字体栈，中文优先 `PingFang SC` / `Microsoft YaHei UI` / `Noto Sans CJK SC`。不要用字符拉伸模拟粗体。
3. **按钮和徽章**：中文通常更短，但“模拟计划”“打开 Command Center”等混合术语可能更长。按钮用 `min-width + flex`，避免固定像素宽度；现有 `whitespace-nowrap` 需要保留在短按钮上，长按钮允许被容器挤压或改为图标 + Tooltip。
4. **固定宽度控件**：SearchField（188/250px）、通知面板（382px）、Control Center（344px）、User Menu（286px）、窗口默认宽度均为合理区间；中文下需检查换行和溢出，但不建议为了英文/中文分别硬编码两套尺寸，使用内容自适应 + 断点。
5. **多行文案**：页面描述、任务标题、记忆摘要、通知正文需要 `line-clamp` / 自适应行数；中文行数通常少于英文，但不要假设永远更短。
6. **窗口标题与 Dock Tooltip**：使用 `truncate` + Tooltip 保留完整文案，避免压缩窗口标题栏布局。
7. **双语文案截图**：至少在 1920×1080 与 1366×768 各生成中文/英文截图，并检查工具栏、过滤器、Card、Overlay、窗口标题。

## 6. 迁移步骤（建议作为 UI-1.2）

1. **建立 i18n 基础设施**：LocaleProvider、消息字典、`useI18n`、Intl 格式化函数；默认 `zh-CN`。
2. **先切导航与公共组件**：TopBar、SideNav、Dock、Window frame、Button/Badge 等，验证布局和字数变化。
3. **按页面迁移**：Home → Command → Agents/Tasks → Files/Memory → Apps/Settings → Notes/Weather；每完成一页就补充中英文截图与 Playwright 检查。
4. **本地化 Mock Data**：Agent、任务、记忆、文件、通知、系统信息全部双语化；保留数值和状态枚举。
5. **指令模拟模板双语化**：Command Center 的流程步骤与结果文案也属于产品文案，需要 key 化；模拟逻辑仍保持确定性，不调用模型。
6. **可访问性**：窗口标题、Dock、滤镜、表单控件、状态通知的 ARIA label 全部使用当前 locale。
7. **回归测试**：
   - 现有 30 个 Playwright 用例中涉及可见文案的断言改为 test id 或数据键；
   - 增加语言切换、无横向溢出、关键路径中英文双语运行；
   - 增加中文/英文截图基线（1920×1080 + 1366×768）。
8. **发布门禁**：`npm run typecheck`、`lint`、`test`、`build`、`test:e2e` 在两种语言下均通过。

## 7. 示例迁移对照

| 当前英文 | 建议中文 | 布局注意 |
| --- | --- | --- |
| A quiet start, Avery. | 夜深了，Avery。 / 早上好，Avery。 | 保持单行，不固定宽度 |
| What should we take care of? | 今天想完成什么？ | 主标题，允许窄屏智能换行 |
| Create a plan | 生成计划 | 按钮可缩短 |
| Plan a launch week | 规划发布周 | 快捷指令芯片宽度自适应 |
| No model called | 未调用模型 | 保持小号 Badge |
| In progress | 进行中 | 筛选器与行内状态共用 |
| Needs review | 待审核 | 筛选器按钮可能变长，需 wrap |
| 2 agents are moving work forward | 2 个 Agent 正在推进工作 | 中英文数字与量词处理不同 |
| Friday, November 20 | 11月20日 周五 | 使用 Intl，不手写 |
| Demo data | 演示数据 | 全局统一 |
| Cmd/Ctrl + K | Cmd/Ctrl + K（或按平台） | 保留快捷键语义 |

## 8. 风险与结论

- **高风险**：Mock Data 内英文内容量大；若只翻译 UI 会形成半英文体验。需要双语数据层。
- **中风险**：窗口/Overlay 宽度固定，中文长按钮和混合术语可能导致换行；需要中英文截图回归。
- **低风险**：字体栈已支持中文；日期/数量可以用原生 `Intl` 解决。
- **结论**：推荐采用“轻量类型化消息字典 + 双语演示数据 + Intl 格式化 + 语言感知排版”的方案，作为独立 UI-1.2 阶段实施；UI-1.2 已按此方案落地，实际覆盖为 687 个界面消息 key × 2 语言、369 个双语 Mock Data 字段，详见 [i18n-coverage.md](i18n-coverage.md)。
