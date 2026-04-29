# Helix

Multi-Model Local LLM Chat Platform

## 项目记忆

项目信息已保存在 `.claude/memory/helix-project-memory.md`。

## 快速开始

```bash
# 后端
cd backend
pip install -r requirements.txt
uvicorn helix.main:app --reload --port 8000

# 前端
cd frontend
npm install
npm run dev
```

## 设计系统

使用 Anthropic Design System：
- 路径: sky-skills/skills/anthropic-design
- CSS: docs/assets/anthropic.css

## 审查工具

```bash
/home/sky/github/sky-skills/bin/design-review --skill=anthropic --allow-monolingual docs/index.html
```

## 参考资料

- ai-doc: /home/sky/github/ai-doc/
- autoresearch 思想: /home/sky/github/ai-doc/self-improving-agents/autoresearch.md
