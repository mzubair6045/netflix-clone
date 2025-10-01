# Netflix-clone


Minimal Netflix-like video streaming app (demo). Frontend (React) served from the backend or static hosting. Videos live in S3. Backend issues presigned URLs for streaming.


## How to run locally (dev)


Requirements: Node 18+, npm, AWS credentials for S3.


1. Create an S3 bucket and upload MP4 files. Note the bucket name.
2. Create IAM credentials with `s3:GetObject` permission on the bucket (policy provided in deploy/aws-iam-policy.json).
3. Copy `backend/.env.example` to `backend/.env` and set `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `BUCKET_NAME`.
4. From repo root, run:


```bash
# install
cd backend
npm install
cd ../frontend
npm install


# start both (in separate terminals)
cd backend
npm start


cd frontend
npm start
