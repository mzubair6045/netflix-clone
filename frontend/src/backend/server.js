require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 4000;
const BUCKET = process.env.BUCKET_NAME;
const REGION = process.env.AWS_REGION || 'us-east-1';
const EXPIRES = parseInt(process.env.PRESIGN_EXPIRES || '300',10);


AWS.config.update({ region: REGION });
const s3 = new AWS.S3();


// Serve frontend static when built (if you put build in frontend/build and copy to backend/public)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));


// Simple list of video objects. In production, you would list objects or use a DB.
// For demo, we assume the S3 objects are in root with keys:
const sampleVideos = [
{ key: 'sample1.mp4', title: 'Sample Video 1' },
{ key: 'sample2.mp4', title: 'Sample Video 2' }
];


app.get('/api/videos', (req, res)=>{
// In real app: listObjectsV2 on S3 to generate this list dynamically
res.json(sampleVideos);
});


app.get('/api/presign', async (req, res)=>{
const key = req.query.key;
if(!key) return res.status(400).json({ error: 'missing key' });


const params = { Bucket: BUCKET, Key: key, Expires: EXPIRES };
try{
const url = s3.getSignedUrl('getObject', params);
res.json({ url });
}catch(err){
console.error(err);
res.status(500).json({ error: 'failed to generate url' });
}
});


// fallback to serve frontend
app.get('*', (req,res)=>{
res.sendFile(path.join(__dirname,'..','frontend','build','index.html'));
});


app.listen(PORT, ()=>{console.log(`Backend started on ${PORT}`)});
