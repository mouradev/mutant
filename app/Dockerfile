FROM node

WORKDIR /vagrant/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

# CMD [ "node", "app.js" ]
CMD ["bash"]