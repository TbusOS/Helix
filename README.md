# Helix

[English](#english) | [中文](#中文)

---

<a name="english"></a>

## Overview

**Helix** is an open-source multi-model local LLM chat platform that enables collaborative AI discussions across different model runtimes (Ollama, LM Studio, llama.cpp).

### Features

- **Multi-runtime support**: Connect to Ollama, LM Studio, or llama.cpp servers via unified adapters
- **5 Group Chat Modes**: Parallel responses, serial dialogue, role-based collaboration, and autonomous discussion
- **Deep Monitoring**: Real-time display of memory, GPU, parameters, quantization, and KV cache
- **Parameter Tuning**: Global, conversation-level, and model-level configuration
- **Plugin System**: Event-driven architecture for extensibility
- **Cross-platform**: Works on Linux, Windows, macOS

### Tech Stack

- **Backend**: Python (FastAPI + Socket.IO)
- **Frontend**: React + Vite + TypeScript
- **Design**: Anthropic Design System
- **Storage**: Local files (JSON/SQLite)

### Quick Start

```bash
# Clone
git clone https://github.com/TbusOS/Helix.git
cd Helix

# Backend
cd backend
pip install -r requirements.txt
uvicorn helix.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Documentation

- [Technical Specification](docs/specs/2026-04-28-helix-design.md)
- [Getting Started Guide](docs/guides/getting-started.md)
- [API Documentation](docs/api/openapi.yaml)

### Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### License

Apache License 2.0

---

<a name="中文"></a>

## 概述

**Helix** 是一个开源的多模型本地 LLM 聊天平台，支持通过不同的模型运行时（Ollama、LM Studio、llama.cpp）进行协作式 AI 讨论。

### 功能特点

- **多运行时支持**：通过统一适配器连接 Ollama、LM Studio 或 llama.cpp 服务器
- **5 种群聊模式**：并行响应、串行对话、角色分工、自主讨论
- **深度监控**：实时显示内存、GPU、参数、量化类型、KV Cache 等信息
- **参数调优**：全局、会话级、模型级三级配置
- **插件系统**：事件驱动的可扩展架构
- **跨平台**：支持 Linux、Windows、macOS

### 技术栈

- **后端**：Python (FastAPI + Socket.IO)
- **前端**：React + Vite + TypeScript
- **设计**：Anthropic Design System
- **存储**：本地文件（JSON/SQLite）

### 快速开始

```bash
# 克隆
git clone https://github.com/TbusOS/Helix.git
cd Helix

# 后端
cd backend
pip install -r requirements.txt
uvicorn helix.main:app --reload --port 8000

# 前端（新终端）
cd frontend
npm install
npm run dev
```

### 文档

- [技术规格说明](docs/specs/2026-04-28-helix-design.md)
- [入门指南](docs/guides/getting-started.md)
- [API 文档](docs/api/openapi.yaml)

### 参与贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献指南。

### 许可证

Apache License 2.0
