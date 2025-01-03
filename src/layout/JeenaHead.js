import Head from "next/head";
import Script from 'next/script';

const JeenaHead = () => {
  const version = "1.0.1";
  return (
    <Head>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="description" content="" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />{" "}
      <meta
        name="keywords"
        content="Transferencias Brasper , Como trasferir , Dinero Brasileño , Soles Peruanos , Tranferias de paises"
      />

      {/* Cross-Origin Headers */}
      <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
      <meta httpEquiv="Cross-Origin-Embedder-Policy" content="credentialless" />

      {/* Title */}
      <title>braspertransferencias</title>
      {/* Favicon Icon */}
      <link
        rel="shortcut icon"
        href="assets/images/favicon.ico"
        type="image/x-icon"
      />
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* Flaticon */}
      <link rel="stylesheet" href="/assets/css/flaticon.min.css" />
      {/* Font Awesome */}
      <link rel="stylesheet" href="/assets/css/fontawesome-5.14.0.min.css" />
      {/* Bootstrap */}
      <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      {/* Magnific Popup */}
      <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
      {/* Nice Select */}
      <link rel="stylesheet" href="/assets/css/nice-select.min.css" />
      {/* Animate */}
      <link rel="stylesheet" href="/assets/css/animate.min.css" />
      {/* Slick */}
      <link rel="stylesheet" href="/assets/css/slick.min.css" />
      {/* Main Style */}
      <link rel="stylesheet" href={`/assets/css/style.css?v=${version}`} />
      {/* admin Style */}
      <link rel="stylesheet" href="/assets/css/admin.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/iofrm-style.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/iofrm-theme22.css"
      />
      {/* Google Tag Manager */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-N0X1HJHVZS"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N0X1HJHVZS');
          `,
        }}
      />
      {/* google utentificacion */}
      <script
        src="https://accounts.google.com/gsi/client"
        async
        defer
      />
      {/* <script
        src="https://accounts.google.com/gsi/intermediate"
        async
        defer
      ></script> */}
    </Head>
  );
};

export default JeenaHead;
