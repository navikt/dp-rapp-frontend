import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { JSDOM } from "jsdom";
import { ReactElement } from "react";

type DocumentProps = DocumentInitialProps & {
  dStyles: ReactElement;
  dScripts: ReactElement;
  dHeader: ReactElement;
  dFooter: ReactElement;
}

class MyDocument extends Document<DocumentProps> {
  static createElement(dom: JSDOM, elementId: string): ReactElement {
    return <div dangerouslySetInnerHTML={{ __html: dom.window.document.getElementById(elementId)?.innerHTML || '' }} />
  }

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const originalRenderPage = ctx.renderPage

    const response = await fetch("https://www.dev.nav.no/dekoratoren/");
    const text = await response.text();
    const dom = new JSDOM(text);

    const dStyles = this.createElement(dom, "styles");
    const dScripts = this.createElement(dom, "scripts");
    const dHeader = this.createElement(dom, "header-withmenu");
    const dFooter = this.createElement(dom, "footer-withmenu");

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => (props) => <App {...props} />,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    // return initialProps + additional props
    return {
      ...initialProps,
      dStyles,
      dScripts,
      dHeader,
      dFooter
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.dStyles}
          {this.props.dScripts}
        </Head>
        <body>
        {this.props.dHeader}
        <Main />
        <NextScript />
        {this.props.dFooter}
        </body>
      </Html>
    )
  }
}

export default MyDocument
