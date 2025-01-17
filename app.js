const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio")
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("El Peluca Sape!!!")
})

app.listen(8000, () => {
    console.log("Server Linstening On PORT, http://localhost:8000");
})