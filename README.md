# CMPE-273-twitter-prototype
This a prototype of Twitter.com built using MERN stack. The prototype is built as a lab requirement for Enterprise Distributed Systems (CMPE - 273) class at San Jose State University, under professor Simon Shim.

### Technologies used
* Node.js
* React.js
* Express.js
* MongoDB
* MySQL
* Kafka Messaging Queues
* Redis Cache
* AWS:
  * EC2
  * ELB
  * RDS
  * Elascticache
* Testing:
  * JMeter
  * Mocha
  * Enzyme

## Features Implemented
### User
* Register
* Login
* Update details
* Follow/Unfollow users
* Deactivate account

### Tweets
* Post a tweet
* Like/Unlike a tweet
* Reply to a tweet
* Retweet a tweet
* Bookmark a tweet
* Update tweet feed
* Delete a tweet

### Lists
* Create a list
* Subscribe to/Unsubscribe from a list

### Messaging
* Send messages to another user
* Receive messages from another user

### Search
* General Search
* Topic Search
* User handle Search

### Analytics
* Tweets with most views
* Retweets with most views
* Tweets with most likes
* Number of tweets
* Profile views for current user

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Node.js installed on your machine.

To install Node.js on Mac:
```
brew install nodejs
```

To install Node.js on Linux:
```
apt-get install nodejs
```

### Installation

Clone the contents of the Git repository to your local:
```
git clone https://github.com/savyasachi16/Grubhub-Prototype.git
```

Go into the client directory and run the following command:
```
npm install

```
Go into the middleware directory and run the following command:
```
npm install
```
Go into the server directory and run the following command:
```
npm install
```

### Running the Application
Before starting the application, navigate into your Kafka directory and run the following command to initialize Zookeeper:
```
bin/zookeeper-server-start.sh config/zookeeper.properties
```
Initialize Kafka service with the following command:
```
bin/kafka-server-start.sh config/server.properties
```
Copy the two shell scripts createTwitterTopics.sh and deleteTwitterTopics.sh into your Kafka directory.
Create Kafka topics with the following command:
```
./createTwitterTopics.sh
```

To run the client, go into the client directory and run the following command:
```
npm start
```
To run the middleware, go into the client directory and run the following command:
```
npm start
```
To run the server, go into the server directory and run the following command:
```
npm start
```

To use the application, visit the following url from your browser:
http://localhost:3001/

## License

This project is licensed under the MIT License.
