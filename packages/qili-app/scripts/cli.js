const program = require('commander');
const QiliCloud=require("./qili-cloud)
 
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

program
	.command('log')

program
	.command('list')

program
	.command('dev')

	.parse(process.argv);
 
console.log('you ordered a pizza with:');
if (program.appId) console.log('  - peppers');
if (program.service) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);