FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install && npm run build

# FROM nginx
# RUN mkdir /app
# COPY --from=0 /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY /app/dist/ /usr/share/nginx/html/
