const { Nfsa } = require('../../services');

export const useSave = () => {
  async function setSave(items, nfsa, dam, cancelToken) {
    try {
      const response = await Nfsa.saveNFSA(items, nfsa, dam, cancelToken);
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
