FROM node:10
WORKDIR /usr/ts2/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./ 

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start"]