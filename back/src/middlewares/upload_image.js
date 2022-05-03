import { Router } from "express";
import { url } from "url";
var AWS = require('aws-sdk');

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_URL = 'bucket-5ialfb.s3.ap-northeast-2.amazonaws.com'

const myConfig = new AWS.Config();
myConfig.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.BUCKET_ACCESS_KEYID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY
})

const bucketRouter = Router()

bucketRouter.get('/imgTest', async (req, res, next)=> {
    //const {pathname} = url.parse(req.url, true)
    try{
        const { icon } = req.body
        return res.redirect(`https://${BUCKET_URL}/icon/${icon}`)
    } catch( error) {
        next(error)
    }
    
})

export {bucketRouter}