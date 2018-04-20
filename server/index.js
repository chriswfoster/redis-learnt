const express = require('express')
const { json  } = require('body-parser')
const cors = require('cors')
const cont = require('./controller')

const redis = require('redis')
var client = redis.createClient();


client.on('error', function(err){
    console.log('Something went wrong ', err)
  });


const PORT = 3089;

const app = express()
app.use(cors())
app.use(json())

app.set('client', client
)

app.get('/todos', cont.getTodos )
app.post('/addtodo', cont.addTodo)
app.delete('/deleteitem/:id', cont.deleteTodo)





app.listen(PORT, () => console.log(`Listening on port ${PORT}`))