
DROP DATABASE IF EXISTS reviewsAPI;

CREATE DATABASE reviewsAPI;

use reviewsAPI;

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  count INT NOT NULL DEFAULT 0,
  page INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);




CREATE TABLE review (
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  email VARCHAR(50) NOT NULL ,
  name VARCHAR(45) NOT NULL ,
  rating INT NOT NULL CHECK (rating<6 AND rating>=0),
  recommend TINYINT(1) DEFAULT NULL,
  summary VARCHAR(255) NOT NULL ,
  helpfulness INT DEFAULT NULL ,
  reponse VARCHAR(255) NOT NULL,
  report INT DEFAULT NULL,
  body VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
    REFERENCES product(id)
    ON DELETE CASCADE
  );



CREATE TABLE photos(
  id INT NOT NULL AUTO_INCREMENT,
  reviewId INT NOT NULL,
  url VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId)
    REFERENCES review(id)
    ON DELETE CASCADE
);



  CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );


  CREATE TABLE characteristics_reviews(
  id INT NOT NULL AUTO_INCREMENT,
  characteristicsId INT NOT NULL,
  reviewId INT NOT NULL,
  value DECIMAL(5,4) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristicsId)
	  REFERENCES characteristics(id)
	  ON DELETE CASCADE,
  FOREIGN KEY (reviewId)
    REFERENCES review(id)
    ON DELETE CASCADE

  );
  


