const brokers = process.env.KAFKA_BROKERS;
const clientId = process.env.KAFKA_PROCESS_CLIEND_ID;

module.exports = {
  brokers,
  clientId
};
