module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller")
    var router = require("express").Router();

    router.post("/", tutorials.create);
    router.get("/", tutorials.findAll);
    router.get("/published", tutorials.findAllPublished);
    router.get("/:id", tutorials.findOne);
    router.put("/:id", tutorials.update);
    router.delete("/", tutorials.deleteAll);
    router.delete("/:id", tutorials.delete);

    app.use('/api/tutorials', router);

}