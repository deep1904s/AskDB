import requests
import re
import os

OLLAMA_URL = os.getenv("OLLAMA_URL")
MODEL_NAME = os.getenv("MODEL_NAME")

def extract_sql(text):
    """
    Extract first SQL query from LLM response
    """
    # Remove markdown
    text = text.replace("```sql", "").replace("```", "").strip()

    # Remove prefixes
    text = text.replace("SQL:", "").replace("sql:", "").strip()

    # 🔥 Extract SQL using regex (IMPORTANT)
    match = re.search(r"(SELECT .*?;)", text, re.IGNORECASE | re.DOTALL)

    if match:
        return match.group(1).strip()

    return text.strip()


def generate_sql(question, schema):

    prompt = f"""
You are a PostgreSQL expert.

Database schema:
{schema}

STRICT RULES:
- Return ONLY SQL query
- NO explanation
- NO text before or after SQL
- NO markdown
- Use only given tables

Examples:

Q: Show all employees
SELECT * FROM employee_records;

Q: Show top 3 salaries
SELECT * FROM employee_records ORDER BY salary DESC LIMIT 3;

Q: Average salary
SELECT AVG(salary) FROM employee_records;

Now convert:
{question}
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "qwen:7b",
                "prompt": prompt,
                "stream": False
            }
        )

        raw_output = response.json()["response"]

        # 🔥 Extract clean SQL
        clean_sql = extract_sql(raw_output)

        return clean_sql

    except Exception as e:
        return f"ERROR: {str(e)}"