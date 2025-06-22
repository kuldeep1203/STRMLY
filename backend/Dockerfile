
FROM node:18


WORKDIR /backend


COPY package*.json ./
RUN npm install
RUN npm run build
RUN npm start


COPY . .


EXPOSE 3000


CMD [ "npm", "start" ]
