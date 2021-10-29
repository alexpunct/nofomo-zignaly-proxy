#!/bin/bash
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 741506954419.dkr.ecr.ap-northeast-1.amazonaws.com
NODE_ENV=production docker build -t freqtrade-to-zignaly .
docker tag freqtrade-to-zignaly:latest 741506954419.dkr.ecr.ap-northeast-1.amazonaws.com/freqtrade-to-zignaly:latest
docker push 741506954419.dkr.ecr.ap-northeast-1.amazonaws.com/freqtrade-to-zignaly:latest
