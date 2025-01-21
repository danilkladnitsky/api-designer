FROM node:20-alpine as builder

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build:web


FROM nginx:alpine as production-build
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /dist /usr/share/nginx/html/frontend-app

EXPOSE 8082

CMD ["nginx", "-g", "daemon off;"]