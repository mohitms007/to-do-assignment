/**
 * BoardsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */





module.exports = {
  
  
  async findByUserId(req,res){
    const userId = req.param('id')
    const boards = await Board.find({userId: userId}).populate('todos');
    return res.ok(boards);
  },

  async create(req,res) {
    const {name, userId} = req.body;

    const user = await User.findOne({id: userId});
    //  Checking params
    if(!userId || !user){
      return res.badRequest({message: 'User does not exist'});
    }

    // Creating a Board
    try{
      const board = await Board.create({name, userId}).fetch();
      return res.send(board);
    }catch(err) {
      return res.serverError(err);
    }
   
  },

  async update(req,res) {
    const {name, userId} = req.body;
    const boardId = req.param('id');

    const user = await User.findOne({id: userId});

    if(!userId || !user){
      return res.badRequest({message: 'User does not exist'});
    }

    try{
      const board = await Board.updateOne({id: boardId}).set({name, userId});
      if(board) {
        return res.send(board);
      }else{
        return res.badRequest('Board Not found')
      }
    }catch(err) {
      return res.serverError(err);
    }

  },



  async delete(req,res) {
    const boardId = req.param('id');
    const todosToBeDeleted = await Todo.find({boardId: boardId})
    const todoIds = todosToBeDeleted.map((item) => item.id)
    

    try {
      const deletedBoard = await Board.destroyOne({id: boardId})
      await Todo.destroy(todoIds)
      if(deletedBoard) {
        return res.ok('Deleted Successfully');
      }else{
        return res.badRequest('Item not found');
      }
    }catch(err) {
      return res.serverError(err);
    }

  },




  // Find Todos of specific board
  async findTodos(req,res) {
    const boardId = req.param('id')

    try {
      const matchedTodos = await Board.find({id: boardId}).populate('todos');
      if(matchedTodos) {
        return res.send(matchedTodos);
      }else{
        return res.badRequest('Todos not found');
      }
    }catch(err) {
      return res.serverError(err);
    }
    
  }

};

