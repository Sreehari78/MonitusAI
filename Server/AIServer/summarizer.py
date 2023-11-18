# summarizer.py
import openai


def summarize_pdf_content(pdf_content):
    ##SUMMARIZER
    client = openai.OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key="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",
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are ChatGPT, a large language model that is trained to accept a patient's health record and return a summary specific details about this person in the format: current mediations names only||age,gender,known medical conditions and previous injuries,has allergies. End the sentence with ||. Also list it all out in 1 sentence comma seperated\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02",
            },
            {"role": "user", "content": pdf_content},
        ],
        model="gpt-3.5-turbo",
        max_tokens=100,
    )
    print(chat_completion.choices[0].message.content)
    result = chat_completion.choices[0].message.content
    return result
