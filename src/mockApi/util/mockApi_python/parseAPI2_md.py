filepath = "/Users/jamesmccrory/new_dev/test-redux/api2.md"

with open(filepath) as f:
    content = f.readlines()


data = {}
entry = {}
curr_state_abbrev = None
place = None
for line in content:
    # place name and not coordinate
    if line[0] != '\t':
        if len(entry):
            inDict = data.get(curr_state_abbrev,False)
            if inDict:
                data[curr_state_abbrev].append(entry)
            else:
                data[curr_state_abbrev] = [entry]
            entry = {}

        place = line.strip('\t').strip('\n')
        entry[place] = []
        curr_state_abbrev = line.strip('\t').strip('\n')[-2:]
    else:
        entry[place].append(line.strip('\t').strip('\n'))


del data['9)']
del data['3)']


for abbrev,entries in data.items():
    for i, entry in enumerate(entries):
        for key, value in entry.items():
            if not len(value):
                entries.pop(i)


import json

# Data to be written
dictionary ={
  "id": "04",
  "name": "sunil",
  "depatment": "HR"
}

# Serializing json
json_object = json.dumps(data)
print(json_object)

write_filepath = "./"

with open("/Users/jamesmccrory/new_dev/test-redux/newFile.js", "w") as new_or_old_file:
    new_or_old_file.write("const api2 = {")
    new_or_old_file.write(json_object)
    new_or_old_file.write("}")
