# Next shop

Hybrid static/SSR (Server Side Regeneration) application

# 07 Next Shop\_ Setup

## 001. Next Shop Overview

Topics will cover

- Start the project using `create-next-app`
- css style with Tailwind CSS
- for backend and api, Strapi - headless cms
- Fetching data from an api
- Details on Incremental Static Regeneration
- next-js API Routes
- Responsive Design
- Authentication with JWT and cookies
- fetching and storing data by React Query

Project screen shoots

![1](screen-shots/001.%20Next%20Shop%20Overview/001%20Next%20Shop_%20Overview-00h00m28s000t.png)
![2](screen-shots/001.%20Next%20Shop%20Overview/001%20Next%20Shop_%20Overview-00h00m34s000t.png)
![3](screen-shots/001.%20Next%20Shop%20Overview/001%20Next%20Shop_%20Overview-00h00m40s000t.png)
![4](screen-shots/001.%20Next%20Shop%20Overview/001%20Next%20Shop_%20Overview-00h00m46s000t.png)
![5](screen-shots/001.%20Next%20Shop%20Overview/001%20Next%20Shop_%20Overview-00h00m52s000t.png)

## 002.Create Next App

We will create our next-js project by using create-next-app, installation instruction can be seen the official doc page as well for latest instruction from [here](https://nextjs.org/docs/api-reference/create-next-app). In terminal where we want to place our project we need to execute this command `npx create-next-app@latest next-shop` here next-shop is our app name. If `create-next-app` was not install then it will give you prompt to install it. After it will install `react next react-dom` as dependency and as dev-dependency it will install `eslint eslint-config-next`, those are for helping correcting code not required for production.

If we inspect the next-shop directory we can see that there are few extra files. These are bootstrap files that automatically created by `create-next-app`. Here `.gitignore` file is for ignoring file list for git. `next.config.js` is a next-js configuration file. `.eslintrc.json` for eslint. We have built-in style given and default pages are also given. but we will change it as our need.
**Note: There is a api folder in pages folder.we will explore it later. For now we will delete the page. And for consistency we will rename our default export component name as well.**

**Note: There was a error `next/babel` module not found. to fix that added a babel configuration named `.babelrc` and file content**

```json
{
  "presets": ["next/babel"],
  "plugins": []
}
```

**and in .eslintrc.json added `"next/babel"` in extends property**

```json
{
  "extends": ["next/babel", "next/core-web-vitals"]
}
```

Now we run our app in dev mode. In the project directory executed `npm run dev`

## 003 TypeScript Support

skipping TypeScript support

## 005. Tailwind Setup

There are two option to install tailwind css, latest instruction [here](https://tailwindcss.com/docs/guides/nextjs)

1. when creating the project `npx create-next-app@latest -e with-tailwindcss project-name`, it will use the tailwindcss as template to create the project. But the packages are not always up to date.
2. The second approach is manually installing,
   1.install `tailwindcss` `postcss` `autoprefixer` as dev dependency `npm i -D tailwindcss postcss autoprefix`, note `-D` and `--save-dev` are same
3. initiate tailwindcss `npx tailwindcss init -p` it will create config file for tailwindcss and postcss.the `postcss.config.js` config postcss to use tailwindcss and autoprefix.the `tailwind.config.js` we need to modify the content property,` content: [ "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", ],` so that only css used by js,jsx,ts,tsx files under pages and components folder are get build.**Note: this command need to execute at project dir, I did on pages folder and it made the configs file inside pages folder**
4. add this in global css,These are tailwind directive, and processed by postcss that will make it stander css rule, adding tailwind these way later we can customize or add additional style as our need

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. add vscode extension 'tailwind css intelliSense' to better tailwind code completion.

Now if we run our app in dev we can see that our heading has different style.

## 006. Utility First css

Tailwind is utility first css framework.We can style our component only using the utility class. the difference between bootstrap and tailwind is bootstrap has a fixed style. while by using tailwind the design is what user want.
But using tailwind will make the reusable style complex, but it is not a problem for react, we simply create a reusable react component with tailwind css, that can be reusable in our app.
ei. we give a p-3 to our main tag and our title, we make it a Title component, we can reuse it other place.

## 007. High-level Architecture

Data Requirement for our app, we want to sell product on our site, so we need product, we will sell our product to customer, so we need user, and user will place order and will need a cart, this cart will have user to product relationship

1. Products: name,details,price,image
2. Users:let user use our site,and signin and signup
3. ShoppingCarts:
   Data Storage
   in our previous example we simply used file to store our content,

But for next-shop it will be not a good approach, we need a database to store our data, database can be mysql or no-sql like mongodb.Database will be helpful to maintain relation between other table of data.
Data Storage used by next-blog  
![1](screen-shots/007.%20High-level%20Architecture/007%20High-level%20Architecture-00h02m10s767t.png)

Storage need to use for our next-shop is a database.  
![2](screen-shots/007.%20High-level%20Architecture/007%20High-level%20Architecture-00h02m45s633t.png)

Other than directly implementing the database logic in our next-js page it will be good idea to have a separate api that expose the database management.Then we could focus on front-end, and only do the portion of connecting api.
![3](screen-shots/007.%20High-level%20Architecture/007%20High-level%20Architecture-00h03m58s500t.png)

This will be also helpful if we build mobile app then they can also utilise the same api.
![4](screen-shots/007.%20High-level%20Architecture/007%20High-level%20Architecture-00h04m24s400t.png)

To build the backend api using node and express or by other stack it will be time consuming, will take more resource. Now a days it is a common practise or gaining popularity that we use a `headless CMS`, headless CMS() will expose the backend api we need as well have a admin ui. So if we use headless CMS we don't need to write the backend api and the admin ui. we only make the public ui. For most of the case it is a good approach.
![5](screen-shots/007.%20High-level%20Architecture/007%20High-level%20Architecture-00h05m42s900t.png)

Next-js have already a list of example of the several CMS providers, can be found [here](https://nextjs.org/docs/advanced-features/preview-mode). We will use Strapi for our project. It is open source and self hosted.

## 008 Strapi Headless CMS basic and rest client

The official documentation can be found here [docs.strapi.io](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)

To learn the basics of strapi we will create an example strapi project.To install strapi we can follow the quick start guide, `npx create-strapi-app@latest app_name --quickstart`. this will install strapi in app_name folder and install all dependency, after successfully installing strapi, it will run `npm run dev` and open the super admin user registration page at `http://localhost:1337/` this location. here we can setup our super admin user.By default strapi uses sqlite database, we can change the database as our need.
Current installed version is `4.0.7`. I can see that the interface is changed tittle bit as shown in video. chances are it will get update again. But it will be small changes. Now to add a user from left top of the page `Content Manager`-> from Collection Type->User->Create new entry.Here we need to give `username`,`email`,`password`, `Role` and `confirmed` is on.
To create new collection, `Content-Type builder`->`+ Create new collection type`->Display name:ei`Product`->Advanced Setting->Draft system:off->Continue, Now add fields according to need then `save`.Field types -

- Text:small/long
- Rich text
- Number
- Date
- Boolean
- Relation
- Enumeration,list of values, then pick one
- Media:images,videos
- JSON
- UID
  Then we need to give permission according our need.For example our product list and product details need public access. To manage the permission -> Settings->Users & permissions plugin ->Roles->public->edit->permission->product->select `find` and `findOne` -> `save`.
  Now we need to test our api endpoints, our products collection can be access at `localhost:1337/api/products` and we will get a response like this, for better code viewing I've split whole response into two section

```http
HTTP/1.1 200 OK
........
Connection: close
{
  our_data_in_JSON
}
```

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "first product",
      "description": "first product description",
      "price": 300,
      "createdAt": "2022-02-09T09:54:45.956Z",
      "updatedAt": "2022-02-09T09:54:45.956Z"
    }
  },
  "meta": {}
}
```

## 009. Backend Setup

Teacher give us a pre-built project but that was on Strapi@3 but the latest is Strapi@4, I am working with version 4, thats why the database import is not working. need add products manually, and there is thr Shopping Cart collection. I've not added yet, it will be explain later. And the api uri is also changed, to achieve the same as video I need to make the uri like this `localhost:1337/api/products/?populate=picture` this will include all the picture. By default it does not include the picture field.As the video shown, i build the project and start it from `npm run start`. Need to learn more about `strapi`.

# 08 Data Fetching

## 001. Displaying the Products

Lets work with dummy post data first.

```js
[
  { id: 1, title: "first product" },
  { id: 2, title: "second product" },
];
```

now we can show it as unordered list.After that we need to get the data from our backend server. we can use fetch for it, even though fetch is available in browser not in node, next-js already include the fetch module for us.After he talked about to fetch the data at server side (with getStaticProps) or with client side (using react hook). He encourage to build by myself. so there will be two files, index and index-1. we will build both solution and will see there advantages and disadvantages.

## 001A. exercise

created getProducts lib,products values are inside attributes property,created both client side load using `getStaticProps` and server side load using `useState` and `useEffect`.

## 002. Fetching Data Server side

Same as what i did, only added extra function to trip down extra details from product, and only took `id` and `title`

## 003 fetching Data client-side

we can use `then` chaining to perform our async operation, then it will required less code.

```js
getProducts().then((products) => setProducts(products));
```

We can reduce the code even further, since then and setProducts accept the parameter products, we can simply pass `setProducts` function, this will work same.

```js
getProducts().then(setProducts);
```

Now in server side approach, the products is loaded in server side, then it serve the page with rendered products content, which will then hydrated. this will produce faster loading.It also good for search engin.

In client side approach, server will send an empty array to client, then client side hydrate it and then load the products, it will display little-bit slow.It is not good for search engin.

However using the server side approach we will not have the latest data while using the client side approach we will have latest data.
comparison

## 004. Incremental Static Regeneration,ISR

We know that SSG are good for page loading time, But we also need a way to show updated data, next-js solve this problem by ISR. in getStaticProps we can also set `revalidate` property other than `props`, revalidate accept number as number in seconds. `revalidate` do a smart job to regenerate the static page with updated data. lets say the revalidate time is 30 seconds. So when a page get a request from browser is make an expire time of old static page, then after the if the page is get a request then it will re-process it get static props and generate new static page, but to make a faster user experience it serve the old file immediately, the update is done in background and also set the expire.

we call it server side option 2,file name `index-server-2.jsx`. it solves our problem smartly.Though in dev mode the revalidate occur on every request, but in production mode it behave as mentioned earlier. revalidate code example

```js
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}
```

## 005 Server-side Rendering

we have another option in server-side rendering, it will render at all the request it receive from server,the way we do it we write same function like `getStaticProps`, and rename the function name `getServerSideProps`, `getServerSideProps ` only accept `props` property, like in `getStaticProps` we can add revalidate property but in `getServerSideProps` we only send `props` property.let us see the build of our current project.

![1](screen-shots/005%20Server-side%20Rendering-1.jpg)

Here we can see that the page `index-server-3` has (λ) lambda symbol.Means it will render each time a request is made and like same way when we are in dev mode and for all server side rendering cases it re-render the page.

## 006. API Routes

we already have our backend api, why we need any other api route.Because then we can control what data need to send and also hide the strapi from client. we can do this in next-js. next js also support backend api. the api is called every time it gets request. the handler function look like this.

```js
import { getProducts } from "../../lib/product";

async function handler(req, res) {
  const products = await getProducts();
  console.log("[products] [handler]");
  return res.status(200).json(products);
}
export default handler;
```

we write a handler function and make it default export. handler function receive 2 parameter request and response, we can write it in shorthand `req,res`, this is similar to express in node. to send a response we use the res object and send it in json method like this `return res.status(200).json(products);` then we can confirm it by a GET request at `localhost:3000/api/products`. It is called backend for front-end pattern.

## 007. Calling Api Routes

Now are going to use this internal api in our app, I've copied the code of `index-client.jsx` to `index-client-internal-api.jsx`.updated code the use the internal api

```js
useEffect(() => {
  (async () => {
    const response = await fetch("/api/products");
    const products = await response.json();
    setProducts(products);
  })();
}, []);
```

Note: useEffect cannot use async function, thats why we use an anonymous function then immediately invoked it,`(()=>{})()`

after running both page we get simillar result.

**For external api**: we can see that the size of the file `11.7k` and response time `28ms`  
![1](/screen-shots/007.%20Calling%20Api%20Routes-2.jpg)

**For internal api**: the size of the page is only `432 B` and response time `40ms`, here the response time is little bit more, since it need to process the external data on server side. But the content size is reduce heavily, It also helps us to hide our external api so that our backend api is not exposed to the world.
![1](/screen-shots/007.%20Calling%20Api%20Routes-1.jpg)

in next video we will see which option will be best for us.

## 008 Choosing a data fetching strategy

There are roughly five ways to show data to client,
1 Sever side rendering

- A. Static generation, using `getStaticProps`,data fetched at build time
- B. Incremental Static Regeneration, using `getStaticProps`+`revalidate`, data fetched at build time, plus at every revalidate time
- C. Server side rendering, using `getServerSideProps`,data fetched at runtime on every request.

2 Client side rendering

- A. With external api, using `useEffect and useState`, data fetched on client side on every update
- B. With using next-js internal API routing,same as above but using next-js api route.

we can view this from the image below-
![Fetching Data with next-js](/screen-shots/008%20Choosing%20a%20Data%20Fetching%20Strategy/008%20Choosing%20a%20Data%20Fetching%20Strategy-00h02m32s633t.png)

here we can see that we have couple of option
option 1A,1B,1C is good for SEO, 1A,1B is faster, since those are static page.And is we want to host static web or can't use next-js or node as backend then we have only 1A,B1,B2 options. So every options that their benefits and drawback.
To make the decision.
We can follow the flow chart below -
![Flowchart](/screen-shots/008%20Choosing%20a%20Data%20Fetching%20Strategy/008%20Choosing%20a%20Data%20Fetching%20Strategy-00h06m03s067t.png)
**Same data for all users?**

1. **Yes**->Can the data change?
   - **No**->`Static Generation`
   - **Yes**->`Incremental Static Regeneration`
2. **No**->API accessible from browser?
   - **Yes**->`Client-side from external API`
   - **No**->`Client Side Via API Route`

In this flow chart we have seen than there is no mention of `getServerSideProps`, Because there are other options in next-js those are better than this.

We also come to the understanding that for our product page it will be good for us to use the ISR. So we will only keep the ISR version and remove other files.

## 009 Product page links with exercise

Updated Link(used next-js Link Component) in index page,

```jsx
{
  products.map(({ id, title }) => (
    <li key={id}>
      <Link href={`/products/${id}`}>
        <a> {title}</a>
      </Link>
    </li>
  ));
}
```

For the exercise, created a `products/[id].jsx` page, created `getStaticPaths` for the valid id's,

```js
export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map(({ id }) => ({ params: { id: String(id) } })),
    fallback: false,
  };
}
```

Note: to use `getStaticPaths` we must create the `getStaticProps`,then using this paths we get the product details in `getStaticProps`

```js
export async function getStaticProps({ params: { id } }) {
  const product = await getProductDetails(id);
  return {
    props: { product },
  };
}
```

in `lib->product.js` we created a function to strip down only required fields,

```js
export async function getProductDetails(id) {
  const response = await fetch(`${API_BASE}/products/${id}?populate=picture`);
  const product = await response.json();
  const {
    attributes: { title, description, price, picture },
  } = product.data;
  console.log(title, picture);
  const {
    attributes: { width, height, caption, url },
  } = picture.data[0];
  return {
    title,
    description,
    price,
    picture: {
      width,
      height,
      caption,
      url,
    },
  };
}
```

## 010. Product Page

Same as i did, there are few small improvement, the page use the same structure from `index.jsx` page, and for single product details used the same stripFunction, but since im using latest Strapi, and its structure is different, I used separate implementation.
Note: the id value provided by database is `Number` but the value provided by next-js params is `String` to we need to convert it to string `id.toString()` or `String(id)`
