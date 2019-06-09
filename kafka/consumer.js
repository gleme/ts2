const { Kafka } = require('kafkajs');
const scheduler = require('node-schedule');

const kafka = new Kafka({
  clientId: 'ts2-consumer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'bb-group' });

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: 'test',
    messages: [{ value: 'Hello KafkaJS user!' }]
  });

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: 'test', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });

  //   consumer.disconnect();
  producer.disconnect();
};

run().catch(console.error);
