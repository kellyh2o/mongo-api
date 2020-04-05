const Jumps = require('./jumps.model');

exports.getAllJumps = function(req, res) {
  Jumps.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.getJump = function(req, res) {
  Jumps.findById(req.params.jumpId, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.createJump = function(req, res) {
  const newJump = new Jumps({
      name: req.body.name,
      createdBy: req.body.createdBy,
  });

  newJump.save(function(err, data) {
      if (err) {
          res.send(err);
          return;
      }

      res.json(data);
  });
};

exports.updateJump = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  Jumps.findOneAndUpdate(
    { _id: req.params.jumpId },
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

exports.deleteJump = function(req, res) {
  Jumps.deleteOne({ _id: req.params.jumpId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ msg: 'Deleted successfully.' });
  });
};
