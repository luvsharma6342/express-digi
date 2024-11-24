import express from 'express'

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.get("/", (req, res) => {
    res.send("Hello from Luv Sharma");
});

app.get("/ice-tea", (req, res) => {
    res.send("What ice tea would you prefer");
});

app.get("/twitter", (req, res) => {
    res.send("Luv Sharma Twitter");
});

// Add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// Get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});

// Get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => parseInt(t.id === req.params.id));
    if(!tea) {
        return res.status(404);
    }
    res.status(200).send(tea);
});

// Update tea

app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    
    if(!tea) {
        return res.status(404).send('Tea not found')
    }
    
    const {name, price} = req.body;
    tea.name = name
    tea.price = price
    res.status(200).send(tea);
})

// Delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
    return res.status(204).send("Deleted");
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});

