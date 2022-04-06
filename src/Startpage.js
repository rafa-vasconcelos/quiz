import React from "react"

export default function Startpage(props) {
    return (
        <main className="startpage">
        <h1>Quizzical</h1>
        <h3>Test your knowledge!</h3>
        <button onClick={props.clickStart}>Start quiz</button>        
        </main>
    )
}