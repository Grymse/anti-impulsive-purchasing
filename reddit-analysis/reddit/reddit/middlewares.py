# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html

import json
from scrapy import signals

import praw
import time
from dotenv import load_dotenv
import os

load_dotenv(override=True)

CLIENT_ID=os.getenv("CLIENT_ID")
CLIENT_SECRET=os.getenv("CLIENT_SECRET")
USERNAME=os.getenv("USERNAME")
PASSWORD=os.getenv("PASSWORD")
SCRAPE_TOP_N_SUBMISSIONS = int(os.getenv("SCRAPE_TOP_N_SUBMISSIONS"))
SUBMISSIONS_TIME_FILTER = os.getenv("SUBMISSIONS_TIME_FILTER")
SUBMISSION_TYPE = os.getenv("SUBMISSION_TYPE")
COMMENT_DEPTH = int(os.getenv("COMMENT_DEPTH"))

reddit = praw.Reddit(client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            user_agent=True,
            username=USERNAME,
            password=PASSWORD)

# useful for handling different item types with a single interface
from itemadapter import is_item, ItemAdapter
from scrapy.http import Response


class RedditSpiderMiddleware:
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, or item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Request or item objects.
       
        pass

    def process_start_requests(self, start_requests, spider):
        # Called with the start requests of the spider, and works
        # similarly to the process_spider_output() method, except
        # that it doesn’t have a response associated.

        # Must return only requests (not items).
        for r in start_requests:
            yield r

    def spider_opened(self, spider):
        spider.logger.info("Spider opened: %s" % spider.name)


class RedditDownloaderMiddleware:
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        split = request.url.split("/")
        id = split[-1]
        request_type = split[-2]

        print("----------------------------------------------")
        try:
            if request_type == "scrape":
                print("Scraping")
                return Response(url=request.url, status=200, body=self.object_to_bytes({}))
            elif request_type == "r":
                print(f"Downloading subreddit {id}")
                subreddit = reddit.subreddit(id)
                print(f"Downloading {SUBMISSION_TYPE} {SCRAPE_TOP_N_SUBMISSIONS} submissions {'of timefilter ' + str(SUBMISSIONS_TIME_FILTER) if SUBMISSION_TYPE == 'top' else ''} of subreddit {id}")
                if SUBMISSION_TYPE == "hot":
                    submissions = subreddit.hot(limit=SCRAPE_TOP_N_SUBMISSIONS)
                elif SUBMISSION_TYPE == "new":
                    submissions = subreddit.new(limit=SCRAPE_TOP_N_SUBMISSIONS)
                elif SUBMISSION_TYPE == "top":
                    submissions = subreddit.top(limit=SCRAPE_TOP_N_SUBMISSIONS, time_filter=SUBMISSIONS_TIME_FILTER)
                elif SUBMISSION_TYPE == "rising":
                    submissions = subreddit.rising(limit=SCRAPE_TOP_N_SUBMISSIONS)
                
                scraped_utc = int(time.time())
                submissions = [self.submission_to_object(submission) for submission in submissions]
                body = {
                    "subreddit": self.subreddit_to_object(subreddit),
                    "submissions": submissions,
                    "scraped_utc": scraped_utc
                }
                return Response(url=request.url, status=200, body=self.object_to_bytes(body))
            elif request_type == "comments":
                print(f"Loading submission {id}")
                submission = reddit.submission(id)
                print(f"Downloading all comments of submission {id}")
                submission.comments.replace_more(limit=COMMENT_DEPTH)
                comments = submission.comments.list()
                scraped_utc = int(time.time())
                print(f"Downloaded {len(comments)} comments of submission {id}")
                comments = [self.comments_to_object(comment) for comment in comments]
                body = {
                    "comments": comments,
                    "scraped_utc": scraped_utc
                }
                return Response(url=request.url, status=200, body=self.object_to_bytes(body))
            elif request_type == "u":
                print(f"Downloading redditor {id}")
                redditor = reddit.redditor(id)
                scraped_utc = int(time.time())
                body = {
                    "redditor": self.redditor_to_object(redditor),
                    "scraped_utc": scraped_utc
                }
                return Response(url=request.url, status=200, body=self.object_to_bytes(body))
        except Exception as e:
            print("Failed to download", request.url, e)
            return None
        finally:
            lim_dict = reddit.auth.limits
            unix_timestamp = lim_dict["reset_timestamp"]
            human_readable_time = time.ctime(unix_timestamp)
            remaining = lim_dict["remaining"]
            remaining = int(remaining) if remaining is not None else 1
            used = lim_dict["used"]
            # if remaining % 100 == 0:
            if request_type != "scrape":
                print(f"Remaining: {remaining}/{remaining+used} (Resets at {human_readable_time})")
        

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        print("Exception:", exception)

    def spider_opened(self, spider):
        spider.logger.info("Spider opened: %s" % spider.name)

    def object_to_bytes(self, obj):
        return json.dumps(obj).encode("utf-8")

    def subreddit_to_object(self, subreddit):
        return {
            "id": subreddit.id,
            "display_name": subreddit.display_name,
            "title": subreddit.title,
            # "description": subreddit.description,
            # "public_description": subreddit.public_description,
            "subscribers": subreddit.subscribers,
            "created_utc": int(subreddit.created_utc),
            # "over18": subreddit.over18
        }

    def submission_to_object(self, submission):
        return {
            "id": submission.id,
            "author": str(submission.author),
            "created_utc": int(submission.created_utc),
            "title": submission.title,
            "selftext": submission.selftext,
            "url": submission.url,
            "score": submission.score,
            "upvote_ratio": submission.upvote_ratio,
            "num_comments": submission.num_comments,
            "subreddit": str(submission.subreddit).lower(),
            "permalink": submission.permalink,
            "link_flair_text": submission.link_flair_text,
            "author_flair_text": submission.author_flair_text,
            # "clicked": submission.clicked,
            # "distinguished": submission.distinguished,
            "edited": submission.edited,
            "locked": submission.locked,
            "is_original_content": submission.is_original_content,
            "is_self": submission.is_self,
            # "name": submission.name,
            "over_18": submission.over_18,
            # "poll_data": submission.poll_data,
            # "spoiler": submission.spoiler,
            "stickied": submission.stickied,
        }


    def comments_to_object(self, comment):
        return {
            "id": comment.id,
            "body": comment.body,
            "author": str(comment.author),
            "created_utc": int(comment.created_utc),
            # "distinguished": comment.distinguished,
            "edited": comment.edited,
            "is_submitter": comment.is_submitter,
            # "permalink": comment.permalink,
            "score": comment.score,
            "stickied": comment.stickied,
            "subreddit_id": comment.subreddit_id.split("_")[1],
            "link_id": comment.link_id.split("_")[1],
            "parent_id": comment.parent_id.split("_")[1],
            "reply_ids": [reply.id for reply in comment.replies],
        }
    
    def redditor_to_object(self, redditor):
        return {
            "id": redditor.id,
            "name": redditor.name,
            "comment_karma": redditor.comment_karma,
            "created_utc": int(redditor.created_utc),
            "has_verified_email": redditor.has_verified_email,
            "icon_img": redditor.icon_img,
            "is_employee": redditor.is_employee,
            "is_mod": redditor.is_mod,
            # "is_suspended": redditor.is_suspended,
            "is_gold": redditor.is_gold,
            "link_karma": redditor.link_karma,
            "verified": redditor.verified,
        }