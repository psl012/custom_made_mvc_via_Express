var process = require('process');
var config = require("../config");

class Profiler{
    constructor(){
        this.queries = {};
        this.http = require("../core/route_middleware").http;
    }
    get_path = () => {
        let html_str = "";
        html_str += "<h3>URI</h3>";
        html_str += this.http.request.path;
        return html_str;
    }
    get_header = () => {
        let html_str = "";
        html_str += "<h3>Headers</h3>";
        html_str += "<ul>";
        for(let key in this.http.request.headers){
            html_str += "<li>"+ key + " : " + this.http.request.headers[key];
        }
        html_str += "</ul>";
        return html_str;
    }
    get_class_method = () => {
        let html_str = "";
        html_str += "<h3>Class/method</h3>";
        html_str += this.http.request.path;
        return html_str;
    }
    get_memory_usage = () => {
        let html_str = "";
        html_str += "<h3>Memory Usage</h3>";
        let memory_usage = process.memoryUsage();
        html_str += "<ul>"
        for(let key in memory_usage){
            html_str += "<li>" + key + " : " + memory_usage[key] + "</li>";
        }
        html_str += "</ul>";
        return html_str; 
    }
    get_get = () =>{
        let html_str = "";
        html_str += "<h3>Get Data</h3>";
        html_str += JSON.stringify(this.http.request.query);
        return html_str;
    }
    get_post = () =>{
        let html_str = "";
        html_str += "<h3>Post Data</h3>";
        html_str += JSON.stringify(this.http.request.body);
        return html_str;
    }
    get_sessions = async () => {
        return new Promise((resolve) => {
            let html_str = "";
            html_str += "<h3>Sessions</h3>"
            html_str += "<ul>";
            html_str += "<li>Session Id: " + this.http.request.session.id + "</li></ul>";
            for(let key in this.http.request.session){
                html_str += "<h4>"+key+"</h4>";
                html_str += "<ul>";
                let session_element = this.http.request.session[key];
                for(let inner_key in session_element){
                    html_str += "<li>" + inner_key + " : " + session_element[inner_key] + "</li>";
                }
                html_str +="</ul>";
            }
            resolve(html_str);
        });
    }
    get_queries = () =>{
        let html_str = "";
        html_str += "<h3>Queries</h3>";
        html_str += "<ul>"
        for(let key in this.queries){
            html_str += "<li>Query: " + key + " -- result: " + JSON.stringify(this.queries[key]) + "</li>";
        }
        html_str += "</ul>"
        this.queries = {};
        return html_str;
    }
    get_config = () => {
        let html_str = "";
        html_str += "<h3>Config Variables</h3>";
        html_str += JSON.stringify(config);
        return html_str;
    }
    get_time_bench = (request) =>{
        let html_str = "<h3>Timer</h3>";
        let time = process.hrtime(request.time_bench);
        html_str += "Benchmark took " + time[0] + " seconds" + " and " + time[1] + " nanoseconds";
        return html_str;
    }
    get_display_html = async () => {
        let html_str = "<style>"; 
        html_str += "#profiler{margin: 20px 20px}"
        html_str += "#profiler table, #profiler tr, #profiler td {border: 1px solid black; border-collapse: collapse; padding: 20px}";
        html_str += "#profiler table{background-color: lightgray; border: 2px solid black;}";
        html_str += "</style>";
        html_str += "<div id='profiler'>";
        html_str += "<table>";
        /* URI and Class/Method (they are just the same) */
        html_str += "<tr><td>" + this.get_path() + "</td></tr>";
        html_str += "<tr><td>" + this.get_class_method() + "</td></tr>";
        /* Memory Usage */
        html_str += "<tr><td>" + this.get_memory_usage() + "</td></tr>"; 
        /* get */
        html_str += "<tr><td>" +  this.get_get() + "</td></tr>";
        /* post */
        html_str += "<tr><td>" + this.get_post() + "</td></tr>";
        /* queries */
        html_str += "<tr><td>" + this.get_queries() + "</td></tr>";
        /* sessions */
        html_str += "<tr><td>" + await this.get_sessions() + "</td></tr>";
        /* headers */
        html_str += "<tr><td>" +  this.get_header()  + "</td></tr>";
        /* config */
        html_str += "<tr><td>" + this.get_config() + "</td></tr>";
        /* time benchmark */        
        html_str += "<tr><td>" + this.get_time_bench(this.http.request)  + "</td></tr>";
        html_str += "</table>";
        html_str += "</div>";
        
        return html_str;
    }
}

var my_profiler = new Profiler();

module.exports = my_profiler;