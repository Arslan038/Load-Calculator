const SnowLoad = require('../models/SnowLoad');

exports.snow_load = async (req, res) => {

    let snowLoad = new SnowLoad({
        project_number: req.body.project_number,
        project_name: req.body.project_name,
        Is: req.body.Is,
        Ss: req.body.Ss,
        Cb: req.body.Cb,
        Cw: req.body.Cw,
        Cs: req.body.Cs,
        Ca: req.body.Ca,
        Sr: req.body.Sr,

    });

    if(req.params.id == null) {
        await snowLoad.save().then(result => res.json({
            status: "success",
            message: "Snow Load Added",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "User not added",
            data: err
        }));   
    }

    else {
        SnowLoad.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then(result => {
            res.json({
                status: "success",
                message: "Snow Load has been Updated",
                res: result
            });
        }).catch(err => res.json({  
            status: "failed",
            message: "Something went wrong",
            error: err
        }));
    }
}

exports.all_snow_loads = async (req, res) => {
    await SnowLoad.find().then(result => res.json({
        status: "success",
        message: "success",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "something went wrong",
        data: err
    }));
}

// Find a Project
exports.find_project = async (req, res) => {
    await SnowLoad.find( {_id: req.params.id} ).then(result => {
        if(result.length > 0) {
            res.json({
                status: "success",
                message: "Found",
                data: result
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Not Found",
                data: result
            })
        }
    }).catch(err => res.json({
        status: "failed",
        message: "Not Found",
        err: err
    }))
}

// DELETE SNOW LOAD
exports.delete_snow_load = async (req, res) => {
    await SnowLoad.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Snow Load Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Snow Load Not Deleted",
        data: err
    }));
}