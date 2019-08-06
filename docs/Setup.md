# Clone Project

    git clone https://github.com/linuxappstore/linuxappstore.git

# Install [Podman](https://podman.io/)

#### Fedora 30

    sudo dnf install -y podman

# Setup Database

## Setup Postgres

    podman pull postgres
    
    podman run --name postgres -p 5432:5432 -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypass postgres
    
    podman pull dpage/pgadmin4
    
    podman run --name pgadmin4 -p 8000:80 -e PGADMIN_DEFAULT_EMAIL=myemail@domain.com -e PGADMIN_DEFAULT_PASSWORD=mypass --privileged -v ~/Programs/pgadmin4:/var/lib/pgadmin/storage/myemail_domain.com/ dpage/pgadmin4

  

## Connect to Postgres

1. Open [http://localhost:8000](http://localhost:8000)` in browser

2. Right click "Servers" select Create -> Server

3. Go to "Connection" tab

4. Open terminal type "hostname -I" grab first IP address e.g "192.168.1.139"

5. Put IP from step 4 in host name field in step 3

6. Port put 5432

7. Username put "myuser"

8. Password put "mypass"

9. Click save it should connect

## Restore Database

 1. Download the database
	[https://gofile.io/?c=fV5HOS](https://gofile.io/?c=fV5HOS)

 2. Go to pgadmin4 (http://localhost:8000/)

 3. Right click on the "linuxappstore" db click "Restore"

 4. Select the backup file you downloaded above then click "Restore"

# Build & Run
## Install [Go](https://golang.org/)

To run the backend, open linuxappstore project up in visual studio code. (File -> Open Folder Choose linuxappstore root directory)

Navigate to linuxappstore/server under src open server.go

Click the debug icon on the left sidebar
![enter image description here](https://i.imgur.com/PkPk7AJ.png)

Then click the green play button towards the top left that says "Go Run"

![enter image description here](https://i.imgur.com/2aCC9WW.png)

## Install [Yarn](https://yarnpkg.com/en/)
See [here](https://yarnpkg.com/en/docs/install) for install instructions

To check if yarn is installed properly open terminal and type `yarn -v` if it prints a version e.g "1.17.3" then you have yarn installed.

 1. Open terminal, and navigate to linuxappstore/web `cd linuxappstore/web`
 2. Type `yarn`
 3. Type `yarn run` (To run the project)