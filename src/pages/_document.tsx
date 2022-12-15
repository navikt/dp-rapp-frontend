import Document, { DocumentContext, Head, Html, Main, NextScript, } from "next/document";
import {
  Components as DecoratorComponents,
  Env,
  fetchDecoratorReact,
  Props as DecoratorProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";

const { NAV_DEKORATOREN_ENV } = process.env
const env = {
  navDekoratorenEnv: (NAV_DEKORATOREN_ENV || "prod") as Env,
  navDekoratorenEnv2: NAV_DEKORATOREN_ENV,
}

export default class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    console.log(NAV_DEKORATOREN_ENV);
    console.log(env.navDekoratorenEnv);
    console.log(env.navDekoratorenEnv2);
    const dekoratorProps: DecoratorProps = {
      env: env.navDekoratorenEnv,
      chatbotVisible: true,
    };

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
