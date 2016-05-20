var fileName="dist/allin1.html";
console.log("Starting merge all into "+fileName)
var fs=require('fs')

var html=fs.readFileSync("dist/index.html", 'utf8')
var js=fs.readFileSync("dist/index.js",'utf8')
try{
	var data=html.split(/<script.*\/script>/i)
	data.splice(1,0,`<script>/*${new Date()}*/${js}</script>`)

	fs.writeFileSync(fileName, data.join(''), 'utf8')
	console.log("Finished merge")
}catch(error){
	console.error(error.message)
	return
}
