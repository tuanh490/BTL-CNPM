const express = require('express');

const router = express.Router();

// Mock data
let persons = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 }
];

// Get all persons
router.get('/', (req, res) => {
    res.json(persons);
});

// Get person by ID
router.get('/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).send('Person not found');
    res.json(person);
});

// Create new person
router.post('/', (req, res) => {
    const newPerson = {
        id: persons.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
});

// Update person
router.put('/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).send('Person not found');

    person.name = req.body.name;
    person.age = req.body.age;
    res.json(person);
});

// Delete person
router.delete('/:id', (req, res) => {
    const personIndex = persons.findIndex(p => p.id === parseInt(req.params.id));
    if (personIndex === -1) return res.status(404).send('Person not found');

    const deletedPerson = persons.splice(personIndex, 1);
    res.json(deletedPerson);
});

module.exports = router;