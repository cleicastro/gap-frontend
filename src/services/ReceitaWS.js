import api from './api';

const token = process.env.REACT_APP_TOKEN_API_RECEITAWS;
class ReceitaWS {
  getReceitaWS(cnpj, cancelToken) {
    // const token = sessionStorage.getItem('JWT_Token');
    console.log(token);
    return api.get(
      `https://www.receitaws.com.br/v1/cnpj//${cnpj}`,
      {},
      {
        cancelToken,
        headers: {
          Authorization: `Bearer 921a58269c1e1dba45673b20925df4189b6ca04c41c601b48eeb098df04c75b8`,
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  getConsultaGuru(cnpj, cancelToken) {
    return api.get(
      `https://api.nfse.io/LegalEntities/Basicinfo/taxNumber/${cnpj}`,
      {},
      {
        cancelToken
      }
    );
  }

  getConsultaCNPJA(cnpj, cancelToken) {
    return api.get(`https://api.cnpja.com.br/companies/${cnpj}`, {
      cancelToken,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXZlbl9uYW1lIjoiQ2xlaWRlbmlsc29uIiwiZmFtaWx5X25hbWUiOiJDYXN0cm8iLCJuaWNrbmFtZSI6ImNsZWljYXN0cm8udGkiLCJuYW1lIjoiQ2xlaWRlbmlsc29uIENhc3RybyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHanJ4QnNBX1Ywd3A5a1FNRVIzd0diaERHOTlfSGdNMUJrQ1ZxekxNdyIsImxvY2FsZSI6InB0LUJSIiwidXBkYXRlZF9hdCI6IjIwMjAtMDYtMjFUMDU6MDI6MzguMjMxWiIsImVtYWlsIjoiY2xlaWNhc3Ryby50aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jbnBqYS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE5MjA3NzcwMzU0MTM3ODA3NDYiLCJhdWQiOiJITVlKOTg2OUVmY2JhdVVOS1BMSEdSMzUyVXFWczQzNSIsImlhdCI6MTU5MjcxNTc1OCwiZXhwIjoxNTkzMzIwNTU4LCJhdF9oYXNoIjoiaHNrYWsteG9MM1o1cjdmRWdGVkZ0ZyIsIm5vbmNlIjoiY25wamEtd2Vic2l0ZSJ9.aiQiTvmUkn5L_yumek4hv_lEel4UwgBQEbdkiNmBDhU`
      }
    });
  }
}

export default new ReceitaWS();
