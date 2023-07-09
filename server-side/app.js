const { generateRandomWords, calculateRank } = require("./utils");

const express = require("express");
var cors = require('cors')
const app = express();
const port = 4000;

app.use(cors())

// words GET endpoint
app.get("/words", (req, res) => {
  const wordsList = generateRandomWords(10);
  res.send({ wordsList });
});

// rank GET endpoint
app.get("/rank", (req, res) => {
  const rank = calculateRank(req.query.score);
  res.send({ rank });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
