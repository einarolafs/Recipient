# Recipient Form (Frontend Challenge)

## Running the project

```
npm i nodemon -g
yarn build
yarn dev
```

## Servers

The servers should start at the following addresses:

* Frontend
  * http://localhost:3000
* Backend
  * http://localhost:5000

## Frontend

The frontend part of the project should be developed inside the [client directory](./client/).

## Backend examples

### Creating a task
```
curl -X POST -v -d '{"delivery_at":"2017-01-01", "recipient":{"name":"User","zipcode":"10249","street":"Test 23","city":"Berlin","state":"Berlin","country":"germany","phone":"+49 176 22222222"}}' -H "Content-Type: application/json" http://localhost:5000/tasks
```

### Listing tasks
```
curl http://localhost:5000/tasks
```

### Listing allowed countries
```
curl http://localhost:5000/countries
```
