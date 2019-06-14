import { pickBy, identity } from 'lodash';
import axios from '../axios';

export async function create(patientCpf, physicianCpf, prescription, procedures, diagnosis, date) {
  try {
    const consultation = {
      patient: {
        cpf: patientCpf
      },
      physician: {
        cpf: physicianCpf
      },
      prescription,
      procedures,
      diagnosis,
      date: date.toISOString()
    };
    const { data } = await axios.post('/consultation', consultation);
    return { protocol: data.protocol, ...consultation };
  } catch (error) {
    throw error;
  }
}

export async function findAll(expand) {
  try {
    const params = pickBy(
      {
        expand: expand ? `${expand.join(',')}` : undefined
      },
      identity
    );
    const { data } = await axios.get('/consultation', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function find(params) {
  try {
    const { data } = await axios.get('/consultation', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function remove(id) {
  try {
    const response = await axios.delete(`/consultation/${id}`);
    return response.status === 204;
  } catch (error) {
    throw error;
  }
}

export async function deleteAll(ids) {
  try {
  } catch (error) {}
}

export default {
  create,
  findAll,
  find
};
