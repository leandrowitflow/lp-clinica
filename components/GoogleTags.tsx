import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
/** Default GA4 property for this site; override with NEXT_PUBLIC_GA_MEASUREMENT_ID, or set that var to "" to disable. */
const DEFAULT_GA_MEASUREMENT_ID = "G-YJ85SND4WV";
const gaId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== undefined
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined
    : DEFAULT_GA_MEASUREMENT_ID;

export function GoogleTags() {
  if (gtmId) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    );
  }

  if (gaId) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
        </Script>
      </>
    );
  }

  return null;
}

export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        className="hidden"
      />
    </noscript>
  );
}
