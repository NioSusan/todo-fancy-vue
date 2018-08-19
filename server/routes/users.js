const router = require('express').Router();
const auth      = require('../helpers/auth');
const isLogin = require('../helpers/isLogin');
const {loginFb, login, signup, getUsers, newUser, getUser, updateUser, updateUserRole, deleteUser} = require('../controllers/user');

const authUser  = auth(['user', 'admin'])
const authAdmin = auth(['admin'])

router.post('/loginFb', loginFb);
router.post('/signin', login);
router.post('/signup', signup);
router.get('/', isLogin, authUser, getUsers);
router.post('/', isLogin, authAdmin, newUser);
router.get('/:userId', isLogin, authUser, getUser);
router.put('/:userId', isLogin, authUser, updateUser);
router.patch('/:userId', isLogin, authAdmin, updateUserRole);
router.delete('/:userId', isLogin, authAdmin, deleteUser);

module.exports = router;
