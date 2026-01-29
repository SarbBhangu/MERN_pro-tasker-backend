const app = require("./app");

const PORT = process.env.PORT || 5000; //where the server listens

//opens the door
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
