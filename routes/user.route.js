module.exports = (app) => {

    const user_controller = require('../controllers/user.controller');

    app.post('/user/:id?', user_controller.user);

    app.get('/all_users', user_controller.all_users);

    app.post('/login', user_controller.login);
    
    app.delete('/delete_user/:id', user_controller.delete_user);

}