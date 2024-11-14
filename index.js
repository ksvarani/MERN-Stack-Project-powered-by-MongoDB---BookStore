const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sandeep:ZMDGz8tSCmRuJlre@cluster0.lcn9b9e.mongodb.net/?retryWrites=true&w=majority";

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

    // create a collection of the document
    const booksCollections = client.db("BookInventory").collection("books");
    
    // insert a book data 
    app.post('/upload-book', async(req, res) => {
        const data = req.body;
        const result = await booksCollections.insertOne(data);
        res.send(result);
    })

    // get all books from the data 
    app.get('/all-books', async(req, res) => {
        const books = booksCollections.find();
        const result = await books.toArray();
        res.send(result);
    })

    // update book data 
    app.patch('/book/:id', async(req, res) => {
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
            $set: {
                ...updateBookData
            },
        }

        const options = {upsert: true};

        const result = await booksCollections.updateOne(filter, updateDoc, options);
        res.send(result);
    })

    // delete book from the database
    app.delete('/book/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await booksCollections.deleteOne(filter);
        res.send(result);
    })

    // find by cagtegory 
    app.get('/all-books/find', async(req, res) => {
        let query = {};
        if(req.query?.category) {
            query = {category: req.query.category}
        }

        const result = await booksCollections.find(query).toArray();
        res.send(result);
    })

    // to get single book data 
    app.get("/book/:id", async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await booksCollections.findOne(filter);
      res.send(result);
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


app.listen(port, ()=>{
    console.log(`Server start successfully at PORT: ${port}`)
})