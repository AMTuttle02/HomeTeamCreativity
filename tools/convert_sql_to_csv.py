#!/usr/bin/env python3
import re
import csv
import sys
from pathlib import Path

SQL_PATH = Path('products.sql')
CSV_PATH = Path('products.csv')

s = SQL_PATH.read_text(encoding='utf-8')

# Extract CREATE TABLE column order for `products`
create_match = re.search(r"CREATE TABLE `products`\s*\((.*?)\)\s*ENGINE=", s, re.S)
if create_match:
    create_body = create_match.group(1)
    cols = re.findall(r"`([^`]+)`\s+[A-Za-z]+", create_body)
else:
    cols = []

# Helper: parse all INSERT INTO products (...) VALUES ...; blocks
insert_pattern = re.compile(r"INSERT INTO `products`\s*\(([^)]+)\)\s*VALUES\s*(.*?);", re.S)

inserts = insert_pattern.findall(s)

rows = []
col_order_from_inserts = None

# stateful parser for tuple list

def extract_tuples(values_text):
    tuples = []
    i = 0
    n = len(values_text)
    while i < n:
        # skip whitespace and commas
        if values_text[i].isspace() or values_text[i] == ',':
            i += 1
            continue
        if values_text[i] == '(':
            depth = 0
            start = i
            in_quote = False
            escape = False
            while i < n:
                ch = values_text[i]
                if in_quote:
                    if escape:
                        escape = False
                    elif ch == '\\':
                        escape = True
                    elif ch == "'":
                        in_quote = False
                else:
                    if ch == "'":
                        in_quote = True
                    elif ch == '(':
                        depth += 1
                    elif ch == ')':
                        depth -= 1
                        if depth == 0:
                            i += 1
                            tuples.append(values_text[start:i])
                            break
                i += 1
        else:
            # unexpected char, try to advance
            i += 1
    return tuples


def parse_tuple(tup_text):
    # tup_text includes surrounding parentheses
    inner = tup_text[1:-1]
    fields = []
    i = 0
    n = len(inner)
    cur = []
    in_quote = False
    escape = False
    while i < n:
        ch = inner[i]
        if in_quote:
            if escape:
                cur.append(ch)
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == "'":
                in_quote = False
            else:
                cur.append(ch)
        else:
            if ch == "'":
                in_quote = True
            elif ch == ',':
                fields.append(''.join(cur).strip())
                cur = []
            else:
                cur.append(ch)
        i += 1
    fields.append(''.join(cur).strip())
    # Process SQL literals
    processed = []
    for f in fields:
        if f.upper() == 'NULL':
            processed.append('\\N')
        elif len(f) >= 2 and f[0] == "'" and f[-1] == "'":
            # shouldn't happen due to quote handling, but handle defensively
            innerf = f[1:-1]
            innerf = innerf.replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')
            processed.append(innerf)
        else:
            # numeric or unquoted; but strings parsed without surrounding quotes
            val = f
            # unescape backslashes and escaped quotes
            val = val.replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')
            # If it was a quoted string parsed with removed quotes, it may still contain surrounding quotes
            if len(val) >= 2 and val[0] == "'" and val[-1] == "'":
                val = val[1:-1]
            processed.append(val)
    return processed

# Parse each INSERT block
for cols_part, values_part in inserts:
    cols_list = [c.strip().strip('`') for c in cols_part.split(',')]
    if not col_order_from_inserts:
        col_order_from_inserts = cols_list
    # extract tuples
    tuples = extract_tuples(values_part)
    for t in tuples:
        parsed = parse_tuple(t)
        rows.append((cols_list, parsed))

# If no inserts found with column lists, try a looser search for VALUES (..),(..),...
if not inserts:
    # fallback: find "VALUES" occurrences after INSERT INTO `products`
    fallback_pattern = re.compile(r"INSERT INTO `products`\s*VALUES\s*(.*?);", re.S)
    for m in fallback_pattern.findall(s):
        tuples = extract_tuples(m)
        for t in tuples:
            parsed = parse_tuple(t)
            rows.append((cols, parsed))

# Determine final column order
if col_order_from_inserts:
    header = col_order_from_inserts
elif cols:
    header = cols
else:
    print('ERROR: could not determine column order', file=sys.stderr)
    sys.exit(1)

# Build CSV rows in header order
csv_rows = []
for cols_list, parsed in rows:
    # map parsed fields to their column names
    if len(cols_list) != len(parsed):
        print('WARNING: column count mismatch for a row: expected', len(cols_list), 'got', len(parsed), file=sys.stderr)
    row_map = {}
    for name, val in zip(cols_list, parsed):
        # strip surrounding single quotes if present
        if len(val) >= 2 and val[0] == "'" and val[-1] == "'":
            v = val[1:-1]
        else:
            v = val
        # unescape
        v = v.replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')
        row_map[name] = v
    # construct row in header order
    out = [row_map.get(h, '') for h in header]
    csv_rows.append(out)

# Write CSV with quoting and UTF-8
with CSV_PATH.open('w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)
    writer.writerow(header)
    for r in csv_rows:
        # represent SQL NULL as literal \N in fields
        r2 = [("\\N" if (x == '\\N') else x) for x in r]
        writer.writerow(r2)

# Validation
num_sql_rows = len(csv_rows)
# Count CSV rows excluding header
with CSV_PATH.open('r', encoding='utf-8') as f:
    csv_count = sum(1 for _ in f) - 1

print('Wrote', CSV_PATH, 'with', csv_count, 'rows')
print('Parsed', num_sql_rows, 'rows from SQL')
if csv_count == num_sql_rows:
    print('Row count MATCH')
else:
    print('Row count MISMATCH', file=sys.stderr)

# Quick column count validation
bad = 0
for i, r in enumerate(csv_rows, start=1):
    if len(r) != len(header):
        bad += 1
if bad == 0:
    print('All rows have', len(header), 'columns')
else:
    print('Rows with wrong column counts:', bad, file=sys.stderr)

# Exit code indicates success if counts match and no bad rows
if csv_count == num_sql_rows and bad == 0:
    sys.exit(0)
else:
    sys.exit(2)
