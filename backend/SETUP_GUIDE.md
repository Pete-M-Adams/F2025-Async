# Cloud Service Integration - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

**For Local Development:**

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values:
# AWS_URL=https://eyyy72prca.us-east-1.awsapprunner.com/
# AWS_TOKEN=cfyby-2025-X3XX7uIIm9SJqrY6DCvUzZwP6Tqwb3x1
```

**For AWS App Runner:**

In AWS Console → App Runner → Your Service → Configuration → Environment Variables:
- `AWS_URL` = `https://eyyy72prca.us-east-1.awsapprunner.com/`
- `AWS_TOKEN` = `cfyby-2025-X3XX7uIIm9SJqrY6DCvUzZwP6Tqwb3x1`
- `HTTP_TIMEOUT` = `30` (optional)
- `HTTP_MAX_RETRIES` = `3` (optional)

### 3. Run Tests

```bash
pytest backend/test_cloud_service.py -v
```

### 4. Run the Application

```bash
uvicorn main:app --reload
```

### 5. Test the Cloud Service Endpoint

```bash
# Test the cloud integration endpoint
curl http://localhost:8000/cloud/artists

# With filters
curl "http://localhost:8000/cloud/artists?genre=rock&country=United%20States"
```

## Files Created

- `config.py` - Environment variable configuration
- `services/cloud_service_client.py` - HTTP client with error handling
- `test_cloud_service.py` - Test cases (happy & sad paths)
- `.env.example` - Example environment file
- Updated `main.py` - Added `/cloud/artists` endpoint
- Updated `README.md` - Added setup instructions

## Key Features

✅ Bearer token authentication  
✅ Timeout and retry handling  
✅ Proper error handling (401, 403, timeouts, connection errors)  
✅ Structured logging (no sensitive data)  
✅ Comprehensive test coverage  
✅ Environment variable configuration  

## Acceptance Criteria Met

✅ Cloud service credentials stored and injected via environment variables  
✅ HTTP client with proper error and timeout handling  
✅ Endpoint URL and credentials configurable via environment variables  
✅ Happy path test: 200 OK with valid data  
✅ Sad path test: 401/403 with authentication failure logging  

## Next Steps

1. **Configure Cloud Service Authentication** (if not already done):
   - The cloud service at `https://eyyy72prca.us-east-1.awsapprunner.com/` needs to validate Bearer tokens
   - Add authentication middleware to accept `Authorization: Bearer <token>` headers
   - Validate against `AWS_TOKEN` environment variable
   - Return 401 if token is missing or invalid

2. **Deploy to AWS App Runner**:
   - Configure environment variables in App Runner Console
   - Deploy your application
   - Test the `/cloud/artists` endpoint

3. **Expand Integration** (optional):
   - Add more cloud service endpoints as needed
   - Implement response caching if needed
   - Add rate limiting if needed

## Troubleshooting

**Issue: "AWS_URL and AWS_TOKEN must be configured"**  
→ Make sure `.env` file exists and contains the required variables

**Issue: Tests fail with "No module named 'httpx'"**  
→ Run `pip install httpx` or `pip install -r requirements.txt`

**Issue: 401 Unauthorized when calling cloud service**  
→ Check that the cloud service has authentication middleware implemented

**Issue: Connection timeout**  
→ Increase `HTTP_TIMEOUT` or check network connectivity




