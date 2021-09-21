<br />
<p align="center">
    <img src="logo.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Hermes</h3>

  <p align="center">
  Just a messaging service
    <br />
    <br />
  </p>
</p>

## About The Project

...


## Endpoints
...


### User Register

#### Request

`POST /auth/register`

    curl -i -H 'Accept: application/json' -d 'username=yasar&email=yasamaz@email.com&password=123456&passwordConfirmation=123456' 
    http://localhost:5000/api/v1/auth/register

#### Response

    HTTP/1.1 200 Created
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 Created

    {"success":true, "token":"xxxx"}


### User Login

#### Request

`POST /auth/login`

    curl -i -H 'Accept: application/json' -d 'email=yasamaz@email.com&password=123456' 
    http://localhost:5000/api/v1/auth/login

#### Response

    HTTP/1.1 200 Created
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 Created

    {"success":true, "token":"xxxx"}

### User Logout

#### Request

`Get /auth/logout`

    curl -i -H 'Accept: application/json' 'token=xxx' 
    http://localhost:5000/api/v1/auth/logout

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": {} }


### Send Message

#### Request

`Post /messages`

    curl -i -H 'Accept: application/json' 
    -H 'Authorization: Bearer {token}' -d 'sendMsgTo=username&text=loremipsum'
    http://localhost:5000/api/v1/messages

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": "Your message has been sent" }

### Get all messages

#### Request

`Get /messages`

    curl -i -H 'Accept: application/json' 
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/messages

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": [ {"text": "x", "sendAt": "x" }] }


### Get all unread messages

#### Request

`Get /messages/unread`

    curl -i -H 'Accept: application/json' 
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/messages/unread

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": [ {"text": "x", "sendAt": "x" }] }

### Find a messages between dateranges

#### Request

`Get /messages/find/:startDate/:endDate`

    curl -i -H 'Accept: application/json' 
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/messages/find/2021-09-19 00:00:00/2021-09-19 03:59:24

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": [ {"text": "x", "sendAt": "x" }] }

### Find a messages between dateranges

#### Request

`Get /auth/me

    curl -i -H 'Accept: application/json' 
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/auth/me

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": [ {"role": "user", "blacklist": [], "_id" "x", "username":"x", "email":x", "createdAt":"x" }] }


### Block user by username

#### Request

`Post /users/block/:username`

    curl -i -H 'Accept: application/json' -d
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/users/block/testuser

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": "user is successfully blocked" }


### Unblock user by username

#### Request

`Post /users/unblock/:username`

    curl -i -H 'Accept: application/json' -d
    -H 'Authorization: Bearer {token}'
    http://localhost:5000/api/v1/users/unblock/testuser

#### Response

    HTTP/1.1 200
    Date: Mon, 20 Sep 2021 12:55:16 GMT
    Status: 200 
    {"success":true, "data": "user is successfully unblocked" }

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/muratdemirci/hermes.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Duplicate and rename `example.env` as `.env` , change variables
   ```JS
    NODE_ENV=
    PORT=
    TEST_MONGO_URI
    MONGODB_URI=mongodb://localhost:27017/dbname
    SECRET_KEY=
    PORT=
    JWT_EXPIRE=
    JWT_COOKIE_EXPIRE=
   ```
4. Run the app

  starts app in development mode
   ```sh
   npm run dev
   ```

   starts app in production mode
   ```sh
   npm start
   ```

   starts app in cluster mode
   ```sh
   npm run cluster
   ```
   

## Contact

Murat Demirci - [twitter@deusmur](https://twitter.com/deusmur) - deusmur@yahoo.com

Project Link: [https://github.com/muratdemirci/messenger](https://github.com/muratdemirci/messenger)
