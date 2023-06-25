FROM node:18-alpine
 
WORKDIR /user/src/app
 
# COPY ./dist /usr/src/app/dist
COPY ./dist ./dist
COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev
 
CMD [ "node", "dist/main.js" ]
# CMD /bin/sh