const User = require('../models/User');

exports.user = async (req, res) => {

    let user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    if(req.params.id == null) {
        await user.save().then(result => res.json({
            status: "success",
            message: "User Added",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "User not added",
            data: err
        }));   
    }

    else {
        User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then(result => {
            res.json({
                status: "success",
                message: "User has been Updated",
                res: result
            });
        }).catch(err => res.json({  
            status: "failed",
            message: "Something went wrong",
            error: err
        }));
    }
}

exports.login = async (req, res) => {
    await User.find({$and: [ { email: req.body.email }, { password: req.body.password } ] })
    .then(records => {
        if(records.length > 0) {
            res.json({
                status: 'success',
                message: 'Logged In',
                data: records
            })
        }
        else {
            res.json({
                status: 'failed',
                message: 'User not found'
            })
        }
    }).catch(err => res.json({
        status: 'failed',
        message: "Something went wrong"
    }))
}

exports.all_users = async (req, res) => {
    await User.find().then(result => res.json({
        status: "success",
        message: "success",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "something went wrong",
        data: err
    }));
}

// DELETE User
exports.delete_user = async (req, res) => {
    await User.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "User Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "User Not Deleted",
        data: err
    }));
}