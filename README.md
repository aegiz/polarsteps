## Project purpose

Test of the Polarstep API to create custom path's shape.

## Dev stack

-  NodeJS

## Getting Started

### Prerequisites

-  Having Node.js installed `http://nodejs.org`
-  Once logged in in your polarstep account, create a new trip.
-  Copy the trip id after your username in the URL and patch it in the NodeJS code
-  Create manually a step and in the Network console note the parameters of the request. Patch them in the cookie fields.

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
