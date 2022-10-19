class EX_Model{
    constructor(){
        this.query = require("../database");
        this.load_validations = () => {
            return require("./validations");
        }
    }
}

module.exports = EX_Model