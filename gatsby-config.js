require('dotenv').config()
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'Plastic Wax',
    siteUrl: 'https://yellowcake.netlify.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',

    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        /*id: 'GTM-add_your_tag_here',*/
        id: 'GTM-P4RNF8D',
        includeInDevelopment: false
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|\.scss$|static\/)/,
            handler: `cacheFirst`
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css|scss)$/,
            handler: `staleWhileRevalidate`
          },
          {
            // uploadcare
            urlPattern: /^https:\/\/ucarecdn.com\/[-a-zA-Z0-9@:%_\+.~#?&//=]*?\/10x\//,
            handler: `staleWhileRevalidate`
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'yellowcake',
        short_name: 'yellowcake',
        start_url: '/',
        background_color: '#00C2BD',
        theme_color: '#00C2BD',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: `${__dirname}/static/images/logo.svg` // This path is relative to the root of the site.
      }
    },

    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-video`,             
            options: {
              maxWidth: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframerder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,             
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          ],
      },
  },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/cms/admin.css`,
        enableIdentityWidget: true
      }
    },{
      resolve: `gatsby-source-vimeo`,
      options: {
        clientID: '3f9c7f4df0b0be4c6c5f87809bfa48668380decd',
        clientSecret: '6Bf4U4ulGPMPxXToHMnYuzkNSQiZarxCz4dKPOVa/OcRIjwTezCIHN15gzdI3kT/czrxSeaT8ssLe9P6vpKUeyDaz7Pjyy2fp7mWGN29cYagdXqj8Q2PYF+A+sn9SuDD',
        userID: 'user131301344',
        transformer (video) {
          // Transform the video data [OPTIONAL]
          // i.e. Add extra fields or alter existing field
          video.newField = 'value'
          return video
        }
      },
    },//{
    //   resolve: 'gatsby-plugin-firebase',
    //   options: {
    //     credentials: {
    //       apiKey: process.env.GATSBY_FIREBASE_APIKEY,
    //       authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
    //       databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
    //       projectId: process.env.GATSBY_FIREBASE_PROJECTID,
    //       storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
    //       messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
    //       appId: process.env.GATSBY_FIREBASE_APPID
    //     }
    //   }
    // },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
