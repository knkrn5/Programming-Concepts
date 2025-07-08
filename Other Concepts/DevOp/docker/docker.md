# **_Docker Concepts_**

Docker is a platform for developing, shipping, and running applications in lightweight, portable containers.

- Containers package your application with all its dependencies (code, libraries, environment).
- They run the same way on any system that has Docker installed — **"It works on my machine"** no longer a problem.
- [Platform Deployment Styles](../CloudHosting.md)

## **Dockerfile vs Docker-compose**

1. **[🔗.Dockerfile Structure: -](https://docs.docker.com/build/concepts/dockerfile/)** _Docker Executes Dockerfile Instructions (Layer by Layer)_

   - Each instruction creates a new layer in the image

   ```docker
       #🧱 Defines a base for our image.
        FROM <image>
        # This sets up the runtime environment for our app (Node.js in this case).
        # we could also use: python:3.11, openjdk:17, node:18 etc., depending on our project.

        # 📁 Set working directory
       WORKDIR <directory>
        # All following commands (like RUN, CMD, ENTRYPOINT, COPY, and ADD) will be executed from this directory inside the container.

        # 📦 Copy package files and install dependencies
        COPY <src> <dest> # Copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.

        RUN <command> # Executes any commands in a new layer on top of the current image and commits the result. RUN also has a shell/ bash form for running commands.
        # like installing the dependencies first (better for caching).

        # 📂 Copy rest of the project files
        COPY . .
        # Now your source code and other files are copied into the container.

        # 🚪OPTIONAL, Expose the port your app runs on
        EXPOSE 3000
        # This is just *metadata* for documentation — it does not actually bind the port. but it is a good practice and helps tools and team members understand what this application is doing

        # 🚀 Start the application
        CMD <command> # This lets us define the default program that is run once we start the container based on this image. Each Dockerfile only has one CMD, and only the last CMD instance is respected when multiple exist.
        # CMD defines the default command that runs when the container starts.

        #CMD vs ENTRYPOINT - Both can start applications, but with important differences:
        # CMD: Can be overridden when running the container
        # ENTRYPOINT: Cannot be overridden, always executes
        # ENTRYPOINT + CMD: ENTRYPOINT is the command, CMD provides default arguments

   ```

   - Example of Docker file for the complied langangue like java

   ```docker
    FROM eclipse-temurin:17-jdk AS build
    WORKDIR /app
    COPY . .
    RUN chmod +x ./mvnw
    RUN ./mvnw clean package -DskipTests

    FROM eclipse-temurin:17-jdk
    WORKDIR /app
    COPY --from=build /app/target/*.jar app.jar
    EXPOSE 9090
    ENTRYPOINT ["java", "-jar", "app.jar"]

   ```

   - Example of Docker file for the interpreter langangue like node.js

   ```docker
    # syntax=docker/dockerfile:1

    ARG NODE_VERSION=20.16.0

    FROM node:${NODE_VERSION}-alpine

    # Use production node environment by default.
    ENV NODE_ENV=production

    WORKDIR /usr/src/app

    # Install PM2 globally
    RUN npm install -g pm2

    # Download dependencies as a separate step to take advantage of Docker's caching.
    RUN --mount=type=bind,source=package.json,target=package.json \
        --mount=type=bind,source=package-lock.json,target=package-lock.json \
        --mount=type=cache,target=/root/.npm \
        npm ci --omit=dev

    # Run the application as a non-root user.
    USER node

    # Copy the rest of the source files into the image.
    COPY . .

    # Copy the ecosystem configuration file
    COPY ecosystem.config.cjs .

    # Expose the port that the application listens on.
    EXPOSE 55555

    # Run the application when the user starts a container based on this image.
    CMD ["pm2-runtime", "ecosystem.config.cjs"]

    ############ Two ways of writing CMD ##################
    # ********Shell and exec form*******#
    # INSTRUCTION ["executable","param1","param2"] (exec form)
    CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
    #INSTRUCTION command param1 param2 (shell form)
    CMD flask run --host 0.0.0.0 --port 8000

   ```

2. **[🔗docker-compose.yml Structure](https://docs.docker.com/reference/compose-file/)**

   **Ques: -** WHY DO WE NEED DOCKER-COMPOSE FILE: - The Compose file provides a way to document and **configure all of the application's service dependencies (databases, queues, caches, web service APIs, etc).** Using the Compose command line tool, we can create and start one or more containers for each dependency with a single command (docker compose up). also if we have multiple env variables will have to setup multiline cli command like this

   ```bash
   # docker CLI cmd to run the container
    docker run -d \
    --name my-server-container \
    -p 55555:55555 \
    -v $(pwd):/usr/src/app \
    -e NODE_ENV=production \
    -e CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID \
    -e CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN \
    -e WS_DB_HOST=$WS_DB_HOST \
    -e WS_DB_PORT=$WS_DB_PORT \
    -e WS_DB_USER=$WS_DB_USER \
    -e WS_DB_PASSWORD=$WS_DB_PASSWORD \
    -e WS_DB_DATABASE=$WS_DB_DATABASE \
    my-server-app

    # using env file
    docker run -d \
    --name my-server-container \
    -p 55555:55555 \
    -v $(pwd):/usr/src/app \
    --env-file .env \
    my-server-app
   ```

   which seems to be very complicated, this is what the docker compose file make easier to run the container everytime.

   ```yml
   version: "3.8"
   services:
   web:
     build: .
     ports:
       - "3000:3000"
   redis:
     image: redis
   ```

   ```yml
   services:
   pghero:
     image: ankane/pghero
     restart: always
     ports:
       - "8081:8080" # Map port 8081 on your host to port 8080 in the container
     environment:
     DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?sslmode=disable
     depends_on:
       - postgres

   postgres:
     image: postgres:latest
     restart: always
     environment:
     POSTGRES_USER: ${POSTGRES_USER}
     POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
     POSTGRES_DB: ${POSTGRES_DB}
     ports:
       - "5432:5432" # Expose PostgreSQL on port 5432
     volumes:
       - pgdata:/var/lib/postgresql/data # Persist PostgreSQL data

     healthcheck:
     test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
     interval: 30s
     timeout: 10s
     retries: 5

   pgadmin:
     image: dpage/pgadmin4
     restart: always
     ports:
       - "8082:80" # Map port 8082 on your host to port 80 in the container
     environment:
     PGADMIN_DEFAULT_EMAIL: admin@admin.com
     PGADMIN_DEFAULT_PASSWORD: "@admin"
     depends_on:
       - postgres

   networks:
   my_network:

   volumes:
   pgdata:
   ```

   - Example of Docker-compose file for the complied langangue like java

   ```yml
   version: "3.8"

   services:
   backend:
     build: .
     ports:
       - "9090:9090"
     # environment:
     #   # jwt
     #   JWT_ISSUER: ${JWT_ISSUER}
     #   ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET}
     #   REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET}

     #   # PostgreSQL
     #   PSQL_DB_HOST_URL: ${PSQL_DB_HOST_URL}
     #   PSQL_DB_USERNAME: ${PSQL_DB_USERNAME}
     #   PSQL_DB_PASSWORD: ${PSQL_DB_PASSWORD}

     #   # Mail
     #   MAIL_HOST: ${MAIL_HOST}
     #   MAIL_FROM: ${MAIL_FROM}
     #   MAIL_PASS: ${MAIL_PASS}

     #   # redis
     #   REDIS_URL: ${REDIS_URL}

     env_file: # env_file to inject .env variables into the container runtime. similar Render's Environment Variables → Set in Render dashboard → Injected into container at runtime, and render does not even use the compose file at all.
       - .env

     restart: always
   ```

   - Example of Docker file for the interpreter langangue like node.js

   ```yml
   services:
   server:
     build:
     context: .
     volumes:
       - .:/usr/src/app
     environment:
     NODE_ENV: production
     CONTENTFUL_SPACE_ID: ${CONTENTFUL_SPACE_ID}
     CONTENTFUL_ACCESS_TOKEN: ${CONTENTFUL_ACCESS_TOKEN}
     WS_DB_HOST: ${WS_DB_HOST}
     WS_DB_PORT: ${WS_DB_PORT}
     WS_DB_USER: ${WS_DB_USER}
     WS_DB_PASSWORD: ${WS_DB_PASSWORD}
     WS_DB_DATABASE: ${WS_DB_DATABASE}
     ports:
       - 55555:55555
   ```

3. **.dockerignore: -** _Remaining files (after .dockerignore filtering) are sent to Docker daemon for build context_

   - Only files that survived the .dockerignore filter are available for COPY commands

   ```txt
   ❓ Why You Should Not Ignore Dockerfile and docker-compose.yml in .dockerignore
   ✅ 1. They Are Not Automatically Added to the Image
   Docker only includes files in the build context if you explicitly COPY or ADD them in your Dockerfile.

   If you don't write something like COPY Dockerfile ., then Dockerfile is not included in the final image anyway.
   ```

### **Docker CLI Commands⬇️**

```bash
### Building and running your application

# clearing the Docker build cache

docker builder prune -a

docker compose up --build
docker-compose build --no-cache

docker-compose logs nginx

## removing old image

docker rmi wealthpsychology-app-server:latest

Your application will be available at http://localhost:55555.

### how to make tag Deploying your application to the docker hub cloud

docker tag <local_image_name> <docker_hub_username>/<repository_name>:<tag>

### How to overwrite the tag

# first update docker desktop tag

docker build -t wealthpsychology-app-server:latest .

# Then create the same tag of the already existing in docker hub

docker tag wealthpsychology-app-server:latest knkrn5/wealthpsychology-app-server:v1.0.1

# and then push the same again to docker hub

docker push knkrn5/wealthpsychology-app-server:v1.0.1
```

## **Multi-stage builds: -** _The use of separate "build" and "run" stages in Dockerfiles is mostly needed for compiled languages. For interpreted languages like Node.js, it’s not required, but sometimes used to separate dev and prod dependencies._

| Language | Needs Multi-Stage? | Why?                          |
| -------- | ------------------ | ----------------------------- |
| Java     | ✅ Yes             | Compile `.java` → `.jar`      |
| Kotlin   | ✅ Yes             | Same as Java                  |
| Go       | ✅ Often           | Compile binary                |
| Rust     | ✅ Yes             | Heavy toolchain to compile    |
| C/C++    | ✅ Yes             | Compiled binary               |
| Node.js  | ❌ Optional        | No build step unless bundling |
| Python   | ❌ No              | Direct execution              |
| Ruby     | ❌ No              | Interpreted                   |

---

```docker
# Build
# node-js example
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm ci

# Run
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
CMD ["node", "server.js"]

```
