const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post('/todo', async function(req, res){
    const createPayload = req.body;
    const parseBody = createTodo.safeParse(createPayload);
    if(!parseBody.success) {
        res.status(411).json({
            msg: "you sent the wrong input"
        })
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description
    }) 

    res.json({
        msg: "Todo created"
    })
    
})

app.get('/todos', async function(req, res) {

    const todos = await todo.find({});

    res.json({
        todos
    })
})

app.put('/completed', async function(req, res) {
    const uploadPayload = req.body;
    const parseBody = updateTodo.safeParse(uploadPayload);
    if(!parseBody.success) {
        res.status(411).json({
            msg: "you sent the wrong input"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })
    res.json({
        msg: "Todo marked as completed"
    })

})

app.listen(3000)