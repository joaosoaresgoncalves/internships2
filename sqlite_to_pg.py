import sqlite3
import psycopg2
import os

# SQLite connection
sqlite_path = "my_database.db"  # Update path to your SQLite database
sqlite_conn = sqlite3.connect(sqlite_path)
sqlite_cursor = sqlite_conn.cursor()

# PostgreSQL connection
pg_conn_string = "postgresql://neondb_owner:npg_hAGtSXb3l7Zs@ep-lively-glade-a8fj3b17-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
pg_conn = psycopg2.connect(pg_conn_string)
pg_cursor = pg_conn.cursor()

# Create tables in PostgreSQL
pg_cursor.execute("""
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    company TEXT,
    location TEXT,
    date TEXT,
    job_url TEXT,
    job_description TEXT,
    applied INTEGER,
    hidden INTEGER,
    interview INTEGER,
    rejected INTEGER,
    date_loaded TEXT,
    programme_name TEXT,
    opening_date TEXT,
    closing_date TEXT,
    last_year_opening TEXT,
    cv TEXT DEFAULT 'No',
    cover_letter_requirement TEXT DEFAULT 'No',
    written_answers_requirement TEXT DEFAULT 'No',
    notes TEXT,
    status TEXT,
    job_type TEXT,
    cover_letter TEXT,
    resume TEXT
)
""")

pg_cursor.execute("""
CREATE TABLE IF NOT EXISTS filtered_jobs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    company TEXT,
    location TEXT,
    date TEXT,
    job_url TEXT,
    job_description TEXT,
    applied INTEGER,
    hidden INTEGER,
    interview INTEGER,
    rejected INTEGER,
    date_loaded TEXT,
    job_type TEXT,
    opening_date DATE,
    closing_date DATE
)
""")

pg_conn.commit()

# Get data from SQLite and insert into PostgreSQL
for table in ['jobs', 'filtered_jobs']:
    sqlite_cursor.execute(f"SELECT * FROM {table}")
    rows = sqlite_cursor.fetchall()
    
    # Get column names
    sqlite_cursor.execute(f"PRAGMA table_info({table})")
    columns = sqlite_cursor.fetchall()
    column_names = [col[1] for col in columns]
    
    # Create placeholders for the INSERT statement
    placeholders = ",".join(["%s"] * len(column_names))
    
    # Insert data into PostgreSQL
    for row in rows:
        insert_query = f"INSERT INTO {table} ({','.join(column_names)}) VALUES ({placeholders})"
        pg_cursor.execute(insert_query, row)
    
pg_conn.commit()
pg_conn.close()
sqlite_conn.close()
print("Import completed successfully!")