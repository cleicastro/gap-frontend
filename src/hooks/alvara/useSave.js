const { AlvaraFuncionamento } = require('../../services');

export const useSave = () => {
  async function setSave(alvara) {
    try {
      const response = await AlvaraFuncionamento.salvarAlvara({
        ...alvara
      });
      return response;
    } catch (error) {
      return {
        error,
        message: 'Falha ao inserir este Alvará'
      };
    }
  }
  return setSave;
};
