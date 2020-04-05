const Locations = require('./locations.model');

exports.getAllLocations = function(req, res) {
  Locations.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.getLocation = function(req, res) {
  Locations.findById(req.params.locationId, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.createLocation = function(req, res) {
  const newLocation = new Locations({
      name: req.body.name,
      createdBy: req.body.createdBy,
  });

  newLocation.save(function(err, data) {
      if (err) {
          res.send(err);
          return;
      }

      res.json(data);
  });
};

exports.updateLocation = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  Locations.findOneAndUpdate(
    { _id: req.params.locationId },
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

exports.deleteLocation = function(req, res) {
  Locations.deleteOne({ _id: req.params.locationId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }
    
    res.json({ msg: 'Deleted successfully.' });
  });
};
