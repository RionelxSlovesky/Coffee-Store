const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middlewares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.spr5boq.mongodb.net/?retryWrites=true&w=majority`


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

    const coffeeCollection = client.db('coffeeDB').collection('coffee')

    app.get('/coffee', async(req,res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/coffee/:id', async(req,res) => {
      try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await coffeeCollection.findOne(query);

        res.send(result)
      }
      catch(err){
        console.log(err)
      }
    })


    app.post('/coffee', async (req, res) => {
      try {
        const newCoffee = req.body
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result)
      }
      catch(err){
        res.send(err)
      }
    })

    app.put('/coffee/:id', async(req,res) => {
      const id = req.params.id
      const updatedCoffee = {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          category: req.body.category,
          photoURL: req.body.photoURL,
          details: req.body.details,
        }
      }
      const filter = { _id: new ObjectId(id)}
      const options = { upsert: false }
      const result = await coffeeCollection.updateOne(filter,updatedCoffee,options)

      res.send(result)
    })

    app.delete('/coffee/:id', async(req,res) => {
      try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await coffeeCollection.deleteOne(query)
        res.send(result)
      }
      catch(err){
        console.log(err)
      }
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Coffee Khao')
})



app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`)
})