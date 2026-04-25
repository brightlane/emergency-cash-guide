import boto3
from botocore.exceptions import EndpointConnectionError, NoCredentialsError, PartialCredentialsError

def download_file_from_s3(bucket_name, object_key, download_path, region='us-east-1'):
    try:
        # Initialize S3 client with correct region
        s3_client = boto3.client('s3', region_name=region)  # Make sure the region is correct
        # Download file from S3
        s3_client.download_file(bucket_name, object_key, download_path)
        print(f"File '{object_key}' downloaded successfully from bucket '{bucket_name}' to '{download_path}'.")
    except EndpointConnectionError as e:
        print(f"Error: Could not connect to the endpoint URL: {e}")
    except NoCredentialsError:
        print("Error: No AWS credentials found. Please configure your credentials.")
    except PartialCredentialsError:
        print("Error: Incomplete AWS credentials found. Please ensure full credentials are provided.")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    # Replace with your actual S3 bucket name and object key
    bucket_name = "your-s3-bucket-name"  # Replace with your bucket name
    object_key = "batch_1.csv"  # Replace with the key of the object you want to download
    download_path = "./batch_1.csv"  # Local path to save the downloaded file

    # Specify the region your S3 bucket is in, e.g., 'us-east-1', 'us-west-2', etc.
    region = "your-region"  # Replace with the correct AWS region

    download_file_from_s3(bucket_name, object_key, download_path, region)
