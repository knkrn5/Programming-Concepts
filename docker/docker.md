# **_Docker Concepts_**

Docker is a platform for developing, shipping, and running applications in lightweight, portable containers.

- Containers package your application with all its dependencies (code, libraries, environment).
- They run the same way on any system that has Docker installed — **"It works on my machine"** no longer a problem.
- **Railway deploys all applications using Docker under the hood**, but it provides both Dockerfile-based and native (non-Docker) workflows.
  - Railway auto-detects your project type (like Node.js, Python, Go, Java, etc.) based on the repository contents and **uses internal Docker templates** to build and run it. **(Native Build (No Dockerfile Required) – "Zero Config")**

## **Dockerfile vs Docker-compose**

1. **.Dockerfile**

   ```docker
       # 🧱 Use a base image
        FROM node:18
        # This sets up the runtime environment for your app (Node.js in this case).
        # You could also use: python:3.11, openjdk:17, etc., depending on your project.

        # 📁 Set working directory
        WORKDIR /app
        # All following commands (like COPY, RUN) will be executed from this directory inside the container.

        # 📦 Copy package files and install dependencies
        COPY package*.json ./
        RUN npm install
        # This installs only the dependencies first (better for caching).

        # 📂 Copy rest of the project files
        COPY . .
        # Now your source code and other files are copied into the container.

        # 🚪 Expose the port your app runs on
        EXPOSE 3000
        # This is just *metadata* for documentation — it does not actually bind the port.

        # 🚀 Start the application
        CMD ["node", "index.js"]
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

    # Run the application with PM2 using the ecosystem file
    CMD ["pm2-runtime", "ecosystem.config.cjs"]

   ```

2. **docker-compose.yml**

   **Ques: -** WHY DO WE NEED DOCKER-COMPOSE FILE: - The Compose file provides a way to document and **configure all of the application's service dependencies (databases, queues, caches, web service APIs, etc).** Using the Compose command line tool WE can create and start one or more containers for each dependency with a single command (docker compose up).

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

3. **.dockerignore**

```txt
❓ Why You Should Not Ignore Dockerfile and docker-compose.yml in .dockerignore
✅ 1. They Are Not Automatically Added to the Image
Docker only includes files in the build context if you explicitly COPY or ADD them in your Dockerfile.

If you don't write something like COPY Dockerfile ., then Dockerfile is not included in the final image anyway.
```

### **Docker CLI Commands**

```md
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
