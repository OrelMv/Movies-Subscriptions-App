# Movies And Subscriptions Management Applications

### Introduction
- This project allows users, who registered to the system, to manage the movies subscriptions of the members in the website. Think of it like a theater system: the users are the workers that their job is to register the customers for a movie, and the members are the customers who want to see the movie.
- To register to the website you must get an invitation from the system admin - his job is to fill the user information and give him a username, with that- user choose a password.
- My incentive for building this project is to learn and get a good practice on React.js, Node.js and MongoDB technologies.

### Prerequisite
If you want to run this project, it is necessary to connect to it 2 MongoDB data bases:
- usersDB with only one collection -> each document has two fields: username(string) and password(string) of the user.
- subscriptionsDB with three collections:
1.members -> each document has three fields: name(string), email(string) and city(string).
2.movies -> each document has four fields: name(string), genres([string]), premiered(Date), image(string)
3.subscriptions -> each document has 2 fields: memberId(string), movies[{movieId(string), date(Date) }] 

### Set up
- Run index.js in both REST APIs
- In client/finalproject run:
1. npm install
2. npm start

### Server Side In Detail
In addition to the data bases We have alse four JSON files:
- One that holds the information of the users.
- Second that holds the permissions of each user.
- Third that holds all the data that we deleted.
- Fourth that holds the subscriptions of each movie, and a list of movies that each member has not whatched yet.

For managing all this data there are BL files that contains all CRUD functionality,
and according to the route and type of the HTTP request we take the right functionality from the BL files and return the response.


### Technologies
- Javascript
- React.js
- Node.js
- MongoDB
- Material UI


