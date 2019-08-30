module.exports = (app) => {

    const snowload_controller = require('../controllers/snowload.controller');

    app.post('/snow_load/:id?', snowload_controller.snow_load);

    app.get('/all_snow_loads', snowload_controller.all_snow_loads);

    app.get('/find_project/:id', snowload_controller.find_project);
    
    app.delete('/delete_snow_load/:id', snowload_controller.delete_snow_load);

}