import async from 'async';
import { Promise } from 'bluebird';
import { pickBy, identity } from 'lodash';
import axios from './axios';

Promise.promisifyAll(async);

export async function find(params) {
  try {
    const { data } = await axios.get('/screening', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function create(patient, date, flags) {
  try {
    const screening = {
      patient,
      date,
      ...flags
    };
    const { data } = await axios.post('/screening', screening);
    return {
      ...data,
      ...screening
    };
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
    const { data } = await axios.get('/screening', { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function remove(id) {
  try {
    const response = await axios.delete(`/screening/${id}`);
    return response.status === 204;
  } catch (error) {
    throw error;
  }
}

export async function deleteAll(ids) {
  try {
    await async.each(ids, async (id, callback) => {
      remove(id)
        .then(() => callback())
        .catch(error => callback(error));
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export const questions = Object.freeze([
  {
    title: 'Manchas Avermelhadas',
    subtitle:
      'O paciente está apresentando, ou se queixando de manchas avermelhadas na pele (exantema maculopapular eritematoso), que começam no rosto e progridem em direção aos pés?',
    inputName: 'isReddish'
  },
  {
    title: 'Febre',
    subtitle: 'O paciente está apresentando, ou se queixando de febre?',
    inputName: 'isFever'
  },
  {
    title: 'Tosse',
    subtitle: 'O paciente está apresentando, ou se queixando de tosse?',
    inputName: 'isCough'
  },
  {
    title: 'Mal-estar',
    subtitle: 'O paciente está apresentando, ou se queixando de mal-estar?',
    inputName: 'isMalaise'
  },
  {
    title: 'Conjuntivite',
    subtitle: 'O paciente está apresentando, ou se queixando de conjuntivite?',
    inputName: 'isConjuctivitis'
  },
  {
    title: 'Coriza',
    subtitle: 'O paciente está apresentando, ou se queixando de coriza?',
    inputName: 'isCoryza'
  },
  {
    title: 'Perda do apetite',
    subtitle: 'O paciente está apresentando, ou se queixando de perda do apetite?',
    inputName: 'isLossAppetite'
  },
  {
    title: 'Manchas brancas',
    subtitle:
      'O paciente está apresentando, ou se queixando de manchas brancas na parte interna das bochechas (exantema de Koplik)?',
    inputName: 'isWhiteSpots'
  },
  {
    title: 'Diarreia',
    subtitle: 'O paciente está apresentando, ou se queixando de Diarreia?',
    inputName: 'isDiarrehea'
  },
  {
    title: 'Convulsões',
    subtitle: 'O paciente está apresentando, ou se queixando de Convulsões?',
    inputName: 'isConvulsion'
  },
  {
    title: 'Infecção no ouvido',
    subtitle: 'O paciente está apresentando, ou se queixando de Infecção no ouvido?',
    inputName: 'isEarInfection'
  }
]);

export default {
  find,
  findAll,
  create,
  remove,
  deleteAll,
  questions
};
