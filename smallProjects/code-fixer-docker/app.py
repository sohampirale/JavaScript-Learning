from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

tokenizer = AutoTokenizer.from_pretrained("Salesforce/codet5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("Salesforce/codet5-small")

# Function to generate fixed code
def fix_code(buggy_code: str) -> str:
    input_text = f"fix: {buggy_code}"
    inputs = tokenizer.encode(input_text, return_tensors="pt", truncation=True)
    outputs = model.generate(inputs, max_length=128, num_beams=5, early_stopping=True)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

if __name__ == "__main__":
    # Example broken code
    broken = "print('hello"
    fixed = fix_code(broken)
    print("🔧 Fixed Code:")
    print(fixed)
