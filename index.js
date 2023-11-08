const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(express.json())
app.use(cors())

// quillQuestServer
// xQizoeK1Y8b1AWD6


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.abtiefd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const QuillQuestCollections = client.db('QuillQuestDB').collection('Services')
    const QQBookingCollections = client.db('QuillQuestDB').collection('Booking')
    app.post('/allServices' , async(req , res)=>{
        const allData = req.body
        const result = await QuillQuestCollections.insertOne(allData)
        res.send(result)
    })
    app.get('/allServices' , async(req , res)=>{
      console.log(req.query.UserEmail)
      let query = {}
      if(req.query?.UserEmail){
        query = { UserEmail : req.query.UserEmail }
      }
      
        const result = await QuillQuestCollections.find(query).toArray()
        res.send(result)
    })
    app.post('/allBookings' , async(req , res)=> {
      const bookingData = req.body
      const result = await QQBookingCollections.insertOne(bookingData)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', (req, res) => {
    res.send('QuillQuest Server is running')
  })
  
  app.listen(port, () => {
    console.log(`QuillQuest Server listening on port ${port}`)
  })