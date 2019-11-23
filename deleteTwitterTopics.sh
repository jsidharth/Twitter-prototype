#!/bin/sh

#Response Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic response_topic

#User Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic userTopic

#Tweet Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic tweetTopic

#
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic searchTopic

#List Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic listTopic

#Message Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic messageTopic

#Analytics Topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic analyticTopic

#Delete Log files
echo 'Deleting log files...'
rm -r /Users/savya/Downloads/kafka_2.11-1.1.0/F:Kafkakafka_2.11-1.1.0kafka-logs
rm -r /tmp/zookeeper

echo 'Deleted log files'

#End of Script
echo 'Delete Topics Script Execution Completed'
