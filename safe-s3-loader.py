# safe-s3-loader.py
import os
import csv

"""
SAFE MODE LOADER
- NEVER calls AWS unless explicitly configured
- Falls back to local CSV files only
- Prevents EndpointConnectionError completely
"""

# Optional AWS config (ONLY used if real values exist)
S3_BUCKET = os.getenv("S3_BUCKET")
S3_REGION = os.getenv("AWS_REGION")

def is_s3_enabled():
    return bool(S3_BUCKET and S3_REGION and "your-" not in S3_BUCKET)


def load_csv(file_name):
    """
    Priority:
    1. Local file (always preferred)
    2. S3 (ONLY if properly configured)
    """

    local_path = os.path.join(".", file_name)

    # ✅ STEP 1: Use local file (SAFE DEFAULT)
    if os.path.exists(local_path):
        print(f"[SAFE LOADER] Using local file: {local_path}")
        with open(local_path, "r", encoding="utf-8") as f:
            return list(csv.DictReader(f))

    # ❌ STEP 2: Block fake S3 config (your current error)
    if not is_s3_enabled():
        raise Exception(
            f"""
[S3 DISABLED SAFELY]
File not found locally: {file_name}

AWS is NOT configured properly:
- S3_BUCKET = {S3_BUCKET}
- AWS_REGION = {S3_REGION}

Fix: Add file locally OR configure real AWS credentials.
"""
        )

    # ⚠️ STEP 3: Real S3 fallback (ONLY if valid config exists)
    try:
        import boto3

        s3 = boto3.client("s3", region_name=S3_REGION)
        obj = s3.get_object(Bucket=S3_BUCKET, Key=file_name)

        content = obj["Body"].read().decode("utf-8").splitlines()
        return list(csv.DictReader(content))

    except Exception as e:
        raise Exception(f"S3 load failed: {str(e)}")


def load_keywords():
    """
    Your system likely uses batch_1.csv
    """
    return load_csv("batch_1.csv")
