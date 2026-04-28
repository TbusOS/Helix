# Helix Backend

Multi-Model Local LLM Chat Platform Backend

## Quick Start

```bash
cd backend
pip install -r requirements.txt
uvicorn helix.main:app --reload --port 8000
```

## API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

```env
# Ollama (optional, for auto-detection)
OLLAMA_HOST=http://localhost:11434

# LM Studio (optional)
LMSTUDIO_HOST=http://localhost:1234

# llama.cpp server (optional)
LLAMACPP_HOST=http://localhost:8080

# Storage
HELIX_DATA_DIR=~/.helix
```
