require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');


module.exports.fetchAssignments = function(callback, secondCallback) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/assignments')
      .then(function(res) {
        if (res.status <= 200 || res.status > 300) {

          return res.json();
        }
        throw 'request failed';
      })
      .then(function(jsonResult) {
        return dispatch(callback(jsonResult, secondCallback));
      })
      .catch(function(err) {
        console.log('unable to fetch assignments');
    });
  };
};

module.exports.sortAssignments = function(assignments, callback) {

  var upcoming = [];
  var current = [];
  var late = [];
  var completed = [];
  var now = new Date();
  var nextCoupleDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  for (var i = 0; i < assignments.length; i++) {
    var dueDate = new Date(assignments[i].dueDate);

    if(assignments[i].turnedIn === true) {
      completed.push(assignments[i]);
      break;
    }

    if(dueDate < now) {
      late.push(assignments[i]);
      break;
    }

    if(dueDate > now && dueDate < nextCoupleDays) {
      current.push(assignments[i].dueDate);
      break;
    }

    if(dueDate < nextCoupleDays) {
      upcoming.push(assignments[i].dueDate);
      break;
    }
  }
  callback(upcoming, current, late, completed);
};


module.exports.receiveAssignments = function(upcoming, current, late, completed) {
  return {
    type: types.RECEIVE_ASSIGNMENTS,
    upcoming: upcoming,
    current: current,
    late: late,
    completed: completed
  };
};

module.exports.handleSubmint = function(id, context, callback) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/assignments/' + id, {
      method: 'POST',
      body: {turnedIn: true}
    })
      .then(function(res) {
        if (res.status <= 200 || res.status > 300) {

          return dispatch(callback(id, context));
        }
        throw 'request failed';
      })
      .catch(function(err) {
        console.log('unable to fetch assignments');
    });
  };
};

module.exports.updateAssignments = function(id, context) {
  return {
    type: types.UPDATE_ASSIGNMENTS,
  _id: id,
  context: context
  };
};

module.exports.handleExpandClick = function(expand, context) {
  return {
    type: types.HANDLE_EXPAND_CLICK,
    expand: !expand,
    context: context
  };
};


// TODO create action for AJAX error handling



