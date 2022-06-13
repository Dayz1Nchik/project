const fs = require('fs');
const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { MongoClient, Collection } = require('mongodb');
const async = require('hbs/lib/async');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const session = require('express-session')
// const async = require('hbs/lib/async');
// const { use } = require('video.js');
// const { data } = require('flickity/js/flickity');

const port = 3000;
const configHbs = expressHbs.engine({
  layoutsDir: "views",
  extname: "hbs"
});
app.engine("hbs", configHbs);
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.render('main');
});

server.listen(port, () => {
  console.log('listening on 3000');
});

app.get('/chat', function(req, res){
  res.render('chat', {
  layout: 'chat'})
})

// app.get('/reviews', function(req, res){
//   res.render('reviews', {
//     layout: 'reviews'})
// })



// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

const url = 'mongodb+srv://DenisMaks:22443355sS@cluster1.xvgkr.mongodb.net/test';
const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const dbusers = client.db('users');
  const dbcalendar = client.db('groups')
  const collection = dbusers.collection('personal_info');
  const calendar = dbcalendar.collection('lessons')
  const dbreviews = client.db('reviews')
  const review = dbreviews.collection('review')

  let monthes = [
    'Січень',
		'Лютий',
		'Березень',
		'Квітень',
		'Травень',
		'Червень',
		'Липень',
		'Серпень',
		'Вересень',
		'Жовтень',
		'Листопад',
		'Грудень'
  ]

  app.get('/',async function(req, res) {
	  res.render('main', {error:''});
  });

  let session;
  let users = {};
  io.on('connection', (socket) => {
    console.log('a user connected');
    user[socket.id] = session;
    console.log(users);
    socket.on('message', (msg) => {
      console.log(msg);
      io.sockets.emit('answer', {user: user[socket.id], message:msg})
    })
    socket.on('disconnected', () => {
      delete users[socket.id];
      console.log(users)
      console.log('a user disconnected')
    })
  })

  app.get('/api/jurnal/:group/', async function(req, res){
    res.send(calendar)
  })

  app.get('/jurnal/:group/',async function(req, res) {
    let users = await collection.find({permissions:"student", jurlog: req.params.group}).toArray();
    let html = '';
    
  
    for(let i = 0; i<users.length; i++){
      html += `
      <div class="jitem">
        <div class="jitem-i">
          <div class="mark III">${users[i].name}</div>
        </div>
      `
      // console.log(users[i]);
      
        
      if (users[i]){
        let currentmonth = new Date().getMonth();
        
        let marks2 = users[i].marks[monthes[currentmonth]];
        console.log(marks2);
        let days = Object.keys(marks2);
        for (let o = 0; o < 9; o++){
          if (days && days[o]) {
            html += `
            <div class="jitem-i">
              <input type="text" class="mark" value="${marks2[days[o]][0]}">
              <input type="text" class="mark" value="${marks2[days[o]][1]}">
            </div>
          `
          } else {
            html += `
            <div class="jitem-i">
              <input type="text" class="mark" value="">
              <input type="text" class="mark" value="">
            </div>
            `
          }
            
        }
      }
  
      html += `</div>`
    }
  
    res.render('jurnal', {
      layout: 'jurnal',
      group: req.params.group,
      html: html
    });
  });

  app.post('/jurnal/:group/newUser', async function(req, res){
    let marks = {};
    for (let i = 0; i < monthes.length; i++) {
      marks[monthes[i]] = [];
      console.log(marks)
    }
    collection.insertOne({
      name:  `${req.body.first_name} ${req.body.second_name}`,
      birthday:req.body.birth_date,
      telegram: req.body.telegram,
      email: req.body.email,
      jurlog: req.body.jurlog,
      jurpas:req.body.jurpas,
      phone: req.body.phone,
      photo: req.body.photo,
      permissions: "student",
      group: req.params.group,
      marks: marks
    });
    res.redirect('/jurnal/' + req.params.group);

  })
  app.get('/jurnal/:group/save', async function(req, res){
    let users = await collection.find({permissions:"student", jurlog: req.params.group}).toArray();
    let currentmonth = new Date().getMonth();
    for (let i = 0; i<9; i++){
      let marks2 = users[i].marks[monthes[currentmonth]];
      let days = Object.keys(marks2);
      for (let o = 0; o < 9; o++){
        collection.updateOne(marks2[days[o]][0])
      }
    }
    res.redirect('/jurnal/' + req.params.group);
  });

  app.get('/reviews',async function(req, res){
    let reviews1 = await review.find({}).toArray();
    let html = '';
    console.log(reviews1)
    for(let i = 0; i<reviews1.length; i++){
      let coment = reviews1[i].text;
        html += `
        <div class="review toggle1" id="${reviews1[i].clas}" name="a${reviews1[i].stars}">
                <div class="review-top">
                    <div class="lrt">
                        <div class="avatar"></div>
                        <div class="names">
                            <p class="persname">${reviews1[i].name}</p>
                            <p id="${reviews1[i].clas}" class="persclas">${reviews1[i].clas}</p>
                        </div>
                    </div>
                    <div id="a5" class="rrt">${reviews1[i].stars}</div>
                </div>
                <div class="review-main">${reviews1[i].text}</div>
            </div>
        `
    }
    res.render('reviews', {
      layout: 'reviews',
      html: html
    });
  });

  app.post('/reviews/newReview', async function(req, res){
    review.insertOne({
      name: `${req.body.first_name_b} ${req.body.second_name_b}`,
      clas: req.body.clas,
      stars: req.body.stars,
      text: req.body.rev
    });
    res.redirect('/reviews')
  })

  app.post('/auth', async function (req, res){
    let findUser = await collection.find({Login:req.body.login}).toArray();
    // console.log(findUser)
    // console.log(req.body.password)
    if(findUser.length){
      if(findUser[0].password == req.body.password){
        res.redirect('/')
      } else{
        res.render('main', {error: 'Пароль невірний'})
      }
    } else{
      res.render('main', {error: 'Тебе неіснує'})
    }

  })

  return 'done.';
}
main()



