# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SubredditItem(scrapy.Item):
    type = "subreddit"
    id = scrapy.Field()
    display_name = scrapy.Field()
    title = scrapy.Field()
    subscribers = scrapy.Field()
    created_utc = scrapy.Field()
    scraped_utc = scrapy.Field()

class SubmissionItem(scrapy.Item):
    type = "submission"
    id = scrapy.Field()
    author = scrapy.Field()
    created_utc = scrapy.Field()
    title = scrapy.Field()
    selftext = scrapy.Field()
    url = scrapy.Field()
    score = scrapy.Field()
    upvote_ratio = scrapy.Field()
    num_comments = scrapy.Field()
    subreddit = scrapy.Field()
    permalink = scrapy.Field()
    link_flair_text = scrapy.Field()
    author_flair_text = scrapy.Field()
    edited = scrapy.Field()
    locked = scrapy.Field()
    is_original_content = scrapy.Field()
    is_self = scrapy.Field()
    over_18 = scrapy.Field()
    stickied = scrapy.Field()
    scraped_utc = scrapy.Field()

class CommentItem(scrapy.Item):
    type = "comment"
    id = scrapy.Field()
    body = scrapy.Field()
    author = scrapy.Field()
    created_utc = scrapy.Field()
    edited = scrapy.Field()
    is_submitter = scrapy.Field()
    score = scrapy.Field()
    stickied = scrapy.Field()
    subreddit_id = scrapy.Field()
    link_id = scrapy.Field()
    parent_id = scrapy.Field()
    reply_ids = scrapy.Field()
    scraped_utc = scrapy.Field()

class RedditorItem(scrapy.Item):
    type = "redditor"
    id = scrapy.Field()
    name = scrapy.Field()
    comment_karma = scrapy.Field()
    created_utc = scrapy.Field()
    has_verified_email = scrapy.Field()
    icon_img = scrapy.Field()
    is_employee = scrapy.Field()
    is_mod = scrapy.Field()
    is_gold = scrapy.Field()
    link_karma = scrapy.Field()
    verified = scrapy.Field()
    scraped_utc = scrapy.Field()

class ScrapeItem(scrapy.Item):
    type = "scrape"
    subreddits = scrapy.Field()
    scrape_n_submissions= scrapy.Field()
    submission_type = scrapy.Field()
    submissions_time_filter = scrapy.Field()
    comment_depth = scrapy.Field()