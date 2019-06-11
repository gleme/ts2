import axios from './axios';

export async function find(params) {
  try {
    const { data } = await axios.get('/patient', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function findByCPF(cpf) {
  try {
    const { data } = await axios.get(`/patient/${cpf}`);
    return { data };
  } catch (error) {
    throw error;
  }
}

export async function exists(cpf) {
  try {
    const response = await axios.get(`/patient/${cpf}`);
    return response.status == 200;
  } catch (error) {
    throw error;
  }
}

export default {
  find,
  findByCPF,
  exists
};
