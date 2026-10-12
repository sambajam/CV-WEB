
FROM nginx:alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the portfolio files into Nginx's web directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Copy CV files if they exist in the project root
COPY cv-*.pdf /usr/share/nginx/html/

EXPOSE 80
