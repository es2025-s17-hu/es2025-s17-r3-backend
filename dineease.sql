CREATE USER 'competitor-1'@'%' IDENTIFIED WITH mysql_native_password BY 'dineease';GRANT USAGE ON *.* TO 'dineease'@'%';ALTER USER 'dineease'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `dineease`;GRANT ALL PRIVILEGES ON `competitior_1_db`.* TO 'competitor-1'@'%';

CREATE USER 'competitor-1'@'%' IDENTIFIED WITH mysql_native_password BY 'dineease';GRANT USAGE ON *.* TO 'competitor-1'@'%';ALTER USER 'competitor-1'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `competitor-1`;GRANT ALL PRIVILEGES ON `competitor-1`.* TO 'competitor-1'@'%';

CREATE USER 'competitor1'@'%' IDENTIFIED WITH mysql_native_password BY '***';GRANT USAGE ON *.* TO 'competitor1'@'%';ALTER USER 'competitor1'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `competitor1`;GRANT ALL PRIVILEGES ON `competitor1`.* TO 'competitor1'@'%';