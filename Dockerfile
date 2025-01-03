FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn global add serve

COPY serve.json /app/serve.json

EXPOSE 80

CMD ["serve", "-s", "build", "-c", "/app/serve.json", "-l", "tcp://0.0.0.0:80"]
