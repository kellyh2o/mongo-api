const bcrypt = require('bcryptjs');
const Users = require('./users.model');

exports.getAllUsers = function(req, res) {
  Users.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.getUser = function(req, res) {
  Users.findById(req.params.userId, function(err, data) {
    if (err) {
      res.send(err);
      return;
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
          return;
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
        return;
      }

      res.json(data);
    }
  );
};

exports.deleteUser = function(req, res) {
  Users.deleteOne({ _id: req.params.userId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ msg: 'Deleted successfully.' });
  });
};

exports.getMe = function(req, res) {
  Users.findById(req.user.id, function(err, user) {
    if (err) {
      res.status(500).send({ msg: 'Could not find the user.' });
      return;
    }

    if (!user) {
      res.status(400).send({ msg: 'No user found.' });
      return;
    }

    res.status(200).send(user);
  });
}

exports.updateMe = function(req, res) {  
  // check user exists
  Users.findById(req.user.id, function(err, user) {
    if (err) {
        res.status(500);
        res.send({ msg: 'Could not retrieve user.' });
        return;
    }

    const requestBody = req.body;
    const passwordHash = bcrypt.hashSync(req.body.password);    

    requestBody.updatedAt = new Date();
    requestBody.password = passwordHash;

    // perform update
    Users.findOneAndUpdate(
        { _id: req.user.id },
        requestBody,
        { new: true },
        function(err, data) {
            if (err) {
                res.status(500);
                res.send({ msg: 'Could not update user settings.' });
                return;
            }

            res.json({ msg: 'Updated successfully!' });
        }
    );    
  });
}
