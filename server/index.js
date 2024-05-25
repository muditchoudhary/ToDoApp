const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();

client.on("error", (err) => {
	console.log("Error connecting to redis ", err);
});


app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
