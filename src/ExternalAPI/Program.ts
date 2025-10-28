import { PROGRAM_ENDPOINT } from './constants';

export const fetchProgramData = async() => {
  try {
    if (!PROGRAM_ENDPOINT) {
      throw new Error('EPG_ENDPOINT is not defined');
    }

    const response = await fetch(PROGRAM_ENDPOINT)
    if (!response.ok) {
      throw new Error(`Unable to connect to ${PROGRAM_ENDPOINT}`);
    }
    return await response.json();
  }
  catch (exception) {
    throw new Error(`Unable to connect to ${PROGRAM_ENDPOINT}`);
  }
}