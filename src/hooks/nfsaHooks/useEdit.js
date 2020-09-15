import { Nfsa } from '../../services';

export const useEdit = () => {
  async function setEdit(items, nfsa, dam, id) {
    try {
      const response = await Nfsa.editNFSA(items, nfsa, dam, id);
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao atualizar esta NFSA'
      };
    }
  }
  return setEdit;
};
