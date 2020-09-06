import { AlvaraFuncionamento } from '../../services';

export const useEdit = () => {
  async function setEdit(id, alvara) {
    try {
      const response = await AlvaraFuncionamento.updateAlvara(id, {
        ...alvara,
        id: undefined
      });
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao atualizar este Alvará'
      };
    }
  }
  return setEdit;
};
