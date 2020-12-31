#PyPoll homework file
import os
import csv

#define path to csv file
elecdata_csv = os.path.join('Resources', 'election_data.csv')

with open(elecdata_csv) as csv_file:
    ed_reader = csv.reader(csv_file, delimiter=",")
#print(ed_reader)
    csvheader = next(ed_reader)
    electdata = list(ed_reader)
    
    #total vote count
    total_votes = len(electdata)
    print("Election Results")
    print("--------------------------")
    print("Total Votes: " + str(len(electdata)))
    print("--------------------------")

    #get names of candidates
    candidates = []
    for names in electdata:
        name = names[2]
        if name not in candidates:
            candidates.append(name)
    # print(candidates)

    #calculate votes per candidate
    vote_count = {}
    for candidate in candidates:
        vote_count[candidate] = 0
    for vote in electdata:
        name = vote[2]
        vote_count[name] = vote_count[name] + 1    
    print(vote_count)

    #vote count percentage
    for votes in vote_count:
        vote_count[votes] = round((vote_count[votes] / total_votes)*100,3)
    print(vote_count)

    # winner result
    winner = max(vote_count, key=vote_count.get)
    print("--------------------------")
    print("Winner:  " + (winner))
    print("--------------------------")

    



    