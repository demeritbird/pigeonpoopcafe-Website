# pigeonpoopcafe Website

## Description

A simple Angular & Go stack personal website for demeritbird.

## Getting Started

### Pre-Requisites

1. You will first need to have .env files with relevant information in _./server_ directory.

2. You will also need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running before working with the server.

### How to Run

- Run `npm run start:client` in root directory to start Angular on http://localhost:4200.
- Run `npm run start:server` in root directory (on another terminal) to start Go on port 8080 / Postgres on port 5432.

### How to Shutdown

- Make sure to run `npm run stop:docker` to remove our docker container!
