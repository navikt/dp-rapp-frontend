import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import {
  Components as DecoratorComponents,
  Env,
  fetchDecoratorReact,
  Props as DecoratorProps,
} from "@navikt/nav-dekoratoren-moduler/ssr";

export default class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const dekoratorProps: DecoratorProps = {
      env: process.env.NAV_DEKORATOREN_ENV as Env,
      chatbotVisible: true,
      availableLanguages: [
        {
          locale: "nb",
          handleInApp: true,
        },
        {
          locale: "en",
          handleInApp: true,
        },
      ],
      language: "nb",
    };
    //t
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
