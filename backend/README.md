# Curated For You, By You - Backend API

This directory contains the Python backend for the "Curated For You, By You" application. It is built using the [FastAPI](https://fastapi.tiangolo.com/) framework and serves data about music artists and their albums.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Running with Docker](#running-with-docker)
- [Running Tests](#running-tests)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
- Python 3.9+
- pip (Python package installer)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd F2025-Async/backend
    ```

2.  **Install the required packages:**
    It is recommended to use a virtual environment to manage dependencies.
    ```sh
    python -m venv .venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    pip install -r requirements.txt
    ```

### Running the Application

Once the dependencies are installed, you can run the application using `uvicorn`:
```sh
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The API will be available at `http://127.0.0.1:8000`. The `--reload` flag enables hot-reloading, so the server will restart automatically after code changes.

## API Endpoints

The API provides several endpoints to access music data.

- `GET /`: Provides basic information about the API and a list of available endpoints.
- `GET /artists`: Returns a list of artists. Can be filtered by `genre`, `country`, and `city` query parameters.
- `GET /artists/{name}`: Returns all available information for a specific artist by name.
- `GET /artists/{name}/description`: Returns the description (summary) of a specific artist.
- `GET /artists/{name}/image`: Returns the image URL for a specific artist.
- `GET /artists/{name}/albums`: Returns a list of albums by a specific artist.
- `GET /albums/{title}/description`: Returns all available information for a specific album by title.

### Interactive API Documentation

FastAPI automatically generates interactive API documentation (using Swagger UI). Once the application is running, you can access it at:

- **Swagger UI:** `http://127.0.0.1:8000/docs`

## Running with Docker

You can also build and run the backend application using Docker.

1.  **Build the Docker image:**
    From the `F2025-Async/backend` directory, run:
    ```sh
    docker build -t cfyby-backend .
    ```

2.  **Run the Docker container:**
    ```sh
    docker run -d -p 8000:8000 --name cfyby-api cfyby-backend
    ```
    The `-d` flag runs the container in detached mode. The API will be accessible at `http://localhost:8000`.

## Running Tests

The project includes a suite of tests written with `pytest`.

1.  **Install testing dependencies:**
    ```sh
    pip install pytest "fastapi[all]"
    ```
2.  **Run the tests:**
    From the root of the project (`F2025-Async`), run the following command:
    ```sh
    pytest
    ```
