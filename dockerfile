FROM node:8.16-buster

USER root
RUN mkdir -p /opt/yuda-ecrf
WORKDIR /opt/yuda-ecrf

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9229 7777 443

CMD [ "npm", "run", "start" ]
