const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());

let tasks = [
    { id:1, title: 'Communication protocols'},
    {id:2, title : "Web Servers"},
    {id:3, title:"Databases"},
    {id:4, title:"Proxies"}
];
app.get('/tasks',(req,res)=>{
    res.status(200).json(tasks);
});
app.post('/new-task', (req,res) => {

    if(!req.body.title){
        return res.status(400).json({error :"The body has no correct title"});
    }
    const newTask = {
        id:tasks.length +1,
        title:req.body.title,
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})
app.put('/task/:id',(req,res)=> {
    const taskId= parseInt(req.params.id);
    const task = tasks.find(t => t.id=== taskId);
    if(!task){
        return res.status(404).json({error:"Not found"});
    }
    task.title = req.body.title;
    res.status(200).json(task);
})
app.delete('/task/:id',(req,res)=> {
    console.log(req.params.id);
    const taskId= parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !==taskId);
    if(initialLength === tasks.length){
        return res.status(404).json({error:"Not found"});
    }
    res.status(204).send();

})
app.get('/task/:id',(req,res)=> {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id=== taskId);
    if(task === undefined){
        return res.status(404).json({error:"Id not found"});
    }
    console.log(task);
    res.status(200).json(task);
})
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
})
