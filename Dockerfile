FROM node:10.13-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", ".env", "./"]
COPY . .
RUN npm install --development --silent 
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

EXPOSE 3000
CMD npm start