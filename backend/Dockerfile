
FROM node:18


WORKDIR ./backend


COPY backend/package.json ./  
RUN npm install
RUN npm run build
RUN npm start


COPY backend/. .



EXPOSE 3000


CMD [ "npm", "start" ]
