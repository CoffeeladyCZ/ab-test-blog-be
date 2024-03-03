## Backend for A/B test app

RestAPI for frontend application. Contained API for article detail, article list and fake login.

### Tech stack
Node.js, Express.js, MongoDB

### Installation
You need to create `.env` file with:
`MONGODB_URI` - connection to your MongoDB

Model schema for one article is:
```js
{
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  perex: {
    type: String,
  },
  ab_test: {
    type: String | null,
  },
  version: {
    type: String,
  },
  content: {
    type: String,
  },
  image: { 
    type: String,
  }
};
```
You also need to change variable for cors origin in `app.js`.

The api documentation is available at route */api-docs/*.

MDI Licence
