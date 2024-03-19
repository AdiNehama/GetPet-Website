const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, '../public/images');
        console.log('Uploading file to: ' + filePath);

        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The Files API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


//schemas :


/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       required:
 *         - file
 *       properties:
 *         file:
 *           type: string
 *           description: The file
 *       example:
 *         file: 'string'
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Tokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The JWT access token
 *         refreshToken:
 *           type: string
 *           description: The JWT refresh token
 *       example:
 *         accessToken: '123cd123x1xx1'
 *         refreshToken: '134r2134cr1x3c'
 */






/**
 * @swagger
 * /files:
 *   post:
 *     summary: file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/File'
 *     responses:
 *       200:
 *         description:  files in the web
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */

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


module.exports = router;