import React from "react"
import {renderToString} from "react-dom/server"
import {match, Router} from "react-router"
import routes from "./routes"

export default function(location,res){
    match({routes,location}, (err, redirect, props)=>{
        if(props){
            res.reply(template({content:renderToString(<Router {...props}/>)}))
        }else if(redirect){
            res.redirect(302, redirect.pathname + redirect.search)
        }else{
            res.reply(err)
        }
    })
}