const { Router } = require ("express");
const { getCountrieswithTours, findCountriesbyName, findCountriesbyId } = require("./controllers")

const router = Router();

// RUTA PARA /countries y /countries?name

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        const countries = await getCountrieswithTours();
        if (!name) res.status(201).send(countries);
        else {
            const filter = findCountriesbyName (name, countries);
            res.status(201).send(filter);
        }
    } catch (error) {
        res.sendStatus(400).send(error.message);
    }
});

//RUTA PARA BUSQUEDA ID

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const countries = await getCountrieswithTours();
        const filter = await findCountriesbyId(id, countries);
        res.status(201).send(filter);
    } catch (error) {
        res.status(404).send(error.message);
    }
})
module.exports = router;