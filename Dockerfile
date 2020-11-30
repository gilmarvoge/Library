FROM node:13-alpine

ENV PATH node_modules/.bin:$PATH
COPY package.json package.json
RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
# start app
RUN npm run build
CMD serve -p $PORT -s dist