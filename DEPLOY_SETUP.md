Install and setup redis

`sudo apt update`

`sudo apt install redis-server`

Go to the next file:
`sudo nano /etc/redis/redis.conf`

Fild the uncomented line 'supervised: no'

And change it to : 'supervised systemd'

After save the file.

then start redis:

`sudo systemctl restart redis.service`

Install nginx:

`sudo apt update`

`sudo apt install nginx`

check if you have git installed:

`git --version`

if not :

`sudo apt install git`

then clone the repository:

`sudo git clone https://github.com/developerVictoria/test-task-locaria.git`

Then enter the directory in order to make the docker container:

`cd test-task-locaria `

to build docker container:

`docker build -t express-backend . `

And after Run the container:

`docker run -p 3000:3000 express-backend`

then in order to setup the proxy:

check if nginx up and running:

`systemctl status nginx`


then alter next file:

`sudo nano /etc/nginx/sites-available/default `

replace the content of the server block with the content of the default.config in the root of the cloned project

save the changes

confirm that syntax after incertion is correct

`sudo nginx -t `

restart nginx

`sudo systemctl restart nginx`

now, our API wrapper is located at ip_adress of the machine