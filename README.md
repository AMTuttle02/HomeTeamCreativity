# HomeTeamCreativity
Database-Driven Website for Home Team Creativity  
https://www.hometeamcreativity.com  

## To Do List
https://ufindlay-my.sharepoint.com/:x:/g/personal/tuttlem2_findlay_edu/EdaYQbRsWVlFgGAmwEez-3EBvlVPPv5tjJLoOYsM91FH_g?e=1yUaFd&nav=MTVfe0VCMTIzN0UxLTc3MjEtNEMyOC1BOUI2LTFCRUYzMjY5OThFM30
  
## How To Run
- UI (frontend): localhost
- API (backend): localhost/api/
- PHPMyAdmin (DB): localhost:8080
### Clone the Repo  

### Setup .env

The initial `.env` file is called `sample.env`. You should be able to directly copy it to
`.env`.

- PITFALL! Make sure the file is `.env` and NOT `.env.txt`. On windows, enable "show filetype extensions"
  and then you can ensure the file is nammed correctly. You can also use `cp sample.env .env` if you are on the cli.

### Install Docker https://www.docker.com/products/docker-desktop/  
### Create a Free Docker Account  
### Finish Docker Set up Process  
### In WSL2:  
- Install "Just" using the below commands  
- curl -q 'https://proget.makedeb.org/debian-feeds/prebuilt-mpr.pub' | gpg --dearmor | sudo tee /usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg 1> /dev/null  
- echo "deb [arch=amd64 signed-by=/usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg] https://proget.makedeb.org prebuilt-mpr $(lsb_release -cs)" | sudo tee /etc/apt/sources.list.d/prebuilt-mpr.list  
- sudo apt update  
- sudo apt install just  
Refer to Just Commands
### Open repo in VSCode to edit

## Just Commands
### just up  
  - used to start the project  
### just stop
- used to stop docker containers, but keeps database info  
### just down  
- used to stop and remove all docker images, volumes, and data  

## Install NodeJS Latest Version (Optional)
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04

## Obtain var/www images that have been uploaded
docker cp hometeamcreativity-api-1:/var/www/images PHP/src

## Build for production
npm install  
npm run build
