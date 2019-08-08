import json
import requests
import datetime
import dateutil.parser
import subprocess

def getSettings(file_name):    
    try:
        try:
            with open(file_name) as json_file:
                data = json.load(json_file)
                return data
        except:
            raise ValueError("Could not open file={}".format(file_name))     
    except ValueError as e:
        print(e)

def getJson(url):
    try:
        r = requests.get(url)
        return r.json()
    except:
        print("Could not read feed api={}".format(url))

def postData(url, content):
    print("Posting data to url={}".format(url))
    requests.post(url, json=content)

def scrap():
    feedJson = getJson("https://search.apps.ubuntu.com/api/v1/search")
    if feedJson is None:
        return

    settings = getSettings("scripts/settings.json")
    if settings is None:
        return
    
    apiKey = settings["ApiKey"]
    if not apiKey:
        print("ApiKey does not exist.")
        return

    baseUrl = settings["BaseUrl"]
    if not baseUrl:
        print("BaseUrl does not exist")
        return

    postUrl = baseUrl + settings["PostUrl"]
    if not postUrl:
        print("PostUrl does not exist.")
        return

    embedded = feedJson["_embedded"]

    if not embedded:
        print("_embedded does not exist.")
        return

    snaps = embedded["clickindex:package"]

    if not snaps:
        print("clickindex:package does not exist.")
        return

    payload = {}
    payload["ApiKey"] = apiKey
    app_map = {}
    apps = getJson("http://localhost:5000/api/apps?type=3")

    for item in apps:
        app_map[item["identifier"]] = item

    for snap in snaps:
        title = snap["title"]
        if not title:
            print("Title does not exist.")
            continue
        current_version = snap["version"]
        if not current_version:
            current_version = ''
        
        icon = snap["icon_url"]
        if not icon:
            icon = ''

        package_name = snap["package_name"]
        if not package_name:
            print("Snap={} does not have a package name.".format(title))
            continue

        src = "https://snapcraft.io/" + package_name

        identifier = snap["snap_id"]
        if not identifier:
            print("Snap={} does not have an identifier".format(identifier))
            continue

        date_published = snap["date_published"]
        if not date_published:
            date_added_datetime = datetime.datetime.now()
        else:
            date_added_datetime = dateutil.parser.parse(date_published)

        date_added_formatted = date_added_datetime.strftime("%Y-%m-%dT%H:%M:%S")

        last_updated = snap["last_updated"]
        if not last_updated:
            last_updated_datetime = datetime.datetime.now()
        else:
            last_updated_datetime = dateutil.parser.parse(last_updated)

        last_updated_formatted = last_updated_datetime.strftime("%Y-%m-%dT%H:%M:%S")

        summary = snap["summary"]

        print("name: {}".format(title))
        print("\tidentifier: {}".format(identifier))
        print("\ttype: 3")
        print("\ticon: {}".format(icon))
        print("\tsrc: {}".format(src))
        print("\tcurrent_version: {}".format(current_version))
        print("\tdate_added: {}".format(date_added_formatted))
        print("\tlast_updated: {}".format(last_updated_formatted))
        print("\tsummary: {}".format(summary))
        print()

        app = {"id": 0, "name":title, "type":3, "dateAdded":date_added_formatted, "lastUpdated":last_updated_formatted,
        "src":src, "icon":icon, "currentVersion":current_version, "identifier":identifier, "summary": summary}

        if identifier in app_map:
            updateApp(app_map[identifier], app)            
        else:
            app_map[identifier] = app            
        
    payload["Apps"] = list(app_map.values())
    postData(postUrl, payload)

def updateApp(old_app, new_app):
    old_app["name"] = new_app["name"]
    old_app["lastUpdated"] = new_app["lastUpdated"]
    old_app["src"] = new_app["src"]
    old_app["icon"] = new_app["icon"]
    old_app["currentVersion"] = new_app["currentVersion"]

def scrapCategories():
    settings = getSettings("settings.json")
    if settings is None:
        return
    
    apiKey = settings["ApiKey"]
    if not apiKey:
        print("ApiKey does not exist.")
        return

    postCategoryUrl = settings["PostCategoryUrl"]
    if not postCategoryUrl:
        print("PostCategoryUrl does not exist.")
        return

    jsonFeed = getJson("http://localhost:5000/api/apps?type=3")
    nmap = {}
    for item in jsonFeed:
        nmap[item["name"]] = item["id"]
    assoc = []
    # SnapCraft category names mapped to Linux App Story category ids
    cmap = {
        "music-and-audio": 2,
        "photo-and-video": 3,
        "development": 4,
        "education": 5,
        "games": 6,
        "social": 8,
        "science": 10,
        "utilities": 13
    }
    for key, value in cmap.items():
        output = getProcessOutput("curl --unix-socket /run/snapd.socket 'http://localhost/v2/find?section={}'".format(key))
        outputJson = json.loads(output)
        if 'result' in outputJson:
            for item in outputJson["result"]:
                if 'title' in item:
                    appId = nmap[item["title"]]
                    assoc.append({"linuxAppId": appId, "categoryId": value})
    category_assoc = [i for n, i in enumerate(assoc) if i not in assoc[n + 1:]]
    payload = {}
    payload["ApiKey"] = apiKey
    payload["Categories"] = category_assoc
    payload["Type"] = 3
    postData(postCategoryUrl, payload)

def getProcessOutput(cmd):
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    data, err = process.communicate()
    if process.returncode is 0:
        return data.decode('utf-8')
    else:
        print("Error:", err)
    return ""

scrap()