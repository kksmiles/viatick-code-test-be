Node Version : v16.16.0 NPM Version : 8.19.2

This repo serves an express api for https://github.com/kksmiles/viatick-code-test-fe.

```
cp .env.example .env
```

Update the env variables for the database to your needs.
Import the init.sql file within the repo to your database for dummy data.

```
npm install
npm run build
npm start
```

You can now start testing in the frontend application.

**_ NOTE: CORS policy now allows all origins since it's for local testing purpose only _**
**_ NOTE: Have not implemented authentication feature. The frontend will get the default user lucy-connor devices data. _**
