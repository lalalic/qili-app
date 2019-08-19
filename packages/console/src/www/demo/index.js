const { demo, group, wait, using } = require("demokit");
const { type, paste } = require("demokit/keyboard");
const execute = require("demokit/execute")
const scene = require("demokit/scene");
const recording = require("demokit/recording");
const browser = require("demokit/window/browser");
const terminal =require("demokit/window/terminal")
const { click } = require("demokit/mouse");

module.exports =
<demo>
    <scene width = { 1024 } height = { 768 } />

    
    <recording.start filePath = "videos/video" />

    <terminal   id = "terminal"
            contentRect = { { origin: { x: "center", y: 500 }, size: { width: 500, height: 500  } } } />

    <using window = "terminal">
        <type>curl <paste>http://google.com</paste></type>
        <wait delay = { 3000 } />
        <type>hello</type>
        <wait delay = { 3000 } />
        <execute script={
            function(resolve,reject){
                window.close()
            }
        }/>
    </using>



    <browser    id = "qili2"
                title = "七里云"
                contentURL = "https://qili2.com"
                contentRect = { { origin: { x: "center", y: "center" }, size: { width: 900, height: 600 } } } />

    <using window = "qili2">
        <click selector = "button" />
        <wait delay = { 5000 } />
        <click selector = "input[type=text]" />
        <type>13601230570</type>
        <click selector = "input[type=submit]" />
        <wait delay = { 3000 } />
    </using>

    <recording.stop />

</demo>
