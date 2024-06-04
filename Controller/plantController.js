const plants = require('../Model/plantModel')

exports.addPlants = async (req, res) => {

    const userId = req.payload
    const { plantName, plantType, plantWater, plantMRP, plantMaintanance, description, quantity, status } = req.body
    const image = req.file.filename
    console.log(plantName, plantType, plantWater, plantMRP, plantMaintanance, description, quantity, status, userId, image)
    res.status(200).json("Success")

    try {
        const existingPlant = await plants.findOne({ plantName })
        if (existingPlant) {
            res.status(406).json("Plant is already Uploaded")
        }
        else {
            const newplant = new plants({
                plantName, plantType, plantWater, plantMRP, plantMaintanance, description, quantity, status, image, userId
            })
            await newplant.save()
            res.status(200).json(newplant)
        }
    }
    catch (err) {
        console.log(err)
        res.status(401).json(err)
    }
}

exports.allPlantsA = async (re, res) => {
    console.log("inside all Plants");
    try {
        const result = await plants.find()
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Plants Available")
        }
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }
}

exports.allPlantsU = async (re, res) => {
    console.log("inside user side all Plants");
    try {
        const result = await plants.find()
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Plants Available")
        }
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }
}

// edit plant
exports.editPlant = async (req, res) => {
    const { plantName, plantType, image, plantWater, plantMRP, plantMaintanance, description, quantity, status } = req.body
    const userId = req.payload
    const plantimage = req.file ? req.file.filename : image
    console.log(req.file.filename)
    const { pid } = req.params
    try{
        const updatePlants = await plants.findByIdAndUpdate({ _id: pid },
            { plantName, plantType,image:plantimage, plantWater, plantMRP, plantMaintanance, description, quantity, status, userId },
            { new: true })
        await updatePlants.save()
        res.status(200).json(updatePlants)
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
    

}