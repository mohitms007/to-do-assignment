/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  async find(req,res){
    const todos = await Todo.find();
    return res.ok(todos);
  },

  async create(req,res) {
    const {title, description, userId, boardId } = req.body;

    const user = await User.findOne({id: userId});
    const board = await Board.findOne({id: boardId})
    //  Checking params
    if(!userId || !user || !boardId || !board){
      return res.badRequest({message: "User or Board doesn't exist"});
    }

    // Creating a Todo
    try{
      const todo = await Todo.create({title, userId, boardId, description}).fetch();
      return res.send(todo);
    }catch(err) {
      return res.serverError(err);
    }
   
  },

  async update(req,res) {
    const {title, description, userId, boardId, status} = req.body;
    const todoId = req.param('id');

    const user = await User.findOne({id: userId});
    const board = await Board.findOne({id: boardId});

    if(!userId || !user || !board || !boardId){
      return res.badRequest({message: 'User or Board does not exist'});
    }

    try{
      const todo = await Todo.updateOne({id: todoId}).set({title, description,status});
      if(todo) {
        return res.send(todo);
      }else{
        return res.badRequest({message: 'Todo not found'});
      }
      
    }catch(err) {
      return res.serverError(err);
    }
  },



  async delete(req,res) {
    const todoId = req.param('id');

    try {
      const deletedTodo = await Todo.destroyOne({id: todoId});
      if(deletedTodo) {
        return res.ok('Deleted Successfully');
      }else{
        return res.badRequest('Item not found');
      }
    }catch(err) {
      return res.serverError(err);
    }
  }


};

