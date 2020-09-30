#PyBank homework file

#modules
import os
import csv

#define path to csv file
budget_csv = os.path.join('Resources', 'budget_data.csv')

#Count number of rows
with open(budget_csv) as csv_file:
    reader = csv.reader(csv_file, delimiter=",")

    csv_header = next(csv_file)
    lines = len(list(reader))

#print out total months
    print(f"Total Months:  {str(lines)}")

#calcualate total profit/loss