const clientId = process.env.KAFKA_CLIENTID;
const brokers = process.env.KAFKA_BROKERS;
const groupId = process.env.KAFKA_GROUPID;

module.exports = {
  clientId,
  brokers: brokers.split(','),
  groupId
};
