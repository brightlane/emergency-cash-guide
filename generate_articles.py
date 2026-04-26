import os
import boto3

def fetch_batch_file():
    # Read from environment variables (we'll wire these later)
    bucket = os.environ.get("S3_BUCKET_NAME")
    region = os.environ.get("AWS_REGION", "us-east-1")
    key = "batch_1.csv"

    if not bucket:
        raise ValueError("Missing S3_BUCKET_NAME environment variable")

    s3 = boto3.client("s3", region_name=region)

    response = s3.get_object(
        Bucket=bucket,
        Key=key
    )

    content = response["Body"].read().decode("utf-8")
    return content


if __name__ == "__main__":
    data = fetch_batch_file()
    print(data[:200])  # quick sanity check
