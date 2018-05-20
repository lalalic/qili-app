const path=require("path")
const fs=require("fs")
let parent=path.resolve("../../src/sharedQL")
if(fs.existsSync(parent)){
    fs.createReadStream(path.resolve("./src/sharedQL/qili.js")).pipe(fs.createWriteStream(`${parent}/qili.js`))
}
