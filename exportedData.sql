CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    isVerified BOOLEAN,
    isAdmin BOOLEAN,
    forgotPasswordToken VARCHAR(255),
    forgotPasswordTokenExpiry DATETIME,
    verifyToken VARCHAR(255),
    verifyTokenExpiry DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME,
    __v INT
);

INSERT INTO
    users (
        username,
        email,
        password,
        isVerified,
        isAdmin,
        createdAt,
        updatedAt,
        __v
    )
VALUES
    (
        'aman',
        'amankirmara143@gmail.com',
        '$2a$10$WhZClUEuh5SOpjGOth4.cOyNegTNL0VPPEXLzUDWc15jvvSVJvIbu',
        true,
        false,
        '2024-04-15T11:04:52.349Z',
        '2024-04-15T11:09:29.823Z',
        0
    );

INSERT INTO
    users (
        username,
        email,
        password,
        isVerified,
        isAdmin,
        createdAt,
        updatedAt,
        __v
    )
VALUES
    (
        'iam',
        'iam@gmail.com',
        '$2a$10$oX4.TYqS7EBwk.fRaVH1We3rbJ2lEAfH2dqxJ16/7S8OyiXF9R3BC',
        false,
        false,
        '2024-04-15T16:30:29.369Z',
        '2024-04-15T16:30:29.520Z',
        0
    );

INSERT INTO
    users (
        username,
        email,
        password,
        isVerified,
        isAdmin,
        createdAt,
        updatedAt,
        __v
    )
VALUES
    (
        'one',
        'one@gmail.com',
        '$2a$10$Kbc60n9L5w/kXTc8uNmubulnbgeDr2sVVS1ALT5Zu4c79eaSxj.A2',
        false,
        false,
        '2024-04-15T17:01:28.462Z',
        '2024-04-15T17:01:28.621Z',
        0
    );