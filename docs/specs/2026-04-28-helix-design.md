# Helix Technical Specification

**Version**: 0.1.0
**Date**: 2026-04-28
**Status**: Draft

---

## 1. Project Vision

**Helix** is an open-source platform that enables seamless local LLM deployment, multi-model collaborative chat, and autonomous AI discussions. It provides a unified interface for managing multiple local models across different runtimes (Ollama, LM Studio, llama.cpp), with deep system monitoring and flexible group chat capabilities.

### Core Value Propositions

1. **One Platform, All Runtimes**: Connect to Ollama, LM Studio, or llama.cpp servers via a unified adapter system
2. **Collaborative Intelligence**: Multiple models can discuss, debate, and collaborate on problems
3. **Full Transparency**: Real-time monitoring of memory, GPU, parameters, and model internals
4. **Zero Lock-in**: Deploy locally, on LAN, or connect to remote servers
5. **Infinite Extensibility**: Plugin system for new features and model runtimes

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend                                  │
│   React 18 + Vite + TypeScript + Anthropic Design System        │
│   - Model Management UI                                          │
│   - Chat Interface (single/group)                                │
│   - Parameter Tuning Panel                                      │
│   - Monitoring Dashboard                                         │
│   - Plugin Management                                            │
└───────────────────────┬─────────────────────────────────────────┘
                        │ REST API (JSON) + WebSocket/SSE
┌───────────────────────▼─────────────────────────────────────────┐
│                         Backend (Python)                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    API Layer (FastAPI)                      │  │
│  │  /api/models  /api/chat  /api/monitor  /api/config        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   Model      │  │    Chat      │  │      Monitor         │   │
│  │   Adapters   │  │    Engine    │  │      Agent           │   │
│  │              │  │              │  │                      │   │
│  │ - Ollama     │  │ - Single     │  │ - psutil (CPU/RAM)   │   │
│  │ - LM Studio  │  │ - Parallel   │  │ - pynvml (GPU)      │   │
│  │ - llama.cpp  │  │ - Serial     │  │ - Runtime APIs      │   │
│  │ - Plugin API │  │ - Role-based │  │ - Deep metrics      │   │
│  │              │  │ - Autonomous │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │    Plugin    │  │    Config    │  │      Storage         │   │
│  │    System    │  │    Manager   │  │       Layer          │   │
│  │              │  │              │  │                      │   │
│  │ - Event Bus  │  │ - Global     │  │ - Local FS (JSON)   │   │
│  │ - Hooks      │  │ - Conv-level │  │ - SQLite (optional)  │   │
│  │ - Registry   │  │ - Model-bind │  │ - Cloud sync API    │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Communication Protocols

| Mode | Trigger Condition | Use Case |
|------|-------------------|----------|
| WebSocket | Full-duplex needed, low latency | Real-time chat, streaming responses |
| SSE | Server-push dominant | Monitoring updates, notifications |
| HTTP Polling | Firewall/restricted networks | Remote connections, simple queries |

---

## 3. Module Specifications

### 3.1 Model Adapter System

**Purpose**: Unified interface for different LLM runtimes.

```python
class ModelAdapter(ABC):
    """Base class for all model adapters."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Adapter name (e.g., 'ollama', 'lmstudio')."""
        pass

    @property
    @abstractmethod
    def supported_endpoints(self) -> list[str]:
        """List of API endpoints this adapter implements."""
        pass

    @abstractmethod
    async def list_models(self) -> list[ModelInfo]:
        """List available models."""
        pass

    @abstractmethod
    async def get_model_status(self, model_id: str) -> ModelStatus:
        """Get model load status and metadata."""
        pass

    @abstractmethod
    async def load_model(self, model_id: str, **kwargs) -> bool:
        """Load a model into memory."""
        pass

    @abstractmethod
    async def unload_model(self, model_id: str) -> bool:
        """Unload a model from memory."""
        pass

    @abstractmethod
    async def generate(self, model_id: str, prompt: str, params: GenerationParams) -> AsyncGenerator[str, None]:
        """Stream generation response."""
        pass

    @abstractmethod
    async def get_metrics(self, model_id: str) -> ModelMetrics:
        """Get detailed model metrics."""
        pass
```

#### Supported Adapters

| Adapter | Runtime | Features |
|---------|---------|----------|
| `OllamaAdapter` | Ollama | Full API support, model management |
| `LMStudioAdapter` | LM Studio | API compatibility layer |
| `LlamaCppAdapter` | llama.cpp server | Direct GGUF support |

### 3.2 Chat Engine

**Purpose**: Handle different conversation modes.

```python
class ChatEngine:
    """Manages chat sessions and group chat modes."""

    class Mode(Enum):
        SINGLE = "single"           # One model, one response
        PARALLEL = "parallel"       # All models respond independently
        SERIAL = "serial"           # Model A → B → C chain
        ROLE_BASED = "role_based"   # Assigned roles per model
        AUTONOMOUS = "autonomous"   # Models discuss freely

    class ControlState:
        """Runtime control state for autonomous discussions."""
        max_turns: int              # Maximum discussion rounds
        topic_anchor: str | None    # Topic constraint
        is_paused: bool              # Pause state
        active_models: set[str]     # Currently participating models
        turn_count: int             # Current turn number

    async def create_session(self, mode: Mode, model_ids: list[str]) -> str:
        """Create a new chat session."""
        pass

    async def send_message(self, session_id: str, message: str) -> AsyncGenerator[ChatEvent, None]:
        """Send message and stream responses."""
        pass

    async def pause(self, session_id: str) -> None:
        """Pause autonomous discussion."""
        pass

    async def resume(self, session_id: str) -> None:
        """Resume paused discussion."""
        pass

    async def add_model(self, session_id: str, model_id: str) -> None:
        """Add model to active session."""
        pass

    async def remove_model(self, session_id: str, model_id: str) -> None:
        """Remove model from active session."""
        pass
```

### 3.3 Monitor Agent

**Purpose**: Collect and report system metrics.

```python
class MonitorAgent:
    """System metrics collector with deep monitoring support."""

    class MetricType(Enum):
        CPU = "cpu"
        MEMORY = "memory"
        GPU = "gpu"
        MODEL_PARAMS = "model_params"
        KV_CACHE = "kv_cache"
        QUANTIZATION = "quantization"

    @dataclass
    class SystemMetrics:
        """Comprehensive system metrics."""
        # CPU
        cpu_percent: float
        cpu_threads: int

        # Memory
        ram_total: int
        ram_used: int
        ram_available: int

        # GPU (if available)
        gpu_available: bool
        gpu_name: str | None
        gpu_memory_total: int
        gpu_memory_used: int
        gpu_utilization: float

    @dataclass
    class ModelMetrics:
        """Deep model metrics."""
        model_id: str
        model_name: str
        model_size_mb: float
        parameter_count: int
        quantization_type: str  # Q4_0, Q8_0, F16, etc.
        context_length: int
        loaded: bool
        memory_usage_mb: float
        kv_cache_usage: float
        last_inference_ms: float

    async def collect_system_metrics(self) -> SystemMetrics:
        """Collect current system metrics."""
        pass

    async def collect_model_metrics(self, adapter: ModelAdapter, model_id: str) -> ModelMetrics:
        """Collect model-specific metrics via adapter."""
        pass

    async def start_monitoring(self, interval: float = 1.0) -> AsyncIterator[dict]:
        """Start continuous monitoring stream."""
        pass
```

### 3.4 Plugin System

**Purpose**: Extensible event-driven architecture.

```python
class EventBus:
    """Central event bus for plugin communication."""

    class Event(Enum):
        MODEL_LOADED = "model:loaded"
        MODEL_UNLOADED = "model:unloaded"
        CHAT_STARTED = "chat:started"
        CHAT_ENDED = "chat:ended"
        MESSAGE_SENT = "message:sent"
        MESSAGE_RECEIVED = "message:received"
        METRICS_UPDATED = "metrics:updated"
        PLUGIN_REGISTERED = "plugin:registered"

    def subscribe(self, event: Event, handler: Callable) -> str:
        """Subscribe to an event. Returns subscription ID."""
        pass

    def unsubscribe(self, subscription_id: str) -> None:
        """Unsubscribe from an event."""
        pass

    async def emit(self, event: Event, data: dict) -> None:
        """Emit an event to all subscribers."""
        pass


class Plugin(ABC):
    """Base class for Helix plugins."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Plugin unique name."""
        pass

    @property
    @abstractmethod
    def version(self) -> str:
        """Plugin version."""
        pass

    async def on_load(self, event_bus: EventBus) -> None:
        """Called when plugin is loaded."""
        pass

    async def on_unload(self) -> None:
        """Called when plugin is unloaded."""
        pass
```

#### Built-in Plugin Hooks

| Hook | Trigger | Use Case |
|------|---------|----------|
| `pre_generate` | Before model generation | Add prompt preprocessing |
| `post_generate` | After model generation | Response filtering, logging |
| `on_metrics` | On metrics update | Custom alerting, export |
| `on_chat_event` | Chat state changes | Integrations, notifications |

### 3.5 Parameter Configuration System

**Purpose**: Hierarchical parameter management.

```python
class ConfigManager:
    """Hierarchical configuration: Global → Conversation → Model."""

    @dataclass
    class GenerationParams:
        """LLM generation parameters."""
        temperature: float = 0.7
        top_p: float = 0.9
        top_k: int = 40
        max_tokens: int = 2048
        repeat_penalty: float = 1.1
        stop: list[str] = field(default_factory=list)
        seed: int | None = None

    def get_global_config(self) -> GenerationParams:
        """Get global default parameters."""
        pass

    def set_global_config(self, params: GenerationParams) -> None:
        """Update global default parameters."""
        pass

    def get_conversation_config(self, conv_id: str) -> GenerationParams | None:
        """Get conversation-level override."""
        pass

    def set_conversation_config(self, conv_id: str, params: GenerationParams) -> None:
        """Set conversation-level override."""
        pass

    def get_model_config(self, model_id: str) -> GenerationParams | None:
        """Get model-specific configuration."""
        pass

    def bind_model_config(self, model_id: str, params: GenerationParams) -> None:
        """Bind a configuration to a specific model."""
        pass

    def resolve_params(self, conv_id: str | None, model_id: str | None) -> GenerationParams:
        """
        Resolve effective parameters with precedence:
        Model Config > Conversation Config > Global Config
        """
        pass

    def export_config(self, path: Path) -> None:
        """Export all configurations to file."""
        pass

    def import_config(self, path: Path) -> None:
        """Import configurations from file."""
        pass
```

### 3.6 Storage Layer

**Purpose**: Persistent storage with sync capability.

```python
class StorageLayer:
    """Multi-backend storage with sync support."""

    class Backend(Enum):
        LOCAL_FS = "local_fs"
        SQLITE = "sqlite"
        CLOUD_SYNC = "cloud_sync"

    # Data models
    class ChatHistory(BaseModel):
        id: str
        title: str
        mode: str
        model_ids: list[str]
        messages: list[Message]
        created_at: datetime
        updated_at: datetime

    class ModelConfig(BaseModel):
        id: str
        name: str
        adapter: str
        endpoint: str
        default_params: dict

    async def save_chat(self, chat: ChatHistory) -> None:
        """Save chat history."""
        pass

    async def load_chat(self, chat_id: str) -> ChatHistory | None:
        """Load chat history."""
        pass

    async def list_chats(self, limit: int = 50) -> list[ChatHistory]:
        """List recent chats."""
        pass

    async def export_chat(self, chat_id: str, format: str) -> bytes:
        """Export chat in specified format (json/markdown/html)."""
        pass

    async def sync_to_cloud(self, endpoint: str, api_key: str) -> None:
        """Sync local data to cloud endpoint."""
        pass
```

---

## 4. API Specification

### 4.1 Model Management

```
GET    /api/models                 # List all connected runtimes
GET    /api/models/:runtime        # List models from specific runtime
GET    /api/models/:runtime/:id    # Get model details
POST   /api/models/:runtime/:id/load   # Load model
POST   /api/models/:runtime/:id/unload # Unload model
GET    /api/models/:runtime/:id/metrics # Get deep metrics
```

### 4.2 Chat

```
POST   /api/chat/sessions          # Create chat session
GET    /api/chat/sessions          # List sessions
GET    /api/chat/sessions/:id      # Get session details
DELETE /api/chat/sessions/:id      # Delete session
POST   /api/chat/sessions/:id/send # Send message (SSE stream)
WS     /ws/chat/:id                # WebSocket for real-time chat
```

### 4.3 Monitoring

```
GET    /api/monitor/system          # Get system metrics (one-shot)
GET    /api/monitor/model/:id      # Get model metrics
SSE    /sse/monitor                # Stream metrics updates
```

### 4.4 Configuration

```
GET    /api/config/global           # Get global config
PUT    /api/config/global           # Update global config
GET    /api/config/model/:id       # Get model config
PUT    /api/config/model/:id       # Update model config
POST   /api/config/export          # Export all configs
POST   /api/config/import          # Import configs
```

### 4.5 Plugins

```
GET    /api/plugins                 # List plugins
POST   /api/plugins                # Install plugin
DELETE /api/plugins/:name         # Uninstall plugin
GET    /api/plugins/:name/status   # Get plugin status
```

---

## 5. Deployment Modes

### 5.1 Local Mode

```
┌─────────────────┐
│   Helix Server  │  localhost:8000
│   + Ollama      │  localhost:11434
└─────────────────┘
```

### 5.2 LAN Mode

```
┌─────────────────┐         ┌─────────────────┐
│   Helix Server  │◄───────►│   Ollama/LM      │
│   (192.168.x.x) │  LAN    │   Studio Server  │
└─────────────────┘         └─────────────────┘
        │
        ▼
┌─────────────────┐
│   Browser UI    │  Any device on LAN
└─────────────────┘
```

### 5.3 Remote Mode

```
┌─────────────────┐         ┌─────────────────┐
│   Helix Server  │◄───────►│   Remote Model  │
│   (Cloud/VPS)   │  HTTPS  │   Provider      │
└─────────────────┘         └─────────────────┘
        │
        ▼
┌─────────────────┐
│   Browser UI    │  Any device with internet
└─────────────────┘
```

---

## 6. Frontend Architecture

### 6.1 Page Structure

```
/                       # Landing page (GitHub Pages)
/app                    # Main application
  /models              # Model management
  /chat                # Chat interface
  /monitor             # Monitoring dashboard
  /settings            # Configuration
```

### 6.2 Key Components

| Component | Description |
|-----------|-------------|
| `ModelCard` | Display model info, status, quick actions |
| `ModelMonitor` | Real-time metrics visualization |
| `ChatPanel` | Message list with streaming support |
| `GroupChatView` | Multi-model chat with mode selection |
| `ParamSlider` | Reusable parameter adjustment control |
| `MetricsChart` | Real-time line/bar charts |

### 6.3 State Management

Using Zustand for global state:

```typescript
interface AppState {
  // Connection
  connectionMode: 'local' | 'lan' | 'remote';
  serverUrl: string;

  // Models
  runtimes: Runtime[];
  loadedModels: Map<string, ModelStatus>;

  // Chat
  activeSession: ChatSession | null;
  messages: Message[];
  streaming: boolean;

  // Monitor
  systemMetrics: SystemMetrics | null;
  modelMetrics: Map<string, ModelMetrics>;

  // Config
  globalParams: GenerationParams;
  modelConfigs: Map<string, GenerationParams>;

  // UI
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}
```

---

## 7. Roadmap

### Phase 1: Core Foundation (v0.1.0 - v0.2.0)
- [x] Project structure and documentation
- [ ] Ollama adapter implementation
- [ ] Basic chat interface
- [ ] Simple parameter tuning

### Phase 2: Multi-Runtime Support (v0.3.0 - v0.4.0)
- [ ] LM Studio adapter
- [ ] llama.cpp adapter
- [ ] Plugin system foundation
- [ ] Event bus implementation

### Phase 3: Advanced Chat (v0.5.0 - v0.6.0)
- [ ] Parallel response mode
- [ ] Serial dialogue mode
- [ ] Role-based mode
- [ ] Autonomous discussion engine

### Phase 4: Monitoring & Analytics (v0.7.0 - v0.8.0)
- [ ] Deep metrics collection
- [ ] Real-time dashboard
- [ ] GPU monitoring
- [ ] Model comparison tools

### Phase 5: Extensibility (v0.9.0 - v1.0.0)
- [ ] Plugin marketplace
- [ ] Chat export (JSON/Markdown/HTML)
- [ ] Cloud sync
- [ ] Model benchmarking

---

## 8. File Structure

```
helix/
├── CLAUDE.md                    # Project documentation
├── SPEC.md                      # This file
├── README.md                    # Quick start guide
├── LICENSE                      # Apache 2.0
├── .gitignore
├── pyproject.toml               # Python project config
├── requirements.txt             # Python dependencies
├── docker-compose.yml           # Docker deployment
│
├── docs/
│   ├── specs/
│   │   └── 2026-04-28-helix-design.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── deployment.md
│   │   └── plugins.md
│   └── api/
│       └── openapi.yaml
│
├── backend/
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── src/
│   │   └── helix/
│   │       ├── __init__.py
│   │       ├── main.py              # FastAPI app
│   │       ├── config.py            # Configuration
│   │       ├── api/
│   │       │   ├── __init__.py
│   │       │   ├── models.py         # Model endpoints
│   │       │   ├── chat.py          # Chat endpoints
│   │       │   ├── monitor.py       # Monitor endpoints
│   │       │   └── config.py        # Config endpoints
│   │       ├── adapters/
│   │       │   ├── __init__.py
│   │       │   ├── base.py          # Base adapter
│   │       │   ├── ollama.py        # Ollama adapter
│   │       │   ├── lmstudio.py      # LM Studio adapter
│   │       │   └── llamacpp.py      # llama.cpp adapter
│   │       ├── engine/
│   │       │   ├── __init__.py
│   │       │   ├── chat.py          # Chat engine
│   │       │   └── modes.py         # Chat modes
│   │       ├── monitor/
│   │       │   ├── __init__.py
│   │       │   ├── system.py        # System metrics
│   │       │   └── model.py         # Model metrics
│   │       ├── plugins/
│   │       │   ├── __init__.py
│   │       │   ├── registry.py      # Plugin registry
│   │       │   └── events.py        # Event bus
│   │       └── storage/
│   │           ├── __init__.py
│   │           ├── json_store.py    # JSON storage
│   │           └── sqlite_store.py  # SQLite storage
│   └── tests/
│       ├── __init__.py
│       ├── test_adapters.py
│       ├── test_engine.py
│       └── test_api.py
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── api/
│   │   │   ├── client.ts           # API client
│   │   │   ├── models.ts
│   │   │   ├── chat.ts
│   │   │   └── monitor.ts
│   │   ├── stores/
│   │   │   ├── appStore.ts         # Zustand store
│   │   │   └── chatStore.ts
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Models/
│   │   │   ├── Chat/
│   │   │   ├── Monitor/
│   │   │   └── common/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Models.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── Monitor.tsx
│   │   │   └── Settings.tsx
│   │   └── hooks/
│   │       ├── useApi.ts
│   │       ├── useWebSocket.ts
│   │       └── useSSE.ts
│   └── public/
│       └── index.html
│
├── scripts/
│   ├── install.sh                 # Installation script
│   ├── build-docker.sh            # Docker build
│   └── benchmark.py               # Model benchmarking
│
└── .claude/
    ├── settings.json              # Claude Code settings
    ├── agents/
    │   ├── architect.md
    │   ├── backend-dev.md
    │   ├── frontend-dev.md
    │   └── qa.md
    └── memory/
        └── helix-context.md
```

---

## 9. Success Criteria

1. **Functionality**: All chat modes work correctly with streaming responses
2. **Performance**: Frontend loads in < 2s, API response < 100ms
3. **Compatibility**: Works with Ollama v0.1+, LM Studio v0.2+, llama.cpp server
4. **Extensibility**: New adapters can be added without modifying core code
5. **Usability**: Non-technical users can set up and use within 10 minutes
6. **Monitoring**: All specified metrics are visible in real-time
7. **Design**: Anthropic Design System applied consistently
