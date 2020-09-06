import { Contribuinte } from '../../services';

const useSaveContribuinte = () => {
  async function setSave(contribuinte) {
    try {
      const response = await Contribuinte.salveContribuinte({
        ...contribuinte
      });
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao inserir este contribuinte'
      };
    }
  }
  return setSave;
};

export default useSaveContribuinte;
