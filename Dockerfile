FROM node:16.17.0-alpine as builder
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
ARG FACEBOOK_API_KEY
ENV VITE_APP_FACEBOOK_API_KEY=${FACEBOOK_API_KEY}
ENV VITE_APP_API_ENDPOINT_URL="https://developers.facebook.com/tools/explorer/"
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
