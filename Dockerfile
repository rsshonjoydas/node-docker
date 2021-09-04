FROM node:15
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . ./
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]