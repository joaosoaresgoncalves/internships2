import sqlite3
import pandas as pd
import os

# Use os.path.join for proper path handling
db_path = os.path.join("my_database.db")

try:
    # 1. Connect to the old database file
    old_conn = sqlite3.connect(db_path)

    # 2. Check what tables exist in the database
    cursor = old_conn.cursor()
    tables = cursor.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall()
    print("Available tables in the database:", [table[0] for table in tables])

    # 3. Read the specific columns from the correct table
    table_name = tables[0][0] if tables else None  # Use the first table if any exist

    if table_name:
        print(f"Using table: {table_name}")
        
        # Check what columns exist in the table
        columns_info = cursor.execute(f"PRAGMA table_info({table_name})").fetchall()
        column_names = [col[1] for col in columns_info]
        print(f"Available columns in {table_name}: {column_names}")
        
        # Determine which columns to select based on what's available
        columns_to_select = []
        column_mapping = {}
        
        if "company" in column_names:
            columns_to_select.append("company")
        
        if "job_url" in column_names:
            columns_to_select.append("job_url")
        
        if "title" in column_names:
            columns_to_select.append("title")
            column_mapping["title"] = "Type"
        
        # Check for possible date columns if data_loaded doesn't exist
        date_column = None
        for possible_date in ["data_loaded", "date", "posted_date", "date_posted", "created_at"]:
            if possible_date in column_names:
                date_column = possible_date
                columns_to_select.append(date_column)
                column_mapping[date_column] = "opening_date"
                break
        
        if not columns_to_select:
            print("None of the required columns found in the table.")
        else:
            # Build the SQL query with only existing columns
            columns_str = ", ".join(columns_to_select)
            df = pd.read_sql_query(f"SELECT {columns_str} FROM {table_name}", old_conn)
            
            # Rename columns only if they exist
            if column_mapping:
                df = df.rename(columns=column_mapping)
            
            # 5. Connect to the new database in the current directory
            new_conn = sqlite3.connect('new_db.db')
            
            # 6. Write the DataFrame to the new database
            df.to_sql('jobs_filtered', new_conn, if_exists='replace', index=False)
            
            new_conn.close()
            print("Data successfully transferred to new_db.db")
    else:
        print("No tables found in the database. Please check the database path.")

except sqlite3.Error as e:
    print(f"Database error occurred: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    # Ensure connection is closed even if an error occurs
    if 'old_conn' in locals():
        old_conn.close()