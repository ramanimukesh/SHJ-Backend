const express =  require("express");
require("./database/connect");
const port = process.env.PORT || 5000
const app = express();
const path = require("path");
const cors = require('cors');

const corsOptions = {
    origin: ['https://shj-frontend.onrender.com', 'http://localhost:3000', 'https://sahajanandtechnologies.com'],
    credentials: true,  
    optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

const contactRouter = require("./router/contactRouter");

app.use(express.json());
app.use(contactRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port,() => {
    console.log("This site port number "+port);
});


