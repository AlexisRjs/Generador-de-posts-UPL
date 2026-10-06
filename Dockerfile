# Lightweight Python image
FROM python:3.11-slim

# Install system libraries needed by OpenCV and ONNX Runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server backend and OCR engine
COPY server.py ocr_engine.py ./

# Expose port (supports dynamic $PORT on Render, Railway, Fly.io, Hugging Face)
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT}"]
