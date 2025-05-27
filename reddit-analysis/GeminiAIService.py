import os
from dotenv import load_dotenv
from IAIService import IAIService
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GENERATION_CONFIG = {
            "temperature": 0.01,
            "top_p": 1.0,
            # "top_k": 64,
            "max_output_tokens": 10,
            "response_mime_type": "text/plain",
            }

class GeminiAIService(IAIService):
    def __init__(self):
        super().__init__()
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=GENERATION_CONFIG,
            safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
            # safety_settings = Adjust safety settings
            # See https://ai.google.dev/gemini-api/docs/safety-settings
            )
        genai.configure(api_key=GEMINI_API_KEY)

    def is_submission_advice_seeking(self, submission_text) -> bool:

            chat_session = self.model.start_chat(
            history=[
                {
                "role": "user",
                "parts": [
                    "This GPT is designed to help users classify Reddit submissions as either seeking advice(1) or not(0). It analyzes the content, identifies cues like direct questions, requests for help, or phrases indicating advice-seeking behavior. It should distinguish posts that are simply sharing experiences or opinions from those that are actively asking for input, solutions, or guidance. The GPT only ever receives submissions pasted directly from reddit as input. Typically the format would start off with the title, then a flair and finally the selftext. However, this is not always the case.\nThe GPT is only ever allowed to answer between: 1/0",
                ],
                },
                {
                "role": "model",
                "parts": [
                    "Okay, I understand! \n\nYou can start pasting Reddit submissions and I'll respond with a \"1\" if the post is seeking advice and a \"0\" if it's not.  \n\nLet's begin! \n",
                ],
                },
            ]
            )

            response = chat_session.send_message(submission_text)
            return response.text[0] == "1"

# main
if __name__ == "__main__":
    service = GeminiAIService()
    submission_false = """
        Leftover pizza
        🍎 Food
        Probably not the most frugal but helpful tip:

        whenever we order pizza we intentionally order large and just freeze whatever slices we don’t eat. then when we don’t have time and are super hungry and busy we just pop the slices we wanna rest in the toaster oven.

        important to store in freezer safe bags or containers. And try to eat within the first 3 months.

        We also freeze lasagna as when making it we usually make too much for just 2/4 people. i do the same with rice and it’s a great kickstarter for quick meals like fried rice or egg drop soups with rice.
        """
    
    submission_true = """
    Is there something you would buy for yourself if you had 1k to spend in whatever you like?
Discussion 💬
My wife and I sold a house that increased its value over time. We are using most of the money to pay debt and a house down payment but we also decided to spend $1,000 each in anything we want.

This is not very frugal but I realized that I’ve been frugal for so long that I lost the will to buy something for myself. I feel like I don’t need anything right now and I feel guilty just by thinking about spending it.

Have you been in a similar situation?
        """
    print("False ==", service.is_submission_advice_seeking(submission_false))
    print("True ==", service.is_submission_advice_seeking(submission_true))
    print("True ==", service.is_submission_advice_seeking("I'm sad guys. I need some advice."))
        

    