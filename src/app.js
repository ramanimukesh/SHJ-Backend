const express =  require("express");
require("./database/connect");
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const contactRoter = require("./router/contactRouter");

app.use(express.json());
app.use(contactRoter);


app.listen(port,() => {
    console.log("This site port number "+port);
});