FROM node:latest

RUN mkdir parse
RUN mkdir parse/cloud
RUN touch parse/cloud/main.js
RUN chmod +x *.sh

ADD . /parse
WORKDIR /parse
#RUN npm install

ENV APP_ID a5dee5f93e5dce98effcfb4aa30bf5f1
ENV MASTER_KEY bb054a15cab720e6b3ef4ca890ec1335
ENV DATABASE_URI mongodb://mongo/dev

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
# ENV PARSE_MOUNT mountPath

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

VOLUME /parse/cloud

CMD [ "npm", "start" ]
