const EX_Controller = require("../core/controller");

class Welcome extends EX_Controller{    
    index = async () => {
        this.load.View("index");
    };  
}

let welcome = new Welcome();
module.exports = welcome;