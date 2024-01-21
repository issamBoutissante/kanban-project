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
# Start Nginx and keep the process from running in the background
CMD ["nginx", "-g", "daemon off;"]
