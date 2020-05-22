const pluginsConfig = [
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-react-helmet`,
  // needs to be the first to work with gatsby-remark-images
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `uploads`,
      path: `${__dirname}/static/assets/img`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/posts`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-relative-images",
          options: {
            name: "uploads",
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWitdh: 960,
            linkImagesToOriginal: false,
          },
        },
        "gatsby-remark-lazy-load",
        "gatsby-remark-prismjs",
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
  // Simple config, passing URL
  {
    resolve: "gatsby-source-graphql",
    options: {
      // Arbitrary name for the remote schema Query type
      typeName: "PERSONAL_API",
      // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
      fieldName: "personalApi",
      // Url to query from
      url: "https://playground-graphql-lm.herokuapp.com/",
    },
  }
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
]

module.exports = {
  siteMetadata: {
    title: `Lucas Marques - Blog`,
    position: `Desenvolvedor Web`,
    description: `Blog para anotações sobre qualquer coisa que eu estiver estudando.`,
    author: `@lucas_marques`,
    authorDescription: `Desenvolvedor Web | Node.js | React | Redux | Php | Go | Tests | DevOps`,
    siteUrl: "https://lucasmarques.dev",
    disqusShortName: "lucas-marques-dev",

    postsConfig: {
      postsPerPage: 6,
      postsBasePath: "/",
    },
    pages: [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "Projetos",
        url: "/projects",
      },
      {
        label: "Sobre Mim",
        url: "/about",
      },
    ],
    socialLinks: [
      {
        label: "Github",
        url: "https://github.com/lucasmarques73",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/lucas_marques",
      },
      {
        label: "Linkedin",
        url: "https://linkedin.com/in/lucasmarques73",
      },
    ],
  },
  plugins: pluginsConfig,
}
