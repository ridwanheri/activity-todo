FROM node:14.17.3

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8090

CMD ["npm", "start"]
