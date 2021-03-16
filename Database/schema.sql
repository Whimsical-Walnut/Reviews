
DROP DATABASE IF EXISTS reviewsAPI;

CREATE DATABASE reviewsAPI;

use reviewsAPI;



CREATE TABLE photos(
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);



CREATE TABLE review (
  id INT NOT NULL AUTO_INCREMENT,
  photoId INT NOT NULL,
  email VARCHAR(50) NOT NULL DEFAULT '',
  name VARCHAR(45) NOT NULL DEFAULT '',
  rating INT NOT NULL CHECK (rating<6 AND rating>=0),
  recommend TINYINT(1) DEFAULT NULL,
  summary VARCHAR(255) NOT NULL DEFAULT '',
  helpfulness INT DEFAULT NULL ,
  reponse VARCHAR(255) NOT NULL DEFAULT '',
  report INT DEFAULT NULL,
  body VARCHAR(255) NOT NULL DEFAULT '',
  date DATETIME NOT NULL,
  characteristicsId INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (photoId)
	  REFERENCES photos(id)
	  ON DELETE CASCADE,
  FOREIGN KEY (characteristicsId)
	  REFERENCES characteristics(id)
	  ON DELETE CASCADE
  );

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  reviewId INT NOT NULL,
  count INT DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId)
    REFERENCES review(id)
    ON DELETE CASCADE,
);

CREATE TABLE rating(
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  rating INT NOT NULL CHECK (rating<6 AND rating>=0) DEFAULT 0, 
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );

CREATE TABLE recommended(
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  yes INT NOT NULL DEFAULT 0,
  no INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );
  
  CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  value DECIMAL(5,4) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );
  