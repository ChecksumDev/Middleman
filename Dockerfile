FROM node:latest

RUN mkdir -p /usr/src/middleman
WORKDIR /usr/src/middleman
COPY package.json /usr/src/middleman
RUN npm install
COPY . /usr/src/middleman
CMD ["node", "src/main.js"]