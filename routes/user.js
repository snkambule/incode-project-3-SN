var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Schedules Website' });
});

router.post('/users/new', function(req, res){
    var body = req.body;

    var res_body = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password
    };

    res.redirect('/users', res_body);
});

module.exports = router;