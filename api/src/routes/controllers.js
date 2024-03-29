const axios = require ("axios");
const { Country, Tours } = require ("../db");
const api = "https://restcountries.com/v3/all";

//TRAER LOS DATOS UTILES DE LA API

const getApi = async function () {
    const info = await axios.get(api);
    const countries = await info.data.map (country => {
        return {
            id:country.cca3,
            name:country.name.common.toLowerCase(),//paso todo a minusculas por las dudas
            flag:country.flags[1],
            continent:country.continents[0],
            capital: country.capital? country.capital[0]:"None",//para los paises que no tienen
            subregion: country.subregion?country.subregion:"None",//para los paises que no tienen
            area:country.area,
            population:country.population,
        };
    })
    return countries;
};

// CREAR EN DB

const createDb = async function () {
    const countries = await getApi();
    countries.forEach (c => {       //itero sobre cada uno
        Country.findOrCreate ({     //busca y sino crea
            where: {
                    id:c.id,
                    name:c.name, 
                    flag:c.flag,
                    continent:c.continent,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
            }
        })
    })
};

//TRAER PAISES CON SUS TOURS

const getCountrieswithTours = async function (){
    const data = await Country.findAll({
        include:[{
            model: Tours,
            attributes: ["name","difficulty","duration","season"],
            through:{
                    attributes: {exclude: ["createdAt", "updatedAt"]},
                    }
            }],
        });
    return data;
};

//TRAER TOURS CON EL PAIS CORRESPONDIENTE

const getTourswithCountries = async function (){
    const data = await Tours.findAll({
        include:[{ 
            model: Country,
            attributes: ["name"],
            through:{
                attributes:  {exclude: ["createdAt", "updatedAt"]},
                }
        }],
    });
    return data;
};

//BUSCAR PAIS POR NOMBRE

const findCountriesbyName = (queryInfo, countries) => {
    let filter = [];
    let long = queryInfo.length;
    for (let country of countries){
        if(country["name"].substring(0,long).toLowerCase() === queryInfo.toLowerCase()) filter.push(country);
    }
    if(filter.length === 0) throw new Error("No se encontró ningún país")
    return filter;
};

//BUSCAR PAIS POR ID

const findCountriesbyId = (id, countries) => {
    const filteredCountry = countries.find(country => 
        country.id.toLowerCase() === id.toLowerCase());
    if(!filteredCountry) throw new Error("No se encontró ningún país con el id ingresado");
    return filteredCountry;
};

//CREAR TOURS

const addTourtoCountry = async (name, difficulty, duration, season, countries) => {
      const newTour = await Tours.create({
        name,
        difficulty,
        duration,
        season,
      });
  
      const filter = await Country.findAll({
        where: {
          name: countries,
        },
      });
  
      filter.forEach(async (country) => {
        await newTour.addCountry(country, { through: "country_tours" });// agrego la relacion
      });
    };

//BORRAR TOURS

const deletetours = async(name) => {
    const tour = await Tours.findOne({ where:{name}});
    await tour.destroy();
};

module.exports = {
    getApi,
    createDb,
    getCountrieswithTours,
    getTourswithCountries,
    findCountriesbyName,
    findCountriesbyId,
    addTourtoCountry,
    deletetours
}