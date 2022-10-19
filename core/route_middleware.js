class Route_MiddleWare{
    constructor(){
        this.http = {request : "unset", response : "unset"};

    }
    catch_http = (request, response, next) =>{
        this.http.request = request;
        this.http.response = response;
        if(request.session.errors === undefined){
            request.session.errors = {};
        }
        this.http.request.time_bench = process.hrtime();
        next();
    }
}

var route_middleware = new Route_MiddleWare();

module.exports = route_middleware;