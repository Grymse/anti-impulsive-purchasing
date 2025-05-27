import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from IAIService import IAIService

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")
ASSISTANT_ID_CLUSTER_THEMES = os.getenv("ASSISTANT_ID_CLUSTER_THEMES")
SUBMISSION_ADVICE_SYSTEM_PROMPT = """This GPT is designed to help users classify Reddit submissions as either seeking advice(1) or not(0). It analyzes the content, identifies cues like direct questions, requests for help, or phrases indicating advice-seeking behavior. It should distinguish posts that are simply sharing experiences or opinions from those that are actively asking for input, solutions, or guidance. The GPT only ever receives submissions pasted directly from reddit as input. Typically the format would start off with the title, then a flair and finally the selftext. However, this is not always the case. The GPT is only ever allowed to answer between: 1/0"""
SUBMISSION_SHOPAHOLIC_SYSTEM_PROMPT = """This GPT is designed to help the user classify whether the author of an advice-seeking Reddit submission is a shopaholic(1) or not(0). Specifically, the user of the GPT wants to know if the submission's author has any impulsive buying or shopaholic tendencies. The author may not explicitly indicate/admit their problem, but the clues can be hidden between the lines. The GPT can make a judgment call even if the user does not explicitly admit their problem. The GPT should try to be as accurate as possible, and if ever in doubt about submission, it should make its best guess. The GPT only ever receives submissions pasted directly from reddit as input. Typically the format would start off with the title, then a flair and finally the selftext. However, this is not always the case. The GPT is only ever allowed to respond with either: 1/0"""
MODEL = "gpt-4o-mini"
# TEMPERATURE = 0.1

class OpenAIService(IAIService):

    def __init__(self):
        super().__init__()
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def is_submission_advice_seeking(self, submission_text) -> bool:
        # creating a thread
        thread = self.client.beta.threads.create()

        # adding a message to the thread
        self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=submission_text)
        
        # running the assistant
        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=ASSISTANT_ID
        )
        self.total_tokens_used += run.usage.total_tokens

        messages = self.client.beta.threads.messages.list(
        thread_id=thread.id)
        
        return int(messages.data[0].content[0].text.value) == 1
    
    def create_line(self, custom_id: str, user_prompt: str, system_prompt: str = SUBMISSION_ADVICE_SYSTEM_PROMPT):
        return json.dumps({
            "custom_id": custom_id,
            "method": "POST", 
            "url": "/v1/chat/completions", 
            "body": {
                "model": MODEL,
                # "temperature": TEMPERATURE,
                "messages": [{"role": "system", 
                              "content": system_prompt
                              },
                              {"role": "user", 
                               "content": user_prompt}]
                }
            })
    
    def upload_file(self, file_path: str):
        batch_input_file = self.client.files.create(
            file=open(file_path, "rb"),
            purpose="batch"
        )
        return batch_input_file.id
    
    def find_distinctive_themes_from_cluster_samples(self, cluster_samples: dict) -> dict:
        # creating a thread
        thread = self.client.beta.threads.create()

        full_text = ""

        for i, cluster_sample in cluster_samples.items():
            cluster_name = f"Cluster {i}"
            text = f"<{cluster_name}>\n"
            for sample in cluster_sample:
                text += f"<Sample>{sample}</Sample>\n"
            text += f"</{cluster_name}>"
            full_text += text

        self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=full_text)
        
        # running the assistant
        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=ASSISTANT_ID_CLUSTER_THEMES
        )
        self.total_tokens_used += run.usage.total_tokens

        messages = self.client.beta.threads.messages.list(
        thread_id=thread.id)

        response = messages.data[0].content[0].text.value
        response = json.loads(response)

        cluster_themes = {}

        for cluster_object in response["clusters"]:
            cluster_themes[cluster_object["cluster_id"]] = cluster_object["theme_name"]

        return cluster_themes
    
    def theme_summarization(self, cluster_theme_lists: dict) -> str:
        # creating a thread
        thread = self.client.beta.threads.create()

        self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=json.dumps(cluster_theme_lists))
        
        # running the assistant
        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=ASSISTANT_ID_CLUSTER_THEMES
        )
        self.total_tokens_used += run.usage.total_tokens

        messages = self.client.beta.threads.messages.list(
        thread_id=thread.id)

        return json.loads(messages.data[0].content[0].text.value)

# main
if __name__ == "__main__":
    service = OpenAIService()

    line_json1 = service.create_line("1", "I'm sad guys. I need some advice.")
    line_json2 = service.create_line("2", "I'm all good guys. I don't need any advice.")
    # save to test.jsonl file
    with open("test.jsonl", "w") as file:
        file.write(line_json1 + "\n")
        file.write(line_json2 + "\n")
    
    # upload file
    file_id = service.upload_file("test.jsonl")
    print("File ID: ", file_id)


    # submission_false = """
    #     Leftover pizza
    #     🍎 Food
    #     Probably not the most frugal but helpful tip:

    #     whenever we order pizza we intentionally order large and just freeze whatever slices we don’t eat. then when we don’t have time and are super hungry and busy we just pop the slices we wanna rest in the toaster oven.

    #     important to store in freezer safe bags or containers. And try to eat within the first 3 months.

    #     We also freeze lasagna as when making it we usually make too much for just 2/4 people. i do the same with rice and it’s a great kickstarter for quick meals like fried rice or egg drop soups with rice.
    #     """
    
    # submission_true = """
    #     Backpacks that last?
    #     🏆 Buy It For Life
    #     I haven't had a backpack, outside of my Osprey (which was pricey and too big/bulky for general commuting), really last more than a few years, but I've heard of folks having bags last a decade or more with regular use. Usually my zippers go first or pockets start tearing. I've started replacing zippers, but I don't have a sewing machine so it's a real job.

    #     Thanks for any suggestions!
    #     """
    # print("False ==", service.is_submission_advice_seeking(submission_false))
    # print("True ==", service.is_submission_advice_seeking(submission_true))
    # print("True ==", service.is_submission_advice_seeking("I'm sad guys. I need some advice."))
    # print("Total tokens used: ", service.total_tokens_used)
        
