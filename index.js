const express = require('express');

const app = express();

const {users, schedules} = require('./data');

const _ = require('underscore');


const exphbs = require('express-handlebars')


const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

var hbs = exphbs.create({});

//helpers
hbs.handlebars.registerHelper("index", function(id) {
  
var id = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
var objectFound = array[id];

return objectFound;

});

//view engine set-up
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//static files 
app.use('/static', express.static('public'));

/*
app.get('/', (req, res) => {
  res.send("Welcome to our schedule website");
})

app.get("/users", (req,res) =>{  
    res.send(users);
})

app.get("/schedules", (req,res) => {   
    res.send(schedules);
})

app.get("/users/:id", (req,res) =>{  
   let id = req.params.id; 
   if(users[id]){res.json(users[id])}
   else{
       res.json('Not found')
   }
})

app.get("/users/:id/schedules", (req,res) => { 

  let id = parseInt(req.params.id);
  
  const result = schedules.filter(schedule => schedule.user_id === id);

  console.log(result)
  
  
  if(result){res.json(result)}
  else{
      res.json('Not found')
  }
  
})

app.post('/users', function(req, res) {

  const user = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password }
   users.push(user)
   res.status(201).send(user)

});

app.post('/schedules', function(req, res) {
  
  const schedule = { user_id: req.body.user_id, day: req.body.day, start_at: req.body.start_at, end_at: req.body.end_at }
  schedules.push(schedule)
  res.status(201).send(schedule)

});
*/

//Routing
app.get('/',(req,res)=>{
  res.render('index');
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})