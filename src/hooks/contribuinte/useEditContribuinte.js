import { Contribuinte } from '../../services';

const useEditContribuinte = () => {
  async function setSave(id, contribuinte) {
    try {
      const response = await Contribuinte.updateContribuinte(id, contribuinte);
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao editar este contribuinte'
      };
    }
  }
  return setSave;
};

export default useEditContribuinte;
