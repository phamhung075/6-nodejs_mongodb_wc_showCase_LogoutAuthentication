"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const RoleShop = require("../auth/constant");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, UnauthorizedError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");




class AccessService {

  static logout = async (keyStore) => {
    const delKey = KeyTokenService.removeKeyById(keyStore._id);
    console.log (`delKey::`, {delKey});
    return delKey
  }
  /* LOGIN
    1-Check email in database
    2-Match password
    3-Create Access Token and Refresh Token ans save
    4-Generate tokens
    5-Get data return login
  */

  static login = async ( { email, password, refreshToken = null}) => {

    //1.
    const foundShop = await findByEmail({ email });
    if(!foundShop) throw new BadRequestError('Shop not registered');
    //console.log("account email ::", email);
    //2.
    const match = await bcrypt.compare(password, foundShop.password);
    //console.log("match password ::", match, password, foundShop.password);
    if(!match) throw new UnauthorizedError('Authentication error');
    //3.
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    console.log(`---`);
    //4.
    const { _id: userId } = foundShop
    const tokens = await createTokenPair({userId, email }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey, publicKey,
      userId: userId
    })
    //5.
    return {
      metadata: {
        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop}),
        tokens
      }
    }
  }
    
  

  static signUp = async ({ name, email, password }) => {
    // a // -> test error 500
    
    // step1: check email exist
    const hodelShop = await shopModel.findOne({ email }).lean(); //lean make query faster, less size , return object javascript 
    if (hodelShop) {
        throw new BadRequestError('Error: Shop already registered')
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });
    // step2: if newShop created successful refresh token
    if (newShop) {

      // created privateKey, publicKey lv0

      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      });

      
      if (!keyStore) {
        throw new BadRequestError('Error: keyStore error')
      }


      // created token pair
      const tokens = await createTokenPair({userId: newShop._id, email }, publicKey, privateKey);
      
      if(!tokens){
        throw new BadRequestError('Error: tokens create error')
      }
      console.log(`Created Token Success::`, tokens);
      return {
        metadata: {
          shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}), //lowDash pick
          tokens
        }
      }
    }

    return {
      metadata: null,
    }
  } 
}


module.exports = AccessService;
