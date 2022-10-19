const Express = require("Express");
const bodyParser = require("body-parser");
const Routes = require("./routes");
var http = require('http');
var session = require('express-session');
app = Express();

const config = require("./config");

app.use(session(config.session_config));

app.use(bodyParser.urlencoded({extended : true}));
app.use(Express.static(__dirname+"/assets"));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");



app.use("/", Routes);

app.listen(8888, function(){
    console.log("listening on port 8888");
});