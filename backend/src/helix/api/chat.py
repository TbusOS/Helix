"""
Chat API endpoints.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Literal

router = APIRouter()


class ChatMode(str, Literal):
    SINGLE = "single"
    PARALLEL = "parallel"
    SERIAL = "serial"
    ROLE_BASED = "role_based"
    AUTONOMOUS = "autonomous"


class CreateSessionRequest(BaseModel):
    mode: ChatMode
    model_ids: list[str]
    title: Optional[str] = None


class SendMessageRequest(BaseModel):
    message: str


@router.post("/sessions")
async def create_session(req: CreateSessionRequest):
    """
    Create a new chat session.

    TODO: Implement via ChatEngine
    """
    session_id = "sess_" + str(hash((req.mode, tuple(req.model_ids))))[:8]
    return {
        "id": session_id,
        "mode": req.mode,
        "model_ids": req.model_ids,
        "status": "active",
    }


@router.get("/sessions")
async def list_sessions():
    """List all chat sessions."""
    # TODO: Implement
    return {"sessions": []}


@router.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """Get session details."""
    # TODO: Implement
    return {
        "id": session_id,
        "mode": "single",
        "messages": [],
    }


@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """Delete a chat session."""
    # TODO: Implement
    return {"status": "deleted", "session_id": session_id}


@router.post("/sessions/{session_id}/send")
async def send_message(session_id: str, req: SendMessageRequest):
    """
    Send message to chat session.
    Returns streaming response via SSE.
    """
    # TODO: Implement via ChatEngine
    return {
        "session_id": session_id,
        "message": req.message,
        "responses": [
            {"model_id": "llama3.2", "content": "[Response placeholder]"}
        ]
    }
