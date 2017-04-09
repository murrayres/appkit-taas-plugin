"use strict"

function job(appkit, args) {
    var jobname=args.job || args.j
    console.log(jobname)
    appkit.http.get('http://alamo-self-diagnostics-maru.octanner.io:4000/v1/diagnostic/'+jobname, {"Content-Type":"application/json"}, function(err,resp) {
      if(err) {
        return appkit.terminal.error(err);
     }
    var jobitem ={}
    jobitem.job=resp.job+"-"+resp.jobspace
    jobitem.app=resp.app+"-"+resp.space
    jobitem.action = resp.action
    jobitem.result = resp.result
    jobitem.image = resp.image
    jobitem.pipelinename = resp.pipelinename
    jobitem.transitionfrom = resp.transitionfrom
    jobitem.transitionto = resp.transitionto
    jobitem.timeout = resp.timeout
    jobitem.startdelay = resp.startdelay
    jobitem.env = JSON.stringify(resp.env)
    
    appkit.terminal.vtable(jobitem)
  });

}



function list(appkit, args) {
    appkit.http.get('http://alamo-self-diagnostics-maru.octanner.io:4000/v1/diagnostics', {"Content-Type":"application/json"}, function(err,resp) {
      if(err) {
        return appkit.terminal.error(err);
     }
  var shorttests = [];
  resp.forEach(function(testitem){
    var shorttest={};
    shorttest.app=testitem.app+"-"+testitem.space
    shorttest.job=testitem.job+"-"+testitem.jobspace
    shorttests.push(shorttest)
  });
  appkit.terminal.table(shorttests) 

   });
}


function update() {
}

function init(appkit) {
   const list_opts = {
        app: {
            alias: 'a',
            string: true,
            description: 'app name.',
            demand: false
        }
   }
   const job_opts = {
        job: {
            alias: 'j',
            string: true,
            description: 'job name.',
            demand: true
        }
    }

  appkit.args
    .command('taas:tests', 'list tests', list_opts, list.bind(null, appkit))
    .command('taas:job', 'describe job', {}, job.bind(null, appkit))
}
module.exports = {
  init:init,
  update:update,
  group:'taas',
  help:'manage testing as a service (create, list, register, update)',
  primary:true
};

