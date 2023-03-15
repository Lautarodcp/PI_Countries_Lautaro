const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countriesRouter = require ("./countriesRouter");
const toursRouter = require ("./toursRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countriesRouter);
router.use("/tours", toursRouter);


module.exports = router;
