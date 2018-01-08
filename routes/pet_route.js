var r = require('request').defaults({
    json: true
});
var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379,'127.0.0.1');

module.exports = function (app) {
    app.get('/pets', function (req, res) {

        async.parallel({
            cat: function (callback) {
                    client.get('http://localhost:3000/cat', function (err, cat) {
                        if(err){throw err}
                        if(cat){
                            callback(null,JSON.parse(cat));
                            console.log('Pulling cat out the redis');
                        }else{
                            r({uri: 'http://localhost:3000/cat'}, function (error, response, body) {
                                if(!error && response.statusCode === 200){
                                    callback(null, body.data);
                                    console.log('Saving the cat in redis')
                                    client.setex('http://localhost:3000/cat', 10, JSON.stringify(body.data), function (err) {
                                        if(err) {throw err;}
                                    });
                                }else{
                                    callback(error);
                                }
                            });
                        }
                    })

                },
            dog: function (callback) {
                    client.get('http://localhost:4000/dog', function (err, dog) {
                        if(err) {throw err;}
                        if(dog){
                            console.log('Pulling the dog from the redis');
                            callback(null,JSON.parse(dog));
                        }else{
                            r({uri: 'http://localhost:4000/dog'}, function (error, response, body) {
                                if(!error && response.statusCode === 200){
                                    callback(null, body.data);
                                    console.log('Saving the dog in the redis');
                                    client.setex('http://localhost:4000/dog', 10, JSON.stringify(body.data), function (err) {
                                        if(err){throw err;}
                                    })
                                }else{
                                    callback(error);
                                }
                            });
                        }
                    })

                }
        },
        function (error, results) {
            res.json({
                error: error,
                results: results
            });
        });


    })
}