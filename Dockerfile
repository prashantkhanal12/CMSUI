# base image
FROM node:12.7-alpine AS build

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH


# install and cache app dependencies
COPY package.json /app/package.json
#COPY .envdocker /app/.env

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

#RUN npm install -g yarn
#RUN yarn install --force 
RUN rm -rf node_modules && npm install
COPY . .

# start app
RUN npm run build


### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/.env.sample /usr/share/nginx/html/.env

RUN apk add --update nodejs && apk add --update npm && npm i -g runtime-env-cra@0.2.0

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]

