# Movies And Subscriptions Management Applications

### Introduction
- This project allows users, who registered to the system, to manage the movies subscriptions of the members in the website. Think of it like a theater system: the users are the workers that their job is to register the customers for a movie, and the members are the customers who want to see the movie.
- To register to the website you must get an invitation from the system admin - his job is to fill the user information and give him a username, with that- user choose a password.
- Every user has various permissions determined by the system admin (like add movie, edit movie, add member, edit member etc...)
- My incentive for building this project is to learn and get a good practice on React.js, Node.js and MongoDB technologies.

### Server Side In Detail
We have two data bases:
- One that holds the log in info of the users.
- Second that holds the data of the movies, members and each member subscriptions.

We have four JSON files:
- One that holds the information of the users.
- Second thah holds the permissions of each user.
- Third that holds all the data that we deleted.
- Fourth that holds the subscriptions of each movie, and a list of movies that each member has not whatched yet.

For managing all this data there are BL files that contains all CRUD functionality, and according to the route and type of the HTTP request we take the right functionality from the BL files and return the response.


### Technologies
- Javascript
- React.js
- Node.js
- MongoDB
- Material UI


