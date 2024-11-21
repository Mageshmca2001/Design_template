# Use an Nginx base image
FROM nginx:alpine

# Copy your static files to the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
