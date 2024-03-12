const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file?.filename;
    try {
        // await Images.create({ image: imageName });
        res.status(200).json({ imageName });

    } catch (error) {
        res.status(500).json({ message: "Couldn't upload image" });

    }
});

router.get('/', async (req, res) => {
    try {
        Images.find({})
            .then(data => {
                res.send({ status: 'ok', data: data });
            }
            )

    } catch (error) {
        res.json({ status: error });
    }

})



module.exports = router;