import datetime

def generate_articles():
    today = datetime.date.today()

    articles = []

    articles.append({
        "title": "FIFA World Cup 2026 Ticket Demand Is Rising Fast",
        "content": """
The FIFA World Cup 2026 is expected to be one of the highest-demand sporting events in history. 
Across the United States, Canada, and Mexico, ticket demand is increasing as qualification phases progress.

Fans are securing tickets earlier due to limited availability in major host cities such as Los Angeles, New York, Toronto, and Mexico City.

Ticket prices typically rise closer to match dates as inventory decreases and demand intensifies.
"""
    })

    articles.append({
        "title": "NFL Playoff Tickets Continue to Surge in Price",
        "content": """
NFL playoff tickets consistently experience strong price increases as teams approach elimination rounds.

Demand spikes heavily in major markets like Dallas, Philadelphia, Kansas City, and San Francisco.

Secondary ticket markets reflect real-time competition pressure, especially in championship games.
"""
    })

    articles.append({
        "title": "Concert Tours in 2026 Are Selling Out Faster Than Ever",
        "content": """
Global concert tours in 2026 are adopting limited-city tour models, increasing scarcity.

Major cities such as London, Tokyo, New York, and Los Angeles are seeing the fastest sellouts.

Fans are increasingly relying on resale platforms due to rapid primary ticket exhaustion.
"""
    })

    articles.append({
        "title": "Formula 1 Global Demand Continues to Grow",
        "content": """
Formula 1 continues to expand its global audience with races in Miami, Monaco, Silverstone, and Abu Dhabi.

Race weekends are attracting both local and international travelers, increasing ticket demand significantly.

Premium seating often sells out months in advance.
"""
    })

    return articles


def main():
    articles = generate_articles()

    for article in articles:
        print("\n====================")
        print(article["title"])
        print("====================\n")
        print(article["content"])


if __name__ == "__main__":
    main()
