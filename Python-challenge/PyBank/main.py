#PyBank homework file

#modules
import os
import csv

#define path to csv file
budget_csv = os.path.join('Resources', 'budget_data.csv')

with open(budget_csv) as csv_file:
    reader = csv.reader(csv_file, delimiter=",")

#Count rows without header
    csv_header = next(csv_file)
    lines = len(list(reader))

#print title for output
    print("Financial Analysis")
    print("--------------------------")
#print out total months
    print(f"Total Months:  {str(lines)}")

#calcualations
#budget_data = list(budget_csv)
#profloss_sum = 0
#for row in budget_data:
 #   profloss = int(row[1])

    #print(f"Total:  $ {sum(profloss)}")

#test

#calculate avg change

#output greatest increase in profit

#output greatest decrease in profit