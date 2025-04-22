const express =  require("express");
require("./database/connect");
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: ['https://varni-frontend.onrender.com', 'https://www.swaminarayanconstruction.com', 'http://localhost:3000'],
    credentials: true,  // Allows cookies and credentials
    optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

const contactRouter = require("./router/contactRouter");

app.use(express.json());
app.use(contactRouter);


app.listen(port,() => {
    console.log("This site port number "+port);
});


