USE myproject;

-- Création des tables
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  s3_key VARCHAR(255) UNIQUE NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertion
INSERT INTO users (name, email, image) VALUES ('Asma', 'asma@example.com', 'asma.jpg');

SELECT * FROM users;
