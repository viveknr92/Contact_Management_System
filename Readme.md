Docker:
docker build -t contacts .
docker run -p 3000:3000 contacts


Changes to MySQL: (for node mysql module to work)
CREATE USER 'username'@'remote_ip' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'remote_ip';

SELECT * FROM mysql.user WHERE User = 'username';

ALTER USER 'username'@'remote_ip' IDENTIFIED WITH mysql_native_password BY 'password'
FLUSH PRIVILEGES;