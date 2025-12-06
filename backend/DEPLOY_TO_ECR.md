# Deploy Docker Image to ECR for App Runner

## Step-by-Step Guide

### Prerequisites
- AWS CLI installed and configured
- Docker installed and running
- ECR repository already created (or create one)

---

## Step 1: Get Your ECR Repository URI

**Option A: Find it in AWS Console**
1. Go to AWS Console → ECR (Elastic Container Registry)
2. Find your repository (e.g., `cfyby-backend` or similar)
3. Click on it → Copy the repository URI
   - Format: `123456789012.dkr.ecr.us-east-1.amazonaws.com/cfyby-backend`

**Option B: List repositories via CLI**
```powershell
aws ecr describe-repositories --query "repositories[*].repositoryUri" --output text
```

**Set it as a variable:**
```powershell
$ECR_REPO = "123456789012.dkr.ecr.us-east-1.amazonaws.com/cfyby-backend"
$AWS_REGION = "us-east-1"  # Change if different
```

---

## Step 2: Authenticate Docker with ECR

```powershell
# Get ECR login token and authenticate Docker
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
```

**Expected output:**
```
Login Succeeded
```

---

## Step 3: Build the Docker Image

```powershell
# Navigate to backend directory
cd C:\Users\padam\F2025-Async\backend

# Build the image with a tag
docker build -t cfyby-backend:latest .

# Verify it built successfully
docker images | Select-String "cfyby-backend"
```

---

## Step 4: Tag the Image for ECR

```powershell
# Tag the image with your ECR repository URI
docker tag cfyby-backend:latest "$ECR_REPO:latest"

# Optional: Tag with a version number too
docker tag cfyby-backend:latest "$ECR_REPO:v1.0.0"

# Verify tags
docker images | Select-String "cfyby-backend"
```

---

## Step 5: Push to ECR

```powershell
# Push the latest tag
docker push "$ECR_REPO:latest"

# Optional: Push versioned tag too
docker push "$ECR_REPO:v1.0.0"
```

**This will take a few minutes** - you'll see progress as layers are pushed.

---

## Step 6: Update App Runner (If Needed)

**If App Runner is configured to auto-deploy from ECR:**
- It should automatically detect the new image
- Go to App Runner → Your Service → Check deployment status

**If you need to manually update:**

1. **Go to AWS Console:**
   - App Runner → Your Service → Configuration

2. **Edit Configuration:**
   - Source: Container registry
   - Container image URI: `$ECR_REPO:latest` (or specific version)
   - Click "Save changes"

3. **Deploy:**
   - App Runner will pull the new image and deploy

---

## Complete PowerShell Script

Here's a complete script you can run:

```powershell
# Set your variables
$ECR_REPO = "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/YOUR_REPO_NAME"
$AWS_REGION = "us-east-1"
$IMAGE_NAME = "cfyby-backend"

# Navigate to backend
cd C:\Users\padam\F2025-Async\backend

# Authenticate with ECR
Write-Host "Authenticating with ECR..." -ForegroundColor Yellow
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO

# Build the image
Write-Host "Building Docker image..." -ForegroundColor Yellow
docker build -t "$IMAGE_NAME:latest" .

# Tag for ECR
Write-Host "Tagging image..." -ForegroundColor Yellow
docker tag "$IMAGE_NAME:latest" "$ECR_REPO:latest"

# Push to ECR
Write-Host "Pushing to ECR..." -ForegroundColor Yellow
docker push "$ECR_REPO:latest"

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Image URI: $ECR_REPO:latest" -ForegroundColor Cyan
```

---

## Verify Deployment

### Check ECR:
```powershell
# List images in your repository
aws ecr list-images --repository-name YOUR_REPO_NAME --region $AWS_REGION
```

### Check App Runner:
1. Go to App Runner → Your Service
2. Check "Deployments" tab
3. Verify latest deployment is using the new image

### Test the Endpoint:
```powershell
# Replace with your App Runner URL
$APP_URL = "https://your-service.us-east-1.awsapprunner.com"

# Test the new endpoint
curl "$APP_URL/cloud/artists"
```

---

## Troubleshooting

### Issue: "Repository does not exist"
**Solution:** Create the repository first:
```powershell
aws ecr create-repository --repository-name cfyby-backend --region $AWS_REGION
```

### Issue: "Access denied"
**Solution:** Check your AWS credentials:
```powershell
aws sts get-caller-identity
```

### Issue: "Cannot connect to Docker daemon"
**Solution:** Make sure Docker Desktop is running

### Issue: "Image push failed"
**Solution:** 
- Check you're authenticated: `aws ecr get-login-password --region $AWS_REGION`
- Verify repository exists and you have permissions
- Check image tag matches repository URI exactly

---

## Quick Reference Commands

```powershell
# 1. Authenticate
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URI

# 2. Build
docker build -t cfyby-backend:latest .

# 3. Tag
docker tag cfyby-backend:latest YOUR_ECR_URI:latest

# 4. Push
docker push YOUR_ECR_URI:latest
```

---

## Notes

- **Image Size:** Your image should be relatively small (~200-300MB) with python:3.9-slim
- **Build Time:** First build takes longer, subsequent builds are faster (Docker cache)
- **Versioning:** Consider using version tags (v1.0.0, v1.0.1) for better tracking
- **Latest Tag:** App Runner can use `:latest` or a specific version tag




