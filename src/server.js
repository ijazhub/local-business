const app = require('./app');
const connectDb = require('./config/db');
const { port } = require('./config');

connectDb()
  .then(() => app.listen(port, () => console.log(`Server running: http://localhost:${port}  |  Docs: http://localhost:${port}/api-docs`)))
  .catch((err) => {
    console.error('Failed to start:', err.message);
    process.exit(1);
  });
