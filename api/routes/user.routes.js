//api_routes.js file
// const express = require('express');

// const router = express.Router();

// router.get('/',(req, res, next) => {
//      res.send('running node api');
// })

// router.post('/new',(req, res, next) => {
//   res.send('running new node api');
// })
// module.exports = router;

const express = require('express');

const userController = require('../controller/user.controller')

const router = new express.Router();

router.route('/addUser').post(userController.AddUser)
router.route('/getUser').get(userController.getUser)
router.route('/updateUser').post(userController.updateUser)
router.route('/deleteUser').post(userController.deleteUser)
router.route('/login').post(userController.LoginUser)

module.exports = router;