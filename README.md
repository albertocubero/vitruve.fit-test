# Technical Test for Vitruve.fit

This repository contains a technical test for **Vitruve.fit**. The objective of this test is to demonstrate technical skills in building a full-stack application.

For more details on the requirements and scope of the test, please refer to the [FullStack Technical Test](./FullStack%20Technical%20Test.pdf) document.

## Description

You will be tasked with creating a **Performance Tracking Dashboard** for athletes, which will allow athletes to view and manage athlete profiles and their performance metrics.

## Technologies and Tools Used

- TypeScript
- Docker
- PostgreSQL
- Redis
- Prisma
- Hono
- Ionic
- Tailwind CSS
- React Query
- Jest + Testing Library 
- Monorepo Setup (using Nx)

## Features

- Error Handling (backend and frontend)
- Performance Optimizations
- Domain-Driven Design (DDD)
- Caching (using Redis)
- Testing
  
## Instructions to Run the Project

Due to some issues with NX when generating both projects inside Docker containers, I had to generate the projects outside of Docker and then copy them inside. I couldn't find another way to do it.

#### ***Prerequisites:***
1. Install PostgreSQL database on your computer and create a database called ***performance-tracker***. Follow this guide to install it: https://medium.com/@josemiguel.sandoval20/c%C3%B3mo-crear-una-base-de-datos-de-postgresql-en-mac-7b7f2dafe36e 

#### ***Run Project:***

1. Download and Install Docker:
   [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Clone this repository to your local machine:
   ```bash
   git clone https://albertocubero@bitbucket.org/albertocubero/vitruve.fit.git
   ```
3. Enter in the test folder:
   ```bash
   cd vitruve.fit
   ```
4. In ***/packages/backend*** create a ***.env*** file with this environment variable:
```
DATABASE_URL="postgresql://[bbdd_user]:[bbdd_password]@localhost:5432/performance-tracker"
```
and change ***[bbdd_user]*** and ***[bbdd_password]*** with your PostgreSQL user and password.


5. Install project dependencies:
   ```bash
   npm install
   ```
6. Run Docker:
   ```bash
   npm run docker:run
   ```
7. Open url in the browser:
   [http://localhost:4200/](http://localhost:4200/)