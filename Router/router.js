const router = require('express').Router()

const reqAuth = require("../Middleware/middle")

const {getReq, postReq, postSome, logOut} = require('../Controller/indexcontroller')




router.get("/some", reqAuth, getReq)

router.post("/some", postSome)

router.post("/", postReq)

router.get("/logout", logOut)


module.exports = router