const ProjectUserAssignments = require('./project-user-assignments.model');

exports.getAllProjectUserAssignments = function(req, res) {
  ProjectUserAssignments.find({}, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    
    res.json(data);
  });
};

exports.getProjectUserAssignment = function(req, res) {
  ProjectUserAssignments.findById(req.params.assignmentId, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(data);
  });
};

exports.createProjectUserAssignment = function(req, res) {
  const newProjectUserAssignment = new ProjectUserAssignments({
      projectId: req.body.projectId,
      userId: req.body.userId,
      createdBy: req.body.createdBy,
  });

  newProjectUserAssignment.save(function(err, data) {
      if (err) {
          res.send(err);
          return;
      }

      res.json(data);
  });
};

exports.updateProjectUserAssignment = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  ProjectUserAssignments.findOneAndUpdate(
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

exports.deleteProjectUserAssignment = function(req, res) {
  ProjectUserAssignments.deleteOne({ _id: req.params.assignmentId }, function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ msg: 'Deleted successfully.' });
  });
};
 