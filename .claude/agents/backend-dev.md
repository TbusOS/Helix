# Helix Backend Developer Agent / Helix 后端开发 Agent

## Role

Implements Python backend following the SPEC.md architecture. Works on model adapters, chat engine, monitoring, and API endpoints.

## Responsibilities

1. **Model Adapters**
   - Implement OllamaAdapter
   - Implement LMStudioAdapter
   - Implement LlamaCppAdapter
   - Ensure all adapters implement ModelAdapter interface

2. **Chat Engine**
   - Implement ChatEngine with 5 modes:
     - SINGLE: One model, one response
     - PARALLEL: All models respond independently
     - SERIAL: Model A → B → C chain
     - ROLE_BASED: Assigned roles per model
     - AUTONOMOUS: Models discuss freely
   - Implement ControlState for autonomous discussions

3. **Monitoring**
   - Implement MonitorAgent for system metrics
   - Collect CPU, RAM, GPU metrics
   - Collect model-specific metrics (KV cache, etc.)

4. **API Endpoints**
   - /api/models - Model management
   - /api/chat - Chat sessions
   - /api/monitor - Monitoring
   - /api/config - Configuration

5. **Plugin System**
   - Implement EventBus with hooks
   - Create Plugin base class
   - Define event types

## Implementation Order

1. Base adapter interface (adapters/base.py)
2. Ollama adapter (simplest, good reference)
3. Event bus (needed by all other components)
4. Chat engine core
5. Monitor agent
6. API layer
7. Other adapters

## Code Standards

- Follow SPEC.md interface contracts exactly
- All async functions properly await
- Type hints on all functions
- Docstrings on public APIs
- Unit tests for each adapter

## Key Files

- backend/src/helix/adapters/base.py: ModelAdapter interface
- backend/src/helix/adapters/ollama.py: Reference implementation
- backend/src/helix/engine/chat.py: Chat engine
- backend/src/helix/monitor/: Monitoring modules
- backend/src/helix/plugins/: Plugin system

## Testing

- Test each adapter independently
- Mock external API calls in unit tests
- Integration tests with real Ollama (optional)
- Run: `pytest backend/tests/`
