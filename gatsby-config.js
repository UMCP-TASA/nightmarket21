require("dotenv").config()

module.exports = {
    siteMetadata: {
        title: `Night Market`,
        description: `UMCP TASA Night Market 2021`,
        author: `UMCP TASA`,
    },
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/app/*`] },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/src/assets`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "static",
                path: `${__dirname}/static/assets`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "cities",
                path: `${__dirname}/content/cities/`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "food",
                path: `${__dirname}/content/food/`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /assets/,
                },
            },
        },
        {
            resolve: `gatsby-alias-imports`,
            options: {
                aliases: {
                    root: `/`,
                    "@utils": "src/utils",
                },
            },
        },
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
                    appId: process.env.FIREBASE_APP_ID,
                },
            },
        },
        {
            resolve: `gatsby-source-stripe`,
            options: {
                objects: ["Price"],
                secretKey: process.env.STRIPE_SECRET_KEY,
                downloadFiles: true,
            },
        },
        //`gatsby-plugin-optimize-svgs`,
        `gatsby-plugin-material-ui`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-graphql-codegen`,
        `gatsby-plugin-netlify-cms`,
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-relative-images",
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 672,
                            withWebp: true,
                        },
                    },
                    "gatsby-remark-copy-linked-files",
                    "gatsby-remark-autolink-headers",
                ],
            },
        },
        // {
        //     resolve: "gatsby-plugin-transition-link",
        //     options: {
        //         layout: require.resolve(`./src/components/App/App.tsx`),
        //         injectPageProps: false
        //     },
        // },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Night Market 2021`,
                short_name: `ToT`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/totlogo.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
    ],
}
