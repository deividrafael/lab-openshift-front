# Use a container with Node pre-installed
FROM node:alpine

# Copy our pakagese file into the container
COPY package*.json /


# install packages node modules
RUN npm install

#set permission folders node_modules
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy our source file into the container
COPY . .

# This container needs Docker or OpenShift to help with networking
EXPOSE 3000

# OpenShift picks up this label and creates a service
#LABEL io.openshift.expose-services 8080/http

# OpenShift uses root group instead of root user
USER 1001

# Command to run when container starts up
CMD ["npm", "start"]
