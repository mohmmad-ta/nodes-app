const Nodes = require('../models/NodesModel');
const User = require('../models/userModel');
const multer = require('multer');
const mongoose = require("mongoose");


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid image type');
        if (isValid){
            uploadError = null
        }
        cb(uploadError, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.split(' ').join())
    }
});

const upload = multer({ storage: storage });
exports.createUpload = upload.single('image')
exports.createNodes = async (req, res, err)=>{
    try {
        const basePath = `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`;
        const user = await User.findById(req.params.id).select('name photo _id')
        if (!user) res.status(404).json({ err })

        const node = await Nodes.create({
            name: req.body.name,
            description: req.body.description,
            image: basePath,
            userCreated: user
        });

        res.status(201).json({ node })
    }catch (err) {
        res.status(404).json({ err })
    }
}

exports.getAllNodes = async (req, res)=>{
    try {
        const nodes = await Nodes.find();
        res.status(200).json({ nodes })
    }catch (err) {
        res.status(404).json({ err })
    }
}

exports.getOneNodes = async (req, res)=>{
    try {
        const node = await Nodes.findById(req.params.id);
        res.status(200).json({ node })
    }catch (err) {
        res.status(404).json({ err })
    }
}

exports.updateNodes = async (req, res)=>{
    try {
        const node = await Nodes.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })
        res.status(200).json({ node })
    }catch (err) {
        res.status(404).json({ err })
    }
}

exports.deleteNodes = async (req, res)=>{
    const product = await Nodes.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.status(200).json({ status: true, message: "The product is delete" })
        }).catch((err)=>{
            res.status(404).json({ status: false, message: err })
        })
}
