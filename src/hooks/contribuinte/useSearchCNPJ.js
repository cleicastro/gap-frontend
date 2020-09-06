import { ReceitaWS } from '../../services';

const useSearchCNPJ = () => {
  async function setSearchCNPJ(cnpj, token) {
    try {
      const response = await ReceitaWS.getConsultaCNPJA(cnpj, token);
      return response;
    } catch (error) {
      return {
        error,
        message:
          'Não foi possível consultar este CNPJ, tente novamente mais tarde!'
      };
    }
  }
  return setSearchCNPJ;
};

export default useSearchCNPJ;
