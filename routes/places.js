var express = require('express');
var router = express.Router();

const Place = require('../models/places');

// route pour add a newplace
router.post("/", (req, res) => {
    const { nickname, name, latitude, longitude } = req.body // Désctructuration

    const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })

    newPlace.save().then(() => res.json({ result: true }))
})

//route pour recup all marker d'un nickname
router.get("/:nickname", (req, res) => {
    Place.find({
        nickname:req.params.nickname})
        .then(data => {
        if (data) {
            res.json({ result: true, places: data  });
        } else {
            res.json({ result: false, error: "no places" });
        }
        });
    });

    //delete une place en fonction du name et du nickname
    router.delete("/", (req, res) => {
    Place.deleteMany( {name: req.body.name, nickname: req.body.nickname} )
    .then() 
    res.json({ result: true, info : 'deletedPlace' })
            })

module.exports = router;