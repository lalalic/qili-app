const program = require('commander');
const QiliCloud=require("./qili-cloud)
const prompt=require("prompt")
 
program
	.version('0.1.0')
	.usage('[options] command')
	.option('-a, --appId', 'application id')
	.option('-s, --service', 'server endpoint, default[http://qili2.com/1/graphql]')
	.parse(process.argv);

program
	.command('create <name> <uname>')
	.action(function(name,uname,cmd){
		new QiliCloud(program.service, program.appId)
			.create(name,uname)
	})
	
program
	.command('publish')
	.action(function(cmd){
		new QiliCloud(program.service, program.appId)
			.publish()
	})

program
	.command('log')
	.action(function(cmd){
		new QiliCloud(program.service, program.appId)
			.log()
	})
	
program
	.command('list')
	.action(function(cmd){
		new QiliCloud(program.service)
			.log()
	})
	
program
	.command('dev')
	.action(function(cmd){
		new QiliCloud(program.service, program.appId)
			.dev()
	})
	.parse(process.argv);
 
console.log('you ordered a pizza with:');
if (program.appId) console.log('  - peppers');
if (program.service) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);