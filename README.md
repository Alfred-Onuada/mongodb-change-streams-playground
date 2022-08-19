# Playground for mongodb streams
I just concluded my mongodb course a couple of weeks ago, and decided to build a tiny application demonstrating
a concept, this CLI app demonstrates how streams in mongodb works.

Streams are a cool feature that allows you to subscribe(😅 angular fanboy) to a change event on your database and 
respond accordingly in real time.

## Description

### Prerequisites
1. Node Js [Download Here](https://nodejs.org/en/)
2. MongoDB installed or via [mongodb atlas](https://www.mongodb.com/atlas)
3. Npm packages you can install using the command below

```bash
$ npm install
```

## Usage

### start up the server that listens for changes
```bash
$ node server.js
```

open a new terminal and execute any of the following commands and watch the server catch those updates

Insert a document
  ```bash
  node stream_cli.js insert <filename>.json
  ```
  
Update a document
 ```bash
 node stream_cli.js update <document id> <filename>.json
 ```
 
Delete a document
  ```bash
  node stream_cli.js delete <document id>
  ```
