const router = require('express').Router()

const {getReq, postReq} = require('../Controller/indexcontroller')




router.get("/", getReq)

router.post("/", postReq)


module.exports = router