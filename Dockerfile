# Use the official Node.js 18 image as the base image.
FROM node:18-alpine
# Set the working directory inside the container.
WORKDIR /usr/app

# Copy the package.json file to the working directory.
COPY package.json ./

# Install the application dependencies.
RUN npm install


# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
