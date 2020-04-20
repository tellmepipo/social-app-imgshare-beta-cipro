const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const { Image } = require('../models/index');

const ctrl = {};

ctrl.index = (req, res) => {

};

ctrl.create = async (req, res) => {
    const imgUrl = randomNumber();
    console.log(imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve('src/public/upload/${imgUrl}${ext}')

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description
        });
        const imageSaved = await newImg.save();
    } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Only Images are allowed'});
    }
    res.send('works!');
};

ctrl.like = (req, res) => {
    
};

ctrl.comment = (req, res) => {
    
};

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;