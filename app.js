const express = require("express");
const bookRoutes = require("./routes/books");

// init App
const app = express();

// apply middleware
app.use(express.json());

//routes
app.use("/api/books", bookRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
