# Token Authentication System

### project description.
This is an auth system where users obtain an auth token by sending their username and password. Any further requests made by this user includes this token in the request header when making requests to the server
    

[link to the api documentation with postman](https://documenter.getpostman.com/view/10653175/2s9YJW4R6G)


[link to the hosted api for consumption](https://ebusman-authapi.onrender.com)

## Routes

The API has these endpoints.

#### Public Routes
- `POST /auth/user` registers a user
- `POST /auth/login` Issues token to users already registered


#### Protected Routes

- `GET user/profile/:id` Gets the user's profile
- `POST /user/comment` Authenticated user can post comments

## Run the app

you can clone this repo or download the zip file

run ` npm install ` or ` yarn install ` to install dependencies and ` npm start ` to start the app. Make sure you `CD` into `task3` folder

To test the app, run  ` npm run test ` which will trigger `mocha` to run the tests in the test folder.
