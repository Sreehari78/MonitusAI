# summarizer.py
import openai
import os

def summarize_pdf_content(pdf_content):
    # Improved SUMMARIZER
    client = openai.OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key="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",
    )

    prompt = f"""
    You are ChatGPT, a large language model designed to summarize patient health records. Please provide a summary of the key details of the patient in the following format:
    All prescribed medications (names only)|| Age:, gender, known medical conditions, and previous injuries|| Allergies||
    Use commas to separate items and end each section with ||. Also list it all out in 1 sentence comma seperated. Try to respond as fast as possible.
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": pdf_content},
        ],
        model="gpt-3.5-turbo-1106",
        max_tokens=150,  # Adjust the value based on the desired length of the summary
    )

    result = chat_completion.choices[0].message.content.strip()
    print(result)
    return result
