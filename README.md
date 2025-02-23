This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## API 

For the API we are using the [Firebase REST API](https://firebase.google.com/docs/database/rest/start).  
For this project, a Firebase Realtime Database url should be created and added under FIREBASE_URL variable in .env file.


| Method	          | Endpoint 	                                     |
|------------------|------------------------------------------------|
| GET              | /urlBase/participants.json                     |
| GET filter       | /urlBase/participants.json?name=value          |
| GET by id        | /urlBase/participants/1.json                   |
| GET paginate     | /urlBase/participants.json?_page=2&_limit=10   |
| POST             | /urlBase/participants.json                     |
| PUT/PATCH/DELETE | /urlBase/participants/1.json                   |


## Admin page

To access the admin page, please use the password provided in the `.env`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
