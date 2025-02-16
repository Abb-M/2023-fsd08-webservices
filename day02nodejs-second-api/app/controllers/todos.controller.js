const TodoClass = require("../models/todos.model.js");

// Create and Save a new Todo
/*
exports.create = (req, res) => {
  
};

// Retrieve all Todos from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Todo with an id
exports.findOne = (req, res) => {
  
};

// find Task Todos
exports.findTasks = (req, res) => {
  
};


// find dueDate Todos
exports.findDueDate = (req, res) => {
  
};


// find isDone Todos
exports.findIsDone = (req, res) => {
  
};


// Update a Todo identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
  
};
*/

//Create and Save a new Todo :

exports.create = (req, res) => {
  // Validate request
  /*if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  */

  var isValidResult = isValid(req, res);
  if (isValidResult === true){
    
    // Create a Todo
    const Todo = new TodoClass
    ({
      //id: 4,
      task: req.body.task,
      dueDate: req.body.dueDate,
      isDone: req.body.isDone || false
    });

    // Save Todo in the database
    TodoClass.create(Todo, (err, data) => {
      if (err)
        res.status(500).send({ message: err.message || "Some error occurred while creating the Todo." });
      else res.status(200).send(data);
    });

  }

};

function isValid(req, res){
  var year = req.body.dueDate.slice(0,4);

  if (req.body.id) {
    res.status(400).send({
      message: "id is provided by system!!! ToDo not saved!! ",
      result:false
    });
  }
  if (req.body.task.length < 1 || req.body.task.length > 100){
    res.status(400).send({ message: "too big/small task! need help? task not saved!!"});
    return false;
  }
  if (year < 1900 || year > 2099){
    res.status(400).send({ message: "Not in the correct year range!!"});
    return false;
  }
  const doneStat = ["Pending", "Done"];
  if (!doneStat.includes(req.body.isDone )){
    res.status(400).send({ message: "Not supported value in Is done."});
    return false;
  }
  
}

// Retrieve all Todos from the database (with condition).
exports.findAll = (req, res) => {
    const task = req.query.task;
  
    TodoClass.getAll(task, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todos."
        });
      else res.status(200).send(data);
    });
  };
  
  exports.findAllTasks = (req, res) => {
    TodoClass.getAllTasks((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Todos."
        });
      else res.send(data);
    });
  };

  
 // Find a single Todo by the id:

exports.findOne = (req, res) => {
  TodoClass.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Todo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

//Update a Todo identified by the id in the request:

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  //record need to be exist (404)
  if (isValid(req, res)){
    TodoClass.updateById( req.params.id, new TodoClass(req.body), (err, data) => {
        if(err) {
          if(err.kind === "not_found"){
            res.status(404).send({ message: `Not found todo with id ${req.params.id}.` });
          }else {
            res.status(500).send({ message: "Error updating todo with id " + req.params.id
            });
          }
        } else res.status(200).send({ message: data.id === req.params.id ? true : false });
      }
    );
  }


  // Update by ID

  TodoClass.updateById(
    req.params.id,
    new TodoClass(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//Delete a Todo with the specified id in the request:

exports.delete = (req, res) => {
    Todo.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todo
             with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Todo with id " + req.params.id
          });
        }
      } else res.send({ message: `Todo
         was deleted successfully!` });
    });
  };

  //Delete all Todos from the database:

exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Todos."
        });
      else res.send({ message: `All Todos were deleted successfully!` });
    });
  };