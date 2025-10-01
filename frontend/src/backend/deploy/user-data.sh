#!/bin/bash
# Example user-data to bootstrap backend on Amazon Linux 2
yum update -y
curl -sL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs git
cd /home/ec2-user
# clone repo (replace with your repo url)
# git clone https://github.com/yourusername/netflix-clone.git
# cd netflix-clone/backend
# npm install
# copy env variables using instance metadata or SSM
# npm start &


# Minimal example to run a simple express server
cat > /home/ec2-user/start-backend.sh <<'EOF'
#!/bin/bash
cd /home/ec2-user/netflix-clone/backend
npm install
nohup node server.js > backend.log 2>&1 &
EOF
chmod +x /home/ec2-user/start-backend.sh
# If repo is present, run
# /home/ec2-user/start-backend.sh
