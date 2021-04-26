# Movies And Subscriptions Management Applications
Movies Subscriptions application using Node.js, React.js and MongoDB

## Introduction
- This project allows users, who registered to the system, to manage the movies subscriptions of the members in the website. Think of it like a theater system: the users are the workers that their job is to register the customers for a movie, and the members are the customers who want to see the movie.
- My incentive for building this project is to learn and get a good practice on React.js, Node.js and MongoDB technologies.

## Prerequisite
If you want to run this project, it is necessary to connect to it two MongoDB data bases:\
#### In Cinema_WS API:
- Create a data base with one collection: 'users' & one document: username: 'admin' | password: 'admin'
- In jsonFiles/permissions.json & jsonFiles/users.json modify the id to the id the MongoDB generated for the admin.
- Modify in configs/usersDataBase.js file the connection to the db with this name.\
#### In Subscriptions_WS API:
- Create a data base with three empty collections: 'members' | 'movies' | 'subscriptions'.
-  Modify in configs/subscriptionsDataBase.js file the connection to the db with his name.
-  To put data in the db run utils/fillDocuments.js file
-  To initialize the movieSubscription.json file run utils/initMembersMoviesStatus.js file


## Set Up
- Run index.js files in both REST APIs
- In client/finalproject run:
1. npm install
2. npm start

## Back-End Summary
- In the application there are two Rest API's that communicate with each other:
1. Cinema_WS that responsible to manage the users data.
2. Subscriptions_WS that responsible to manage the movies, members and subscriptions data.
- In addition to the data bases I used alse JSON files to store our data such as:
1. User information
2. User's permissions on the website
3. Deleted data
4. Each movie subscriptions and list of movies each member has not whatched yet.

- For managing all this data there are BL files that contains all CRUD functionality,
and according to the route and type of the HTTP request we take the right functionality from the BL files and return the response.

## How To Use The Applicaion
### How to register and log in
To register, system admin has to invite you:
- Log In as system admin -> username: admin, password: admin.
- In USERS MANAGEMENT -> add user -> fill the information fields.
- Log out and in log In page click the link "Create User".
- In username field type the username the system admin gave you, and choose your password.
- In log in page type your username and password and you logged in!
### How To Subscribe To A Movie:
- In SUBSCRIPTIONS, all the members are displayed with their information and a SUBSCRIBE button.
- A click on this button will open a window with 2 fields:
1. Select input with all the movies.
2. Text input to choose the date to whatch it.\
And finally click subscribe.
### General Information
- If you are the system admin you have the permission to edit/add/delete a user, users dont have permissions to do that.
- If you are a user you can add/edit/delete members or movies depending on the permissions the admin gave you.


## Technologies
- Javascript
- React.js
- Node.js
- MongoDB
- Material UI


