FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t getrhythm .
# docker run -p 3000:3000 getrhythm
# docker run -p 3000:3000 -v ./src:/app/src getrhythm