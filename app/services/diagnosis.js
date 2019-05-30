import axios from './axios';

export async function findByCode(code) {
  try {
    const { data } = await axios.get(`consultation/diagnosis/${code}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function findByDiasease(disease) {
  try {
    const { data } = await axios.post(`consultation/diagnosis/search`, {
      disease
    });
    return data;
  } catch (error) {
    throw error;
  }
}
