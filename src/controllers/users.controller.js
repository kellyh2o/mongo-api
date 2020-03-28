const Users = require('../models/users.model');

exports.getAllUsers = function(req, res) {
  Users.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getUser = function(req, res) {
  Users.findById(req.params.userId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createUser = function(req, res) {
  const newUser = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      createdBy: req.body.createdBy,
  });

  newUser.save(function(err, data) {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

exports.updateUser = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  Users.findOneAndUpdate(
    { _id: req.params.userId },
    requestBody,
    { new: true },
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deleteUser = function(req, res) {
  Users.deleteOne({ _id: req.params.userId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};
