# My In-house MVC Framework Using Express

## Folder Structure
### Root
In here you will find the root level folders and valuable js files which are used for configurations, 
settings, and the main js file use to run everything. 

#### assets folder
This is where you must put all your static files (images, stylesheets, audio files, video files, and etc.
You may organize them into different folders inside the asset folder.

#### controllers folder
This is where all controller files must be placed. 

#### core
All the important files that are crucial for the framework to run are placed here. Do not alter any figures
here unless you know what you are doing.

#### models
This is where all model files must be placed

#### node_modules
A folder made by node.js for modules

#### views
All view files must be placed here

## Features
### Closely resembles CodeIgniter
I made this MVC framework with code igniter as a frame of reference. If you are familiar with how to use Code Igniter
then it will be easy for you to use this framework.

### Ajax Compatible
The framework can handle all the standard conventions of ajax with ease.

### Built in MySQL query handler
You only need to supply the query command as a string and pass it to the query handler "await this.query.execute(query, values)" to do database tasks.
#### Example:
```
get_all = async () => {
	let query = "Select * FROM players WHERE id = ?";
	let values = [2];
        let result = await this.query.execute(`query`, values);
        return result;
}
```
Keep in mind all query functions are asynchronous so always use await

### Profiler
The framework has a built-in profiler for debugging purposes. It can be used by just simpling enabling it anywhere
in a controller but always enable it in the constructor to make sure that it will trigger. Note it will work in that 
controller alone (You need to enable for each of the controllers you want it enabled).
```
class Players extends EX_Controller{
    constructor(){
        super();
        this.player = this.load.Model("Player");
        this.enable.profiler = true;
    }
```
Note the default value is false

## Instructions to run
To run the node.js server simply type in the terminal "nodemon app.js". 

### Database Configurations
Alter the configurations in the database.js file to your desired database file
```
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: ""
});
```

### Routing-Controller-Views functionalities
The ejs files will be placed in the views folder to be accessed by the controller. But first you need to route
the controller to receive and send the http data.

#### Controller configurations
```
const EX_Controller = require("../core/controller");

class Players extends EX_Controller{
    constructor(){
        super();
        this.player = this.load.Model("Player");
    }
    
    index = async () => {
        let result = await this.player.get_all();
        this.load.View("index", {players : result});
    };  
    
    search = async () => {
        let input = this.http.request.body;
        let result = await this.player.search(input);
        this.load.View("partials/index_html", {players : result});
    }
}

let player = new Players();
module.exports = player;
```
Things to consider in the example above:
1. This line `const EX_Controller = require("../core/controller");` is crucial for us to access the controller method which
   we will use to inherit it to our method.

2. The method names uses the ES6 arrow function conventions for lexical scoping. To make "this" properly scoped to what
   our desired behavior to be.

3. To properly load our desired ejs file we use the `this.load.View("ejs link starting from the views folder", "data to pass");` 

4. We load models by using the `this.load.Model("model link starting from the models folder");`

5. Always module.exports an instance of the controller to be passed on to our router.

#### Routing Configurations
At the routes.js file you will see the routing configuration. This is required to be set up for each of your controller.
```
const Express = require("express");
const Router = Express.Router();
const PlayersController = require("./controllers/Players");
const route_middleware = require("./core/route_middleware");

Router.all("/", route_middleware.catch_http, PlayersController.index.bind(PlayersController));
Router.all("/players/search", route_middleware.catch_http, PlayersController.search.bind(PlayersController));

module.exports = Router;
```
For each controller you need to make a Router.all line like below
`Router.all("url link for mounting purposes", "middlewares", "Your controller object with the desired method");

#### Views 
This is just where you will put all your ejs files to be read by the controller

### Model
```
let EX_Model = require("../core/model");
const bcrypt = require("bcryptjs");

class Player extends EX_Model{
    constructor(){
        super();
        this.validations = this.load_validations();
    }
    get_all = async () => {
        let result = await this.query.execute(`SELECT * FROM players`, []);
        return result;
    }
}

let player = new Player();
module.exports = player;
```  
1. Just like the controller always require it's model equivalent `let EX_Model = require("../core/model");` to get the 
   base model file to be inherited by our class.

2. Always module.exports an instance of the class so that it can be fetched by our controller.

Created on: September 10, 2022