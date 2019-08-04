# Setup Database

## Install [Podman](https://podman.io/)
#### Fedora 30
    sudo dnf install -y podman
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
TODO  