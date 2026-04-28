"""
Config API endpoints.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class GenerationParams(BaseModel):
    temperature: float = 0.7
    top_p: float = 0.9
    top_k: int = 40
    max_tokens: int = 2048
    repeat_penalty: float = 1.1
    stop: list[str] = []
    seed: Optional[int] = None


@router.get("/global")
async def get_global_config():
    """Get global generation parameters."""
    return GenerationParams()


@router.put("/global")
async def update_global_config(params: GenerationParams):
    """Update global generation parameters."""
    # TODO: Persist to storage
    return {"status": "updated", "config": params}


@router.get("/model/{model_id}")
async def get_model_config(model_id: str):
    """Get model-specific configuration."""
    # TODO: Retrieve from storage
    return {"model_id": model_id, "config": None}


@router.put("/model/{model_id}")
async def update_model_config(model_id: str, params: GenerationParams):
    """Bind configuration to a specific model."""
    # TODO: Persist to storage
    return {"status": "updated", "model_id": model_id, "config": params}


@router.post("/export")
async def export_config():
    """Export all configurations."""
    # TODO: Implement export
    return {"status": "exported", "path": "~/.helix/config.json"}


@router.post("/import")
async def import_config():
    """Import configurations from file."""
    # TODO: Implement import
    return {"status": "imported"}
