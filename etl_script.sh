#!/bin/bash

# Define variables
JSON_FILE="input.json"
EXTRACTED_FILE="extracted_data.json"
TRANSFORMED_FILE="transformed_data.csv"
DB_USERNAME="your_username"
DB_NAME="your_dbname"
TABLE_NAME="your_table"

# Extract data from JSON
cat "$JSON_FILE" | jq '.data' > "$EXTRACTED_FILE"

# Transform data to CSV
cat "$EXTRACTED_FILE" | jq -r '.[] | [.field1, .field2] | @csv' > "$TRANSFORMED_FILE"

# Load data into PostgreSQL
psql -U "$DB_USERNAME" -d "$DB_NAME" -c "COPY $TABLE_NAME FROM '$TRANSFORMED_FILE' WITH CSV HEADER;"
