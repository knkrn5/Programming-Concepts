# **_Docker Concepts_**

Docker is a platform for developing, shipping, and running applications in lightweight, portable containers.

- Containers package your application with all its dependencies (code, libraries, environment).
- They run the same way on any system that has Docker installed — **"It works on my machine"** no longer a problem.
- **Railway deploys all applications using Docker under the hood**, but it provides both Dockerfile-based and native (non-Docker) workflows.
  - Railway auto-detects your project type (like Node.js, Python, Go, Java, etc.) based on the repository contents and **uses internal Docker templates** to build and run it. **(Native Build (No Dockerfile Required) – "Zero Config")**

## **Dockerfile vs Docker-compose**

1. **.Dockerfile**

   ```docker
       # Use a base image
       FROM #this means to select the image from the docker, main the environment of our project like if it is of node.js, python or java etc

       # Set working directory
       WORKDIR /app

       # Copy files
       COPY # this means to copy the source code file of our project into the docker container

       RUN # Run is used to run the terminal commands that will be needed to run our project

       COPY . .

       # App runs on port
       EXPOSE 3000 # this is used to specify of which port our project(application) will be running

       # Start command
       CMD ["node", "index.js"] # cmd that will start the applicaiton
       #or
       ENTRYPOINT[] # Entry point is also used to start the application

   ```

2. **docker-compose.yml**

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
