#PyBank homework file

#modules
import os
import csv

#define path to csv file
bd_csv = os.path.join('Resources', 'budget_data.csv')

with open(bd_csv) as csv_file:
    bdreader = csv.reader(csv_file, delimiter=",")

#Count rows without header
    csv_header = next(bdreader)
    budget_data = list(bdreader)
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
    prior_month = int(budget_data[0][1])
    changes_list = []

    for row in budget_data:

        monthly_delta = int(row[1]) - prior_month
        monthly_change = monthly_delta + monthly_change
        prior_month = int(row[1])
        changes_list.append(monthly_delta)
        print(monthly_delta)
    changes_list.pop(0)

#calculate avg change
    avg_change = monthly_change / (len(budget_data) -1)
    print(avg_change)
#output greatest increase in profit
    print(max(changes_list))

#output greatest decrease in profit
    print(min(changes_list))