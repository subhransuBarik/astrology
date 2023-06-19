const express = require("express");
const astrologerRouter = require("./routes/astrologerRoutes")
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",astrologerRouter);

app.get("/",(req,res)=>{
  res.send("home")
})

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});