import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hello World!");
});

app.listen(3000, () => console.log("Server started on port 3000"));