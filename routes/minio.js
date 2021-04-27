// In order to use the MinIO JavaScript API to generate the pre-signed URL, begin by instantiating
// a `Minio.Client` object and pass in the values for your server.
// The example below uses values for play.min.io:9000

const Minio = require('minio')

var client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    useSSL: false
})

// Instantiate an `express` server and expose an endpoint called `/presignedUrl` as a `GET` request that
// accepts a filename through a query parameter called `name`. For the implementation of this endpoint,
// invoke [`presignedPutObject`](https://docs.min.io/docs/javascript-client-api-reference#presignedPutObject) 
// on the `Minio.Client` instance to generate a pre-signed URL, and return that URL in the response:

// express is a small HTTP server wrapper, but this works with any HTTP server
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    client.presignedPutObject('test', req.query.name, (err, url) => {
        if (err) throw err
        res.send({item: [url]})
    })
});

module.exports = router;
