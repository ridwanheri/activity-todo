FROM node:14.17.3

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3030

CMD ["npm", "start"]
