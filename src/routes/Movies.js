const { Router } = require('express')
const router = Router();
const _ = require('underscore')

const AuthorsInfo = require('../model/DataAutores')

router.get('/', (req, res) => {
    res.json(AuthorsInfo)
})

router.post('/', (req, res) => {
    const { titleMovie, director, releaseYear, rating } = req.body;
    if ( titleMovie && director && releaseYear && rating ) {
        const id = AuthorsInfo.length + 1; 
        const newMovie = {...req.body, id} 
        AuthorsInfo.push(newMovie)
        res.json(AuthorsInfo)
    } else {
        res.status(404).json({"Error": "Falta un dato o error de sintaxis "})
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titleMovie, director, releaseYear, rating } = req.body;

    if( titleMovie && director && releaseYear && rating ) {
        _.each(AuthorsInfo, (autores, i) =>  {
            if (autores.id == id) {
                autores.titleMovie = titleMovie;
                autores.director = director;
                autores.releaseYear = releaseYear;
                autores.rating = rating;
            }
        });
        res.json(AuthorsInfo)
    } else {
        res.status(404).json({"error": 'Dates incompletes || Sintaxis error'})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(AuthorsInfo, (autores, i) => {
        if (autores.id == id) {
            autores.splice(i, 1);
        }
    });
    res.send(AuthorsInfo)
})

module.exports = router;