FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update -y && apt-get autoremove -y && apt-get install --no-install-recommends lsb-release && rm -rf /var/lib/apt/lists/* && rm -rf archive.tar.gz

RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
