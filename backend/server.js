const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello I am a bot !!");
});



app.listen(port, () => {
	console.log(`Bot is listening on port ${port}`);
});

