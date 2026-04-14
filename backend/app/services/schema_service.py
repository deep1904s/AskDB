from sqlalchemy import inspect
from app.database import engine

def get_schema():

    inspector = inspect(engine)
    schema_text = ""

    tables = inspector.get_table_names()

    if not tables:
        return "No tables found in database."

    for table in tables:
        columns = inspector.get_columns(table)
        col_names = [col["name"] for col in columns]

        schema_text += f"\nTable: {table}\nColumns: {', '.join(col_names)}\n"

    return schema_text