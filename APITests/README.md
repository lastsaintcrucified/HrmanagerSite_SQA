# API test project

## Go to api test

From root directory go to APITests and run the code given below:

```bash
cd projectPlaywright/APITests
newman run Ostad-Api-Project.postman_collection.json

```

You should get similar response:

```bash

JSONPlaceholder User API Automation

→ 01 - Get All Users
  GET https://jsonplaceholder.typicode.com/users

  ✓ Status code is 200
  ✓ Response contains user data
  ✓ Each user has id, name and email

→ 02 - Update User
  PUT https://jsonplaceholder.typicode.com/users/1

  ✓ Status code is 200
  ✓ Returned ID matches stored ID
  ✓ Phone field is not empty

2 requests
6 tests
6 passed
0 failed

```
