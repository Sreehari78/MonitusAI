from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

model_name_or_path = "TheBloke/zephyr-7B-alpha-GPTQ"
# To use a different branch, change revision
# For example: revision="gptq-4bit-32g-actorder_True"
model = AutoModelForCausalLM.from_pretrained(
    model_name_or_path, device_map="auto", trust_remote_code=False, revision="main"
)

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, use_fast=True)

prompt = "Tell me about AI"
prompt_template = f"""
You are an intelligent chatbot that predicts adverse drug reactions.
I will provide you a prescribed drugs, patient's age, sex, weight, the previous medical conditions, possible drug drug interactions which may or may not have dosage all as a single prompt also a list of known adverse reactions.
You will accurately predict what the list of possible adverse drug reactions.
1/ Response should be very similar or even identical to the past drug reactions, in terms of length, tone of voice, logical arguments, and other details

2/ If the prescription is not relevant enough, then try to mimic the style of possible adverse drug reaction

Below is a list of prompts with details of the patient and the drugs that are prescribed,adverse drug reactions,:
{input}
Here is a list of adverse drug reactions that occurred in similar scenarios:
{output}
Give the output in the following format in under 50 words just give the values without any tags:
Drug Name only,
list of adverse drug reactions not medical conditions with a short description with explanation,
risk level assessment as H for high and M for Medium and L for Low for the prescription and make that rating the last character in the output after a comma
"""

print("\n\n*** Generate:")

input_ids = tokenizer(prompt_template, return_tensors="pt").input_ids.cuda()
output = model.generate(
    inputs=input_ids,
    temperature=0.7,
    do_sample=True,
    top_p=0.95,
    top_k=40,
    max_new_tokens=512,
)
print(tokenizer.decode(output[0]))

# Inference can also be done using transformers' pipeline

print("*** Pipeline:")
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7,
    top_p=0.95,
    top_k=40,
    repetition_penalty=1.1,
)

print(pipe(prompt_template)[0]["generated_text"])
