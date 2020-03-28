const Projects = require('../models/projects.model');

exports.getAllProjects = function(req, res) {
    Projects.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.getProject = function(req, res) {
    Projects.findById(req.params.projectId, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.createProject = function(req, res) {
  const newProject = new Projects({
      name: req.body.name,
      createdBy: req.body.createdBy,
  });

  newProject.save(function(err, data) {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

exports.updateProject = function(req, res) {
  const requestBody = req.body;
  requestBody.updatedAt = new Date();

  Projects.findOneAndUpdate(
    { _id: req.params.projectId },
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

exports.deleteProject = function(req, res) {
  Projects.deleteOne({ _id: req.params.projectId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ msg: 'Deleted successfully.' });
  });
};
