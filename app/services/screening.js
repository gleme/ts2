import axios from './axios';

export async function findQuestions() {
  try {
    const { data } = await axios.get('');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createScreening(screening) {
  try {
    const { data } = await axios.post('/screening', screening);
    return data;
  } catch (error) {}
}
