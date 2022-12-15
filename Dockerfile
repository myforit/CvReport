# 用于build编译
FROM node:14.18
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build

# 用于发布到nginx
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY --from=0 /app/dist/ /usr/share/nginx/html/
