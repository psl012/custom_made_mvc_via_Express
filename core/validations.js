class Validations{
    constructor(){
        this.query = require("../database");
        this.errors = [];
    }
    is_empty(entry, name){
        if(entry == ""){
            this.errors.push(name + " is required");
        }
    }
    is_different(entry1, entry2, name1, name2){
        if(entry1 !== entry2){
            this.errors.push(name1 + " does not match " + name2);
        }
    }
    is_valid_email(email, name){
        let com_result = email.indexOf(".com");
        let at_result = email.indexOf("@");
        if(com_result + 4 != email.length || com_result === -1 || at_result <= 0){
            this.errors.push(name + " is not valid");
        }
    }
    async is_duplicate(email, name){
        let query = this.query.mysql.format(`SELECT * FROM users WHERE users.email = ?`, email);
        let result = await this.query.execute(query);
        if(result.length > 0){
            this.errors.push(name + " already exists in our database");
        }
    }
    get_validations_errors(){
        let holder = [];
        for(let err of this.errors){
            holder.push(err);
        }
        this.errors = [];
        return holder;
    }
}

module.exports = new Validations();