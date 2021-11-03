const express = require('express');

const  app = express();

const {users, schedules} = require('./data');

const _ = require('underscore');

const path = require('path');

const exphbs = require('express-handlebars')

const port = 3000;

app.use(express.json())

app.use(express.urlencoded({extended: false}));


//view engine set-up
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')

//static files 
app.use('/static', express.static('public'));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
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




app.get('/users/new', function(req, res) {
  res.render('users', { title: 'Schedule Website' });
  });

app.post('/users', (req, res) => {

  let user = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, 
  password: req.body.password }
  users.push(user)
  res.render('users',user);
  
  });

  app.get('/schedules/new', function(req, res) {
    res.render('schedules', { title: 'Schedule Website' });
    });
  
  app.post('/schedules', (req, res) => {
  
    let schedule = { user_id: req.body.user_id, day: req.body.day, start_at: req.body.start_at, 
    end_at: req.body.end_at }
    schedules.push(schedule)
    res.render('schedules',schedule);
    
    });


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})