import requests
import json



with open("/Users/jamesmccrory/new_dev/test-redux/counties.md") as f:
    counties = f.readlines()

url = "http://api.positionstack.com/v1/forward?access_key=52e99b5d77a7435eb22f2346eed240df&query="

with open("/Users/jamesmccrory/new_dev/test-redux/idk.md", "w") as new_or_old_file:
    for county in counties:
        new_or_old_file.write(county)
        r = requests.get(url+county)
        _json = r.json()
        data = _json.get("data", False)
        if data and len(data) and type(data[0]) == type({}):
            for datum in data:
                lat = datum.get("latitude", False)
                long = datum.get("longitude", False)
                if lat and long:
                    coords = str(lat) + " " + str(long)
                    new_or_old_file.write("\t"+coords+"\n")
