async function publishMessage(model, producer, instance) {
  try {
    const message = model.toMessage(instance);
    await producer.send({
      topic: 'det_medico',
      messages: [{ value: message }]
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  publishMessage
};
