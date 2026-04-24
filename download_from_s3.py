import boto3
from botocore.exceptions import EndpointConnectionError, NoCredentialsError

# Replace these with your actual values
bucket_name = 'your-s3-bucket-name'  # Your S3 bucket name
file_name = 'batch_1.csv'  # The file you want to access
local_path = './batch_1.csv'  # Local path where you want to save the file (you can change this)
region_name = 'your-region'  # Example: 'us-east-1'

# Initialize a session using Amazon S3
s3 = boto3.client('s3', region_name=region_name)

def download_file():
    try:
        # Attempt to download the file from S3
        print(f"Downloading {file_name} from bucket {bucket_name}...")
        s3.download_file(bucket_name, file_name, local_path)
        print(f"File downloaded successfully to {local_path}")
    except EndpointConnectionError as e:
        # If there's an issue connecting to the S3 endpoint
        print(f"Error: Could not connect to S3 endpoint. {e}")
    except NoCredentialsError:
        # If AWS credentials are missing
        print("Error: No AWS credentials found. Please configure your AWS CLI.")
    except Exception as e:
        # Catch all other exceptions
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    download_file()
