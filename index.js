import express from 'express';
import path from 'path';


/* This is creating a variable called app and setting it equal to express. This is also creating a
variable called port and setting it equal to the environment variable PORT or 3000. */
const app = express();
const port = process.env.PORT || 3000;

app.use( express.static(path.join('src')))
app.use('*', (_req, res) => res.status(404).send('<h1>OPS! the endpoint does not exist :(</h1>'));

/* This is a function that is listening for a port. */
app.listen(port, () => {
  try {
    console.log(`The connection has been successfully established on port ${port}`);
  } catch (err) {
    console.log('unexpected error \n', err);
  }
});