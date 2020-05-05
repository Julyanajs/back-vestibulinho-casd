[ ! "$(sudo docker ps -a | grep MongoDBCASD)" ] && sudo docker run --name MongoDBCASD -p 27017:27017 -d mongo
