const express = require("express")
const app = express()
app.listen(3000 , () => {
    console.log('server port running on 3000')
})

app.get('/' , (req , res) => {
    res.send('<h1>hello! shakthi </h1>')
})
