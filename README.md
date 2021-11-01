# This is an expense tracker build with Express in Chinese

### :link: heroku
--

## Functions
1. One can register, login, logout
2. One can login with Facebook
3. One can add, edit, delete an expense
4. One can sort the expense by category
5. The home page displays the sum of expense

## Installation
1. Clone this project to your local

        git clone https://github.com/cschang07/expense-tracker.git

2. Open up terminal and go to the dir

        cd expense-tracker

3. Install kits

        npm install
4. Install mongodb and establish a database named by "expense-tracker"
5. Add seed 

        npm run seed

6. Run server

        npm run dev
        
7. The following lines will show up when server is running successfully


        App is running on http://localhost:3000
        mongodb connected!
        
   Go to http://localhost:3000 on your browser
   
## Seed
- user

| name            | email    | password |
| --------------- | -------- |----------|
| user1          | user1@example.com     | 12345678  |
| user2          | user1@example.com     | 12345678  |
  
## Environment and dependencies
* [Node.js](https://nodejs.org/en/)
* Dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dayjs": "^1.10.7",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-handlebars": "^5.3.4",
    "express-session": "^1.17.2",
    "handlebars-dateformat": "^1.1.1",
    "method-override": "^3.0.0",
    "mongoose": "^6.0.12",
    "passport": "^0.5.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0"
