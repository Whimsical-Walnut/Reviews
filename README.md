# Reviews_API

Reviews_API are review server to provide data to client in the format specified by the API documentation 

## Installation

Use the docker command [docker pull](https://pip.pypa.io/en/stable/) to pull the image

```bash
pull mosun611/sdc_reviews_api:reviews_api
```

## Run

```python
docker-compose up -d

-- modify db.js
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '<ip address>', 
    database: 'reviews_api'
});

module.exports.connection = connection;

-- load data to database container 
mysql -u root -f <localhost ip address> reviews_api < <path of the sql file>

```

## Deploy and use a MySQL Docker container in Ubuntu

Deploy Multi-Container Apps to AWS, need docker commands instead of docker-compose 

```bash
- Login aws launch an instance
- ssh to the instance 
- pull mosun611/sdc_reviews_api:reviews_api
- sudo docker pull mysql/mysql-server:5.7 (version depends)
- sudo docker run --name=<container name> -p 3306:3306 -d -e MYSQL_PASSWORD=<password> -e MYSQL_USER=<username> -e MYSQL_DATABASE=<database-name> mysql/mysql-server:5.7
- mysql -u<suername> -h127.0.0.1 -p<password> <databasename> < <path of the sql file>
- sudo docker exec -it <container-name> bash
- sudo docker run -d -p 80:<local-server port> <docker image repo>:<tagname>
- navigate to ec2 Public IPv4 address

- testing api routes in postman
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
