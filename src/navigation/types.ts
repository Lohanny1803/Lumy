export type AuthStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
  VerificarCodigo: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  DisciplinasTab: undefined;
  CalendarioTab: undefined;
  NotificacoesTab: undefined;
  PerfilTab: undefined;
};

export type DisciplinaStackParamList = {
  DisciplinasList: undefined;
  DisciplinaMural: {disciplinaId: string; nome: string; codigo: string; turma: string};
  DisciplinaAtividades: {disciplinaId: string; nome: string; codigo: string; turma: string};
  DisciplinaNotas: {disciplinaId: string; nome: string; codigo: string; turma: string};
  DisciplinaPessoas: {disciplinaId: string; nome: string};
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  DisciplinaStack: undefined;
};
