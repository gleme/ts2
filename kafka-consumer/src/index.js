const { Kafka } = require('kafkajs');
const mysql = require('mysql');
const moment = require('moment');

const { brokers, clientId, groupId } = require('./config/kafka.config');
const mysqlConfig = require('./config/mysql.config');

const kafka = new Kafka({
  brokers,
  clientId
});

const consumer = kafka.consumer({ groupId });

const run = async () => {
  try {
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: 'det_medico', fromBeginning: true });
    console.log('started consuming');
    const connection = await mysql.createConnection(mysqlConfig);
    console.log('mysql');
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const schema = JSON.parse(message.value.toString());
          const { type } = schema;
          if (type === 'medicalconsultation') {
            await insertMedicalConsultation(connection, schema);
          }
          console.log('inserted on database');
        } catch (error) {
          console.log('error to insert on database', error);
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

async function insertMedicalConsultation(connection, message) {
  const {
    cns_protocol,
    cns_date,
    cns_comments,
    cns_createdAt,
    cns_updatedAt,
    cns_pat_cpf,
    cns_phy_cpf
  } = message;
  const date = moment(moment(cns_date).format('YYYY-MM-DD HH:mm:ss')).toDate();
  const createdDate = moment(cns_createdAt).toDate();
  const updatedDate = moment(cns_updatedAt).toDate();

  try {
    const result = await connection.query(
      `
      INSERT INTO medicalconsultation(cns_protocol, cns_date, cns_comments, cns_createdAt, cns_updatedAt, cns_pat_cpf, cns_phy_cpf) 
      VALUES (?,?,?,?,?,?,?)`,
      [
        cns_protocol,
        date,
        cns_comments,
        createdDate,
        updatedDate,
        cns_pat_cpf,
        cns_phy_cpf
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

run().catch(console.error);
