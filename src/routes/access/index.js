"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const accessController = require("../../controllers/access.controller");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

//signUp
router.post('/shop/signup', asyncHandler(accessController.signUp)); //asyncHandler :catch những handle lỗi thrown ra
router.post('/shop/login', asyncHandler(accessController.login)); 

//authentication
router.use(authentication);
////////////////
router.post('/shop/logout', asyncHandler(accessController.logout));

module.exports = router;
