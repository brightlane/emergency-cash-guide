import boto3
from botocore.exceptions import EndpointConnectionError

# Replace with your actual S3 bucket name and region
bucket_name = 'your-s3-bucket-name'  # Your actual bucket name here
region_name = 'your-region'  # Your actual region here, e.g., 'us-east-1'

# Initialize the S3 client with the correct region
s3_client = boto3.client('s3', region_name=region_name)

# Path to your file (e.g., 'batch_1.csv')
file_path = 'batch_1.csv'  # Local file you want to upload to S3
key = 'batch_1.csv'  # Name in the S3 bucket

try:
    # Attempt to upload the file to the S3 bucket
    s3_client.upload_file(file_path, bucket_name, key)
    print(f"File {file_path} uploaded successfully to {bucket_name}/{key}")
except EndpointConnectionError as e:
    print(f"Failed to connect to the endpoint: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
