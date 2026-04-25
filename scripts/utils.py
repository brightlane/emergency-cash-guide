import os
import boto3


def load_csv_from_s3_or_local(filename="batch_1.csv"):
    """
    Loads CSV from S3 if configured, otherwise falls back to local file.
    """

    bucket = os.getenv("S3_BUCKET_NAME")
    region = os.getenv("AWS_REGION")

    # ✅ Try S3 first
    if bucket and region:
        try:
            s3 = boto3.client("s3", region_name=region)
            response = s3.get_object(Bucket=bucket, Key=filename)
            data = response["Body"].read().decode("utf-8")
            print(f"Loaded {filename} from S3")
            return data
        except Exception as e:
            print(f"S3 failed, falling back to local file: {e}")

    # ✅ Fallback to local
    if os.path.exists(filename):
        with open(filename, "r") as f:
            print(f"Loaded {filename} locally")
            return f.read()

    raise FileNotFoundError(f"{filename} not found in S3 or locally")
