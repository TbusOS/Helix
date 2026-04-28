# Helix - Multi-Model Local LLM Chat Platform

## Project Overview

**Helix** is an open-source platform for local LLM deployment, multi-model group chat, and collaborative AI discussions. It supports multiple model runtimes (Ollama, LM Studio, llama.cpp), real-time monitoring, and autonomous multi-agent discussions.

## Tech Stack

- **Backend**: Python (FastAPI + Socket.IO)
- **Frontend**: React + Vite + TypeScript
- **Styling**: Anthropic Design System
- **Real-time**: WebSocket / SSE / Polling (adaptive)
- **Storage**: Local files (JSON/SQLite) + optional cloud sync

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│    React + Vite + TypeScript + Anthropic Design             │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API + WebSocket/SSE
┌─────────────────────▼───────────────────────────────────────┐
│                      Backend (Python)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ Model       │  │ Chat        │  │ Monitor         │   │
│  │ Adapters    │  │ Engine      │  │ Agent           │   │
│  │ (Ollama/    │  │ (Multi-mode │  │ (System metrics │   │
│  │  LM Studio/ │  │  group chat)│  │  collection)   │   │
│  │  llama.cpp) │  │             │  │                 │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ Plugin      │  │ Config      │  │ Storage         │   │
│  │ System      │  │ Manager     │  │ Layer           │   │
│  │ (Event bus) │  │             │  │ (Local/Cloud)   │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

1. **Multi-Runtime Support**: Ollama, LM Studio, llama.cpp via plugin adapters
2. **Group Chat Modes**: Parallel responses, serial dialogue, role-based, autonomous discussion
3. **Deep Monitoring**: Memory, GPU, parameters, KV cache, quantization info
4. **Parameter Tuning**: Global, conversation-level, model-level configuration
5. **Plugin System**: Event-driven architecture for extensibility
6. **Cross-Platform**: Linux, Windows, macOS; local, LAN, remote deployment

## Development Team

- **Architect**: Responsible for system design and technical decisions
- **Backend Developer**: Python FastAPI, model adapters, monitoring
- **Frontend Developer**: React, TypeScript, Anthropic UI
- **QA Engineer**: Testing, documentation

## Commands

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Repository Structure

```
helix/
├── docs/           # Documentation
│   ├── specs/      # Technical specifications
│   ├── guides/     # User guides
│   └── api/        # API documentation
├── backend/        # Python FastAPI backend
├── frontend/       # React + Vite frontend
├── scripts/        # Utility scripts
└── .claude/        # Claude Code config
```

## Design Principles

1. **Plugin-first**: All model runtimes are plugins with a common interface
2. **Adaptive communication**: Auto-select WebSocket/SSE/poll based on connection
3. **Separation of concerns**: Frontend-backend complete separation
4. **Extensibility**: New features via plugin system and event bus
5. **Cross-platform**: Works on Linux, Windows, macOS
6. **Deployment flexibility**: Local, LAN, remote server modes
