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


## License
This project is licensed under the MIT License - see the package.json file in backend folder for details
[MIT](https://choosealicense.com/licenses/mit/)
