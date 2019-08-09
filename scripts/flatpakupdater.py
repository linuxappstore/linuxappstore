import json
import requests
import datetime
import dateutil.parser
import os.path

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
        print("Failed to retrieve feed.")

def postData(url, content):
    print("Posting data to url={}".format(url))    
    requests.post(url, json=content)

def scrap():
    feedJson = getJson("https://flathub.org/api/v1/apps/")
    if feedJson is None:
        return

    settings_path = "scripts/settings.json"

    if not os.path.isfile(settings_path):
        settings_path = "settings.json"

    settings = getSettings(settings_path)
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
        
    payload = {}
    payload["ApiKey"] = apiKey
    app_map = {}
    apps = getJson("http://localhost:5000/api/apps?type=2")

    for item in apps:
        app_map[item["identifier"]] = item

    for item in feedJson:
        name = item["name"]

        if not name:
            continue
    
        icon = item["iconDesktopUrl"]

        if not str(icon).startswith("https"):
            icon = "https://flathub.org" + icon

        identifier = item["flatpakAppId"]

        if not identifier:
            print("App={} missing identifier".format(name))
            continue

        src = "https://flathub.org/apps/details/" + identifier
        date_added = item["inStoreSinceDate"]
        created_at_datetime = dateutil.parser.parse(date_added)
        created_at = created_at_datetime.strftime("%Y-%m-%dT%H:%M:%S")
        last_updated_datetime = datetime.datetime.now()
        last_updated = item["currentReleaseDate"]

        if last_updated:
            last_updated_datetime = dateutil.parser.parse(last_updated)

        last_updated = last_updated_datetime.strftime("%Y-%m-%dT%H:%M:%S")
        current_version = item["currentReleaseVersion"]

        summary = item["summary"]

        print("name: {}".format(name))
        print("\ttype: 2")
        print("\ticon: {}".format(icon))
        print("\tdownload: {}".format(src))
        print("\tcreated_at: {}".format(created_at))
        print("\tlast_updated: {}".format(last_updated))
        print("\tcurrent_version: {}".format(current_version))
        print("\tsummary: {}".format(summary))

        app = {"id": 0, "name":name, "type":2, "dateAdded":created_at, "lastUpdated":last_updated,
            "src":src, "icon":icon, "currentVersion":current_version, "identifier":identifier, "summary": summary}

        if identifier in app_map:
            updateApp(app_map, app)  
        else:
            app_map[identifier] = app                      

    payload["Apps"] = list(app_map.values())
    postData(postUrl, payload)

def updateApp(app_map, new_app):
    old_app = app_map[new_app["identifier"]]

    name = old_app["name"]
    new_name = new_app["name"]

    updated = False

    if name != new_name: 
        old_app["name"] = new_name
        updated = True

    src = old_app["src"]
    new_src = new_app["src"]

    if src != new_src:   
        old_app["src"] = new_src
        updated = True

    icon = old_app["icon"]
    new_icon = new_app["icon"]

    if icon != new_icon:
        old_app["icon"] = new_icon
        updated = True

    current_version = old_app["currentVersion"]
    new_current_version = new_app["currentVersion"]

    if current_version != new_current_version:
        old_app["currentVersion"] = new_current_version
        updated = True
    
    if not updated:
        del app_map[new_app["identifier"]]

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

    apps = getJson("http://localhost:5000/api/apps?type=2")
    dict = {}
    for item in apps:
        dict[item["name"]] = item["id"]
    assoc = []
    scrapAudioVideoCategory(dict, assoc)
    scrapDevelopmentCategory(dict, assoc)
    scrapEducationCategory(dict, assoc)
    scrapGameCategory(dict, assoc)
    scrapGraphicsCategory(dict, assoc)
    scrapNetworkCategory(dict, assoc)
    scrapOfficeCategory(dict, assoc)
    scrapUtilityCategory(dict, assoc)
    category_assoc = [i for n, i in enumerate(assoc) if i not in assoc[n + 1:]] 
    payload = {}
    payload["ApiKey"] = apiKey
    payload["Categories"] = category_assoc
    payload["Type"] = 2
    postData(postCategoryUrl, payload)

def scrapAudioVideoCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/AudioVideo")
    if feedJson is None:
        return
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 1})

def scrapDevelopmentCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Development")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 4})

def scrapEducationCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Education")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 5})

def scrapGameCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Game")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 6})

def scrapGraphicsCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Graphics")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 7})

def scrapNetworkCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Network")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 8})

def scrapOfficeCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Office")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 9})

def scrapScienceCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Science")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 10})

def scrapSettingsCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Settings")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 11})

def scrapUtilityCategory(dict, assoc):
    feedJson = getJson("https://flathub.org/api/v1/apps/category/Utility")
    if feedJson is None:
        return 
    for item in feedJson:
        if item["name"] in dict:
            assoc.append({"linuxAppId": dict[item["name"]], "categoryId": 13})


scrap()