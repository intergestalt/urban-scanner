# ÜBER Urbane praxis future scanner

## Structure

**/machine** runs on raspberry, queries api, reads scanner data and prints on thermal printer

**/api** assemles the texts, does the logic, delivers data to machine and web

**/web-dev** contains a react project and build system. you need do the build and check it in after modifying. the build will be delivered by the api server

## install

- on machine: **npm install-machine**
- on server: **npm install-api**
- for web-dev: **npm install-web**

## install machine on raspberry

both services for machine and api need to be installed. there are install scripts in **machine/bin** and **api/bin**

## dev

**npm run dev** in **/** to run the api on local port

**cd web-dev && npm run dev** to run the web dev environment with hot reload. remember to run **npm run build** after modifications and to check in the build

### dokku deployment

add a volume to persist data

`dokku storage:mount urban-scanner /var/lib/dokku/data/storage/urban-scanner/data:/app/data`

### sshfs

````sudo sshfs -o allow_other,defer_permissions pi@future-to-go.local:/ raspi````