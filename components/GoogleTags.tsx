import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
/** Default GA4 property for this site; override with NEXT_PUBLIC_GA_MEASUREMENT_ID, or set that var to "" to disable. */
const DEFAULT_GA_MEASUREMENT_ID = "G-YJ85SND4WV";
const gaId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== undefined
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined
    : DEFAULT_GA_MEASUREMENT_ID;

/** Default Meta Pixel for this site; override with NEXT_PUBLIC_META_PIXEL_ID, or set that var to "" to disable. */
const DEFAULT_META_PIXEL_ID = "1051059133566371";
const metaPixelId =
  process.env.NEXT_PUBLIC_META_PIXEL_ID !== undefined
    ? process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined
    : DEFAULT_META_PIXEL_ID;

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

export function MetaPixel() {
  if (!metaPixelId) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
    </Script>
  );
}

export function MetaPixelNoScript() {
  if (!metaPixelId) return null;
  return (
    <noscript>
      <img
        height={1}
        width={1}
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
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
