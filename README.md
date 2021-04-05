# Reviews_API

Reviews_API are review server to provide data to client in the format specified by the API documentation 

## Installation

Use the docker command [docker pull](https://pip.pypa.io/en/stable/) to pull the image

```bash
pull mosun611/sdc_reviews_api:reviews_api from docker
```

## Run

```python
docker-compose up -d

-- modify db.js
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '<ip address>', 
    database: '<database name>'
});

module.exports.connection = connection;

-- load data to database container 
mysql -u root -h <localhost ip address> --port 3306 reviews_api < <path of the sql file>

```

## Deploy and use a MySQL Docker container in Ubuntu

Deploy Multi-Container Apps to AWS, need docker commands instead of docker-compose 

```bash
- Login aws launch an instance
- ssh to the instance 
- pull mosun611/sdc_reviews_api:reviews_api from docker
- sudo docker pull mysql/mysql-server:5.7 (version depends)
- sudo docker run --name=<container name> -p 3306:3306 -d -e MYSQL_PASSWORD=<password> -e MYSQL_USER=<username> -e MYSQL_DATABASE=<database-name> mysql/mysql-server:5.7 (you can add volume environment variable to store the data on instance)
- mysql -u<username> -h<local machine ip address> -p<password> <databasename> < <path of the sql file>
- scp -i "<instance pem/cer file>" <file path> ubuntu@ec2-3-101-119-1.us-west-1.compute.amazonaws.com:/home/ubuntu
- sudo docker exec -it <container-name> bash
- sudo docker run -d -p 80:<local-server port> <docker image repo>:<tagname>
- navigate to ec2 Public IPv4 address

- testing api routes in postman
```

## Testing database running on local machine vs docker container

```bash
- brew services stop mysql (on mac)
- sudo services mysql stop (ubuntu)
- docker run mysql container
- test mysql still works, if yes, mysql is for sure running in docker container 
```


## Grant All the user 

```bash
- sudo mysql
- CREATE USER 'example_user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
- GRANT ALL ON example_database.* TO 'example_user'@'%';

- exit
```



## NGINX config

```bash
worker_processes auto;

http {
  keepalive_timeout 150;
  keepalive_requests 5000;
  upstream all {
    server 204.236.190.49:80;
    server 13.56.253.164:80;
    server 52.53.246.50:80;
    server 3.101.73.228:80;
    keepalive 2000;
  }
  server {
    listen 3001;
    root   /home/public;
    location / {
      proxy_pass http://all/;
       proxy_connect_timeout 159s;
       proxy_send_timeout   600;
       proxy_read_timeout   3600;
       proxy_buffer_size    64k;
       proxy_buffers     16 32k;
       proxy_busy_buffers_size 64k;
       proxy_temp_file_write_size 64k;
       proxy_pass_header Set-Cookie;
       proxy_redirect     off;
       proxy_hide_header  Vary;
       proxy_set_header   Accept-Encoding '';
       proxy_ignore_headers Cache-Control Expires;
        proxy_set_header   Referer $http_referer;
       proxy_set_header   Host   $host;
       proxy_set_header   Cookie $http_cookie;
       proxy_set_header   X-Real-IP  $remote_addr;
       proxy_set_header X-Forwarded-Host $host;
       proxy_set_header X-Forwarded-Server $host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /loaderio-2ea3258a3973d24a3a134fd54d2a32f7.txt {
    }
  }
}

events {
  worker_connections 10000;
}

```



## License
This project is licensed under the MIT License - see the package.json file in backend folder for details
[MIT](https://choosealicense.com/licenses/mit/)
