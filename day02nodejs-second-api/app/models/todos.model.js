const sql = require("./db.js");

// constructor
const TodoClass = function(todo) {
  this.id = todo.id;
  this.task = todo.task;
  this.dueDate = todo.dueDate;
  this.isDone = todo.isDone;
};

// "UPDATE todos SET task = ?, dueDate = ?, isDone = ? WHERE id = ?",
//[todo.task, todo.dueDate, todo.isDone, id]
//create a todo
TodoClass.create = (newTodo, result) => {
  sql.query("INSERT INTO todos(task,dueDate,isDone) VALUES(?,?,?)", 
            [newTodo.task, newTodo.dueDate, newTodo.isDone], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todos: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};

//retun one todo by id
TodoClass.findById = (id, result) => {
  sql.query(`SELECT * FROM todos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todos: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found todos with the id
    result({ kind: "not_found" }, null);
  });
};

// retun all todo[search by task and retun all if any]
TodoClass.getAll = (task, result) => {
  let query = "SELECT * FROM todos";

  if (task) {
    query += ` WHERE task LIKE '%${task}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todos: ", res);
    result(null, res);
  });
};

//
TodoClass.getTask = result => {
  sql.query("SELECT * FROM todos WHERE task=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todos: ", res);
    result(null, res);
  });
};

TodoClass.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE todos SET task = ?, dueDate = ?, isDone = ? WHERE id = ?",
    [todo.task, todo.dueDate, todo.isDone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found todos with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todos: ", { id: id, ...todo });
      result(null, { id: id, ...todo });
    }
  );
};

TodoClass.remove = (id, result) => {
  sql.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found todos with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todos with id: ", id);
    result(null, res);
  });
};

TodoClass.removeAll = result => {
  sql.query("DELETE FROM todos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} todos`);
    result(null, res);
  });
};

module.exports = TodoClass;