# Dockerfile for Angular app
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/kanban-board /usr/share/nginx/html
# Expose port 4200 to the outside
EXPOSE 4200
# Use the default nginx.conf provided by the nginx image
COPY ./.angular/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
