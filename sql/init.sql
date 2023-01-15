CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE
    IF NOT EXISTS application_user(
        uuid uuid DEFAULT uuid_generate_v4(),
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        PRIMARY KEY (uuid)
    )

    INSERT INTO application_user (username, password) VALUES ('admin', crypt('admin', 'my_salt'));