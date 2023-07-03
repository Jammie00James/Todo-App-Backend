CREATE TABLE notes(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(50) NOT NULL,
    body VARCHAR(1000) NOT NULL
);

INSERT INTO notes (title, body) VALUES ('John Doe', 'Sample notes');