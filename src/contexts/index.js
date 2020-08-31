export { default as UserProvider } from './UserContext';
export { UserContext } from './UserContext';

export { default as ContribuinteProvier } from './ContribuinteContext';
export { ContribuinteContext } from './ContribuinteContext';

export { default as DamProvider } from './DamContext';
export { DamContext, damContextReducer, ACTIONS } from './DamContext';

export { default as NfsaProvider } from './NfsaContext';
export {
  NfsaContext,
  nfsaContextReducer,
  ACTIONS as ACTIONS_NFSA
} from './NfsaContext';

export { default as AlvaraFuncionamentoProvider } from './AlvaraFuncionamentoContext';
export {
  AlvaraFuncionamentoContext,
  alvaraFuncionamentoContextReducer,
  ACTIONS as ACTIONS_ALVARA
} from './AlvaraFuncionamentoContext';
