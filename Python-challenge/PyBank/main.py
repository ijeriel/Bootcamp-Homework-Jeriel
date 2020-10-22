#PyBank homework file

#modules
import os
import csv

#define path to csv file
budget_csv = os.path.join('Resources', 'budget_data.csv')

with open(budget_csv) as csv_file:
    reader = csv.reader(csv_file, delimiter=",")

#Count rows without header
    csv_header = next(reader)
    budget_data = list(reader)
    lines = len(budget_data)

#print title for output
    print("Financial Analysis")
    print("--------------------------")
#print out total months
    print(f"Total Months:  {str(lines)}")

#calcualate net profit/loss
    profloss_sum = 0
    for row in budget_data:
        profloss_sum = profloss_sum + int(row[1])
    
    print("total: " + str(profloss_sum))

#calculate avg change in profit/loss
    monthly_change = 0
    
    for row in budget_data:
        profloss_sum = profloss_sum + int(row[1])
    
    print("total: " + str(profloss_sum))
#calculate avg change

#output greatest increase in profit

#output greatest decrease in profit