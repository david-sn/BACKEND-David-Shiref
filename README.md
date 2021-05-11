# Welcome To ATECHY GROUP Backend Challenge

## Assumptions
* Admin user can do list ticket
* Normal user can do add ticket, update first/last name.


## Non-functional requirements
make sure that port 3000 for node server and 3306 for mysql are free and not used by other apps.

## (A) Auto Installation Using Docker.
1- Install ```docker``` depends on your OS,  for docker check [here](https://docs.docker.com/get-docker/).

2- Extract or clone project and open bash inside base directory.

3- Make sure to configure database connection inside .env file

4- Excute ```$ docker build .```

5- Excute ```$ docker run {{IMAGE_ID}}```

6- Enjoy with postman collection find it [here](https://www.getpostman.com/collections/11e1cd4801974d52a005)


## (B) Manual Installation.

1- Install and configure Node.js engine version 12.16.1 or higher, see [download page](https://nodejs.org/en/download/).

2- Install and configure MySQL version 3.6.8 or higher, see [download page](https://www.mysql.com/downloads/).

3- Extract or clone project and open bash inside base directory

4- Execute ```$ npm install``` to build project and install required dependencies.

5- Check file ```/{{ProjectDir}}/.env``` if you have custom MySQL connection.

6- Execute ```$  npx sequelize-cli db:migrate``` to run migration file for database creation models.

7- Execute ```$  npx sequelize-cli db:seed:all``` to run seeder files for database initial data.

8- Execute ```$ npm test``` to run test cases.

9- Execute ```$ npm start``` to run the server.

10-  Enjoy with postman collection find it [here](https://www.getpostman.com/collections/11e1cd4801974d52a005)

## (C) API Docs.
[click here](https://documenter.getpostman.com/view/3227464/TzRU9mbZ)

## (D) Database Docs.
![Atechy Schema](https://i.ibb.co/y8SBRL3/Screen-Shot-2021-05-12-at-8-29-48-AM.png)

Note if you got error while using npx command try ```$ npm install --save-dev sequelize-cli```
```
Good Chance :)
