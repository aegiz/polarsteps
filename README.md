## Project purpose

Test of the Polarstep API to create custom path's shape.

## Dev stack

-  NodeJS

## Getting Started

### Prerequisites

-  Having Node.js installed `http://nodejs.org`
-  Once logged in in your polarstep account, create a new trip.
-  Copy the trip id in the URL (after your username) and patch it in the NodeJS code
-  Still on the Web UI, create a step manually while the Network console of your browser is opened. Note the value of the cookie field in the request and patch in the code.

### Dev dependencies

```sh
$ git clone https://github.com/aegiz/polarstep
$ cd polarstep
$ npm install

```

### Development

```sh
$ node polarstep.js
```
