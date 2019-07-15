import json
import requests
import datetime
import dateutil.parser
import github

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

def getIconAsString(icons):
    if icons and len(icons) > 0:
        return icons[0]
    else:
        return ''

def getDownloadLink(data):
    if (data):
        for item in data:
            type = item["type"]
            if type == "Download":
                download_link = item["url"]
                return download_link
    else:
        return ''

def formatGithubUrl(url):
    if not url:
        return
    find = "github.com/"
    pos = url.find(find)
    if pos == -1:
        return
    substring = url[pos + len(find):]
    if substring.find("/") == -1:
        return
    split = substring.split("/")
    if len(split) >= 2:
        return "{}/{}".format(split[0], split[1])

def getExtraDetailsFromGithubApi(g, api_url):
    if api_url:
        try:
            repo = g.get_repo(api_url)
            releases = repo.get_releases()
            for release in releases:
                if not release.prerelease:
                    tag_name = release.tag_name
                    created_at = release.created_at.strftime("%Y-%m-%dT%H:%M:%S") 
                    published_at = release.published_at.strftime("%Y-%m-%dT%H:%M:%S")
                    return {'created_at':created_at, 'published_at':published_at, 'tag_name':tag_name }
        except:
            print("Github api url not found={}".format(api_url))     

def postData(url, content):
    print("Posting data to url={} len={}".format(url, len(content["Apps"])))
    requests.post(url, json=content)

def getAppImageFeed(url):
    try:
        r = requests.get(url)
        return r.json()
    except:
        print("Failed to retrieve AppImage feed.")

def getIdentifier(item, name):
    authors = item["authors"]
        
    if authors and len(authors) > 0:
        author = authors[0]
        authorName = author["name"]
        if authorName:
            return name + ":" + authorName
    return name

def scrap():
    feedJson = getAppImageFeed('https://appimage.github.io/feed.json')
    if feedJson is None:
        return

    items = feedJson["items"]

    if not items:
        print("items property does not exist.")
        return

    print("Items length={}".format(len(items)))

    settings = getSettings("settings.json")
    if settings is None:
        return

    apiKey = settings["ApiKey"]
    if not apiKey:
        print("ApiKey does not exist.")
        return

    postUrl = settings["PostUrl"]
    if not postUrl:
        print("AppImagePostUrl does not exist.")
        return

    githubUser = settings["GithubUser"]
    githubPass = settings["GithubPass"]
    if not githubUser or not githubPass:
        print("Github user or pass does not exist.")
        return

    payload = {}
    payload["ApiKey"] = apiKey
    Apps = []

    g = github.Github(githubUser, githubPass)  

    for item in items:

        name = item["name"]

        if not name:
            continue

        identifier = getIdentifier(item, name)

        if not identifier:
            print("Could determine identifier for name={}".format(name))
            continue

        icon = getIconAsString(item["icons"])

        license = item["license"]
        download_link = getDownloadLink(item["links"])
        if not download_link:
            print("{} does not have a download link".format(name))

        download_api_link = formatGithubUrl(download_link)        
        detailsDict = getExtraDetailsFromGithubApi(g, download_api_link)

        src = "https://appimage.github.io/" + name

        if "description" in item:
            summary = item["description"]

        print("name={} identifier={}".format(name, identifier))
        print("\ttype={}".format(1))
        print("\ticon={}".format(icon))
        print("\tlicense={}".format(license))
        print("\tsrc={}".format(src))
        print("\tdownload_api={}".format(download_api_link))
        print("\tSummary={}".format(summary))

        if detailsDict:
            if 'created_at' in detailsDict:
                created_at = detailsDict['created_at']
                print("\tcreated_at={}".format(created_at))
            if 'published_at' in detailsDict:
                published_at = detailsDict['published_at']
                print("\tpublished_at={}".format(published_at))
            if 'tag_name' in detailsDict:
                tag_name = detailsDict['tag_name']
                print("\tversion={}".format(tag_name))
        else:
            created_at_time = datetime.datetime.now()
            created_at = created_at_time.strftime("%Y-%m-%dT%H:%M:%S")
            published_at_time = datetime.datetime.now()
            published_at = published_at_time.strftime("%Y-%m-%dT%H:%M:%S")
            
        print(g.rate_limiting)
        app = {"id": 0, "name":name, "type":1, "dateAdded":created_at, "lastUpdated":published_at, "src":src, "icon":icon, "currentVersion":tag_name,
         "identifier":identifier, "summary": summary}
        Apps.append(app)
    payload["Apps"] = Apps
    postData(postUrl, payload)

scrap()

    