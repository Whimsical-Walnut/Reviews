
DROP DATABASE IF EXISTS reviews_api;

CREATE DATABASE reviews_api;

use reviews_api;

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY (id)
);




CREATE TABLE review (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL ,
  rating INT NOT NULL CHECK (rating<6 AND rating>=0),
  recommend TINYINT(1) DEFAULT NULL,
  summary VARCHAR(255) NOT NULL ,
  helpfulness INT DEFAULT NULL ,
  reponse VARCHAR(255) NOT NULL,
  reported INT DEFAULT NULL,
  body VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES product(id)
    ON DELETE CASCADE
  );



CREATE TABLE photos(
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  url VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (review_id)
    REFERENCES review(id)
    ON DELETE CASCADE
);



  CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );


  CREATE TABLE characteristics_reviews(
  id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value DECIMAL(5,4) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristic_id)
	  REFERENCES characteristics(id)
	  ON DELETE CASCADE,
  FOREIGN KEY (review_id)
    REFERENCES review(id)
    ON DELETE CASCADE

  );
  


