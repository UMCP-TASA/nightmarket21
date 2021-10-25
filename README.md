# UMCP TASA Night Market 2021

Our application for our Night Market event. Utilizes Gatsby, React, Netlify, and Firebase

https://nightmarket21.umcptasa.com/

# Table of Contents

1. [Installation](#installation)
    1. [Gatsby](#gatsby)
    2. [Environment Variables](#environment-variables)
    3. [Typescript](#typescript)
2. [File Structure](#file-structure)
3. [Customizing Theme and Styling](#customizing-theme-and-styling)
4. [Page Transitions](#page-transitions)
5. [Firebase](#firebase)
6. [Stripe](#stripe)
    1. [Use-Shopping-Cart](#use-shopping-cart)
7. [Animations](#animations)
8. [Netlify](#netlify)
9. [React Rehydration](#react-rehydration)

# Installation

Everything is already set-up in the [package.json](package.json) so all you have to do is

```
npm install
```

Note that because of [this issue](https://github.com/pmndrs/react-spring/issues/1078) with react-spring, we currently have to manually patch the react-spring packages. Luckily with the use of the `patch-packages` package, this has already been done for you via the `postinstall` command.

## Gatsby

You will have to install gatsby-cli which you can do with `npm install -g gatsby-cli`
Their website has a nice [tutorial](https://www.gatsbyjs.org/tutorial/) which I recommend following.

You also can find the original [Gatsby's original README.md here](https://github.com/gatsbyjs/gatsby-starter-hello-world). That doc details a quick look at some file structure and basic files for this repo

Note: On windows, you may not be able to run `gatsby develop` with hot reloading if you're using the Bash subsystem but your code is in the Windows file system. This is because the bash subsystem has trouble passing data and setting flags across to the windows file system. To fix this, move your project into the Unix filesystem.

Look at this [GitHub issue on hot reloading](https://github.com/microsoft/WSL/issues/4417) for more info

## Environment Variables

In order for the [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) plugin to work properly, you'll have to create a `.env` file and add our credentials there. Copy the contents of the [.env.example](.env.example) file into the new `.env` file. To get our credentials:

1. Go to the [Firebase console](https://console.firebase.google.com/)
2. Sign into the UMCP TASA email
3. Click on Tour of Taiwan
4. Under the title, click the button that says `</> Tour of Taiwan Web`
5. Click the gear icon
6. Scroll down to "Your Apps"
7. Copy the information in the code highlight under firebase config to your .env file
    1. Names of the keys should correspond to the variable in the .env file

Tbh I don't know if we actually had to store these in an environment variable, since it doesn't look like these are secret keys. But this is a way to prevent anyone on the Internet from accessing our config information.

## Typescript

Types are cool. I hope I can convert you to Typescript (or Flow) too. Here are some resources for Typescript and Typescript with React

-   https://github.com/typescript-cheatsheets/react
-   https://ts.chibicode.com/todo/
-   https://2ality.com/2018/04/type-notation-typescript.html

# File Structure

-   [src/components](src/components): Holds all of the components for our site. Each sub-folder has an `index.ts` file that re-exports components so we can have a nice `import {} from "components/.."`
-   [src/hooks](src/hooks): Holds the custom hooks for our project. Take a look at [React's documentation for hooks](https://reactjs.org/docs/hooks-intro.html) for a nice introduction to hooks
-   [src/assets](src/assets): Our assets folder that'll contain any images, videos, or json files we end up using
-   [src/pages](src/pages): Each file in this folder correspond to a page on the site. The path for the page matches the filename
-   [src/types](src/types): Our custom Typescript types

# Customizing Theme and Styling

This site uses [Material-UI](https://material-ui.com/) components for styling. The theme can be modified in [`theme.tsx`](/src/App/theme.tsx) to change the primary and secondary colors, the spacing used throughout the site, and typography. More info about customizing theme can be found on the [official Material-UI cutomization guide](https://material-ui.com/customization/theming/). The theme is provided to all the pages in [`gatsby-browser.js`](gatsby-browser.js) via the [ThemeProvider](/src/App/App.tsx) component.

The Material-UI framework relies on the idea of [css-in-js](https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/). In particular, we use Material-UI's [Hook API](https://material-ui.com/styles/basics/) method of adding styles. It works by defining a custom hook for each component `useStyles`. We can add styles to components by defining objects in the function body. There's a slight difference in naming between usual CSS fields and CSS-in-JS fields, but that's usually replacing '-' with camelCase. We can also use media queries to use different styles depending on the size of the screen!

```javascript
// We pass in a function with theme as the argument so that we can access when defining styles
const useStyles = makeStyles(theme => ({
    // Styles generated for classes.root
    root: {
        padding: theme.spacing(1), // theme.spacing(x) lets us have consistent
        backgroundColor: "red", // Notice how we use camelCase instead of background-color

        [theme.breakpoints.up("md")]: {
            // A media query that means for sizes greater than medium, apply these styles
            padding: theme.spacing(2),
        },

        "& p": {
            // A nested selector that targets all <p> tags under the parent
            backgroundColor: "green",
        },
    },
}))

const CoolComponent = ({}: Props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            Some nice content
            <p>Some nice content with a green background</p>
        </div>
    )
}
```

All h1, h2, h3, etc elements can be customized across the site in themes as well. Here's the example from the [Material-UI documentation](https://material-ui.com/customization/typography/)

```javascript
const theme = createMuiTheme({
    typography: {
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: "italic",
        },
    },
})
```

# Page Transitions

Smooth page transitions make everything look polished. We'll be using [gatsby-plugin-transition-link](https://transitionlink.tylerbarnes.ca/docs/transitionlink/) to handle the transitions. I'm still not entirely sure how this works, so if anyone has a better solution please let me know! Right now, our footer and header components use AniLink, the plugin's default transition component, to create a swipe like effect like how apps transition between pages.

I had to add a custom ".d.ts" file in [src/types](src/types) in order to add types to this plugin. I followed this [Medium article](https://medium.com/@chris_72272/migrating-to-typescript-write-a-declaration-file-for-a-third-party-npm-module-b1f75808ed2) to create a declarations file.

# Firebase

We utilize [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) to handle importing and utilizing our firebase instance. Due to how Gatsby uses server side rendering to pre-render some of the sites, we have to have a different way of using firebase. The [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) plugin handles all of that for us.

We then use [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore) for that sweet hook abstraction on querying our Cloud Firestore. We also use our own Firebase cloud function to generate the session ID for stripe.

Our Firebase Function that we use to auto-generate tickets when an account is created and to create tickets is located in our private repo tour-of-taiwan-admin

# Stripe

We use Stripe for payment! When the user clicks on the Checkout button, we call our Firebase Cloud Function that generates the Stripe Checkout Session ID for us. Then we pass that ID to `redirectToCheckout` which brings us to a Stripe hosted checkout page. By doing this, we can prevent malicious users from manipulating prices and listening in on credit card info. Once stripe processes the order, it sends a webhook to another Firebase Cloud Function that then generates the raffle tickets for the user. Our checkout session contains metadata of who to associate the ticket with and how many of each ticket to generate. Stripe passes this metadata to our Firebase function which then uses it to generate the right amount of tickets.

## Use-Shopping-Cart

[use-shopping-cart](https://useshoppingcart.com/) is a wonderful plugin that helps us manage cart state. It's a provider, so it sits in our [App.tsx](src/components/App/App.tsx)

# Animations

This site use [react-spring](https://www.react-spring.io/) for animations. In order to fix some issues with typing, I upgraded to the 9.0.0-rc.3 version of react-spring. This means that some of the docs on the main page are outdated. Instead, refer to the [react-spring v9 docs](https://aleclarson.github.io/react-spring/v9/).

# Netlify

We're using Netlify to host our site! You can access our control panel by signing into [app.netlify.com]([app.netlify.com]) with our UMCP TASA email. All of the environment variables are set up already.

# React Rehydration

If styles look like they work on first load but don't on subsequent loads or vice versa, the problem is likely with server side rendering. In order to serve faster pages, Gatsby first pre-compiles during build the DOM from our React code on build. Gatsby uses the functions wrapRootElement and wrapPageElement in [`gatsby-ssr.js`](gatsby-ssr.js) during this time, which is why those two functions have to be the same as the ones in [`gatsby-browser.js`](gatsby-browser.js) which is the file that determines what the site uses on the client side.

Because React uses rehydration instead of re-rendering to reconcile the differences between server and client side rendering, things can start to get wonky. Rehydration relies on the assumption that the DOM stays the same which sometimes isn't the case if we have dynamic content. So if styles look wonky between first load, which is what the server provides to the user, and the second load, where the client usually kicks in to render the page, it's likely that some element isn't in the right place in the DOM. To be honest, I'm not sure if this is exactly why things don't look right, but it seems to be the best explanation I've found.

That's where the [`ClientOnly`](src/components/General/ClientOnly.tsx) component comes in! It utilizes useEffect to only mount the component when the page is loaded. Since this only happens for the client, then the DOM stays the same between when the page is compiled during server-side rendering and when the client gets the page. Rehydration works, and then, the client can add the content that's missing after rehydration occurs. This is called two-pass rendering!

The code for the component as well as a better explanation about this issue can be found on Josh W Comeau's blog post [The Perils of Rehydration](https://joshwcomeau.com/react/the-perils-of-rehydration/)

## Fixing React Globe

Because React Globe uses three.js which requires the window object, we can't render React Globe during Server Side Rendering. To fix this, we wrap the React Globe call in [index.tsx](src/pages/index.tsx) with a `typeof window === undefined` which means it won't get rendered during server side rendering. We also have to replace the three.js module with a dummy module during SSR. That's what our `exports.onCreateWebpackConfig` in [gatsby-node.js](gatsby-node.js) does. The Gatsby docs on [debugging HTML builds](https://www.gatsbyjs.com/docs/debugging-html-builds/) has more information about this.

# Patches

Patching `gatsby-source-stripe` per [this open issue](https://github.com/njosefbeck/gatsby-source-stripe/issues/62) about how images aren't downloaded for Price objects
