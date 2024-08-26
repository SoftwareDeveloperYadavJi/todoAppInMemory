const express = require('express')
const path = require('path')
const fs = require('fs')
const { send } = require('process')

const app = express()

const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))) 


app.post('/submit', (req, res) => {
    const newData = req.body.data;

    fs.readFile('data.json', 'utf-8', (err, data)=>{
        if(err){
            console.error("Error reading data.json", err)
            return res.status(500).send('server error')
        }
        let jsonData = JSON.parse(data);
            console.log(jsonData)
        jsonData.push(newData);

        // writing
        fs.writeFile('data.json', JSON.stringify(jsonData , null , 2), (err)=>{
            if(err){
                console.error("Error in writing in the file", err);
                return res.status(500).send('Server error')

            }
            res.status(200).send("Data saved succesfully")
        });
    });

});


app.get('/api', (req, res)=>{
    fs.readFile('data.json', 'utf-8',(err,data)=>{
        if(err){
            console.error("Error while reading the file". err);
            res.status(500).send('Server Error')
        }
        // let jsonData = JSON.parse(data);
        res.json(JSON.parse(data));
    });
});


app.delete('/delete', (req, res)=>{
    const taskToDelete = req.body.task;

    fs.readFile('data.json', 'utf-8', (err,data)=>{
        if(err){
            console.error('Error while deleting the task', err)
            return res.status(500).send('Server Error')
        }
        let jsonData  = JSON.parse(data);
        jsonData = jsonData.filter(task => task != taskToDelete);

        fs.writeFile('data.json', JSON.stringify(jsonData , null , 2), (err)=>{
            if(err){
                console.error('Error while writing data.json', err);
                return res.status(500).send('Server Error')
            }
            res.status(200).send("Task delete successfully")
        });
    });
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})