const express = require("express");
const usersRouter = require("./routes/users.route");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, (err) => {
  if (err) throw new Error(err.message);
  console.log(`Server is listening... http://localhost:${PORT}`);
});
