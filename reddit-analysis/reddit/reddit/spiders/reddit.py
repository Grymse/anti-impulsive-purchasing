# scrapy crawl reddit -s LOG_FILE=reddit.log -s JOBDIR=crawls/reddit-1
import json
import time
import scrapy
from ..items import *
import os
from dotenv import load_dotenv
from scrapy import signals

load_dotenv(override=True)

SUBREDDITS = os.getenv("SUBREDDITS").split(",")
print(SUBREDDITS)

SCRAPE_TOP_N_SUBMISSIONS = int(os.getenv("SCRAPE_TOP_N_SUBMISSIONS"))
SUBMISSION_TYPE = os.getenv("SUBMISSION_TYPE")
SUBMISSIONS_TIME_FILTER = os.getenv("SUBMISSIONS_TIME_FILTER")
COMMENT_DEPTH = int(os.getenv("COMMENT_DEPTH"))

class RedditSpider(scrapy.Spider):
    name = "reddit"
    handle_httpstatus_list = [500, 404]

    def start_requests(self):
        print("Starting requests")
        
        yield scrapy.Request("https://reddit.com/scrape/0", callback=self.parse_scrape, priority=0)

        for subreddit in SUBREDDITS:
            yield scrapy.Request(f"https://reddit.com/r/{subreddit}", callback=self.parse_subreddit, priority=1)
    
    def parse_scrape(self, response):
        yield ScrapeItem(subreddits = SUBREDDITS,
                            scrape_n_submissions=SCRAPE_TOP_N_SUBMISSIONS,
                            submission_type=SUBMISSION_TYPE, 
                            submissions_time_filter=SUBMISSIONS_TIME_FILTER,
                            comment_depth=COMMENT_DEPTH)

    def parse_subreddit(self, response):
        body = json.loads(response.body)
        scraped_utc = body["scraped_utc"]
        subreddit = body["subreddit"]
        submissions = body["submissions"]

        yield SubredditItem(id = subreddit["id"],
                            display_name = subreddit["display_name"],
                            title = subreddit["title"],
                            subscribers = subreddit["subscribers"],
                            created_utc = subreddit["created_utc"],
                            scraped_utc = scraped_utc)
        
        print("Submissions len: ", len(submissions))

        for submission in submissions:
            yield SubmissionItem(id = submission["id"],
                            author = submission["author"],
                            created_utc = submission["created_utc"],
                            title = submission["title"],
                            selftext = submission["selftext"],
                            url = submission["url"],
                            score = submission["score"],
                            upvote_ratio = submission["upvote_ratio"],
                            num_comments = submission["num_comments"],
                            subreddit = submission["subreddit"],
                            permalink = submission["permalink"],
                            link_flair_text = submission["link_flair_text"],
                            author_flair_text = submission["author_flair_text"],
                            edited = submission["edited"],
                            locked = submission["locked"],
                            is_original_content = submission["is_original_content"],
                            is_self = submission["is_self"],
                            over_18 = submission["over_18"],
                            stickied = submission["stickied"],
                            scraped_utc = scraped_utc)
            

            yield scrapy.Request(f"https://reddit.com/r/{subreddit}/comments/{submission['id']}", callback=self.parse_submission, priority=3)

            # redditor
            # yield scrapy.Request(f"https://reddit.com/u/{submission['author']}", callback=self.parse_redditor, priority=2)

    def parse_submission(self, response):
        body = json.loads(response.body)
        scraped_utc = body["scraped_utc"]
        comments = body["comments"]

        for comment in comments:
            yield CommentItem(id = comment["id"],
                        body = comment["body"],
                        author = comment["author"],
                        created_utc = comment["created_utc"],
                        edited = comment["edited"],
                        is_submitter = comment["is_submitter"],
                        score = comment["score"],
                        stickied = comment["stickied"],
                        subreddit_id = comment["subreddit_id"],
                        link_id = comment["link_id"],
                        parent_id = comment["parent_id"],
                        reply_ids = comment["reply_ids"],
                        scraped_utc = scraped_utc)
            
            # redditor
            # yield scrapy.Request(f"https://reddit.com/u/{comment['author']}", callback=self.parse_redditor, priority=2)

    def parse_redditor(self, response):
        body = json.loads(response.body)
        scraped_utc = body["scraped_utc"]
        redditor = body["redditor"]

        yield RedditorItem(id = redditor["id"],
                        name = redditor["name"],
                        comment_karma = redditor["comment_karma"],
                        created_utc = redditor["created_utc"],
                        has_verified_email = redditor["has_verified_email"],
                        icon_img = redditor["icon_img"],
                        is_employee = redditor["is_employee"],
                        is_mod = redditor["is_mod"],
                        is_gold = redditor["is_gold"],
                        scraped_utc = scraped_utc)