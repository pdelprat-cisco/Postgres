CREATE TABLE accounts (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

INSERT INTO accounts (username, password, email, created_on) VALUES
	('admin', 'cisco', 'admin@cisco.com', NOW());

CREATE TABLE blacklists (
	type VARCHAR(50) NOT NULL,
	value VARCHAR(50) NOT NULL
);

INSERT INTO blacklists VALUES
    ('ip','10.1.1.1');

INSERT INTO blacklists VALUES
    ('domain','internetbadguys.com');

INSERT INTO blacklists VALUES
    ('url','http://internetbadguys.com');


