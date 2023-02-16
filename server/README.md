# Metrics server

Expose Metrics web server through [fastify](https://www.fastify.io/) + typescript

## Start the server

```
yarn dev:watch
```

## Metrics API

### Get all the metrics

GET '/metrics'

### Get metric by id

GET '/metric/:id',

### Update a metric

PUT '/metric/:id',

Body request as Metric type.
Example:

```
{"id": "hellodarling",

"code": "code",

"amount": null,

"date": "2023-02-11T12:10:10Z234"}
```

### Delete a metric

DELETE '/metric/:id',

### Add new metric

POST '/metric'

Body request as Metric type.
Example:

```
{"id": "hellodarling",

"code": "code",

"amount": null,

"date": "2023-02-11T12:10:10Z234"}
```
