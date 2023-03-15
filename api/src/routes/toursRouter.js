const { Router } = require("express");
const { Country, Tours } = require("../db");
const { getTourswithCountries, addTourtoCountry, deletetours } = require("./controllers");

const router = Router();

//RUTA para buscar tours

router.get("/", async (req, res) => {
    try {
        const tours = await getTourswithCountries();
        res.status(201).send(tours);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

//RUTA CREAR TOURS

router.post("/", async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries} = req.body;
        if (!name || !difficulty || !duration || !season || !countries){
            res.status(404).json("Faltan datos necesarios");
        } else {
            await addTourtoCountry(name, difficulty, duration, season, countries);
            res.status(201).send("El tour fue creado correctamente");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// ELIMINAR UN TOUR POR NOMBRE

router.delete("/", async (req, res) => {
    try {
        const {name} = req.body;
        await deletetours(name);
        res.status(201).send("El tour fue eliminado");
    } catch (error) {
        res.status(404).send("El tour no se pudo eliminar");
    }
});

//ACTUALIZAR TOUR

router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,difficulty,duration,season,countries} = req.body;
        const tour_updated = await Tours.findOne({ where:{id}});
        tour_updated.set({
            name,difficulty,duration,season
        });
        await tour_updated.save();
        const countries_tour = await Country.findAll({
            where: {
                    name: countries,
              },
        });
        tour_updated.addCountry(countries_tour);
        res.status(201).send("El tour fue actualizada correctamente");
    }catch(error){
        res.status(404).send("El tour no pudo ser actualizada");
    }
});

module.exports = router;