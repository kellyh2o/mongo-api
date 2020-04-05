const JumpEvents = require('./jump-events.model');

exports.getAllJumpEvents = function(req, res) {
  JumpEvents.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.getJumpEvent = function(req, res) {
  JumpEvents.findById(req.params.eventId, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.createJumpEvent = function(req, res) {
  const newEvent = new JumpEvents({
    riderMass: req.body.riderMass,
    riderSpeed: req.body.riderSpeed,
    timeStamp: req.body.timeStamp,
    createdBy: req.body.createdBy,
  });

  newEvent.save(function(err, data) {
      if (err) {
          res.send(err);
          return;
      }

      res.json(data);
  });
};

exports.updateJumpEvent = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  JumpEvents.findOneAndUpdate(
    { _id: req.params.eventId },
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

exports.deleteJumpEvent = function(req, res) {
  JumpEvents.deleteOne({ _id: req.params.eventId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }
    
    res.json({ msg: 'Deleted successfully.' });
  });
};
