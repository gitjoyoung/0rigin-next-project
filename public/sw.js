if (!self.define) {
   let e,
      a = {}
   const i = (i, c) => (
      (i = new URL(i + '.js', c).href),
      a[i] ||
         new Promise((a) => {
            if ('document' in self) {
               const e = document.createElement('script')
               ;((e.src = i), (e.onload = a), document.head.appendChild(e))
            } else ((e = i), importScripts(i), a())
         }).then(() => {
            let e = a[i]
            if (!e) throw new Error(`Module ${i} didn’t register its module`)
            return e
         })
   )
   self.define = (c, s) => {
      const t =
         e ||
         ('document' in self ? document.currentScript.src : '') ||
         location.href
      if (a[t]) return
      let f = {}
      const n = (e) => i(e, t),
         d = { module: { uri: t }, exports: f, require: n }
      a[t] = Promise.all(c.map((e) => d[e] || n(e))).then((e) => (s(...e), f))
   }
}
define(['./workbox-ee5ddb69'], function (e) {
   'use strict'
   ;(importScripts(),
      self.skipWaiting(),
      e.clientsClaim(),
      e.precacheAndRoute(
         [
            {
               url: '/_next/app-build-manifest.json',
               revision: '8a66fbb2c35799da2d116d30cedf1820',
            },
            {
               url: '/_next/static/FVon9mWq2Up_xLhO5-OTg/_buildManifest.js',
               revision: '47af4456cf70e93d8205cda2b20d10b8',
            },
            {
               url: '/_next/static/FVon9mWq2Up_xLhO5-OTg/_ssgManifest.js',
               revision: 'b6652df95db52feb4daf4eca35380933',
            },
            {
               url: '/_next/static/chunks/1307-bf36cfa47d59982a.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/2032-be3f7948a076e648.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/2726-daae1b752e43cc36.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/2847-bf8c251d30f3accd.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/3871-b450e94c2db14380.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/4172-e5e03c28bbf9af81.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/4184-58538f0a2fe61b94.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/4344-de10997f0090c483.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/4624-aa648da5aeeb4a0a.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/4873-9f0da6b2c05b6138.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5022-8d0a79082648d62f.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5202-7020268f2e28a033.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5269-6af83be06fff1bdd.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/533-23f56cbf69d193f6.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5436-39bdb3e2304e957c.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5507-b272a70d9fd2d1e3.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/5701-1dbd780f7bb12065.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/6002-95463cae688cb3e9.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/6104-23ac67fbbc212996.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/6561-574976b672254794.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/6724-ad2a84ed8da64f73.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/6726-f9cc0b44b3ff80fe.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/692-caf3e83927c14c67.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/7367-28e7fcef5c934ce3.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/7664-b1948409296a4b13.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/826-11856aced43adef4.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/849-236d0e8750b07b7c.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/9117-bc1022efe6d8814c.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/936-492aca2bedb62160.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/9560-b89bdfeaddd870b7.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/9570-3b7b1920780f1cde.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/callback/route-e1e0bac60c346a4b.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/forget/password/page-be85c2f734e86dcb.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/login/page-819e9837091e4fab.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/reset/password/page-6da317796d3e4c0e.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/sign/form/layout-f14f3c30aa7ba633.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/sign/form/page-1c89ca9d6a082d9d.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/sign/layout-5c090339605b40ad.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/sign/page-32248031c3f5fe87.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(auth)/sign/welcome/page-9b7547149d84430e.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/%5BpostId%5D/page-c5552c56a98727bb.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/create/page-bd56a3d014a3845b.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/layout-3e907044122c6e65.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/loading-530bfc26d3a13abe.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/page-201cfe592d45b3a0.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/%5Bcategory%5D/update/%5Bid%5D/page-0468bb7c8cf2c1ce.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/board/page-15241d4f6af24ea1.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/dashboard/page-78334111e9283954.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/quiz/%5Bid%5D/page-0bf3c3e340a92a40.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/quiz/create/page-86ae69a0e5beee32.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/quiz/loading-f51d44fbfc3ea79d.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/quiz/page-0588daaecbf26081.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/search/%5B...slug%5D/layout-d7d6d9631ec80c28.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/search/%5B...slug%5D/page-2a2faa4193b05bcd.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/utils/image-converter/page-b0fae788848b2952.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(content)/utils/page-767ca57e5ca0cae3.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(info)/help/page-fddba15da4cd24f7.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(info)/inquiry/page-404825a8ab0302c0.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(info)/introduce/layout-970fdeb4077788cb.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(info)/introduce/page-a03ac00483687a34.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(info)/sitemap/page-b84ea9deea6de733.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/(user)/my-page/page-faf9db5e1bddd438.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/_not-found/page-62161999d381d6ab.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/google-profile/route-c4c487af22ef9501.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/login/route-e9dde90e180c6c13.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/logout/route-3ac60bf669fd4b74.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/signout/route-aa9edc7229d61892.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/signup-status/route-e265c9df8311b7a6.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/signup/route-27d99419ab49fb8e.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/auth/user/route-72be4dfd0a8dcd3e.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/comment/%5Bid%5D/route-aa4611bd621d1afe.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/comment/route-bca7ed0495f95e14.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/post/%5Bid%5D/auth-check/route-f8aa7c22e69c87a8.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/post/%5Bid%5D/like/route-51638504101fa74c.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/post/%5Bid%5D/route-7f933dd776b31737.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/post/%5Bid%5D/verify-password/route-9415ce12c0e63c42.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/post/route-68dcab887e313075.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/profile/route-de159d187f9c0ba1.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/quiz/question/route-3d9c57671fe9dac7.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/quiz/route-050d8a5392d36696.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/stats/route-8a2cf6f50f3a95d5.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/user/comments/route-e326c32560ace0aa.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/api/user/posts/route-91bebefe991c125d.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/global-error-4ca068e7e7465117.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/layout-50fc2318ce5cdd12.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/loading-a10e9d90d6d399e3.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/not-found-ae9eccf2ce4f57d5.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/app/page-ceb14baf32e29c4d.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/c99cc0c1-8bb8de5a76c234a5.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/framework-395897f622eb8e2f.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/main-6365b934ab48ed93.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/main-app-f9e0dfade4cac15c.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/pages/_app-0fa440c2385ab220.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/pages/_error-ff314dff8ae8fad5.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
               revision: '846118c33b2c0e922d7b3a7676f81f6f',
            },
            {
               url: '/_next/static/chunks/webpack-0eb48694142bb613.js',
               revision: 'FVon9mWq2Up_xLhO5-OTg',
            },
            {
               url: '/_next/static/css/0a2e9ffcbb214f84.css',
               revision: '0a2e9ffcbb214f84',
            },
            {
               url: '/_next/static/css/0f1baddbbe5b2078.css',
               revision: '0f1baddbbe5b2078',
            },
            {
               url: '/_next/static/css/86fe23903d3af796.css',
               revision: '86fe23903d3af796',
            },
            {
               url: '/_next/static/css/efc45a9273345f0c.css',
               revision: 'efc45a9273345f0c',
            },
            {
               url: '/_next/static/media/020c46951bd94c9e-s.woff2',
               revision: 'a0ab1f3ba9c712976ecdacfb6c68bd95',
            },
            {
               url: '/_next/static/media/03dbbbe0b92fa1e9-s.woff2',
               revision: '8544345c08163a3458d3be95784b103f',
            },
            {
               url: '/_next/static/media/067c207e28daa02d-s.woff2',
               revision: '2e481192f164c65219517f1afb0bef57',
            },
            {
               url: '/_next/static/media/072179cf16506c56-s.woff2',
               revision: '1ca29a37740eb4de8d6e4d8d3f6251bf',
            },
            {
               url: '/_next/static/media/0a54d98be049381e-s.woff2',
               revision: '7e8ec3bfe7eed1badc8e8847514d4eb4',
            },
            {
               url: '/_next/static/media/11ca998efae3cd94-s.woff2',
               revision: '88041efa145d298d3d88e7c3fe50a493',
            },
            {
               url: '/_next/static/media/1ada00f9c4662520-s.woff2',
               revision: 'e9ecdcae8a8edc1a39c2f30a549e51ad',
            },
            {
               url: '/_next/static/media/1bd4b416c8a9edc8-s.woff2',
               revision: '8ef3beaad43cc20f7e09df52bc6dabf3',
            },
            {
               url: '/_next/static/media/1f294bb0d46c0f79-s.woff2',
               revision: '405258f31612bfe22bf6af67bff41ac4',
            },
            {
               url: '/_next/static/media/237aa9f7d0280d6e-s.woff2',
               revision: '90f6f17880ff9892a00901c3d1d65d0e',
            },
            {
               url: '/_next/static/media/239c7d86781f65b5-s.woff2',
               revision: 'f33cc117172151465bdb2adf79059209',
            },
            {
               url: '/_next/static/media/266d17b1e16f474d-s.woff2',
               revision: 'c08bb41fd628b461ced89bbfe1c9ead3',
            },
            {
               url: '/_next/static/media/26c7625d359ee13f-s.woff2',
               revision: 'dfac94a2e5f4a17d35c1179025f6377c',
            },
            {
               url: '/_next/static/media/274ff7c6b42f2317-s.woff2',
               revision: '5ee806ce75c09f5553e7c43ad9c61332',
            },
            {
               url: '/_next/static/media/2836a72d289d3c1b-s.woff2',
               revision: '134e21c79b71316c6035e7481107544f',
            },
            {
               url: '/_next/static/media/2b77269ee9de7197-s.woff2',
               revision: '52b5537b2841507c4d7323d8825aa150',
            },
            {
               url: '/_next/static/media/2bdfc672bc6f2f48-s.woff2',
               revision: '429930281d9a7e8a927d912c16c2b1bc',
            },
            {
               url: '/_next/static/media/2e9bac3d3f3b49ba-s.woff2',
               revision: '8addcd7ee64b044a6a8fa7e881b9b463',
            },
            {
               url: '/_next/static/media/34ad2ea93cf3ac86-s.woff2',
               revision: 'ff6ed9baa425558fbc24058730c6be7f',
            },
            {
               url: '/_next/static/media/39cd847ae768a3c6-s.woff2',
               revision: '90131899568b83627b57e104c4ba43ed',
            },
            {
               url: '/_next/static/media/3c3f736084dad553-s.woff2',
               revision: 'dcd8cdf06dca180acf306795459fb576',
            },
            {
               url: '/_next/static/media/3cc1be944175fa22-s.woff2',
               revision: '62de83964a77d2510170d83a2df3cfe4',
            },
            {
               url: '/_next/static/media/45cca0c1391027f2-s.p.woff2',
               revision: '4bc554da790fb0926475cbed6e22399d',
            },
            {
               url: '/_next/static/media/45e103cabbdcf912-s.woff2',
               revision: '399648c03c984308c6347ceb3bec0695',
            },
            {
               url: '/_next/static/media/46f7500482b99baa-s.woff2',
               revision: 'b5490732ba257b1c7c46d1823b75ff31',
            },
            {
               url: '/_next/static/media/470d0f41670a3a37-s.woff2',
               revision: '8576a5463ca3e1f16d0fbe7151158d78',
            },
            {
               url: '/_next/static/media/4add25c84286113c-s.woff2',
               revision: '0dcaa13058b90e5f0ab39942a55f739c',
            },
            {
               url: '/_next/static/media/4c8324583b035f3f-s.p.ttf',
               revision: 'fc910792f52946d98507429d827f197a',
            },
            {
               url: '/_next/static/media/4dcf8ffdef8c6e8d-s.woff2',
               revision: 'bc198683f862f1c05266aa757856b262',
            },
            {
               url: '/_next/static/media/4e68118c0f4b36cd-s.woff2',
               revision: 'bee54d1c4dfd9450e45c9c52a0e19988',
            },
            {
               url: '/_next/static/media/50119d84aa423e01-s.woff2',
               revision: '77cabb0a7ae478266909d246eb9e3b6b',
            },
            {
               url: '/_next/static/media/55a26284b595d874-s.woff2',
               revision: '688c9a6d66cf55171f1b4469c5f3a852',
            },
            {
               url: '/_next/static/media/55f6335489b0e791-s.woff2',
               revision: '12301d649a99d0ce8b5c8cdfba35378e',
            },
            {
               url: '/_next/static/media/57b91bf39c221c0f-s.woff2',
               revision: '3350f39cfef40b4398d75e0aeef6cd6e',
            },
            {
               url: '/_next/static/media/588804d3ec427b8a-s.woff2',
               revision: 'e0fbeeb9bae1edbc9360e3a06bc3053c',
            },
            {
               url: '/_next/static/media/59bb072b0a4af0d4-s.woff2',
               revision: 'b9f7d9ca2bc2c7b3ea9f3fa084219d86',
            },
            {
               url: '/_next/static/media/5aab28c7e733d084-s.woff2',
               revision: 'f5608c3cc20aebbf4dce453cc35a466c',
            },
            {
               url: '/_next/static/media/5bd9701809e9b3b1-s.woff2',
               revision: 'a0794274a624028683bbc6899f57a542',
            },
            {
               url: '/_next/static/media/5f07bcb9224b1bf4-s.woff2',
               revision: 'd25a29a1254c2a41bd3397fbe8168d4f',
            },
            {
               url: '/_next/static/media/6109fccb68c7ef91-s.woff2',
               revision: '50e5c12220f3e3bc431541c62ae8d1c8',
            },
            {
               url: '/_next/static/media/62c7dab4cd928fa3-s.woff2',
               revision: 'c51010709336703f04e1063a495ed802',
            },
            {
               url: '/_next/static/media/64c365e5eea3bceb-s.woff2',
               revision: '64be0809ef200758a53da4b5cc897ee5',
            },
            {
               url: '/_next/static/media/65119ea652c34dc5-s.woff2',
               revision: '07d5cecd355fd55a7c345db40f8e52e3',
            },
            {
               url: '/_next/static/media/65c4faf424b14e39-s.woff2',
               revision: '60436780f2ed79a7227dd9678624dd63',
            },
            {
               url: '/_next/static/media/6714d4bc43270b26-s.woff2',
               revision: '0515c109b8b547968df142f3305a4bee',
            },
            {
               url: '/_next/static/media/6c9c425ccd8d82a8-s.woff2',
               revision: '28f83a983f046a180b5138e5299394f2',
            },
            {
               url: '/_next/static/media/6ed8e415052af782-s.woff2',
               revision: '602628eab17a32e46bf2a7a140d8eee9',
            },
            {
               url: '/_next/static/media/723ee4db144a4843-s.woff2',
               revision: 'ed4aa9cdd332248bb041a85ca39ffe86',
            },
            {
               url: '/_next/static/media/724803dfdf8f94d6-s.woff2',
               revision: 'da38897d11ea368e4fff4f8b6b3fba59',
            },
            {
               url: '/_next/static/media/7371b5eb2b380826-s.woff2',
               revision: 'c7bb5485b9375f2ec264c23e93392546',
            },
            {
               url: '/_next/static/media/740094a2fbba3646-s.woff2',
               revision: 'ef6d5d488b53e9275550436c1cfbebf8',
            },
            {
               url: '/_next/static/media/7508857832a474e7-s.woff2',
               revision: '0c6fc8011c8673e5bb2aab52ad8ffc6d',
            },
            {
               url: '/_next/static/media/78beec79f49102e0-s.woff2',
               revision: 'fe1ceafd3dfc69de3f22ef665bd1cf20',
            },
            {
               url: '/_next/static/media/795510a158c72702-s.woff2',
               revision: '6ddc9ad7f0e28d143261de315d293d2c',
            },
            {
               url: '/_next/static/media/7bde5418c77516fe-s.woff2',
               revision: '4b1c7b21073c55da548364864a3c52b8',
            },
            {
               url: '/_next/static/media/7bf4721b17c90bb9-s.woff2',
               revision: '70b10b0994bb750fb3f1701fbb2f9cbf',
            },
            {
               url: '/_next/static/media/856696a964f1ca66-s.woff2',
               revision: '4f8dee2578310e75443ecaf3e17ab407',
            },
            {
               url: '/_next/static/media/85719754983fa3ae-s.woff2',
               revision: 'ed5c2badd176783d857805cbc79e03bd',
            },
            {
               url: '/_next/static/media/8983548b952a6637-s.woff2',
               revision: '9790961073c98943915298a35e94d1ff',
            },
            {
               url: '/_next/static/media/89c927d185a3ce0e-s.woff2',
               revision: '29671775a48f7b90eac956dcd6299e4e',
            },
            {
               url: '/_next/static/media/8a4615270e781fbd-s.woff2',
               revision: '943996e445cde8002cd26dd731123211',
            },
            {
               url: '/_next/static/media/8e6c3f8fa568ca26-s.woff2',
               revision: '1372d086d4802870e5f583c63ee615c0',
            },
            {
               url: '/_next/static/media/8e74e876bc98de65-s.woff2',
               revision: '3e7c7ba614c60066a11a7cb555c49d38',
            },
            {
               url: '/_next/static/media/8ff8298e80f4d6be-s.woff2',
               revision: '259cfe7637cce293f92bc5499367f2a0',
            },
            {
               url: '/_next/static/media/91267aa546c4a12e-s.woff2',
               revision: 'acfd604571f28d1faec7b2f585a1f4df',
            },
            {
               url: '/_next/static/media/95ed080df25833fb-s.woff2',
               revision: '836d14736b8a5da79ae9c7149c39894a',
            },
            {
               url: '/_next/static/media/9641a13eeef8f24f-s.woff2',
               revision: 'e76eaff15faf13bda84fb770c7376ea0',
            },
            {
               url: '/_next/static/media/9c5d9dc5d7926213-s.woff2',
               revision: '6b8206a4761c5661a8f9ae1055fc27d3',
            },
            {
               url: '/_next/static/media/9c66200ef5e648da-s.woff2',
               revision: '922b55ba9925a02655fc166436a909fd',
            },
            {
               url: '/_next/static/media/9c8fcb0b471a86b7-s.woff2',
               revision: 'c034944b24812ea7b0bd23b564f205e9',
            },
            {
               url: '/_next/static/media/a0365f2460fe0559-s.woff2',
               revision: '4a493992ca432b0668a694f9c58e7dcf',
            },
            {
               url: '/_next/static/media/a2cbe8545b19ead8-s.woff2',
               revision: 'ad9aaf05209f0776f4003dc38b0cccac',
            },
            {
               url: '/_next/static/media/a41b0c1cd75dab4a-s.woff2',
               revision: 'fea404df40e3bc85789a37c9c66aebec',
            },
            {
               url: '/_next/static/media/a823e5e1467f9eea-s.woff2',
               revision: 'f7e11370cce8188d285e7435eb47f007',
            },
            {
               url: '/_next/static/media/ac1bbb4e5a71541d-s.woff2',
               revision: '981ed86dc6aa0fb3af52b1f889ae5dc5',
            },
            {
               url: '/_next/static/media/ac993f7dd3619e88-s.woff2',
               revision: 'ae71ff50edec9b59551af90fa79fc6dd',
            },
            {
               url: '/_next/static/media/b0fa9e2a1839f933-s.woff2',
               revision: '3b2d885e018b715f1b60f841ff31c2db',
            },
            {
               url: '/_next/static/media/b1558ce32b4e391f-s.woff2',
               revision: '9aaae1c8d17d96db376c588774a73814',
            },
            {
               url: '/_next/static/media/b5b5fec85c127da2-s.woff2',
               revision: '2d2c53ee0a504c010edc23e58374e2fa',
            },
            {
               url: '/_next/static/media/b7f156a3200f29b8-s.woff2',
               revision: '8adc3054d2669f8cab9ac2607ab13817',
            },
            {
               url: '/_next/static/media/b990a077f9fe361e-s.woff2',
               revision: '0ac39c71ebb604e0dffbe37d559e1a64',
            },
            {
               url: '/_next/static/media/bb45fa228e2432f6-s.woff2',
               revision: '85a10b8fe98be16b76dca1c6cee18221',
            },
            {
               url: '/_next/static/media/bd0d618ae69a2f66-s.woff2',
               revision: 'c7a4ae48876d94cf55943753b484fac5',
            },
            {
               url: '/_next/static/media/bd104c7a061b03f4-s.woff2',
               revision: '3ad342867c16b75b707f23dcd91a536a',
            },
            {
               url: '/_next/static/media/bd973175db31e3db-s.woff2',
               revision: 'cf60fda95796184081a56425b69aa7b7',
            },
            {
               url: '/_next/static/media/bdfbf78d21336532-s.woff2',
               revision: '0a4a5836d38a3f299b66db719ea1b7e5',
            },
            {
               url: '/_next/static/media/beb469f1df66fc16-s.p.ttf',
               revision: 'ba8df6cf703dfda0e0f920a1f62152f9',
            },
            {
               url: '/_next/static/media/c0911fe26a1d7c65-s.woff2',
               revision: 'd45f0b47b942a52a7b53cff112d43d4d',
            },
            {
               url: '/_next/static/media/c0a31e16475426bb-s.woff2',
               revision: 'd857eb4c5a24d60f3bd74a60d6dcc682',
            },
            {
               url: '/_next/static/media/c23599eea06087ad-s.woff2',
               revision: '01e398963b8808c9fe2eaf7ae1f85c1d',
            },
            {
               url: '/_next/static/media/c28cb730c42ef1d6-s.woff2',
               revision: '78aa8b9dcd045fb83211c8e63a397a76',
            },
            {
               url: '/_next/static/media/c3a90b45f5a74681-s.p.ttf',
               revision: '9ea29d29210dbd78bd0bc5c3ea4b75e3',
            },
            {
               url: '/_next/static/media/c4ad30b0e30a9918-s.woff2',
               revision: '6f10196146335d31cceda327335a5dfe',
            },
            {
               url: '/_next/static/media/c8a4fe591f627e8d-s.woff2',
               revision: 'b65b68d487e19fd34d7c764c35592509',
            },
            {
               url: '/_next/static/media/cad6a495f6881999-s.woff2',
               revision: 'f015cd3a1682a54b3b17cbc5a8644cd7',
            },
            {
               url: '/_next/static/media/cb4b041861a8a390-s.woff2',
               revision: '9b3b2bea16443d9d0e1cbf8a958966cc',
            },
            {
               url: '/_next/static/media/cc47bf154475de2b-s.woff2',
               revision: 'd24f69bda4adbf648c6903eb94096d7e',
            },
            {
               url: '/_next/static/media/cf1ed07d36c925c7-s.woff2',
               revision: 'd288d4c35180c76640a69776a3208cd9',
            },
            {
               url: '/_next/static/media/cff5778ca282ec76-s.woff2',
               revision: '00d4395346cbd21dfb909286b7bbb09e',
            },
            {
               url: '/_next/static/media/d081be4378c13f10-s.woff2',
               revision: '081eca8998ab6fc831b2dd0fb1b954a4',
            },
            {
               url: '/_next/static/media/d28105c2714c6b8e-s.woff2',
               revision: '18ab7653eccf65565348b4d614c2fedc',
            },
            {
               url: '/_next/static/media/d2edd2f0dadbe410-s.woff2',
               revision: 'fabe0f5a4986657a5d529ede922d5c20',
            },
            {
               url: '/_next/static/media/d33d9bc07c8a848b-s.woff2',
               revision: '32e72cabe599ba0f8ffff66e6890b1ac',
            },
            {
               url: '/_next/static/media/d5ad0d63bc06c348-s.woff2',
               revision: '2ed6411b6b106795de586813d79631e4',
            },
            {
               url: '/_next/static/media/d989f80d4970c965-s.woff2',
               revision: '9694d6e857fd571cb0fdafc4d6258b8e',
            },
            {
               url: '/_next/static/media/d9f0dfad1a609b96-s.woff2',
               revision: 'adc28e01052a5a5a419fab3e6dacaad8',
            },
            {
               url: '/_next/static/media/da50ed8e5a547421-s.woff2',
               revision: '3a262f071222d466b4d87d0581fcbe30',
            },
            {
               url: '/_next/static/media/da8b2ae779bc629e-s.woff2',
               revision: '4466d3b099fddd879aaa62e205d06f6d',
            },
            {
               url: '/_next/static/media/dc3521727fdeab55-s.woff2',
               revision: '2cd2f3876bf44890d5c243291bcbf06c',
            },
            {
               url: '/_next/static/media/de55424a3bb9dbf4-s.woff2',
               revision: '6e6df38136fbeebe61b8428872e88ecd',
            },
            {
               url: '/_next/static/media/df2272531fb6f7d1-s.woff2',
               revision: 'f5d22b93744ef836acc458b34234ace2',
            },
            {
               url: '/_next/static/media/e11544179b5cde4b-s.woff2',
               revision: 'c7d5eec73754295ff68e46c7c6f6b430',
            },
            {
               url: '/_next/static/media/e2a7488a6124eb55-s.woff2',
               revision: 'dfc6889df588149d5003d9fc26fcc240',
            },
            {
               url: '/_next/static/media/e59b636b6c2c02b9-s.woff2',
               revision: '8d3431102e14f12a76ab552913a168ee',
            },
            {
               url: '/_next/static/media/e8eb5ef92db1992d-s.woff2',
               revision: '5028a59e9cad94dd759b0c6574e4dfc1',
            },
            {
               url: '/_next/static/media/eee2ca118e25e6e1-s.woff2',
               revision: '41440cec8b319c148162826ae376c43e',
            },
            {
               url: '/_next/static/media/f2d54562d6dd1bf9-s.woff2',
               revision: 'f30ca7319a08674db58e53612ded6f43',
            },
            {
               url: '/_next/static/media/f385789fad3ded7c-s.woff2',
               revision: '594443e7b1f711f7de7edafd7a76f6c0',
            },
            {
               url: '/_next/static/media/f651f91b241cbfe2-s.woff2',
               revision: '8e99859e172af4f424950cbee1e2e535',
            },
            {
               url: '/_next/static/media/f6dc971681358635-s.woff2',
               revision: '3fdcf6d0623c2fd9c90eff18dfcb5075',
            },
            {
               url: '/_next/static/media/f83637dc978f29fa-s.woff2',
               revision: 'a2d621e17f15ab322a0fc41f3ed0737d',
            },
            {
               url: '/_next/static/media/f846fb1644f1e567-s.woff2',
               revision: 'bda9d56f897579673f0f67e0ee1eb388',
            },
            {
               url: '/_next/static/media/f9638adf79e99717-s.woff2',
               revision: '02bef2db5c0e9d9adddc6ab36b8d5074',
            },
            {
               url: '/_next/static/media/faa213b35a0991ad-s.woff2',
               revision: '0c5debe9792bd6cf5ed051bfb9a53cff',
            },
            {
               url: '/_next/static/media/fcccd54ec792b179-s.woff2',
               revision: 'dfc4838e1367f4ad3635c913b954461b',
            },
            {
               url: '/_next/static/media/fdec3d835a61ce25-s.woff2',
               revision: '5e8f4a09da746cfca2c4acb21ef53950',
            },
            {
               url: '/_next/static/media/ffc2e3dbe32724e2-s.woff2',
               revision: '168ee87727f0250b0818b46ba8f283e9',
            },
            {
               url: '/favicon.ico',
               revision: '42dd1c84e8fa54b4903c0b0dc807e467',
            },
            {
               url: '/fonts/modern_dos/LICENSE.txt',
               revision: '473a7959b44c2f42c375d904305b6307',
            },
            {
               url: '/fonts/modern_dos/ModernDOS8x14.ttf',
               revision: 'ba8df6cf703dfda0e0f920a1f62152f9',
            },
            {
               url: '/fonts/modern_dos/ModernDOS8x16.ttf',
               revision: 'fc910792f52946d98507429d827f197a',
            },
            {
               url: '/fonts/modern_dos/ModernDOS8x8.ttf',
               revision: '9ea29d29210dbd78bd0bc5c3ea4b75e3',
            },
            {
               url: '/fonts/modern_dos/ModernDOS9x14.ttf',
               revision: 'ce7459d2854cc4f36b491739054febf3',
            },
            {
               url: '/fonts/modern_dos/ModernDOS9x16.ttf',
               revision: '636c848e9f6e2d4ce0cb02d4ebb29aec',
            },
            {
               url: '/images/banner/compressed_newYear.webp',
               revision: 'b012fa9e3f1cd2f999a07b8f954d76ed',
            },
            {
               url: '/images/banner/windsaurus.webp',
               revision: '7c6a9694dbdb4e34d6d1d2064f4bbf38',
            },
            {
               url: '/images/introduce/logo.png',
               revision: 'e6fb5adc80e9281f68daad10faf46f3c',
            },
            {
               url: '/images/introduce/logo2.png',
               revision: 'a2d3b691116eecc741cb66b78dc37d73',
            },
            {
               url: '/images/introduce/logo3.png',
               revision: '269926cba3a65c6fa1f368da4a52c269',
            },
            {
               url: '/images/mascot/compressed_logo2.image_webp',
               revision: '2dff75cf429ba30545c6d860ae67efd5',
            },
            {
               url: '/images/mascot/logo.webp',
               revision: 'a688fd44f55bb8959292c6f0cdb1f28e',
            },
            {
               url: '/images/mascot/logo2.webp',
               revision: '99a8fcd1555c9e660b7fe89b7d0684fe',
            },
            {
               url: '/images/mascot/new_logo.webp',
               revision: '49c105bbff90694cf13b876dcb63e4c2',
            },
            {
               url: '/images/mascot/new_logo2.webp',
               revision: '30dc9674c6c1a3c20642f4e3a8236e27',
            },
            {
               url: '/manifest.json',
               revision: '0dfc9f32a54acf1dc5bc4ada6a9b9bd2',
            },
            {
               url: '/preview/board.png',
               revision: 'c78e3fdf7bf56407336b3d4793c81c24',
            },
            {
               url: '/preview/home.png',
               revision: 'dd38f70089d07a159a075e62144f7e1a',
            },
            {
               url: '/preview/login.png',
               revision: 'ef7586896a7682da4ac12189cd071e29',
            },
            {
               url: '/preview/main.png',
               revision: '935ce769a2afd9a664b4fe8423d2c4bf',
            },
            {
               url: '/preview/quiz.png',
               revision: '9f489789803ca75f92ee737aec4f669e',
            },
            {
               url: '/preview/read.png',
               revision: '7ac69fa85feb3c729a837385cc00fd81',
            },
            {
               url: '/preview/sign.png',
               revision: '5022bf89377b698480578d58a56e5475',
            },
            {
               url: '/preview/signform.png',
               revision: '2a2eabf4548dd767ce158e08ecba9e4b',
            },
            {
               url: '/preview/write.png',
               revision: '7704939798caf05efd7de7dd60a600a0',
            },
            {
               url: '/robots.txt',
               revision: '742c50b82e1b4c7ba4f4cf6b186efb70',
            },
            {
               url: '/sitemap.xml',
               revision: 'a67bf434d06cb7dffb74d776c79d243b',
            },
            {
               url: '/sound/click.mp3',
               revision: '9ee3f29efd177975b544afcc98405206',
            },
            {
               url: '/videos/sample-logo-video.mp4',
               revision: '1420cacc335eb0b89356919096e04349',
            },
            {
               url: '/videos/sample-video.mp4',
               revision: '25abe2a7fadc1afd41d6afd11b218a82',
            },
         ],
         { ignoreURLParametersMatching: [] },
      ),
      e.cleanupOutdatedCaches(),
      e.registerRoute(
         '/',
         new e.NetworkFirst({
            cacheName: 'start-url',
            plugins: [
               {
                  cacheWillUpdate: async ({
                     request: e,
                     response: a,
                     event: i,
                     state: c,
                  }) =>
                     a && 'opaqueredirect' === a.type
                        ? new Response(a.body, {
                             status: 200,
                             statusText: 'OK',
                             headers: a.headers,
                          })
                        : a,
               },
            ],
         }),
         'GET',
      ),
      e.registerRoute(
         /^https:\/\/fonts\.googleapis\.com\/.*/i,
         new e.CacheFirst({
            cacheName: 'google-fonts-cache',
            plugins: [
               new e.ExpirationPlugin({
                  maxEntries: 10,
                  maxAgeSeconds: 31536e3,
               }),
            ],
         }),
         'GET',
      ),
      e.registerRoute(
         /^https:\/\/fonts\.gstatic\.com\/.*/i,
         new e.CacheFirst({
            cacheName: 'gstatic-fonts-cache',
            plugins: [
               new e.ExpirationPlugin({
                  maxEntries: 10,
                  maxAgeSeconds: 31536e3,
               }),
            ],
         }),
         'GET',
      ),
      e.registerRoute(
         /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
         new e.CacheFirst({
            cacheName: 'images-cache',
            plugins: [
               new e.ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 2592e3,
               }),
            ],
         }),
         'GET',
      ))
})
