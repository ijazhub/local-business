const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

module.exports = app;
