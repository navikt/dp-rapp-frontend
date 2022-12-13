# dp-rapp-frontend
Frontend for ny rapporteringsløsning dagpenger (tidligere meldekort)

## Bygg
For å få @navikt/nav-dekoratoren-moduler-avhengigheten må man opprette en .npmrc-fil i hjemmemappen sin med følgende innhold:
```
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=%PAT%
```
hvor %PAT% er Personal Access Token fra GitHub med (minst) read:packages  
Hvordan kan man opprette PAT?  
Se https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

Bruk:
```
npm install --legacy-peer-deps
```
Vi trenger "--legacy-peer-deps" fordi én av avhengigheter (dp-auth) har
```
"peerDependencies": {
  "next": "^12.0.0"
}
```

## Lokal kjøring
I prosjektet sin root opprett en fil med navn .env.development som inneholder:
```
NAV_DEKORATOREN_ENV=dev
AUTH_PROVIDER=local
NAIS_CLUSTER_NAME=dev-gcp
DP_RAPP_API_URL=https://dp-rapp-api.dev.intern.nav.no

```

DP_RAPP_API_URL skal peke mot den DP RAPP API i det miljø du vil bruke.
Dette kan peke mot dev-gcp eller API som kjører lokalt.

Deretter:
```
npm run dev
```

Appen er tilgjengelig på http://localhost:3000/

Hvis man trenger å bygge og kjøre Docker image lokalt, må man kopiere (midlertidig!) .npmrc-filen til prosjektets rot
og kjøre:
```
docker build -t dp-rapp-frontend .
docker run -p 8080:8080 --name dp-rapp-frontend dp-rapp-frontend
```
Da er appen tilgjengelig på http://localhost:8080/