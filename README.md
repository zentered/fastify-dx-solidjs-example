# Fastify DX and Solid.js In the Real World

These are only the essentials to set up a "real world" application with Fastify
DX, Solid.js, Auth0 and GraphQL. To read more about how, why etc. please refer
to our blog post:
[Real World App using Fastify DX and Solid.js](https://zentered.co/articles/fastify-dx-and-solidjs-in-the-real-world/)

This application connects to the GitHub GraphQL. We use
[Auth0](https://auth0.com) and a
[Social Identity Provider](https://auth0.com/docs/authenticate/identity-providers/social-identity-providers)
(GitHub) to log in to our App.

## Requirements

Copy `env.example` to `.env`. Those variables are loaded when the server is
started. There are a few steps needed for a full, working setup:

1. Auth0 Single Page Application to handle the login on the website
2. GitHub OAuth App to communicate with Auth0 securely and issue GraphQL API
   tokens
3. Auth0 Machine to Machine Application to retrieve access tokens for the GitHub
   GraqhQL API through Auth0

### Auth0 Single Page Application

This is the primary auth0 application we'll use. Create a new Single Page
Application in Auth0 and copy the client id and domain into `.env`, (variables
starting with `VITE_AUTH0_`). Make sure you add `http://localhost:8080` to the
_Allowed Callback URL_, _Allowed Web Origin_ and _Allowed Origin_.

### GitHub OAuth App

Go into your [Developer Settings](https://github.com/settings/developers) and
create a new OAuth App. Name, homepage etc. are not important, but the
`Authorization callback URL` needs to point to your Auth0 Tenant. You can get
the domain in your Auth0 application settings:
`https://<auth0-app-DOMAIN>.auth0.com`.

### Auth0 Social Connections

Go to `Authentication -> Social` and `Create Connection`. Select GitHub. Pick a
name and copy the Client ID from your GitHub OAuth App. Go back to the GitHub
OAuth App settings and click `Create a new client secret`. Copy that into the
Client Secret in the Auth0 connection details. For this app we only need
`public_repo` as a permission. You should enable
`Sync user profile attribute at each login` to retrieve the user details from
GitHub.

After saving, go back to your Single Page Application, to the tab `Connections`
and add the GitHub Social Connection. You should disable the Database connection
to avoid issues later.

### Auth0: Machine to Machine Application

We use a Machine to Machine Application to retrieve the Access Token for the
GitHub API through Auth0. This can't be done directly on the client.

Go back to Applications, `Create Application` and pick
`Machine to Machine Application`. Enter a name, and copy the client id, secret
and domain into `.env` (variables starting with `AUTH0_`). Go to `APIs` and
Authorize the application to the Auth0 Management API. The only permission
needed is `read:user_idp_tokens`.

## Install & Run

      pnpm install
      pnpm dev
