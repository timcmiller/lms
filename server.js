var express = require('express');
var app = express();
var mongoose = require('mongoose');
var courseRouter = require(__dirname + '/routes/course_routes');
var assignmentRouter = require(__dirname + '/routes/assignment_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
var gitRouter = require(__dirname + '/routes/git_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lms_dev');

app.use('/', express.static(__dirname + '/build'));
app.use('/api', courseRouter);
app.use('/api', assignmentRouter);
app.use('/auth', authRouter);
app.use('/git', gitRouter);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server Up');
});

// var parser = require('cadet-parser');
// var fs = require('fs');
// var Assignment = require(__dirname + '/models/assignment.js');

// var now = new Date();
// var nextweek = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

// file = fs.readFileSync('./tempDoc.md', 'utf-8');

// parser(file, nextweek, function(course) {
//   for(var i = 0; i < course.weeks[0].days.length; i++) {
//     debugger;
//     var newAssignment = new Assignment(course.weeks[0].days[i].assignments[0]);
//     newAssignment.save(function(err, data) {
//       console.log(data);
//     });
//   }
// });

module.exports = server;
