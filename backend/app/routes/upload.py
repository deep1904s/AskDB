from fastapi import APIRouter, UploadFile, File
import pandas as pd
from app.database import engine

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file, encoding="latin1")

        # Clean column names
        df.columns = df.columns.str.strip().str.lower()

        # Table name from file
        table_name = file.filename.split(".")[0].lower()

        # Store in PostgreSQL
        df.to_sql(table_name, con=engine, if_exists="replace", index=False)

        return {
            "message": "Upload successful",
            "table": table_name,
            "columns": list(df.columns)
        }

    except Exception as e:
        return {"error": str(e)}