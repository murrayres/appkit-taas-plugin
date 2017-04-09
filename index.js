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

function update() {
    // What do you want to do once the plugin has been updated, 
    // this is executed AFTER the plugin has had the latest set of code
    // pulled, so its a "post" update operation.
}

function init(appkit) {
  // This is fired when the plugin initially loads (e.g., every single time the user)
  // types "ak" or "appkit", this should not do blocking operations. Here we will add some commands
  // for users and supply the function that will execute when they run.
  appkit.args
    .command('mypluginname', 'list releases on an app', {}, some_action.bind(null, appkit))
    .command('mypluginname:foo', 'some description', {}, other_action.bind(null, appkit))
    .command('mypluginname:fee ID', 'some operation on an id', {'app':{'description':'The app to act on.','string':'true','demand':true}}, fee.bind(null, appkit))
}
module.exports = {
  init:init,
  update:update,
  group:'mypluginname',
  help:'manage mypluginname (create, list)',
  primary:true
};

