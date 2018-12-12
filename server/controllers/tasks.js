const mongoose = require('mongoose');
const Task = mongoose.model('Task');

class Tasks{
  index(req, res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log("Returned errors", err);
        res.json({message: "error", error: err})
      }else{
        res.json({message: "sucess", data: tasks})
      }
    })
  }
  getOne(req, res){

    var task_id = req.params.id;
    Task.find({_id : task_id}, function(err, task){
        res.json({data: task })

    })
  }
  create(req, res){
    let task = new Task(req.body);
    task.save(function(err){
      console.log(err);
      res.json({data: task});
    });
  }
  update(req, res){
    Task.findByIdAndUpdate(req.params.id, req.body,{runValidators: true}, (err,task) =>{

    });
    res.json("updated")
  }
  delete(req, res){
    var id = req.params.id;
    Task.remove({_id: id}, function(err){
      res.json("deleted")
    });
  }
}
module.exports = new Tasks();
