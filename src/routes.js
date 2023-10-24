const {
  addPaysHandler,
  getAllPaysHandler,
  getDetailPaysHandler,
  editDetailPaysHandler,
  deleteDetailPaysHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/pays',
    handler: addPaysHandler,
  },

  {
    method: 'GET',
    path: '/pays',
    handler: getAllPaysHandler,
  },

  {
    method: 'GET',
    path: '/pays/{paysid}',
    handler: getDetailPaysHandler,
  },

  {
    method: 'PUT',
    path: '/pays/{paysid}',
    handler: editDetailPaysHandler,
  },

  {
    method: 'DELETE',
    path: '/pays/{paysid}',
    handler: deleteDetailPaysHandler,
  },

];

module.exports = routes;
