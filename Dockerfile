FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN mkdir karmaStore
CMD node karma.js
