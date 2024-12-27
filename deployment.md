sudo apt update
sudo apt install nginx

sudo git pull 

systemctl status nginx

sudo systemctl stop nginx

sudo nano /etc/nginx/sites-available/default

replace the content of the server block with the content of the default.config

save the changes

sudo nginx -t

