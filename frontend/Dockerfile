# Use a container with Node pre-installed
FROM node:alpine

#Informa workdir da aplicação
WORKDIR /app

# Copy our pakagese file into the container
COPY package*.json /

# install packages node modules
RUN npm install

# Copy our source file into the container
COPY . .

# This container needs Docker or OpenShift to help with networking
EXPOSE 3000

# Command to run when container starts up
CMD ["npm", "start"]
