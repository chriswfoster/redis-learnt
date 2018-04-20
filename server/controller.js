const getTodos = (req, res, next) => {
  const client = req.app.get("client")
  client.lrange("todolist", 0, -1, function(err, result) {
    if (result === null) {
      client.lpush("todolist")
      res.status(200).json(result)
    } else res.status(200).json(result)
  })
}

const addTodo = (req, res, next) => {
  const client = req.app.get("client")
  console.log(req.query)
  const { item } = req.query
  client.lpush("todolist", item, function(err, result) {
    if (result > -1) {
      client.lrange("todolist", 0, -1, function(err, result) {
        res.status(200).json(result)
      })
    }
  })
}

const deleteTodo = (req, res, next) => {
  const client = req.app.get("client")
  console.log(req.params.id)
  const { id } = req.params
  client.lset("todolist", id, "DELETED")
  client.lrem("todolist", 1, "DELETED", function(err, result) {
    client.lrange("todolist", 0, -1, function(err, result) {
      res.status(200).json(result)
    })
  })
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo
}
