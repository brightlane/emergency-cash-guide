import os
import json
import csv
import boto3
from datetime import datetime
from botocore.exceptions import ClientError

# AWS S3 Configuration
S3_BUCKET_NAME = "your-s3-bucket-name"
AWS_ACCESS_KEY_ID = "your-access-key-id"
AWS_SECRET_ACCESS_KEY = "your-secret-access-key"
AWS_REGION = "your-region"

# Keywords to generate meta tags for
keywords = [
    "cash loan", "payday loan", "personal loan", "quick loan", 
    "emergency loan", "urgent cash", "instant cash", "bad credit loans"
]

# S3 Client Setup
s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, 
                         aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

# Affiliate Link
affiliate_link = "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT"

# Function to generate meta tags for each keyword
def generate_meta_tags(keyword):
    # Meta Title and Meta Description
    meta_title = f"Get a Payday Loan for {keyword} | MaxLend"
    meta_description = f"Need a {keyword}? Apply for a payday loan to get fast and easy access to the money you need. Instant approval and no credit check!"
    
    # Structured Data (JSON-LD)
    structured_data = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": f"Payday Loan for {keyword}",
        "description": f"A payday loan for {keyword}, providing instant approval and easy access to cash.",
        "brand": "MaxLend",
        "url": affiliate_link,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "200",
            "url": affiliate_link
        }
    }

    structured_data_json = json.dumps(structured_data)

    # Return all meta tags and structured data
    return {
        'keyword': keyword,
        'meta_title': meta_title,
        'meta_description': meta_description,
        'structured_data_json': structured_data_json
    }

# Function to save the generated meta tags to a CSV file
def save_to_csv(meta_tags_data):
    # Define the CSV filename with timestamp for uniqueness
    file_name = f"meta_tags_{datetime.now().strftime('%Y%m%d%H%M%S')}.csv"
    
    # Open and write the data to CSV
    with open(file_name, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Keyword', 'Meta Title', 'Meta Description', 'Structured Data'])  # CSV headers
        
        for data in meta_tags_data:
            writer.writerow([data['keyword'], data['meta_title'], data['meta_description'], data['structured_data_json']])

    return file_name

# Function to upload the CSV file to S3
def upload_to_s3(file_name):
    try:
        # Open the file and upload it to the S3 bucket
        with open(file_name, "rb") as file:
            s3_client.upload_fileobj(file, S3_BUCKET_NAME, file_name)
            print(f"File {file_name} uploaded successfully to S3.")
    except ClientError as e:
        print(f"Error uploading {file_name} to S3: {e}")

# Main function to generate meta tags and upload to S3
def main():
    # Generate meta tags for all keywords
    meta_tags_data = [generate_meta_tags(keyword) for keyword in keywords]
    
    # Save the generated meta tags to a CSV file
    file_name = save_to_csv(meta_tags_data)
    
    # Upload the CSV file to S3
    upload_to_s3(file_name)
    
    print(f"Meta tags for {len(keywords)} keywords generated and uploaded to S3 successfully.")

if __name__ == "__main__":
    main()
