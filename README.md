#Sandbox for Loopback issue#1868

Steps:

1. Run the server with `node .` and then access [REST API Explorer](https://docs.strongloop.com/display/public/LB/Use+API+Explorer) 
at [localhost:3000/explorer](localhost:3000/explorer) 
2. Use `POST` end point for both models and input value: `{"name": "xyz"}` and `Try it out!`: you should receive a Response code: `422`
and similar Response Body as follows:
```
{
  "error": {
    "name": "ValidationError",
    "status": 422,
    "message": "The `inServer` instance is not valid. Details: `name` Name should be 5+ characters (value: \"xyz\").",
    "statusCode": 422,
    "details": {
      "context": "inServer",
      "codes": {
        "name": [
          "length.min"
        ]
      },
      "messages": {
        "name": [
          "Name should be 5+ characters"
        ]
      }
    },
    "stack": "ValidationError: ..."
  }
}
```

The project is generated by [LoopBack](http://loopback.io).
