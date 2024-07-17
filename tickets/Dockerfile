FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omyt=dev

COPY . .

CMD [ "npm", "start" ]
