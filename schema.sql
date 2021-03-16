CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  resultsId INT,
  count INT ,
  productId INT NOT NULL,
  PRIMARY KEY (id),
    FOREIGN KEY (resultsId)
        REFERENCES results(id)
        ON DELETE CASCADE
);
  
  
CREATE TABLE results (
  id INT NOT NULL AUTO_INCREMENT,
  photoId INT NOT NULL,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(45) NOT NULL,
  rating INT NOT NULL CHECK (rating<6 AND rating>=0),
  recommend BOOLEAN NOT NULL,
  summary VARCHAR(255) NOT NULL,
  helpfulness INT NULL,
  report INT NULL,
  body VARCHAR(255) NOT NULL,
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


CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  size DECIMAL(5,4) NOT NULL,
  width DECIMAL(5,4) NOT NULL,
  comfort DECIMAL(5,4) NOT NULL,
  PRIMARY KEY (id)
  );
  
CREATE TABLE photos(
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);



CREATE TABLE reponse (
  id INT NOT NULL AUTO_INCREMENT,
  resultsId INT NOT NULL,
  response VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (resultsId)
	REFERENCES results(id)
	ON DELETE CASCADE
);
  