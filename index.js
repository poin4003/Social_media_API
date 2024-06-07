
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server port: \x1b[36m${PORT}\x1b[0m`);
})