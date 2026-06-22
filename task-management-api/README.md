# Task Management API

A simple RESTful Task Management API built using Node.js and Express.js.

## Features

* Get all tasks
* Create a new task
* Update task status
* Delete a task

## Technologies Used

* Node.js
* Express.js
* Postman (for API testing)

## API Endpoints

### Get All Tasks

```http
GET /tasks
```

### Create a Task

```http
POST /tasks
```

Request Body:

```json
{
  "title": "Learn Express",
  "status": "Pending"
}
```

### Update a Task

```http
PUT /tasks/:id
```

Request Body:

```json
{
  "status": "Completed"
}
```

### Delete a Task

```http
DELETE /tasks/:id
```

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

## Author

Jayant Arora
