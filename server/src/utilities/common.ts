export function getDataPath(): string {
  const environment = process.env.environment;
  if (!environment) {
    throw Error('Environment is not set'); // TODO: define proper errors
  }
  switch (environment) {
    case 'production':
      return '../../data/';
    case 'development':
    case 'testing':
      return '../../test/data/';
    default:
      throw Error(`${environment} is invalid environment configuration`);
  }
}
