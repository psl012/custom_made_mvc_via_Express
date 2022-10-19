const Express = require("express");
const Router = Express.Router();
const route_middleware = require("./core/route_middleware");
const WelcomeController = require("./controllers/Welcome");

Router.all("/", route_middleware.catch_http, WelcomeController.index.bind(WelcomeController));

module.exports = Router;