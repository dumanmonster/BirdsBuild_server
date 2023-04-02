const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors({ origin: "https://vue3comp-dumanmonster.vercel.app/" }));
app.use(bodyParser.json());

app.get("/api/items", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = fs.readFileSync("./items.json", "utf8");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/items", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const newData = req.body;
    fs.writeFileSync("./items.json", JSON.stringify(newData));
    res.send("Data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/api/deals", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = fs.readFileSync("./deals.json", "utf8");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/deals", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const data = fs.readFileSync("./deals.json", "utf8");
    const deals = JSON.parse(data);
    const dealId = uuidv4();
    const newItem = req.body;
    deals.push({ dealId: dealId, ...newItem });
    fs.writeFileSync("./deals.json", JSON.stringify(deals));
    res.send("Deal added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.put("/api/deals", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const newData = req.body;
    fs.writeFileSync("./deals.json", JSON.stringify(newData));
    res.send("Deals updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
