export default function({content}){
    return `<html>
        <head>
            <title>七里云</title>
        </head>
        <body style={{margin:0}}>
            <header style="position:fixed;top:0px;width:100%;height:50px;line-height:50px;display:flex;flex-direction:row;background-color:#303848;color:white;">
                <center style="flex:1 1 100%"></center>
                <center style="flex:1;padding-right:20;margin:auto">
                    <button style="padding:10;white-space:nowrap; border-radius:5; border:1px solid white;background:transparent;color:white">
                        管理控制台
                    </button>
                </center>
            </header>
            <article style="min-height:500px, margin-top:55px" id="app">
                ${content}
            </article>
            <footer style="padding:10px;background-color:#303848;color:white; min-height:300px;display:flex; flex-direction:column">
                <div style="flex:1 1 100%"/>
                <div style="flex:none;border-top:1px solid gray; font-size:small">
                    <p>
                        <span>© 2019 七里云</span>
                        <span style="float:right">京ICP备15008710号-1</span>
                    </p>
                </div>
            </footer>
        </body>
        <script src="bundle.js" defer></script>
    </html>`
}