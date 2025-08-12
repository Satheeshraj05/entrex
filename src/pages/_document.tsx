import * as React from 'react';
import Document, { 
  Html, 
  Head, 
  Main, 
  NextScript, 
  DocumentContext, 
  DocumentInitialProps,
  DocumentProps 
} from 'next/document';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../theme/createEmotionCache';
import { EmotionCache } from '@emotion/cache';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: React.ReactNode[];
}

// Extend the AppProps to include emotionCache
type AppPropsWithEmotion = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextComponentType & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
};

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & { emotionStyleTags: React.ReactNode[] }> => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<AppPropsWithEmotion>) => 
        function EnhancedApp(props: AppPropsWithEmotion) {
          return <App {...props} emotionCache={cache} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
