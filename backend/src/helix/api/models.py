"""
Models API endpoints.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class ModelResponse(BaseModel):
    id: str
    name: str
    runtime: str
    size_mb: float = 0
    parameter_count: int = 0


class ModelStatusResponse(BaseModel):
    model_id: str
    loaded: bool
    memory_usage_mb: float = 0
    gpu_memory_mb: float = 0


@router.get("/")
async def list_runtimes():
    """
    List all connected model runtimes.

    TODO: Implement actual runtime discovery
    """
    return {
        "runtimes": [
            {"type": "ollama", "name": "Ollama", "status": "connected"},
            {"type": "lmstudio", "name": "LM Studio", "status": "disconnected"},
            {"type": "llamacpp", "name": "llama.cpp", "status": "disconnected"},
        ]
    }


@router.get("/{runtime}")
async def list_models(runtime: str):
    """
    List models from a specific runtime.

    TODO: Implement actual model listing
    """
    # Placeholder - will be replaced with actual adapter calls
    return {
        "runtime": runtime,
        "models": [
            {"id": "llama3.2", "name": "Llama 3.2", "size_mb": 1900, "parameter_count": 3000000000},
            {"id": "qwen2.5", "name": "Qwen 2.5", "size_mb": 4500, "parameter_count": 7000000000},
        ]
    }


@router.get("/{runtime}/{model_id}")
async def get_model(runtime: str, model_id: str):
    """Get model details."""
    # TODO: Implement
    return {
        "id": model_id,
        "runtime": runtime,
        "name": model_id,
        "status": "loaded" if "loaded" else "unloaded",
    }


@router.post("/{runtime}/{model_id}/load")
async def load_model(runtime: str, model_id: str):
    """Load a model into memory."""
    # TODO: Implement via adapter
    return {"status": "loading", "model_id": model_id}


@router.post("/{runtime}/{model_id}/unload")
async def unload_model(runtime: str, model_id: str):
    """Unload a model from memory."""
    # TODO: Implement via adapter
    return {"status": "unloaded", "model_id": model_id}


@router.get("/{runtime}/{model_id}/metrics")
async def get_model_metrics(runtime: str, model_id: str):
    """Get deep model metrics."""
    # TODO: Implement via monitor agent
    return {
        "model_id": model_id,
        "memory_usage_mb": 2048,
        "gpu_memory_mb": 1536,
        "kv_cache_usage": 0.35,
        "last_inference_ms": 45,
    }
