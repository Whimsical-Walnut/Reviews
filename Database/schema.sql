
DROP DATABASE IF EXISTS reviews_api;

CREATE DATABASE reviews_api;

use reviews_api;

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE review (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating<6 AND rating>=0),
  date DATETIME NOT NULL,
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(500),
  recommend TINYINT(1),
  reported TINYINT(1),
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL ,
  response VARCHAR(255),
  helpfulness INT DEFAULT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES product(id)
    ON DELETE CASCADE
  );



CREATE TABLE photos(
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  url VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id)
    REFERENCES review(id)
    ON DELETE CASCADE
);



  CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
	  REFERENCES product(id)
	  ON DELETE CASCADE
  );

  -- CREATE TABLE characteristics_product(
  -- id INT NOT NULL AUTO_INCREMENT,
  -- characteristics_id INT NOT NULL,
  -- product_id INT NOT NULL,
  -- PRIMARY KEY (id),
  -- FOREIGN KEY (product_id)
	--   REFERENCES product(id)
	--   ON DELETE CASCADE,
  -- FOREIGN KEY (characteristics_id)
	--   REFERENCES characteristics(id)
	--   ON DELETE CASCADE
  -- );


  CREATE TABLE characteristics_reviews(
  id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT NOT NULL, 
  review_id INT NOT NULL,
  value DECIMAL(5,4),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id)
    REFERENCES review(id)
    ON DELETE CASCADE,
  FOREIGN KEY(characteristic_id)
    REFERENCES characteristics(id)
    ON DELETE CASCADE
  );
  


