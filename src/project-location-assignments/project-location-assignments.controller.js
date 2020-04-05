const ProjectLocationAssignments = require('./project-location-assignments.model');

exports.getAllProjectLocationAssignments = function(req, res) {
  ProjectLocationAssignments.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.getProjectLocationAssignment = function(req, res) {
  ProjectLocationAssignments.findById(req.params.assignmentId, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.createProjectLocationAssignment = function(req, res) {
  const newProjectLocationAssignment = new ProjectLocationAssignments({
      projectId: req.body.projectId,
      locationId: req.body.locationId,
      createdBy: req.body.createdBy,
  });

  newProjectLocationAssignment.save(function(err, data) {
    if (err) {
        res.send(err);
        return;
    }

    res.json(data);
  });
};

exports.updateProjectLocationAssignment = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  ProjectLocationAssignments.findOneAndUpdate(
    { _id: req.params.assignmentId },
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

exports.deleteProjectLocationAssignment = function(req, res) {
  ProjectLocationAssignments.deleteOne({ _id: req.params.assignmentId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }
    
    res.json({ msg: 'Deleted successfully.' });
  });
};
 