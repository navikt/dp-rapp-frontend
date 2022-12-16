export interface IServerEnvironmentVariables {
  NAV_DEKORATOREN_ENV: "prod" | "dev";
  AUTH_PROVIDER: string;
  NAIS_CLUSTER_NAME: "dev-gcp" | "prod-gcp";
  DP_RAPP_API_URL: string;
}

// @ts-ignore
const serverEnv = process.env as IServerEnvironmentVariables;

export default serverEnv;