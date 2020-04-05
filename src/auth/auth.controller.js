const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtconfig = require('../jwt-config');

const Users = require('../users/users.model');

exports.registerUser = function(req, res) {

    const passwordHash = bcrypt.hashSync(req.body.password);

    const newUser = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        createdBy: req.body.createdBy,
    });

    Users.find({email: newUser.email}, function(err, data) {
        if (err) {
            res.send(err);
            return;
        }

        if (data.length > 0) {
            res
                .status(400)
                .send({ msg: 'User with that email already exists.'});
            
            return;
        }
    
        newUser.save(function(err, result) {
            if (err) {
                // stop registration
                res
                    .status(500)
                    .send({ msg: 'Could not register user. Please try again later. ' + err });
                
                return;
            }
    
            res.send(result);
        });
    });
}

exports.login = function(req, res) {

    Users.findOne({ email: req.body.email}, function(err, user) {
        if (err) {
            res.status(500);
            res.send({ msg: 'Could not retrieve user.' });
            return;
        }

        if (user === null) {
            res.status(404);
            res.send({ msg: 'User does not exist.' });
            return;
        }

        // validate entered password from database saved password
        bcrypt.compare(req.body.password, user.password)
        .then(function(validPass) {
            if (!validPass) {
                res.status(400).send({ msg: 'Invalid password' });
            }

            // create token
            const token = jwt.sign({ id: user._id }, jwtconfig.secret);
            res
                .header('auth-token', token)
                .send({ auth: true, msg: 'Logged in!' });
        })
        .catch(console.log);

    });
}

exports.performAuthenticatedRequest = function(req, res, onTokenValidation) {

    const token = req.headers['auth-token'];
    if (!token) {
      // stop user auth validation
      res
        .status(401)
        .send({ auth: false, msg: 'No token provided.' });
    }
    else {
      jwt.verify(token, jwtconfig.secret, function(err, decoded) {
        if (err) {
          res
            .status(401)
            .send({ auth: false, msg: 'Invalid token.' });
        }
        else {
            onTokenValidation();
        }  
      });  
    }
}
 
