//config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for the API endpoints'
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};