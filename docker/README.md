# Docker

Notes for Docker — containers, images, and deployment.

Files are numbered in **learning order**: `01-docker-topic.md`, `02-docker-topic.md`, and so on.

**Prerequisite:** basic [Git](../git/) and command line. [Node.js](../javascript/nodejs/) or [Python](../python/) helps for app examples.

## Contents

**01. [Introduction & Setup](./01-docker-intro-setup.md)**  
Tier — Fundamental

1. Containers vs virtual machines  
2. Installing Docker Desktop / Engine  
3. `docker run`, `ps`, `stop`, `rm`  
4. Images vs containers  
5. Common questions

**02. [Images & Containers](./02-docker-images-containers.md)**  
Tier — Fundamental

1. Pulling from Docker Hub  
2. Container lifecycle  
3. Ports and `-p` mapping  
4. Environment variables (`-e`)  
5. Common questions

**03. [Dockerfile](./03-docker-dockerfile.md)**  
Tier — Fundamental

1. `FROM`, `WORKDIR`, `COPY`, `ADD`  
2. `RUN`, `CMD`, and `ENTRYPOINT`  
3. Layer caching  
4. `.dockerignore`  
5. Common questions

**04. [Volumes & Persistence](./04-docker-volumes-persistence.md)**  
Tier — Intermediate

1. Container filesystem (ephemeral)  
2. Bind mounts vs volumes  
3. Named volumes  
4. Data backup patterns  
5. Common questions

**05. [Networking](./05-docker-networking.md)**  
Tier — Intermediate

1. Default bridge network  
2. Custom networks  
3. Container-to-container DNS  
4. `host` and `none` networks (intro)  
5. Common questions

**06. [Docker Compose](./06-docker-docker-compose.md)**  
Tier — Intermediate

1. `docker-compose.yml` structure  
2. Multi-service apps (app + DB)  
3. `depends_on` and healthchecks  
4. Compose vs raw `docker run`  
5. Common questions

**07. [Multi-stage Builds](./07-docker-multi-stage-builds.md)**  
Tier — Intermediate

1. Why multi-stage  
2. Build stage vs runtime stage  
3. Smaller production images  
4. Node and Go examples  
5. Common questions

**08. [Security & Best Practices](./08-docker-security-best-practices.md)**  
Tier — Advanced

1. Non-root user in containers  
2. Scanning images  
3. Secrets — do not bake into images  
4. Resource limits  
5. Common questions

**09. [CI/CD & Registry](./09-docker-cicd-registry.md)**  
Tier — Advanced

1. Building in CI (GitHub Actions intro)  
2. Private registries (ECR, GHCR)  
3. Tagging strategies  
4. Deploying containers  
5. Common questions

**10. [Kubernetes Intro](./10-docker-kubernetes-intro.md)**  
Tier — Advanced

1. When Docker alone is not enough  
2. Pods, Deployments, Services (overview)  
3. Docker Compose vs K8s  
4. Local K8s (minikube / kind intro)  
5. Common questions

## Learning path

```
01–03  Fundamental  →  run containers, write Dockerfiles
04–07  Intermediate →  volumes, networks, Compose, multi-stage
08–10  Advanced     →  security, CI/CD, K8s overview
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).
