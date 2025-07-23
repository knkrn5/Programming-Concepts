# **_Docker Concepts_**

Docker is a platform for developing, shipping, and running applications in lightweight, portable containers.

- Containers package your application with all its dependencies (code, libraries, environment).
- They run the same way on any system that has Docker installed — **"It works on my machine"** no longer a problem.
- [Platform Deployment Styles](../CloudHosting.md)

## **Dockerfile vs Docker-compose: -** _Both can be used for building and running the container_

- **Docker layering and Caching: -**
  - Each command in the **dockerfile** creates the sperate layer

1. **[🔗Dockerfile Structure: -](https://docs.docker.com/build/concepts/dockerfile/)** _Docker Executes Dockerfile Instructions (Layer by Layer)_

   - Each instruction creates a new layer in the image

   ```docker
       #🧱 Defines a base for our image.
        FROM <image>
        # This sets up the runtime environment for our app (Node.js in this case).
        # we could also use: python:3.11, openjdk:17, node:18 etc., depending on our project.

        # 📁 Set working directory name
       WORKDIR <directory>
        # All following commands (like RUN, CMD, ENTRYPOINT, COPY, and ADD) will be executed from this directory inside the container.

        # 📦 Copy package files and install dependencies
        COPY <src> <dest> # Copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.

        RUN <command> # Executes any commands in a new layer on top of the current image and commits the result. RUN also has a shell/ bash form for running commands.
        # like installing the dependencies first (better for caching).

        # 📂 Copy rest of the project files
        COPY . .
        # Now our source code and other files are copied into the container, in the directory written in the WORKDIR

        # 🚪OPTIONAL, Expose the port your app runs on
        EXPOSE 3000
        # This is just *metadata* for documentation — it does not actually bind the port. but it is a good practice and helps tools and team members understand what this application is doing

        # 🚀 Start the application
        ENTRYPOINT <command>
        CMD <command> # This lets us define the default program that is run once we start the container based on this image. Each Dockerfile only has one CMD, and only the last CMD instance is respected when multiple exist.
        # CMD defines the default command that runs when the container starts.

        #CMD vs ENTRYPOINT - Both can start applications, but with important differences:
        # CMD: Can be overridden when running the container with docker CLI like this "docker run my-spring-app --spring.profiles.active=dev"
        # ENTRYPOINT: Cannot be overridden, always executes
        # ENTRYPOINT + CMD: ENTRYPOINT is the command, CMD provides default arguments

         ℹ️### Two ways of writing CMD ###
        # ********1. Shell form*******#
        CMD ["executable","param1","param2"] #(exec form)
        CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]

        # ********1. exec form*******#
        CMD command param1 param2 #(shell form)
        CMD flask run --host 0.0.0.0 --port 8000

   ```

   ***

   | **Host Value** | **Meaning**                         | **Accessible From**            | **Use Case in Docker**                                         |
   | -------------- | ----------------------------------- | ------------------------------ | -------------------------------------------------------------- |
   | `127.0.0.1`    | Loopback (localhost) interface only | Inside the container **only**  | Good for internal-only communication; not visible to host      |
   | `0.0.0.0`      | All network interfaces              | Inside & outside the container | Required for host-to-container access (e.g., `localhost:8000`) |

   ***

   - Example of Docker file for the complied langangue like java

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
 FROM eclipse-temurin:17-jdk AS build

 # Name of the working directory
 WORKDIR /app

 # Copies all the source code file into the WORKDIR
 COPY . .

 # This is used to download the maven wrapper script
 # It is used to run the maven commands without having maven installed on the system
 RUN chmod +x ./mvnw

 # This builds the spring-boot maven project/ application
 # -DskipTests is used to skip tests during the build process
 RUN ./mvnw clean package -DskipTests

 FROM eclipse-temurin:17-jdk

 # here working dir name can be different, then that in the build working dir name
 WORKDIR /app

 # Copies all the .jar file from the build stage to the current working directory
 # The .jar file is located in the target directory of the maven project
 COPY --from=build /app/target/*.jar app.jar

 # This is used to run the spring-boot application on port 9090
 # The port can be changed to any other port, but it should be the same as the one used in the application.properties file
 # or the one used in the docker-compose file
 EXPOSE 9090

 # exec form (RECOMMENDED)
 ENTRYPOINT ["java", "-jar", "app.jar"]
 #or
 # Shell form - runs through shell
 ENTRYPOINT java -jar app.jar
 #or
 # Flexible version
 ENTRYPOINT ["java", "-jar"]
 CMD ["app.jar"]

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
 # ********1. Shell form*******#
 CMD ["executable","param1","param2"] #(exec form)
 CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]

 # ********1. exec form*******#
 CMD command param1 param2 #(shell form)
 CMD flask run --host 0.0.0.0 --port 8000

```

- **NOTE: -** The build can also be done for the interpreter languages too, for building better container.

2. **[🔗docker-compose.yml Structure: -](https://docs.docker.com/reference/compose-file/)** _docker-compose file is only needed locally for building and runing the container, this is not needed in production_

   - When we **use the build in the docker compose file it uses the Dockerfile for building the container** given the Context(dir of the Dockerfile)

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

   this seems to be very complicated, this is what the docker compose⬇️ file make easier to run the container everytime.

   ```yml
   version: "3.8" # Docker Compose file format version **By default(reconmended: - (Docker Compose V2 CLI) read our docker-compose.yaml and automatically interpret it using the latest Compose Specification.) so version it not needed now days**

     # Service name (pghero) = Your choice for Docker Compose
     # Image name (ankane/pghero) = Fixed, from Docker Hub
   services: # Multiple services
   web: # This can be named anything like web, server or backend etc
     build: . # This uses the Dockerfile in the current directory. (if context is not specified, it defaults to the current directory)
     ports:
       - "3000:3000" # HOST_PORT:CONTAINER_PORT, Left side (3000) → Port on your host machine (your Windows system or WSL) and Right side (3000) → Port inside the Docker container
     environment:
     # PostgreSQL
     DB_HOST_URL: ${DB_HOST_URL}
     DB_USERNAME: ${DB_USERNAME}
     DB_PASSWORD: ${DB_PASSWO
     # Mail
     MAIL_HOST: ${MAIL_HOST}
     MAIL_FROM: ${MAIL_FROM}
     MAIL_PASS: ${MAIL_PASS}

     # OR for env_file
     env_file:
          - .env

    java-backend:
    build:
    context: .  # Root of my project (where your source code is)
      dockerfile: docker/Dockerfile  # Path to the Dockerfile inside the docker folder
    ports:
      - '9090:9090'
    env_file:
      - .env
    restart: always

    # postgres database
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

   redis:
     image: redis

   networks:
   my_network:

   volumes:
   pgdata:

   restart: always
   ```

3. **.dockerignore: -** _Remaining files (after .dockerignore filtering) are sent to Docker daemon for build context_

   - Docker will NOT find the .dockerignore file if it's inside a docker folder. The **.dockerignore file must be placed in the build context directory** (where we run docker build from)
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

##### Dockerfile #####

# -t your-image-name: Tags your image with a name (e.g., my-app).
# This dot . tells Docker to look for the Dockerfile in the current directory.
docker build -t your-image-name .

# Run the container
# -d: Detached mode (runs in background).
# --name your-container-name: Names the container.
# -p host:container: Maps a port from your machine to the container.
#  conainter-name and image-name can be same
docker run -d --name my-container-name -p hostPort:containerPort my-image-name

# To Access the image shell/ WORIDR
docker exec -it <image-name> sh # *** we can only docker exec into a running container. If the container is stopped, it has no process running to interact with — so docker exec won’t work.***
# can perform all this action inside the shell
ps aux  # See processes and their users
whoami  # Check current user
id      # Check user ID
ls                # List files
cd <dir>          # Change directory
cat <file>        # View file contents
less <file>       # Scrollable file viewer
pwd               # Print current working directory
vi file.txt       # Open file in vi editor
nano file.txt     # Open file in nano editor
npm list          # List installed npm packages
npm run <script>  # Run scripts defined in package.json
exit              # To exit this shell
etc..
# See processes and their users
docker exec -it <container-name> ps aux
# Check current user
docker exec -it <container-name> whoami
# Check user ID
docker exec -it <container-name> id

# Docker Debug for seamless, persistent debugging tools in any container or image
docker debug wp


# docker rm -f my-node-container
docker rm -f my-container-name

# To see all the running containers
docker ps
# To see both running and stop container
docker ps -a
# To stop the running container
docker stop <container_name_or_id>
# To restart container
docker restart <container_name_or_id>
# Remove all stopped containers
docker container prune
# To delete the container from the docker
docker rm <container_name_or_id>
# To see all the docker images
docker image ls
docker images
# To show all images including intermediate layers
docker images -a
# Remove by image name or ID
docker rmi <image_name_or_id>
# Remove all unused images
docker image prune
# -a to delete all unused images, not just dangling ones
docker image prune -a


# clearing the Docker build cache
docker builder prune -a

##### Docker-Compose #####
# To build and run application via docker-compose file
docker compose up --build
# To again build the contain without and previous cache
docker-compose build --no-cache
# To log the details fo the build
docker-compose logs nginx
# To Stop the application/ services started via docker-comose file
docker-compose down

##### Docker Hub #####
### how to make tag Deploying your application to the docker hub cloud
# If the application already exists it will overwrite
docker tag <local_image_name>:<tag> <docker_hub_username>/<repository_name>:<tag>

# and then push the same again to docker hub
docker push <docker_hub_username>/<repository_name>:<tag>
```

## **Docker Security** _By default, **Docker containers run as the root user**, which poses security risks⬇️:_

1. **Privilege Escalation:** If an attacker compromises our app, they have root access, attacker can delete and create and run malicious scripts at the system level in our image/container
2. **Container Escape:** Root access makes it easier to break out of the container
3. **Host System Risk:** If the container is compromised, the host system is more vulnerable
4. **Compliance:** Many security policies require non-root execution

```sh
# To Access the image/container shell/ WORIDR
docker exec -it <image-name> sh
# can perform all this action inside the shell
ps aux  # See processes and their users
whoami  # Check current user
id      # Check user ID

# See processes and their users
docker exec -it <container-name> ps aux

# Check current user
docker exec -it <container-name> whoami

# Check user ID
docker exec -it <container-name> id
```

so for security purpose always create the non-root user and switch to that like this

```sh
# Create user
RUN addgroup -g 1001 nodejs \
    && adduser -S appuser -u 1001 -G nodejs

# chown = change ownership give the full write permissions → so they can rm, mv, touch, etc, so only allow those file write permission, that we want the user to change, or else remove this to not to give the write permission to any file to this user
RUN chown -R appuser:nodejs /app

# Switch to non-root user
USER appuser
```

```sh
docker exec -u 0 -it <container_name_or_id> sh # -u 0 specifies UID 0 → the root user.
```
