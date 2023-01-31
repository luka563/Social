require('dotenv').config();
const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')

const port = process.env.PORT
app.use(express.json())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/blog',blogRouter)
app.get('/api', (req, res) => {
  res.send('Hello World!')
})

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };  
  start();

