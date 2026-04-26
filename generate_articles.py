import os
import boto3
from botocore.exceptions import ClientError

BUCKET_NAME = os.getenv("S3_BUCKET")
FILE_KEY = os.getenv("S3_FILE_KEY", "batch_1.csv")
REGION = os.getenv("AWS_REGION", "us-east-1")


def download_file():
    if not BUCKET_NAME:
        raise ValueError("Missing S3_BUCKET environment variable")

    s3 = boto3.client("s3", region_name=REGION)

    try:
        print(f"Downloading s3://{BUCKET_NAME}/{FILE_KEY}...")
        s3.download_file(BUCKET_NAME, FILE_KEY, FILE_KEY)
        print("Download complete.")
    except ClientError as e:
        raise RuntimeError(f"Failed to download file: {e}")


def main():
    download_file()

    # TODO: your article generation logic here
    print("Process complete.")


if __name__ == "__main__":
    main()
