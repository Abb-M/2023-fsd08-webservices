module.exports = app => {
    const todos = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Todo
    router.post("/", todos.create);
  
    // Retrieve all todos
    router.get("/", todos.findAll);
  
    // Retrieve task 
    router.get("/task", todos.findAllTasks);

    // Retrieve dueDate
    //router.get("/dueDate", todos.findDueDate);

    // Retrieve isDone 
    //router.get("/isDone", todos.findIsDone);
  
    // Retrieve a single Todo with id
    router.get("/:id", todos.findOne);
  
    // Update a Todo with id
    router.put("/:id", todos.update);
  
    // Delete a Todo with id
    router.delete("/:id", todos.delete);
  
    // Delete all todos
    router.delete("/", todos.deleteAll);
  
    app.use('/api/todos', router);
  };