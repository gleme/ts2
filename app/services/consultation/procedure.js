import axios from '../axios';

export async function find(params) {
  try {
    const { data } = await axios.get('/consultation/procedure', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function findAll() {
  try {
    const { data } = await axios.get('/consultation/procedure');
    return data;
  } catch (error) {
    throw error;
  }
}

export default {
  find,
  findAll
};
