This is a personal project series based on the lessons by @anonystick ([https://github.com/anonystick](https://github.com/anonystick)).

## 1. [Authentication and API Key Management (HS256)](https://github.com/phamhung075/2-nodejs_mongodb_wc_showCase_Dynamic_for_ApiKey_and_Permissions_HS256/tree/master)

## 2. [ErrorHandler ApiResponse](https://github.com/phamhung075/3-nodejs_mongodb_wc_showCase_ErrorHandler_API)

## 3. [Success Handler ApiResponse](https://github.com/phamhung075/4-nodejs_mongodb_wc_showCase_ApiResponseUseClass/tree/master?tab=readme-ov-file)

## 4. [SignUp and Login Public Access](https://github.com/phamhung075/5-nodejs_mongodb_wc_showCase_SignUpLogin)

## 5. Logout Authentication

### Introduction

`6-nodejs_mongodb_wc_showCase_LogoutAuthentication` is a Node.js application showcasing the implementation of a logout functionality in a user authentication system using MongoDB. The project extends the signup and login functionalities with a secure logout process.

### Installation

- Clone the repository:

    `git clone https://github.com/phamhung075/6-nodejs_mongodb_wc_showCase_LogoutAuthentication.git`
    
- Change to the directory:

    `cd 6-nodejs_mongodb_wc_showCase_LogoutAuthentication`
    
- Install dependencies:

    `npm install`
    

### Features

- **Access Service** (`./services/access.service.js`): Manages user authentication processes including signup, login, and logout.
- **KeyToken Service** (`./services/keyToken.service.js`): Handles token creation, validation, and revocation.
- **Models**:
    - **KeyToken Model** (`./models/keyToken.model.js`): Schema for managing key tokens.
- **Controllers**:
    - **Access Controller** (`./controllers/access.controller.js`): Orchestrates user authentication routes, including logout.
- **Helpers**:
    - **Async Handler** (`./helpers/asyncHandle.js`): Facilitates asynchronous operation handling.

### Usage

- The application demonstrates a complete user authentication flow with the ability to securely log out.
- MongoDB Connection: `mongodb://localhost:27017`

### Postman Examples

### Create API key

Please uncomment lines 8 to 11 in the `apiKey.service.js` file. Then, make a request to [http://localhost:3052/v1/api/shop/signup](http://localhost:3052/v1/api/shop/signup) to create an API key, which will be displayed in the Node.js server console.

```
    // //create Api for test
    // const newKey = await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']});
    // console.log(newKey);
    // //end Api for test
```

### signup

```
@url_dev=http://localhost:3052/v1/api/

### signup
POST {{url_dev}}/shop/signup
Content-Type: application/json
x-api-key: [API_KEY]

{
    "name": "cartepopup",
    "email": "cartepopup4@gmail.com",
    "password": "abc123"
}
```

### login with new account

``` 
@url_dev=http://localhost:3052/v1/api/

### signup
POST {{url_dev}}/shop/login
Content-Type: application/json
x-api-key: [API_KEY]

{
    "email": "cartepopup11@gmail.com",
    "password": "123"
}
```

### logout with this account
``` 
POST http://localhost:3052/v1/api/shop/logout
Content-Type: application/json
x-api-key: [API_KEY]
```
For more detailed examples, refer to see [README.png](./help06.png).
