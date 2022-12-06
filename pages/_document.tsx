import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import getConfig from "next/config";
import {
  Components as DecoratorComponents,
  Env,
  fetchDecoratorReact,
  Props as DecoratorProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";

const { publicRuntimeConfig } = getConfig();
export const dekoratorEnv = publicRuntimeConfig.NAV_DEKORATOREN_ENV as Exclude<
  Env,
  "localhost"
>;

const dekoratorProps: DecoratorProps = {
  env: dekoratorEnv, // TODO: Må komme fra dekoratorEnv, men dekoratorEnv er null når vi henter Dekoratøren, da får vi prod
  redirectToApp: true,
  chatbotVisible: true,
};

class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const Dekorator: DecoratorComponents = await fetchDecoratorReact({
      ...dekoratorProps,
    }).catch((err) => {
      console.error(err);
      const empty = () => <></>;

      return {
        Footer: empty,
        Header: empty,
        Scripts: empty,
        Styles: empty,
      };
    });

    return {
      ...initialProps,
      ...Dekorator,
    };
  }

  render() {
    const { Styles, Scripts, Header, Footer } = this.props;

    return (
      <Html>
        <Head>
          <Styles />
          <Scripts />
        </Head>
        <body>
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
