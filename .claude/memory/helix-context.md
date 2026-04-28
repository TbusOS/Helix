# Helix Project Memory / Helix 项目记忆

This file stores project context for future Claude Code sessions. Read this first when resuming work on Helix.

## Project Overview

**Helix** is an open-source multi-model local LLM chat platform that enables collaborative AI discussions across different model runtimes (Ollama, LM Studio, llama.cpp).

### Core Features
- Multi-runtime support (Ollama/LM Studio/llama.cpp)
- 5 Group chat modes: Parallel, Serial, Role-based, Autonomous discussion
- Deep monitoring: CPU, RAM, GPU, parameters, KV cache, quantization
- Parameter tuning: Global, conversation, model-level
- Plugin system with event-driven architecture
- Cross-platform: Linux, Windows, macOS; local/LAN/remote deployment

### Tech Stack
- Backend: Python (FastAPI + Socket.IO)
- Frontend: React + Vite + TypeScript
- Styling: Anthropic Design System
- Storage: JSON/SQLite + optional cloud sync

### Repository
- GitHub: git@github.com:TbusOS/Helix.git
- License: Apache 2.0

## Key Decisions Made

1. **Name**: Helix (DNA spiral concept - multi-model collaboration)
2. **Architecture**: Plugin-based model adapters with unified interface
3. **Communication**: Adaptive (WebSocket/SSE/Polling based on connection)
4. **Plugin System**: Event bus with hooks (pre_generate, post_generate, etc.)
5. **Design Style**: Anthropic Design (warm cream, orange accent, Poppins + Lora fonts)

## Reference Projects

- **ai-doc** (/home/sky/github/ai-doc/): Reference for documentation structure and multi-agent patterns
  - Key file: agent-patterns/anthropic-multi-agent-research.md (multi-agent architecture)
  - Key file: CONTRIBUTING.md (bilingual contribution guidelines)

## Current Status

- [x] Project structure created
- [x] SPEC.md (technical specification) written
- [x] GitHub Pages landing page created (bilingual zh/en)
- [ ] Backend implementation (pending)
- [ ] Frontend implementation (pending)
- [ ] Plugin system (pending)

## Development Team

See `.claude/agents/` for agent definitions:
- architect.md: System architecture decisions
- backend-dev.md: Backend development tasks
- frontend-dev.md: Frontend development tasks
- qa.md: Testing and quality assurance

## Important Files

| File | Purpose |
|------|---------|
| SPEC.md | Full technical specification |
| docs/specs/2026-04-28-helix-design.md | Detailed design document |
| frontend/public/index.html | GitHub Pages landing page |
| CLAUDE.md | Project overview and commands |

## Design Principles

1. **Plugin-first**: All model runtimes are plugins with common interface
2. **Adaptive comms**: Auto-select WebSocket/SSE/poll based on connection
3. **Separation**: Frontend-backend complete separation
4. **Extensibility**: New features via plugin system and event bus
5. **Cross-platform**: Works on Linux, Windows, macOS

## Related Skills

- sky-skills/skills/anthropic-design: For frontend UI development
- sky-skills/skills/design-review: For design quality assurance
- ai-doc: For multi-agent patterns reference
