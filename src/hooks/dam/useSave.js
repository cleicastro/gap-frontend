const { Dam } = require('../../services');

export const useSave = () => {
  async function setSave(dam) {
    try {
      const response = await Dam.salvarDam({
        ...dam
      });
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao inserir este DAM'
      };
    }
  }
  return setSave;
};
