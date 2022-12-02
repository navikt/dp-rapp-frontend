# dp-rapp-frontend
Frontend for ny rapporteringsløsning dagpenger (tidligere meldekort)

For å få @navikt/nav-dekoratoren-moduler-avhengigheten må man opprette en .npmrc-fil i hjemmemappen sin med følgende innhold:
```
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=%PAT%
```
hvor %PAT% er Personal Access Token fra GitHub med (minst) read:packages  
Hvordan kan man opprette PAT?  
Se https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
