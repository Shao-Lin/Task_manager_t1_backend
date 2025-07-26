import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}/api/tasks`);
});
