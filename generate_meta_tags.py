import os
import sys

# Ensure the environment variables are set
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
AWS_REGION = os.getenv('AWS_REGION')

# Check if the necessary environment variables are provided
if not S3_BUCKET_NAME or not AWS_REGION:
    raise ValueError("Missing AWS environment variables: S3_BUCKET_NAME or AWS_REGION")

# Your existing logic here (e.g., interacting with AWS S3)

print(f"S3 Bucket: {S3_BUCKET_NAME}, AWS Region: {AWS_REGION}")

# Add the rest of your logic for meta tag generation below
# For example, fetching files from S3, parsing content, etc.
