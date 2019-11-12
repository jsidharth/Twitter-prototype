#!/bin/sh

#Response Topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic

#User Topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userTopic

#End of Script
echo 'Create Topics Script Execution Completed'
