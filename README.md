# AI Text-to-SQL App

## Features
- Upload CSV → Store in PostgreSQL
- Natural Language → SQL using local LLM (Qwen via Ollama)
- Execute query → Show results

## Tech Stack
- FastAPI
- PostgreSQL
- Ollama (Qwen 7B)
- React

## Run Backend
uvicorn app.main:app --reload