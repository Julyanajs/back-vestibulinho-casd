if [ ! "$(sudo docker ps -a | grep MongoDBCASD)" ]
then
   sudo docker run --name MongoDBCASD -p 27017:27017 -d mongo
else
   sudo docker container start MongoDBCASD
fi

