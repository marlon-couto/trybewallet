// Faz a requisição à API e retorna um objeto com os dados das moedas
const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export default fetchApi;
