"""
Helix configuration.
"""

from pydantic_settings import BaseSettings
from pathlib import Path
import os


class Settings(BaseSettings):
    """Application settings."""

    # Storage
    data_dir: Path = Path.home() / ".helix"

    # CORS
    cors_origins: list[str] = ["*"]

    # Ollama
    ollama_host: str = "http://localhost:11434"

    # LM Studio
    lmstudio_host: str = "http://localhost:1234"

    # llama.cpp
    llamacpp_host: str = "http://localhost:8080"

    # Monitor interval (seconds)
    monitor_interval: float = 1.0

    class Config:
        env_prefix = "HELIX_"


settings = Settings()
