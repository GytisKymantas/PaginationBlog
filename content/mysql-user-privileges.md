---
title: 'How to Grant User Privileges in Google Cloud MySQL'
date: '2020-02-28'
slug: '/code/revoke-grant-permissions-mysql'
category: 'Code'
tags:
  - 'Google Cloud'
---

When you create a new user account in your Google Cloud MySQL database, it has the same privileges as a root user. It is, therefore, a good idea to limit the admin privileges of the new MySQL user with the `REVOKE` command and explicitly grant the required user privileges with the `GRANT` statement.

You can use MySQL Workbench or Sequel Pro to connect to your Cloud SQL database with the `root` user. Make sure that your database has a public IP and your computer's IP address is added as an authorized network in the Connections tab of your Database console.

`SHOW GRANTS FOR db_user`

If your MySQL user has root privileges, the statement will output the following:

```
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, SHUTDOWN, PROCESS, REFERENCES, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER, CREATE TABLESPACE ON *.* TO 'db_user'@'%' WITH GRANT OPTION
```

As a first step, you can revoke all privileges from the user account. You can either specify individual permissions, separated by commas, but since the root user has many privileges, we can revoke them all and grant the required one in another statement.

`REVOKE ALL PRIVILEGES, GRANT OPTION FROM db_user`

Next, we tell the server to reload the privileges from the grant tables in the MySQL system schema.

`FLUSH PRIVILEGES`

Finally, grant the required privileges to the user. In our case, the user should only be able to read, insert, view and delete rows from all tables in a specific database.

`GRANT SELECT, UPDATE, INSERT, DELETE ON db_name.* TO db_user`

Execute the Flush Privileges statement again to apply the changes.

`FLUSH PRIVILEGES`

You may also run the SHOW GRANTS statement to verify that the correct privileges have been applied to the user.

`SHOW GRANTS FOR db_user`
