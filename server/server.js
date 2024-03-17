import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
var app = require('../app');


const port = 443; 

    if (process.env.NODE_ENV == "development"){
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Web Advanced Application development 2024 REST API",
          version: "1.0.1",
          description: "REST server including authentication using JWT and refresh token",
        },
        servers: [{ url: "http://localhost:443", },],//TODO: replace it with current server url
      },
      apis: ["./src/routes/*.ts"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

}
  app.listen(port, ()=> {
    console.log('http://localhost:${port}');
  });