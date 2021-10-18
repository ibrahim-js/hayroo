# Project Demo
https://hayroo.netlify.app/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

NPM / Yarn and Node.js installed

### Installing

Installing NPM modules on both client and server folders

Execute these commands from the project directory

```
cd client && npm install
```

```
cd server && npm install
```

### Prevent crashing

If somehing goes wrong try the following:
Create a dot env file and set a variable called DATABASE="YOUR MONGO CLUSTER URI HERE"

### Running the app

Open a terminal on server directory

```
npm run start
```

and open another terminal on client directory
```
npm run start
```

Access the web app at http://localhost:3000/
