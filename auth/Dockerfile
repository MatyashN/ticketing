FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omyt=dev

COPY . .

EXPOSE 3000 9229

CMD [ "npm", "run", "debug" ]
