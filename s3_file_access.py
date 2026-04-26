import boto3

# Replace these with your actual values
bucket_name = "my-actual-bucket-name"  # Your actual S3 bucket name
region = "us-east-1"  # Your actual AWS region
file_key = "batch_1.csv"  # Your actual file key in the bucket

# Create the S3 client
s3_client = boto3.client('s3', region_name=region)

# Try to access the S3 file
try:
    response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
    # Process the file as needed
    print("File accessed successfully!")
except boto3.exceptions.S3UploadFailedError as e:
    print(f"Error accessing S3: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
