class EX_Controller{
    constructor(){
        this.enable = {profiler : false};
        this.child_name = this.constructor.name;
        this.profiler = require("../core/profiler");
        this.http = require("../core/route_middleware").http;
        this.load = {
            Model : (modelName) => {
                        return require("../models/" + modelName);
                    },
            View :  (view_file, data_obj="") => {
                        this.http.response.render(view_file, data_obj, async (err, html) => {
                            if(this.enable.profiler){
                                let html_str = await this.profiler.get_display_html();
                                this.http.response.send(html + html_str);
                            }
                            else{
                                process.hrtime(this.http.request.time_bench);
                                this.http.response.send(html);
                            }  
                        })
                    }
            };
    }

    deep_copy = (error_array) => {
        let errors = [];
        for(let err of error_array){
            errors.push(err);
        }
        return errors;
    };    
}

module.exports = EX_Controller;