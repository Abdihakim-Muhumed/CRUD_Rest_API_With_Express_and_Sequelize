const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validate request
    if(!req.query.title) {
        res.status(400).send({
            message: "Title content cannot be empty!"
        })
    }

    //create Tutorial
    const tutorial = {
        title: req.query.title,
        description: req.query.description,
        published: req.query.published ? req.query.published : false
    };

    //save Tutorial
    Tutorial.create(tutorial)
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).send({
            message: err.message || "Some error occured while creating the tutorial."
        })
    })


};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null

    Tutorial.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving tutorials."
        })
    })

};

exports.findOne = (req, res) => {
    const id = req.params.id
    Tutorial.findByPk(id)
    .then(data => {
        if(data) {
            res.send(data)
        }else{
            res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" +id
        })
    })
};

exports.update = (req, res) => {
    const id = req.params.id
    const updateTutorial = {
        title: req.query.title,
        description: req.query.description,
        published: req.query.published
    }
    Tutorial.update(updateTutorial, {
        where: {id: id}
    })
    .then(num => {
        if(num ==1) {
            res.status(201).send({
                message: "Tutorial was updated successfully."
            })
        }else {
            res.status(400).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.query is empty!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        })
    })
};

exports.delete = (req, res) => {
    const id = req.params.id
    Tutorial.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num ==1){
            res.status(200).send({
                message: "Tutorial was deleted successfully!"
            })
        }
        else{
            res.status(403).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id="+id
        })
    })
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};