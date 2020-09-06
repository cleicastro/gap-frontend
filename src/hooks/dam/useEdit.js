import { Dam } from '../../services';

export const useEdit = () => {
  async function setEdit(id, dam) {
    try {
      const response = await Dam.updateDam(id, {
        ...dam,
        id: undefined
      });
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao atualizar este DAM'
      };
    }
  }
  return setEdit;
};
