import { GetSessionWithOboProvider, makeSession } from "@navikt/dp-auth";
import { idporten } from "@navikt/dp-auth/identity-providers";
import { tokenX, withInMemoryCache } from "@navikt/dp-auth/obo-providers";

const getSession: GetSessionWithOboProvider = makeSession({
  identityProvider: idporten,
  oboProvider: withInMemoryCache(tokenX),
});

export { getSession };
