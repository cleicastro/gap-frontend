import * as yup from 'yup';
import { ptBR } from './yupValidateLocationPTBR';

yup.setLocale(ptBR);

export const documentSchema = yup.object().shape({
  referencia: yup.string().required(),
  emissaoConvertPT: yup.string().required(),
  vencimento: yup.date().required(),
  // infoAdicionais: yup.string().matches(/^[,;]$/, {
  //   message: 'Contém caracteres incorretos'
  // }),
  receita: yup.string().required(),
  valorPrincipal: yup.number().required().min(5),
  juros: yup.number().required(),
  taxaExp: yup.number().required(),
  valorTotal: yup.number().required().min(5)
});
