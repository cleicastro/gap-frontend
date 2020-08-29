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

export const alvaraFuncionamento = yup.object().shape({
  atividadePrincipal: yup.string().required().min(5),
  inscricaoMunicipal: yup
    .string()
    .required()
    .matches(/^[\d.?!]+$/, 'O formato da inscrição municipal está incorreto')
    .min(5),
  nomeFantasia: yup.string().required().min(5),
  cep: yup
    .string()
    .required()
    .matches(
      /^[0-9]{2}[0-9]{3}-[0-9]{3}$/,
      'O formato do CEP está incorreto (##.###-###)'
    )
    .min(9)
    .max(9),
  uf: yup.string().required().min(2).max(2),
  cidade: yup.string().required().min(5),
  bairro: yup.string().required().min(5),
  endereco: yup.string().required().min(5),
  numero: yup.string().required()
});
