export default function({content, data}){
    return `<!doctype html><html>
        <head>
            <meta charset="utf-8" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
            <title>七里云</title>
        </head>
        <body style="margin:0">
            <header style="position:fixed;top:0px;width:100%;height:50px;line-height:50px;display:flex;flex-direction:row;background-color:#303848;color:white;">
                <center style="flex:none;padding-left:20px;margin:auto">
                    <strong>七里云</strong>
                </center>
                
                <center style="flex:1 1 100%"></center>
                <center style="flex:none;padding-right:20px;margin:auto">
                    <a href="https://app.qili2.com" style="text-decoration:none;padding:10px;white-space:nowrap; border-radius:5px; border:1px solid white;background:transparent;color:white">
                        管理控制台
                    </a>
                </center>
            </header>
            <article style="min-height:500px;margin-top:55px" id="app">${content}</article>
            <footer style="padding:10px;background-color:#303848;color:white; min-height:300px;display:flex;flex-direction:column">
                <div style="flex:1 1 100%">
                
                </div>
                <div style="flex:none;border-top:1px solid gray; font-size:small">
                    <p>
                        <span>© 2021 七里云</span>
                        <a href="https://beian.miit.gov.cn/" target="_blank" style="float:right">京ICP备15008710号-1</a>
                    </p>
                </div>
            </footer>
        </body>
        <script>
            window.__RELAY_BOOTSTRAP_DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="www.js" defer></script>
    </html>`
}