
# FakeStore App

This is a web store template with a whole load of dummy data, I'm going to be fetching from the fakestore api and using this data in my project

Built with React, TypeScript, and Tailwind CSS. 

## TODO
### ThemeContext
BEM classnames

### React:
1. Try to implement theme context from the get go
2. Finish modular CSS for landing page/s
3. Implement user context 
4. Implement a layout wrapper
5. Implement context for cart
6. Implement auto cart fetch on refresh
7. Implement auto login on refresh based on local storage


### CSS:
1. Check whether I want to replace label with placeholder
2. Implement local storage of user details
3. Implement glassmorphic CSS styling

so functions that wait until the user does something to run, and functions that run once you hit a certain page are different and you have to get the timing right and be able tot ell the difference between the two

## Development Journey
1. **v1.0** - Initial React implementation with REST API integration 
2. **v2.0** - Migrated to TypeScript for type safety
3. **v3.0** - Redesigned UI with Tailwind CSS

This iterative approach allowed me to...
[explain what you learned at each stage]


## Features/Functionalities
OK so first I'm going to explain the functionalities of this project The basic functionalities will be as follows 

### Rights
1. Only a logged in user can access the store and perform update, add and delete actions

### Products
1. The first functionality is going to be being able to browse all products
2. The second functionality will be the ability to add a product
3. The third functionality is going to be being able to zoom in on a single product
4. The fifth functionality will be the ability to update a product
5. The sixth functionality will be the ability to delete a product

### Carts
1. The first functionality is going to be being able to browse all carts
2. The third functionality will be the ability to add a cart
3. The second functionality is going to be being able to get a single cart 
4. The fifth functionality will be the ability to update a cart
5. The sixth functionality will be the ability to delete a cart

### Users
1. The first functionality is going to be being able to browse all users
2. The third functionality will be the ability to add a user
3. The second functionality is going to be being able to get a single user
4. The fifth functionality will be the ability to update a user
5. The sixth functionality will be the ability to delete a user

### Authorisation
1. The first functionality is going to be being able to login
2. The third functionality will be the ability to logout

## Requirements

### Node.js Environment

Node.js (version 16+ recommended)
npm or yarn package manager

### React Environment

React (likely v18+)
React Router DOM (for routing)
React Hook Form (for RegisterPage)

### Development Tools

A package bundler (likely Vite or Create React App based on module CSS usage)
ES6+ JavaScript support

## Installation instructions

1. Clone the repository
2. Create a .env file in the root directory of the project (not src) and fill it with the variable names as described in env.dist.
3. the keys that should be filled in to the .env file are:

[//]: # (    - VITE_API_URL=)

[//]: # (    - VITE_API_KEY=)
    - VITE_STORE_API=
4. Run `npm install` or `yarn install`
5. Run `npm run dev` or `yarn dev`
6. Open http://localhost:3000/ in your browser


## Deployment
There are currently some active users available but it is best to register onto the application and create your own personal account.

## Further npm commands
There are no other npm commands that do anything for this application.