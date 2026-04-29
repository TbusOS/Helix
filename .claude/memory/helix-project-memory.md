---
name: helix-project-memory
description: Helix 项目记忆，下次打开项目时加载
type: project
---

# Helix 项目记忆

**GitHub**: https://github.com/TbusOS/Helix
**名称**: Helix（DNA 双螺旋，象征多模型协作）

## 核心功能

- 多运行时支持（Ollama / LM Studio / llama.cpp）
- 5 种群聊模式：并行、串行、角色分工、自主讨论
- 深度监控：CPU / GPU / 内存 / KV Cache / 量化信息
- 三级参数配置：全局 / 会话 / 模型
- 插件系统：事件驱动架构
- 跨平台部署：本地 / 局域网 / 远程

## 技术栈

- 后端：Python (FastAPI + Socket.IO)
- 前端：React + Vite + TypeScript
- 设计：Anthropic Design System（sky-skills/skills/anthropic-design）
- 存储：JSON/SQLite + 可选云同步

## 架构要点

1. **插件式模型适配器**：统一 ModelAdapter 接口
2. **自适应通信**：WebSocket / SSE / 轮询自动选择
3. **事件驱动插件**：EventBus + Hooks (pre_generate, post_generate, on_metrics, on_chat_event)
4. **前后端完全分离**：REST API + WebSocket

## 开发模式

- 使用 ai-doc 的贡献指南作为参考
- 参考 autoresearch 思想（Karpathy）设计自主讨论模式
- 多 Agent 团队协作：architect / backend-dev / frontend-dev / qa

## 重要文件

| 文件 | 用途 |
|------|------|
| SPEC.md | 技术规格说明 |
| docs/specs/2026-04-28-helix-design.md | 详细设计文档 |
| docs/index.html | GitHub Pages 主页 |
| .claude/agents/ | Agent 团队定义 |

## 设计教训（重要）

- SVG 布局必须对称对齐，viewBox 要足够大容纳所有元素
- 容器类必须和 base 类一起用：`class="anth-container anth-container--wide"`
- SVG 居中需要同时设置 `width` + `margin: auto`，不能只靠 `width: 100%`
- design-review 只检测结构和渲染，无法检测布局逻辑错误
- anthropic-design CSS 缺失的类需要补充到 anthropic.css

## 审查工具

使用 sky-skills 的 design-review：
```bash
cd /home/sky/github/helix
/home/sky/github/sky-skills/bin/design-review --skill=anthropic --allow-monolingual docs/index.html
```

## 参考项目

- ai-doc: /home/sky/github/ai-doc/
- sky-skills: /home/sky/github/sky-skills/
