FROM "node:18"

WORKDIR /src/app/

COPY . .

RUN npm install next -g
RUN npm install

# ENTRYPOINT ["npm", "run"]
# CMD ["run", "dev"]

EXPOSE 3000/tcp
