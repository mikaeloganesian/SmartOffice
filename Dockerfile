FROM node:20-alpine AS build
WORKDIR /app

COPY ./smart-office-frontend/package.json ./smart-office-frontend/package.lock.json* ./

RUN npm install

COPY ./smart-office-frontend .

RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

RUN rm -f *

COPY --from=build /app/build .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]