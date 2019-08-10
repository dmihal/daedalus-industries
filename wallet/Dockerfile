FROM node:10 AS build

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install

ARG INFURA_KEY
ENV REACT_APP_INFURA_KEY $INFURA_KEY

COPY . .
RUN yarn build


FROM nginx:1.16.0-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
