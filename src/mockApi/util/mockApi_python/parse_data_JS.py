#
# with open(write_filepath, "a") as new_or_old_file:
#     new_or_old_file.write(quote + "\n")

with open("/Users/jamesmccrory/new_dev/test-redux/src/mockApi_python/data.txt") as f:
    content = f.readlines()
state_pop_by_density = []
PUMA_data = []

found2 = False
for i, line in enumerate(content):

    found = line.find("properties:")
    if found != -1:
        state_pop_by_density.append(line)

    found2 = line.find("ID_PUMA:")
    if found2 != -1:

        # print(i,line)
        data = []
        for j in range(i,i+6):
            # print(j)
            if j < len(content):
                data.append(content[j])
        string = "".join(data)
        pop_data = None
        index = string.find("Population:")
        if index != -1:
            pop_data = string[index:]

        arr = string.split(":")

        # index2 = string.find("ID_Year:")
        # if index2 != -1:
        #     index3 = string.find("PUMA:")
        #     if index3 != -1:
        #         PUMA_string_data = string[index3:index2]

        geo_item_data = arr[2].split(",")
        abbrev = geo_item_data[-2].strip(" ").strip("\"")
        counties = "".join(geo_item_data).strip("PUMA")

        number = pop_data.split(":")[-1]
        arr2 = []
        for char in number:
            if char.isnumeric():
                arr2.append(char)

        string_pop = "".join(arr2)
        number = int(string_pop)

        geo_item_data = "".join(geo_item_data)

        # remove PUMA
        PUMA_index = len(geo_item_data)-1
        PUMA_index = geo_item_data.find("PUMA")
        geo_item_data = geo_item_data[:PUMA_index]

        # remove everything after and including a parentheses
        opening_parenth_index = geo_item_data.find("(")
        if opening_parenth_index != -1:
            geo_item_data = geo_item_data[:opening_parenth_index]


        forbidden = {"Counties", "County", "Cities", "City", "Municipality","Municipos","Municipio","Town","Towns","\n", "&","\""}
        # counties_string = geo_item_data.find("Counties")
        # county_string = geo_item_data.find("County")
        # cities_string = geo_item_data.find("Cities")
        # city_string = geo_item_data.find("City")
        # municipality_string = geo_item_data.find("Municipality")

        # check for ampersand
            # indicates a puma with multplie entries
        ampersand_index = geo_item_data.find("&")
        counties = []
        if ampersand_index != -1:
            geo_item_data = geo_item_data.strip("&")
            arr3 = geo_item_data.split(" ")
            for i, item in enumerate(arr3):
                if len(item) and item not in forbidden:
                    item = item.strip(",").strip("\"").strip("\'")
                    counties.append(item.strip(","))
        else:
            geo_item_data = geo_item_data.strip(",").strip("\"").strip("\'").strip(" ")
            item = []
            for char in geo_item_data:
                if char not in forbidden:
                    item.append(char)
            if len(item):
                counties.append("".join(item))
        entry = {"abbrev": abbrev, "counties":counties, "population": number}
        PUMA_data.append(entry)
        found2 = -1



print(state_pop_by_density)
# print(PUMA_data)

lookup = {
"Alabama" : "AL",
"Alaska" : "AK",
"American Samoa" : "AS",
"Arizona" : "AZ",
"Arkansas" : "AR",
"California" : "CA",
"Colorado" : "CO",
"Connecticut" : "CT",
"Delaware" : "DE",
"District Of Columbia" : "DC",
"Federated States Of Micronesia" : "FM",
"Florida" : "FL",
"Georgia" : "GA",
"Guam" : "GU",
"Hawaii" : "HI",
"Idaho" : "ID",
"Illinois" : "IL",
"Indiana" : "IN",
"Iowa" : "IA",
"Kansas" : "KS",
"Kentucky" : "KY",
"Louisiana" : "LA",
"Maine" : "ME",
"Marshall Islands" : "MH",
"Maryland" : "MD",
"Massachusetts" : "MA",
"Michigan" : "MI",
"Minnesota" : "MN",
"Mississippi" : "MS",
"Missouri" : "MO",
"Montana" : "MT",
"Nebraska" : "NE",
"Nevada" : "NV",
"New Hampshire" : "NH",
"New Jersey" : "NJ",
"New Mexico" : "NM",
"New York" : "NY",
"North Carolina" : "NC",
"North Dakota" : "ND",
"Northern Mariana Islands" : "MP",
"Ohio" : "OH",
"Oklahoma" : "OK",
"Oregon" : "OR",
"Palau" : "PW",
"Pennsylvania" : "PA",
"Puerto Rico" : "PR",
"Rhode Island" : "RI",
"South Carolina" : "SC",
"South Dakota" : "SD",
"Tennessee" : "TN",
"Texas" : "TX",
"Utah" : "UT",
"Vermont" : "VT",
"Virgin Islands" : "VI",
"Virginia" : "VA",
"Washington" : "WA",
"West Virginia" : "WV",
"Wisconsin" : "WI",
"Wyoming" : "WY" }


reverse_lookup = {}
api1 = {}

for state, abbrev in lookup.items():
    reverse_lookup[abbrev] = state
    api1[state] = []


for entry in PUMA_data:
    state = reverse_lookup.get(entry["abbrev"])
    if state:
        api1[state].append(entry)
    else:
        api1["Texas"].append(entry)


for entry,arr in api1.items():
    if len(arr):
        print(entry, arr[0])
    else:
        del entry

# api#1 => given a state, retrieve PUMAs:
#     PUMAs = counties and an over all population for PUMA
# api1 <-- write to file

write_filepath = "./"

with open("/Users/jamesmccrory/new_dev/test-redux/newFile.js", "w") as new_or_old_file:
    new_or_old_file.write("const api1 = [")
    for entry,arr in api1.items():
        new_or_old_file.write("{ State: " + "\""+ entry + "\""+  ", PUMAS: ["+"\n")
        # print(entry + "\n")
        for item in arr:
            new_or_old_file.write("\t" "{Counties: [")

            for county in item['counties']:
                location_lookup = county+", "+item['abbrev']
                # print("\t" + location_lookup + "\n")
                new_or_old_file.write("\t" + "\""+  location_lookup + "\"" +  ",\n")
            # print("\t" + str(item["population"]) + "\n")
            new_or_old_file.write("\t], Population: " + str(item["population"]) + "}, \n")
        new_or_old_file.write("]},")
    new_or_old_file.write("]")



"""
PUMA:{
    Alabama: {counties, population}, etc
}
"""

# api#2 => given a couty name, retireve coords
