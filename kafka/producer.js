const { Kafka } = require('kafkajs');
const scheduler = require('node-schedule');

const topic = 'det-medico';

const kafka = new Kafka({
  clientId: 'ts2-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
  try {
    await producer.connect();

    scheduler.scheduleJob('15 * * * * *', async fireDate => {
      const message = `${fireDate.toISOString()} - message`;
      await producer.send({
        topic: topic,
        messages: [{ value: message }]
      });
      console.log(`${message} sent!`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
