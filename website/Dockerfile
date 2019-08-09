FROM node:8.16

RUN useradd meteor -G staff -m -s /bin/bash

ADD --chown=meteor ./build/site.tar.gz /home/meteor

WORKDIR /home/meteor/bundle/programs/server
RUN yarn install --unsafe-perm

WORKDIR /home/meteor

CMD ["node", "bundle/main.js"]
