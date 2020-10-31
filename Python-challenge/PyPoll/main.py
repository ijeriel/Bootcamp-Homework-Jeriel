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
    
    #print(electdata[-1])
    total_votes = len(electdata)
    print(len(electdata))

    candidates = []
    for names in electdata:
        name = names[2]
        if name not in candidates:
            candidates.append(name)
    print(candidates)

    vote_count = {}
    for candidate in candidates:
        vote_count[candidate] = 0
    for vote in electdata:
        name = vote[2]
        vote_count[name] = vote_count[name] + 1    
    print(vote_count)

    for votes in vote_count:
        vote_count[votes] = vote_count[votes] / total_votes
    print(vote_count)