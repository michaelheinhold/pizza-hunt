const { Pizza } = require('../models');

const pizzaController = {
  //functions will go here
  //get all pizza
  getAllPizza(req, res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //find one pizza
  getPizzaById({ params }, res){
    Pizza.findOne({ _id: params.id })
    .then(dbPizzaData => {
      //if no pizza is found send 404
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with that id' });
        return;
      }
      res.json(dbPizzaData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //create a pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'no pizza with that id found' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'no pizza with that id found' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
};

//update pizza by id

module.exports = pizzaController;