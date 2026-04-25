import csv
import os
import random

affiliate_link = "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT"

keywords_part_1 = ["cash", "payday", "emergency", "quick", "fast", "instant", "short term", "personal", "loan", "advance", "money", "urgent", "same day", "bad credit"]
keywords_part_2 = ["loan", "cash", "advances", "money", "payday", "lenders", "approval", "credit", "loans", "fast cash", "short-term loans", "quick approval", "same day loan", "cash advance"]

# Generate unique combinations
keywords = list(set(
    f"{a} {b}"
    for a in keywords_part_1
    for b in keywords_part_2
    if a != b
))

random.shuffle(keywords)
keywords = keywords[:10000]

output_directory = 'generated_files/'
os.makedirs(output_directory, exist_ok=True)


def generate_content_for_batch(start_index, end_index, batch_number):
    batch_filename = os.path.join(output_directory, f'batch_{batch_number}.csv')

    with open(batch_filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Keyword', 'Meta Title', 'Meta Description', 'Content', 'Affiliate Link'])

        for i in range(start_index, end_index):
            keyword = keywords[i]

            meta_title = f"Get a Payday Loan for {keyword} | MaxLend"
            meta_description = f"Need a {keyword}? Apply online for fast access to funds."

            content = f"<h1>{meta_title}</h1><p>Need {keyword}? Apply now.</p>"

            writer.writerow([keyword, meta_title, meta_description, content, affiliate_link])

    print(f"Batch {batch_number} saved to {batch_filename}")


def main():
    generate_content_for_batch(0, len(keywords), 1)


if __name__ == "__main__":
    main()
