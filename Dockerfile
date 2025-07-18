FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5100

CMD ["npm", "run", "dev", "--", "--host"]
