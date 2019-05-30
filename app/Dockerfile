FROM node:10
WORKDIR /usr/ts2/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./ 

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000

CMD [ "npm", "start"]