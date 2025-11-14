# Curated For You By You

This project consists of a frontend (React/Vite) and a backend application. This README provides instructions on how to set up and run both components using Docker.

## Table of Contents
- [Frontend (React/Vite)](#frontend-reactvite)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
- [Backend](#backend)
  - [Building the Docker Image](#building-the-docker-image-1)
  - [Running the Docker Container](#running-the-docker-container-1)
- [Running Both Together](#running-both-together)

## Frontend (React/Vite)

The frontend application is a React project built with Vite and utilizes Material UI. A Dockerfile is provided to containerize the application.

### Building the Docker Image

1. Navigate to the frontend directory:
   ```bash
   cd F2025-Async/frontend/cfyby
   ```
2. Build the Docker image. We'll tag it as `cfyby-frontend`:
   ```bash
   docker build -t cfyby-frontend .
   ```

### Running the Docker Container

After building the image, you can run the frontend application:

```bash
docker run -p 80:80 --name cfyby-frontend-app -d cfyby-frontend
```
This command maps port 80 of your host to port 80 of the container and runs the container in detached mode. You can access the frontend application at `http://localhost`.

## Backend

The backend application is a Python application served with Uvicorn. A Dockerfile is provided to containerize the application.

### Building the Docker Image

1. Navigate to the backend directory:
   ```bash
   cd F2025-Async/backend
   ```
2. Build the Docker image. We'll tag it as `cfyby-backend`:
   ```bash
   docker build -t cfyby-backend .
   ```

### Running the Docker Container

After building the image, you can run the backend application:

```bash
docker run -p 8000:8000 --name cfyby-backend-app -d cfyby-backend
```
This command maps port 8000 of your host to port 8000 of the container and runs the container in detached mode. You can access the backend API at `http://localhost:8000`.

## Running Both Together

To run both the frontend and backend applications simultaneously, ensure you have built both Docker images as described above. Then, you can run them as separate containers:

1.  **Start the Backend:**
    ```bash
    docker run -p 8000:8000 --name cfyby-backend-app -d cfyby-backend
    ```
2.  **Start the Frontend:**
    ```bash
    docker run -p 80:80 --name cfyby-frontend-app -d cfyby-frontend
    ```

You can then access your frontend application at `http://localhost` and it should be able to communicate with the backend at `http://localhost:8000` (assuming your backend listens on port 8000).

To stop and remove the containers:

```bash
docker stop cfyby-frontend-app cfyby-backend-app
docker rm cfyby-frontend-app cfyby-backend-app
```
