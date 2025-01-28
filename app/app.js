const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, GitOps with Azure!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
