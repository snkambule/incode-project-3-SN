const express = require('express');

const  app = express();

const {users, schedules} = require('./data');

const _ = require('underscore');

const path = require('path');

const exphbs = require('express-handlebars')

const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//view engine set-up
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')

//static files 
app.use('/static', express.static('public'));

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});



//Routing
app.get('/',(req,res)=>{
  res.render('index', {title: 'Schedule Website' });
})


app.get('/users',(req,res)=>{
  res.render('users', {
    //show_users: users
    show_users: users
});

})



app.get('/users/:id', (req, res) => {
let id = req.params.id;
res.render('users',  {user: users[id]});

});


app.get('/schedules',(req,res)=>{
  res.render('schedules', {
    //show_schedules: schedules
    show_schedules: schedules
});

})

app.get("/users/:id/schedules", (req,res) => { 

  
   let id = parseInt(req.params.id);
   let sweet = _.where(schedules, {user_id : id});

   console.log(sweet)

  res.render('schedules',  {show: sweet});

   
})

/*app.post('/users/new', (req, res) => {

  let user = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, 
  password: req.body.password }
  users.push(user)
  res.redirect('/users', users);

  });*/

app.post('/users/new', function(req, res){
    let body = req.body;

    let creation = {
        first_name: body.firstname,
        last_name: body.lastname,
        email: body.email,
        password: body.password
    };
     let newPosts= users.push(creation)
    res.redirect('/users', newPosts);
});


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})