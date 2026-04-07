const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(`${BASE_URL}/data`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    onSuccess(await response.json());
  } catch (error) {
    onFail(error);
  }
};

export const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(BASE_URL, {method: 'POST', body});

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    onSuccess();

  } catch(error) {
    onFail(error);
  }
};
