# ai_processor.py
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# ... (other imports)


def generate_response(input, output):
    response = chain.run(input=input, output=output)
    return response
