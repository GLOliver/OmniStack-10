const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            let { name = login, avatar_url, bio } = apiResponse.data;

            /* if(!name) {
                name = apiResponse.data.login
            } */

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });


        }


        return res.json(dev);
    },
    async update(req, res) {
        const { avatar_url, bio, techs, latitude, longitude }
        let newDev = {}

        if(avatar_url){
            newDev.avatar_url = avatar_url;
        }

        if(bio){
            newDev.bio = bio;
        }

        if(techs){
            const techsArray = parseStringAsArray(techs);
            newDev.techs = techsArray;
        }

        if(location){
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            newDev.location = location;
        }

        const dev = await Dev.findByIdAndUpdate(idDev,newDev);

        res.json(dev)
    },

    async destroy(req, res) {
        const idDev = req.params.idDev;

        const response = Dev.findByIdAndDelete(idDev);

        return res.json(response);
    },

}