# Athena-LMS


### Instructions
1. Clone Repo
2. In the root dir, to start entire containerized app, run the following
    - `docker-compose build`
    - `docker-compose up -d`
4. in progress

### Structure
- Microservices/Backend inside `/Services`, including sql dbs.
- Frontend inside `/Apps`.

### API
- Account Service
  - localhost:3010
  - http://localhost:3010/v0/api-docs/
- Student Service
  - localhost:3011
  - http://localhost:3011/v0/api-docs/



### Frontend 
- Student App
    - http://localhost:3000
- Admin App
    - http://localhost:3001


1. Make sure you have installed Node.js (LTS). If Node.js is already installed in your system, make sure the installed version is LTS (and not the latest version)
2. Navigate to the `javascript-version` folder and run following command to install our local dependencies listed in `package.json`.

> Note: Deployment currently uses npm

```bash
# For npm
npm install --legacy-peer-deps

# For yarn
yarn install
```

3. Now, you are ready to start the server with the help of command shown below. Open local host to check your development 🚀.

```bash
# For npm
npm run dev

# For yarn
yarn dev
```
