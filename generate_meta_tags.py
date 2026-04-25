import os
import csv
import boto3
from datetime import datetime
from botocore.exceptions import ClientError

# =========================
# CONFIG (FROM GITHUB SECRETS)
# =========================

S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
AWS_REGION = os.environ.get("AWS_REGION")

if not S3_BUCKET_NAME or not AWS_REGION:
    raise ValueError("Missing AWS environment variables: S3_BUCKET_NAME or AWS_REGION")

# AWS client (uses GitHub Actions secrets automatically)
s3_client = boto3.client(
    "s3",
    region_name=AWS_REGION
)

# =========================
# KEYWORDS (SAFE DEFAULTS)
# =========================

keywords = [
    "emergency cash help",
    "fast personal loans",
    "bad credit loan options",
    "quick cash advance",
    "short term financial help",
    "borrow money online",
    "urgent loan guide",
    "instant funding options"
]

# =========================
# GENERATE CSV FILE
# =========================

def generate_csv(file_name):
    with open(file_name, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)

        writer.writerow(["Keyword", "Title", "Description"])

        for keyword in keywords:
            title = f"{keyword.title()} - Guide"
            description = f"Learn about {keyword}, how it works, and key considerations."

            writer.writerow([keyword, title, description])

    return file_name

# =========================
# UPLOAD TO S3 (SAFE)
# =========================

def upload_to_s3(file_name):
    try:
        s3_client.upload_file(
            file_name,
            S3_BUCKET_NAME,
            file_name
        )

        print(f"Uploaded successfully → s3://{S3_BUCKET_NAME}/{file_name}")

    except ClientError as e:
        raise RuntimeError(f"S3 upload failed: {e}")

# =========================
# MAIN EXECUTION
# =========================

def main():
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    file_name = f"meta_tags_{timestamp}.csv"

    generate_csv(file_name)
    upload_to_s3(file_name)

    print(f"Success: generated {len(keywords)} meta tags")

if __name__ == "__main__":
    main()
