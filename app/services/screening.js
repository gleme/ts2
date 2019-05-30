import axios from './axios';

export async function findQuestions() {
  try {
    const { data } = await axios.get('');
    return data;
  } catch (error) {
    throw error;
  }
}
