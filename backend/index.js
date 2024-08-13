const express = require("express");
const app = express();
const mainRouter = require('./routes/index')
const cors = require('cors')
const accountRouter = require('./routes/Account')

app.use(cors())
app.use(express.json())

app.use("/api/v1",mainRouter)
app.use("/api/v1",accountRouter)

app.listen(3000,()=>{
    console.log("App has started on port 3000")
})

