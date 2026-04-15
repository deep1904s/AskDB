import requests
import re
import os

OLLAMA_URL = os.getenv("OLLAMA_URL")
MODEL_NAME = os.getenv("MODEL_NAME", "qwen2.5-coder:7b")

# ⚡ Cache for repeated queries
cache = {}

# -------------------------------
# 🔍 Extract SQL safely
# -------------------------------
def extract_sql(text):
    text = text.replace("```sql", "").replace("```", "").strip()
    text = text.replace("SQL:", "").replace("sql:", "").strip()

    # Extract SELECT query
    match = re.search(r"(SELECT .*?;)", text, re.IGNORECASE | re.DOTALL)

    if match:
        return match.group(1).strip()

    # fallback
    if "SELECT" in text:
        return text[text.find("SELECT"):].strip()

    return text.strip()


# -------------------------------
# 🛡️ SQL Safety Validator
# -------------------------------
def validate_sql(query):
    forbidden = ["drop", "delete", "update", "insert", "alter", "truncate"]

    q = query.lower()
    for word in forbidden:
        if word in q:
            raise Exception("❌ Dangerous query blocked!")

    return query


# -------------------------------
# 🧠 Generate SQL
# -------------------------------
def generate_sql(question, schema):

    # ⚡ Cache check
    if question in cache:
        print("⚡ Cache hit")
        return cache[question]

    # 🔥 Optimized prompt (coder-friendly)
    prompt = f"""
You are an expert PostgreSQL SQL generator.

Rules:
- Return ONLY SQL query
- No explanation
- No markdown
- Only valid PostgreSQL syntax
- Use only given table

Table:
employee_records({schema})

Important:
- For top N → use ORDER BY + LIMIT
- For top N per group → use ROW_NUMBER()

Question:
{question}
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            }
        )

        raw_output = response.json()["response"]

        print("🧠 RAW OUTPUT:\n", raw_output)

        # 🔍 Extract SQL
        sql_query = extract_sql(raw_output)

        # 🛡️ Validate SQL
        sql_query = validate_sql(sql_query)

        # ⚡ Save to cache
        cache[question] = sql_query

        return sql_query

    except Exception as e:
        return f"ERROR: {str(e)}"