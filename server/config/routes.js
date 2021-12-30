/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  'POST /users' : 'UsersController.create',





  // Boards by userId
  'GET /boards/:id' : 'BoardsController.findByUserId',
  'POST /boards': 'BoardsController.create',
  'PATCH /boards/:id' : 'BoardsController.update',
  'DELETE /boards/:id' : 'BoardsController.delete',



  // ToDOS
  'GET /todos' : 'TodosController.find',
  'POST /todos': 'TodosController.create',
  'PATCH /todos/:id' : 'TodosController.update',
  'DELETE /todos/:id' : 'TodosController.delete',


  // Custom Routes
  'GET /boards/:id/todos': 'BoardsController.findTodos',

};
