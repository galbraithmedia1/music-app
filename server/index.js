const express = require("express");
const cors = require("cors");
const ctrl = require('./controller')
const app = express();
const {getSongs } = require('./controller')

app.use(cors());

app.use(express.json());

// app.get("/api/songs", (req, res) => {


//   res.status(200).send(res.data);
// });



app.get("/api/songs", getSongs);


app.listen(4000, () => console.log("Server running on 4000"));
