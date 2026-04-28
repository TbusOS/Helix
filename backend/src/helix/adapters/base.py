"""
Model adapter base interface.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum
from typing import AsyncGenerator


class RuntimeType(Enum):
    """Supported model runtime types."""
    OLLAMA = "ollama"
    LMSTUDIO = "lmstudio"
    LLAMACPP = "llamacpp"


@dataclass
class ModelInfo:
    """Model information."""
    id: str
    name: str
    runtime: RuntimeType
    size_mb: float = 0
    parameter_count: int = 0
    quantization: str = ""
    context_length: int = 2048


@dataclass
class ModelStatus:
    """Model loading status."""
    model_id: str
    loaded: bool
    memory_usage_mb: float = 0
    gpu_memory_mb: float = 0
    last_used: float = 0


@dataclass
class GenerationParams:
    """Generation parameters."""
    temperature: float = 0.7
    top_p: float = 0.9
    top_k: int = 40
    max_tokens: int = 2048
    repeat_penalty: float = 1.1
    stop: list[str] = field(default_factory=list)
    seed: int | None = None


@dataclass
class ModelMetrics:
    """Deep model metrics."""
    model_id: str
    memory_usage_mb: float
    gpu_memory_mb: float
    kv_cache_usage: float
    last_inference_ms: float
    total_requests: int = 0
    total_tokens: int = 0


class ModelAdapter(ABC):
    """Base class for all model adapters."""

    @property
    @abstractmethod
    def runtime(self) -> RuntimeType:
        """Return the runtime type."""
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        """Return adapter name."""
        pass

    @abstractmethod
    async def list_models(self) -> list[ModelInfo]:
        """List available models."""
        pass

    @abstractmethod
    async def get_model_status(self, model_id: str) -> ModelStatus:
        """Get model load status."""
        pass

    @abstractmethod
    async def load_model(self, model_id: str, **kwargs) -> bool:
        """Load model into memory."""
        pass

    @abstractmethod
    async def unload_model(self, model_id: str) -> bool:
        """Unload model from memory."""
        pass

    @abstractmethod
    async def generate(
        self,
        model_id: str,
        prompt: str,
        params: GenerationParams,
    ) -> AsyncGenerator[str, None]:
        """Stream generation response."""
        pass

    @abstractmethod
    async def get_metrics(self, model_id: str) -> ModelMetrics:
        """Get detailed model metrics."""
        pass

    async def health_check(self) -> bool:
        """Check if runtime is accessible."""
        return True
