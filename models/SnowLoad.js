const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let SnowLoadSchema = new Schema({
    project_number: {type: String, required: true},
    project_name: {type: String, required: true},
    Is: {type: String, required: true},
    Ss: {type: String, required: true},
    Cb: {type: String, required: true},
    Cw: {type: String, required: true},
    Cs: {type: String, required: true},
    Ca: {type: String, required: true},
    Sr: {type: String, required: true},
});

module.exports = mongoose.model('SnowLoad', SnowLoadSchema);