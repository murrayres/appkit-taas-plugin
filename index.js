"use strict"

function some_action(appkit, args) {
  console.log("some action ran!");
}

function other_action(appkit, args) {
  console.log("other action ran!");
}

function fee(appkit, args) {
  console.log("fee ran!");
}

function list(appkit, args) {
    appkit.http.get('http://alamo-self-diagnostics-maru.octanner.io:4000/v1/diagnostics', {"Content-Type":"application/json"}, function(err,resp) {
      if(err) {
        return appkit.terminal.error(err);
     }
  var shorttests = [];
  resp.forEach(function(testitem){
    console.log(testitem.job);
    shorttest.app=testitem.app+"-"+testitem.space
    shorttests.push(shorttest)
  });
  appkit.terminal.table(shorttests) 

   });
  console.log("list ran");
}


function update() {
    // What do you want to do once the plugin has been updated, 
    // this is executed AFTER the plugin has had the latest set of code
    // pulled, so its a "post" update operation.
}

function init(appkit) {
  // This is fired when the plugin initially loads (e.g., every single time the user)
  // types "ak" or "appkit", this should not do blocking operations. Here we will add some commands
  // for users and supply the function that will execute when they run.
   const list_opts = {
        app: {
            alias: 'a',
            string: true,
            description: 'app name.',
            demand: false
        }
}

  appkit.args
    .command('taas', 'list releases on an app', {}, some_action.bind(null, appkit))
    .command('taas:tests', 'some operation on an id', list_opts, list.bind(null, appkit))
    .command('taas:foo', 'some description', {}, other_action.bind(null, appkit))
    .command('taas:fee ID', 'some operation on an id', {'app':{'description':'The app to act on.','string':'true','demand':true}}, fee.bind(null, appkit))
}
module.exports = {
  init:init,
  update:update,
  group:'taas',
  help:'manage testing as a service (create, list)',
  primary:true
};

