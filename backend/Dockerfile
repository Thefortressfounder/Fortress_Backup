FROM python:3.13-slim
WORKDIR /app
COPY main.py .
# We verify 'requests' is installed here
RUN pip install fastapi uvicorn requests
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
