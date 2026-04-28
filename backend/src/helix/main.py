"""
Helix - Multi-Model Local LLM Chat Platform

Backend main entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import socketio

from helix.api import models, chat, monitor, config
from helix.config import settings

# Configure logging
logger.add(
    "logs/helix.log",
    rotation="10 MB",
    retention="7 days",
    level="INFO",
)

# Create FastAPI app
app = FastAPI(
    title="Helix",
    description="Multi-Model Local LLM Chat Platform",
    version="0.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(models.router, prefix="/api/models", tags=["Models"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(monitor.router, prefix="/api/monitor", tags=["Monitor"])
app.include_router(config.router, prefix="/api/config", tags=["Config"])

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
)


@sio.event
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")


@sio.event
async def chat_message(sid, data):
    """Handle incoming chat messages via WebSocket."""
    # TODO: Implement chat handling
    await sio.emit("chat_response", {"status": "todo"}, to=sid)


@app.get("/")
async def root():
    return {
        "name": "Helix",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


# Mount Socket.IO
socket_app = socketio.ASGIApp(sio, app)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "helix.main:socket_app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
