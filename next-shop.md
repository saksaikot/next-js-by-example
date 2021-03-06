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

Here we can see that the page `index-server-3` has (??) lambda symbol.Means it will render each time a request is made and like same way when we are in dev mode and for all server side rendering cases it re-render the page.

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

## 011. Regenerating Product Pages

As fer now our product page is only static page, But it will not update the content is the content is updated in the database, so we need to add `revalidate` property in `getStaticProps`.
**Note**: We need to use ISR, means add the revalidate property everywhere we using the data, since we used the product data in homepage and product page we must use ISR in those page.

## 012. Fallback blocking

We have a problem in our code, Now if we add any new product then because ISR our index page will add the new product but since the validate path we defined are fetched at build time it will not make the new product valid and will through `404` page not found.Here comes into play the fallback property, fallback property have three values `false`,`true`,`"blocking"`,
`false`: Means will show 404 page,
`true`: means, it will send the page with empty values, and in background it will fetch the data and will generate the json props.then it send the props.
`blocking`: means, it will first fetch and render the page and then it send the response it is same as `SSR` , server-side rendering.

## 013 Fallback and page not found

Our code has still a problem, if we enter a product id that is not exist, then next-js will try to fetch the data from cms api, but cms api only send the text `Not Found` with `404` status code.With our current code, our function will try to parse it as json.So we need to make sure it handle that error.
We can simply make a common fetchJson function to fetch and handle errors, and check in the `getStaticProps` if there is any error.

```js
async function fetchJson(url) {
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error(`Product not found ${response.status}`);
  } else if (response.status !== 200) {
    throw new Error(`Internal server error ${response.status}`);
  }
  const data = await response.json();
  return data;
}
```

In product page

```js
try {
  const product = await getProductDetails(id);
} catch (err) {
  return { notFound: true };
}
```

**Note**: I was facing problem to understand the concept, I need to check error in `setStaticProps`, but i was checking in `setStaticPaths`, as `setStaticPaths` run only build time and i should check the error in `setStaticProps`

## 014. Shared fetchJson function

I already used the fetchJson function, but since it is not a product action we can simply make it separate lib of api. Then we can check that our app is functioning as before.

## 015. Custom Error class

Our logic has a mistake, if for somehow cms api does not return any thing, ie: it can be down for some reason, then our page can show same `404` error, but this is not good, if it happens then search engin can remove the product from search engin, so we need to proceed the error more accurately.so we can tell when the product is not found and when it is an internal error.

But first we need to learn about `Error` class extension.

```js
class MyError extends Error {
  constructor(foo = "bar", message) {
    super(message);
    this.name = "MyError";
    this.foo = foo;

    // to add a proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MyError);
    }
  }
}
```

we here we extends Error class, in constructor we can accept any parameter and our message, then we need to call super with this message, then we need the set Error name to our error class name. If we want to include proper error stack trace then we need to bind the this to our class,`Error.captureStackTrace(this,MyError)`.
using this we can implement our new Error class

```js
export class ApiError extends Error {
  constructor(url, status) {
    super(`${url} has a status code of ${status} `);
    this.name = "ApiError";
    this.url = url;
    this.status = status;
    // set proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
```

now we can check easily if the error is a instance of ApiError `err instanceof ApiError`, ApiError must be imported,

```js
export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProductDetails(id);
    return {
      props: { product },
      revalidate: 5 * 60,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      // console.log(err);
      if (err.status === 404) return { notFound: true };
    }
    throw err;
  }
}
```

**Note: product must be used inside the try block other wise it will throw error.I was getting error while build.**
With this we solve our 404 and 500 error handling.

## 016. Environment variable

Next-js support environment variables out of the box, there are four main `.env` files,

1. `.env`, here we can keep general values of default values.
2. `.env.development` here we can keep the value we want to override in development mode,ie: `next dev`
3. `.env.production` here we can keep the value for production,ie: `next start`
4. `.env.local` here we can keep the local values and secrets we need for our app, this file should not include in the version control, so it must be include in .gitignore file, create-next-app by default includes it.

So here we can define same values, but `4>3>2>1` means `.env.local` will override the value of 3, or 2 will override value of 1.

we can use variable in .env files

```env
PORT:8000
HOST:http://localhost:$PORT
EXAMPLE:${HOST}/new
```

**Note**:here next-js will automatically expand variable, here \$PORT will be auto expand.Since next-js uses `$`,if we want to use `$` in our value then we need to scape it `\$`
**Note**: we need to be alert that value of `.env` are always string, we need to make appropriate data casting before we can use it.
**Note**: we cannot use object destructuring, because next-js process it to separate server secrete.
**NOTE**:We can access those value in `process.env.VALUE`.
Note: We need to restart our app to process newly added keys to .env files.

**Note:I forgot to parseInt in revalidate value**

# 09 Responsive Design and Image Optimization

## 001 Product Card

created styled card component `ProductCard` for index page, used tailwind css to style the component.Used image from dummyimage.com `https://dummyimage.com/320x240`
used tailwind css:

- `border`:`border-width:1px`
- `w-80`:`width:20rem` or `320px`
- `my-4`:`margin-top:1rem;margin-bottom:1rem;`
- - `hover:ClassName`: will affect in hover state

- `p2`:`2 is .5 rem`
- `flex`:`display:flex`;
- `justify-between`:`justify-content:space-between`
- `items-baseline`:`align-items:baseline`
- `text-lg`:`font-size:1.125rem;line-height:1.75rem` `18px,28px`
- `font-semibold`:`font-weight:600`
- `shadow`:` --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);`

- `shadow-xl`:`--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);`

```jsx
<div className="border  w-80 my-4 shadow hover:shadow-xl">
  <Link href={`/products/${id}`}>
    <a>
      <img src="https://dummyimage.com/320x240" alt="" />
      <header className="p-2 flex justify-between items-baseline">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span>{price}</span>
      </header>
    </a>
  </Link>
</div>
```

## 002. Responsive Grid

Added grid to ul in index page,By default we should design the mobile view then we can make the change as per the breakpoint,
we can prefix `md:`-768px, `lg:`-1024px, `xl`-1280px,
to make the grid consistence I make the image to have full width `w-full` and gave the li to `w-12/10 ` 83.33% width

```jsx
<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></ul>
```

here

- `grid`:`display:grid`
- `grid-cols-2`:`grid-template-columns: repeat(2, minmax(0, 1fr));`

## 003 product images

now we need to add our image url in the get products function and add it to `index.jsx` page.

Next-js has a build-in `Image` which optimize the image automatically, but it must contain the height and width props.
We must whitelist domain before using the Image component, Image component will fetch the image and make the optimization

```js
module.exports = {
  //....
  images: {
    deviceSizes: [320, 600, 750, 1080],
    domains: ["localhost", "127.0.0.1"],
  },
};
```

Here is the jsx of image component

```jsx
<Image
  className="w-80"
  src={url}
  alt=""
  width={320}
  height={240}
  quality={90}
  placeholder="blur"
  blurDataURL={base64}
  priority={id < 7 ? true : false}
  layout="fixed"
/>
```

some common props and there uses

- `quality`: image quality 1 to 100,default is 75,
- `priority`:true/false, default false. when false it will be lazy loading. when true it will be added in pre-load meta and load immediately.You should use it on any image that is on Largest Contentful paint.
- `placeholder`:`blur`/`empty`,default is `empty`, If the image is from local file then next will generate the placeholder automatically.
- `blurDataURL`: must be base64 encoded image and must `placeholder` is set to `blur`
- `layout`:

### Layout

The layout behavior of the image as the viewport changes size.

| layout                | Behavior                                               | srcSet                                                             | sizes |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ | ----- |
| `intrinsic` (default) | Scale down to fit width of container, up to image size | 1x, 2x (based on imageSizes)                                       | N/A   |
| `fixed`               | Sized to width and height exactly.                     | 1x, 2x (based on imageSizes)                                       | N/A   |
| `responsive`          | Scale to fit width of container                        | 640w, 750w, ... 2048w, 3840w (based on imageSizes and deviceSizes) | 100vw |
| `fill`                | Grow in both X and Y axes to fill container            | 640w, 750w, ... 2048w, 3840w (based on imageSizes and deviceSizes) | 100vw |

After that installed image optimization package `sharp`, it it recommended by the next-js for production and i used it to generate blur image for Image component.
image lib file i used for generating blur image

```js
import sharp from "sharp";
async function generateImageBlur(url) {
  const imageBuffer = await fetch(url)
    .then((res) => res.buffer())
    .then((buffer) => {
      return sharp(buffer).resize({ width: 16 }).webp().toBuffer();
    })
    .catch((err) => {
      console.log(`Couldn't process: ${err}`);
    });
  const imageBase64 =
    "data:image/webp;base64," + imageBuffer.toString("base64");
  return imageBase64;
}

export async function addImageOptimization(
  items,
  largestContentfulPaintAmount
) {
  const optItems = [...items];

  const imageProps = {
    placeholder: false,
    blurDataURL: false,
    priority: true,
  };
  for (let index = 0; optItems.length > index; index++) {
    optItems[index].imageProps = imageProps;
    if (index >= largestContentfulPaintAmount) {
      const blurDataURL = await generateImageBlur(optItems[index].url);
      optItems[index].imageProps = {
        placeholder: "blur",
        blurDataURL: blurDataURL,
        priority: false,
      };
    }
  }
  return optItems;
}
```

here i took the number of images that are on `largest contentful paint`, means those are LCP will add priority and those are not will add the optimization.
**Note: sharp is node only package, cannot run inside browser. my code was failing, but after lot of testing i could solve this. by adding this line to `package.json`**

```json
{
  //....
  "browser": {
    "sharp": false
  }
}
```

By adding `"browser": { "sharp":false }` i manage to run the programme again.
**Note: For Image component there can be a race condition, because of that image will not load in the browser. So i need to use the canary version of next,`npm i next@canary`**

Difference in priority and optimized image

1. priority
   ```html
   <head>
     <link
       rel="preload"
       as="image"
       imagesrcset="/_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Fzz_plant_f67237012f_b94a088c46.jpg&amp;w=320&amp;q=90 1x, /_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Fzz_plant_f67237012f_b94a088c46.jpg&amp;w=750&amp;q=90 2x"
     />
   </head>
   <body>
     <span
       style="box-sizing:border-box;display:inline-block;overflow:hidden;width:320px;height:240px;background:none;opacity:1;border:0;margin:0;padding:0;position:relative"
       ><img
         alt=""
         srcset="
           /_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Fzz_plant_f67237012f_b94a088c46.jpg&amp;w=320&amp;q=90 1x,
           /_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Fzz_plant_f67237012f_b94a088c46.jpg&amp;w=750&amp;q=90 2x
         "
         src="/_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Fzz_plant_f67237012f_b94a088c46.jpg&amp;w=750&amp;q=90"
         decoding="async"
         data-nimg="fixed"
         class="w-80"
         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
     /></span>
   </body>
   ```
2. optimized
   ```html
   <span
     style="box-sizing:border-box;display:inline-block;overflow:hidden;width:320px;height:240px;background:none;opacity:1;border:0;margin:0;padding:0;position:relative"
     ><img
       alt=""
       src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
       decoding="async"
       data-nimg="fixed"
       class="w-80"
       style='position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;filter:blur(20px);background-size:cover;background-image:url("data:image/webp;base64,UklGRsgAAABXRUJQVlA4ILwAAACwAgCdASoQAAwAAUAmJbACdAYrv5V9C3/SDhgDRQAA/vZ8Fyyf/v7qqDyvwIvfWFK6wz98dvvunbbn0vHoLdv8etSqQH+XdXDvJJ5RWZkQsCr9+gJbvVWbuXlsi+oCaYfnvXWPIr5nsn/7hWCj+SZGBfzUfeXjAbghH3Jy+0+/W/3ElPza4o17j6UfgF1rc80Y+ETnT2WfWo9VKHcBDbMiMUI/4wO0BTDJ4e1aq3M/+kuwNb18u9CRq4pcAA==");background-position:0% 0%' /><noscript
       ><img
         alt=""
         srcset="
           /_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Faloe_vera_3b8dc523d2_eb110c1fb5.jpg&amp;w=320&amp;q=90 1x,
           /_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Faloe_vera_3b8dc523d2_eb110c1fb5.jpg&amp;w=750&amp;q=90 2x
         "
         src="/_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2Faloe_vera_3b8dc523d2_eb110c1fb5.jpg&amp;w=750&amp;q=90"
         decoding="async"
         data-nimg="fixed"
         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
         class="w-80"
         loading="lazy" /></noscript
   ></span>
   ```

## 004 Next Image component

Already added in previous section

## 05. Responsive product image

Created unified OptImage component,

```jsx
<Image
  src={src}
  alt=""
  width={width}
  height={height}
  quality={90}
  {...imageProps}
  // layout="fixed"
/>
```

added this jsx for responsive style

```jsx
<>
  <section className="flex flex-col md:flex-row gap-2 justify-between">
    <div className="w-full">
      <OptImage src={url} width={640} height={480} imageProps={imageProps} />
    </div>
    <main className="flex-1">
      <p className="">{description}</p>
      <footer className="text-lg font-medium mt-3">
        <p>{price}</p>
      </footer>
    </main>
  </section>
  <style jsx>{`
    section > * {
      flex-basis: 100%;
    }
  `}</style>
</>
```

Fixed data structure of single product details to use the `addImageOptimization`

# 10 Authentication

## 002. Strapi new setup

Strapi needs node 16 lts, latest version was giving 500 server error when using auth

## 001. Strapi authentication

Created new Strapi project `next-shop-strapi`,having problem with auth, i was getting 500 server error. It was due to using the latest node 17 version, but using node 16 lts solve that problem,in the new `next-shop-strapi` i removed .db,.sqlite.,.sqlite3 and public folder, so that my project is saved to git. to reinstall the project just download the `next-shop-strapi` branch, and add the .env file.

```env
APP_KEYS=KEY1,KEY2,KEY3,KEY4
JWT_SECRET=JWT_SECRET_KEY
API_TOKEN_SALT=Salt
DATABASE_FILENAME=.data/database.sqlite3

```

Now we will see how authentication works in strapi.
To **register a new user** we need to make `POST` request to this endpoint `http://localhost:1337/api/auth/local/register`, with `Content-Type: application/json` and json data of `username`,`email`,`password`

```http
POST http://localhost:1337/api/auth/local/register
Content-Type: application/json

{
  "username":"charlie2",
  "email":"charlie2@email.com",
  "password":"Charlie2123"
}
```

and the response will be

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ1MjUzNjcwLCJleHAiOjE2NDc4NDU2NzB9.Dz-DLDNZL0smMVdFMR9zdup6FuoHD4Uh5G5Hm0oUFwA",
  "user": {
    "id": 5,
    "username": "charlie2",
    "email": "charlie2@email.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2022-02-19T06:54:30.162Z",
    "updatedAt": "2022-02-19T06:54:30.162Z"
  }
}
```

To authenticate user

```http
POST http://localhost:1337/api/auth/local
Content-Type: application/json

{
  "identifier":"alice",
  "password":"Alice123"
}

```

Response

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ1MjUzNzUzLCJleHAiOjE2NDc4NDU3NTN9.pmr5bveN2kUGfRXMY4XeofPmFkGk0oyF7wqORAIUTo0",
  "user": {
    "id": 3,
    "username": "alice",
    "email": "alice@email.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2022-02-18T19:35:57.193Z",
    "updatedAt": "2022-02-18T19:35:57.193Z"
  }
}
```

here we can see that the registration and login response is same.

to get cart-items as authenticate user

```http
GET http://127.0.0.1:1337/api/cart-items
Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ1MjE0NjAzLCJleHAiOjE2NDc4MDY2MDN9.BENiDZQXzMbiVUVoQ3b5NKV_SalqR0UwMc2p8ri3mxE

```

response

```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

to get information about authenticated user

```http
GET http://127.0.0.1:1337/api/users/me
Authorization:  Bearer JWT_TOKEN

```

response

```json
{
  "id": 3,
  "username": "alice",
  "email": "alice@email.com",
  "provider": "local",
  "confirmed": true,
  "blocked": false,
  "createdAt": "2022-02-18T19:35:57.193Z",
  "updatedAt": "2022-02-18T19:35:57.193Z"
}
```

## 002. Common Page Component

since we are using same structure it will be good to have a common page component.The page component will have a title props and children props,

```jsx
<>
  <Head>
    <title>{title} - Next-Shop</title>
  </Head>
  <main className="p-3">
    <Title>{title}</Title>
    {children}
  </main>
</>
```

here in the `Title` we append our app name with title, it help in seo.
now we use this page component in `index.jsx` and `[id].jsx` of product page. and finally add the sign-in page, sign-in page is blank page using the `Page` component for now.

## 003. Sign In Form

To create signin form we created the component needed for the form
`sign-in.jsx`

```jsx
<Page title="Sign in">
  <form>
    <Label label="Email">
      <Input type="text" />
    </Label>
    <Label label="Password">
      <Input type="Password" />
    </Label>
    <Button type="submit">Submit</Button>
  </form>
</Page>
```

`Input.jsx`

```jsx
<input className="border rounded px-2 py-1 w-80" type={type} />
```

`Label.jsx`

```jsx
<label className="block my-2">
  <span className="block my-1 text-gray-700">{label}</span>
  {children}
</label>
```

`button.jsx`

```jsx
<button
  className="bg-green-800 text-gray-200 rounded px-4 py-2 hover:bg-green-700 my-2"
  type={type}
>
  {children}
</button>
```

Tailwind notes:
**background color**:
bg-color_name-[100 to 900], from light to dark
**text color**
instead of bg its text,
text-color_name-[100 to 900]
**hover state** just add `hover:` suffix,
border for add border, `rounded` for rounded border

p for padding , py for top and bottom, py-[number]
m for margin

## 004 from state and validation

now we need to make the button perform an action. To get the value we used `useRef(null)`, but if we pass the ref inside child then we need to use the forwardRef function.
We also make the Input fields required and attached the onSubmit handler
to get the value from useRef `const email=emailRef.current.value`
new updated Input component.

```jsx
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input className="border rounded px-2 py-1 w-80" {...props} ref={ref} />
  );
});

export default Input;
```

## 005. Sign-in API request

we make changes in fetchJson function to accept a second parameter names `options`, which we can pass in fetch to have other options, ie POST request, adding header and body.
then we send the sign in request to strapi auth endpoint, but if we send incorrect details then we get a error which is not handled by our app,

```js
export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  //....
}
```

```js
const response = await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({ identifier, password }),
});
```

## 006. Error and Loading stats

used try and catch to handle the exception, added Error and Loading state to maintain the status,

```jsx
const [status, setStatus] = useState({ loading: false, error: false });
//...
{
  error && <p className="text-red-500">Invalid credential!!!</p>;
}

<Button type="submit" disabled={!loading}>
  Submit
</Button>;
```

## 007. Api route with POST

Now that we have jwt token, we can store it and use it when we need a authenticated endpoint. There are two ways we can store this information, `localStorage` and cookie stored by the server setting `httpOnly`. Using cooking option our data is more secure, cause it will not accessed by any javascript.We already show next-js api route. but now we will try to implement the post request, the post request we can check if `req.method==='POST'`.

```http
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email":"alice@email.com",
  "password":"Alice123"
}

```

Response for POST request

```json
{}
```

and in the console we get the data `{ email: 'alice@email.com', password: 'Alice123' }`
Response for GET request

```http
HTTP/1.1 405 Method Not Allowed
Date: Sat, 19 Feb 2022 14:29:58 GMT
Connection: close
Transfer-Encoding: chunked
```

## 008. Login API Route

Updated login function to get data from cms, handle error

```js
import { fetchJson } from "../../lib/api";

export default async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const response = await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const {
      jwt,
      user: { id, username },
    } = response;
    console.log("[loginHandler]", response);
    return res.status(200).json({ id, name: username });
  } catch (error) {
    // console.log(error);
    return res.status(error.status).end();
  }
}
```

## 009 Setting a Cookie

added code to set the cookie from server,when sending the res object we can use `setHeader(key_name,value)`, and since cookie needs a specific format we can use npm cookie library to serialize our information.
we set `Set-Cookie` as key, and the cookie information in `cookie.serialize`,in cookie serialize we set name of the key `jwt`, its value and the options, `path:"/api"` the paths it will include the cookie, `httpOnly`- no javascript access,`maxAge`: expires time

```js
return res
  .status(200)
  .setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", jwt, {
      path: "/api",
      httpOnly: true,
      maxAge: WEEK_IN_SECONDS,
    })
  )
  .json({ id, name: username });
```

now if we make the request then we can get this type of response

```http
HTTP/1.1 200 OK
Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ1Mjg5Njg2LCJleHAiOjE2NDc4ODE2ODZ9.XONVKvB9t2yWCGK__zmtp2oyhH38rkzt3_NaqiaGac0; Max-Age=604800; Path=/api; HttpOnly
Content-Type: application/json; charset=utf-8
ETag: "17-GhLOWuPAeQJsneKlLNER/m0FfCI"
Content-Length: 23
Vary: Accept-Encoding
Date: Sat, 19 Feb 2022 16:54:46 GMT
Connection: close

{
  "id": 3,
  "name": "alice"
}

```

## 010 NavBar with Authentication

added Navbar and dummy user object,

```jsx
const user = undefined;
return (
  <nav className="py-3 px-2">
    <ul className="flex justify-between">
      <li className=" text-lg font-semibold">
        <Link href="/">
          <a>Next Shop</a>
        </Link>
      </li>
      {user ? (
        <li>
          <span className="mr-3">{user}</span>
          <span>
            <button>Sign out</button>
          </span>
        </li>
      ) : (
        <li>
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </li>
      )}
    </ul>
  </nav>
);
Another approach to have space between two inline element `<li role="separator" className="flex-1"></li>`
```

## 011 User Api route

Now that we have saved our jwt in cookie, but we don't have the user details.To solve that we can make a next-js user api, when we sent a get request to `/api/user` it will get the jwt from cookie and using this jwt it will get the details from CMS, and then it will send user details
`pages/api/user.js`

```js
const { jwt } = req.cookies;
if (!jwt) return res.status(401).end();
try {
  const response = await fetchJson(`${CMS_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  // console.log(response);
  const { id, username: name, email } = response;
  return res.status(200).json({ id, name, email });
} catch (error) {
  return res.status(error.status).end;
}
```

## 012. Loading user data

we can use `useState` and `useEffect` to load the data from user api and also can use `useRouter` from `next/router` to redirect from sign in page
To redirect from a page

```jsx
import {useRouter} from "next/router";
{
  const router=useRouter();

  //
  now redirect
  router.push("/");//location of the path
}

```

**Note:the router object has other methods.**
Now loading the user data

```jsx
const [user, setUser] = useState();
useEffect(() => {
  (async () => {
    try {
      const response = await fetchJson("/api/user");
      setUser(response);
    } catch (error) {}
  })();
}, []);
//.....
<span className="mr-3">{user.name}</span>;
//....
```

Now that we can get the user details and we are using useEffect and the NavBar component is in all pages, so every time we load a page it will get the user details again.To solve the problem we will use cache to store user information.

## 013 Signing out

To logout the user we cannot implement client side code, since the cookie is not accessible from browser.So we need to set it from server. so we make a logout end point where we set the cookie value if `jwt` to empty and make the expires to past date so that browser delete is ASAP.

`logout.js`

```js
return res
  .status(200)
  .setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      path: "/api",
      httpOnly: true,
      expires: new Date(0),
    })
  )
  .json({});
```

Now we just add the on click event on sign out button, request the logout endpoint and on successful request set the user value `undefined`
`NavBar.jsx`

```jsx
const handleSignOut = async () => {
  const response = await fetchJson("/api/logout");
  setUser(undefined);
};
```

# 11 React Query

## 001 Why React Query

In our app there are some limitation,

1. Navbar requesting user data on every page
2. we cannot access the user data on other component
3. every time we make a request to our api it will require error and loading state.

To solve this type of problem with other improvement feature, we have SWR and React query

1. SWR: Stale While Revalidate, is develop by same next-js company.
2. React-query: Now it is a popular alternative. [website](https://react-query.tanstack.com/). From their site, react query is for- fetch, cache and update data for react and react-native application, without touching any global state. Advantages-
   - caching
   - deduplication multiple request into single request
   - updating out of date data
   - knowing when the data out of date
   - performance optimization
   - managing memory
   - memorizing query result

we will use react query,it is a data caching system
**how to setup for react query?**

1. 'npm i react-query'
2. setup the global `_app.jsx` page
   1. import `QueryClient`,`QueryClientProvider`, `import {QueryClient,QueryClientProvider} from 'react-query'`
   2. create queryClient object,`const queryClient=new QueryClient();`
   3. wrap everything with QueryClientProvider with client `<QueryClientProvider client={queryClient}>...</QueryClientProvider>`

It will set our next-js app to use the react-query

## 002. useQuery hook,

first import the useQuery from react-query,`import {useQuery} from 'react-query'`

useQuery accept 3 parameters, 1st key, 2nd the value function, 3rd options.
our used code is

```js
const { data: user } = useQuery(
  "user",
  async () => {
    try {
      const response = await fetchJson("/api/user");
      return response;
    } catch (error) {
      return undefined;
    }
  },
  {
    staleTime: FIVE_MINUTES,
    cacheTime: Infinity,
  }
);
```

Here we just returned the user value,
useQuery options- there are many options, but we used-
`staleTime`: time to expires the data, when the expires time pass,the data is set to be revalidated. Is it not do it exactly after staleTime, the revalidation done after next page request or focus window change.
`cacheTime`: the time data should be in memory, default is 5 minutes, here we set it `Infinity`, which means keep the data as long as possible.

Note: if there is no options defined then the default options is passed, from the default options there are two we need to know-

1. `staleTime`: default time is 0, means revalidate on every request
2. `refetchOnWindowFocus`: default is true. it will revalidate the data on window focus.
   Thats why when is no option is provided then react-query will do more request to api

Note: there are other options available that will be helpful in case of feature like messenger.

## 003. useUser custom hooks

what is custom hook?
Custom hooks are a way of reusing stateful login, separate component calling same custom hook are isolated, so there state can be deferent.
We already used the custom hook useQuery, but we used it get user data, but if we need the user data elsewhere we need to use same code, instead we can make our own custom hook, the name of the custom hook is start with `use`, for our case we named our function `useUser` which return the value of user.

```js
import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
const FIVE_MINUTES = 60 * 5 * 100;

export function useUser() {
  const { data: user } = useQuery(
    "user",
    async () => {
      try {
        const response = await fetchJson("/api/user");
        return response;
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: FIVE_MINUTES,
      cacheTime: Infinity,
    }
  );
  return user;
}
```

by using this hook we can now use the user in any component.
**Note: i make the header sticky, by adding `position:sticky,top:0,background-color:white,z-index:10`**

## 004. useMutation Hook

we can use useMutation hook when we generally perform `POST/PUT/PATCH/DELETE` request, that is when the server is doing something,unlike useQuery executed and cached immediately, useMutation need to be called.
Note: hooks needs be inside react component.
code example

```js
const signinMutation = useMutation(async () => {
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  const user = await fetchJson(`/api/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return user;
});
const handleOnsubmit = async (event) => {
  event.preventDefault();
  try {
    const user = await signinMutation.mutateAsync();
    router.push("/");
    console.log("signin response", user);
  } catch (error) {
    //isError in signinMutation
  }
};
const { isloading: loading, isError: error } = signinMutation;
```

here we passed the function we need to executed inside `useMutation`, useMutation doesn't cache data, but it main tain the error and loading state, so we don't need to maintain them. then we can call it asynchronously by `mutationObject.mutateAsync()` ;

## 005. Updating the Query cache

to update a query cached data,

1. import useQueryClient `import {useQueryClient} from 'react-query'`
2. assign to a const, `const queryClient=useQueryClient()`;
3. set the value, queryClient.setQueryData('KEY',value);

```js
import { useQueryClient } from "react-query";
//...
//inside component
const queryClient = useQueryClient();

//set the data after successful fetch
queryClient.setQueryData("user", user);
```

Using same fixed the logout button,
**There was a bug, while using the mutation, i did not return a value in `useMutation()`**

## 006 useSignIn custom hook

**Note: I was getting error on hook calling, accidentally i called `useSignIn` instead of `signIn`**
hooks and custom hooks must be called at top of the function.

```js
export function useSignIn() {
  const queryClient = useQueryClient();

  const signinMutation = useMutation(async ({ email, password }) => {
    const user = await fetchJson(`/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return user;
  });
  return {
    signInError: signinMutation.isError,
    signInLoading: signinMutation.isLoading,
    signIn: async ({ email, password }) => {
      try {
        const user = await signinMutation.mutateAsync({ email, password });
        queryClient.setQueryData("user", user);
        return user;
      } catch (error) {
        return undefined;
      }
    },
  };
}
```

## 007. useSignOut custom hook

```js
export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));
  return {
    signOut: async () => {
      try {
        await mutation.mutateAsync();
        queryClient.setQueryData(USER_QUERY_KEY, undefined);
      } catch (error) {}
    },
  };
}
```

# 12 Shopping Cart (Exercises)

## 001 Cart Items Collection

Fixed cart-item per user rules
controller/collection-type.js

## 002. cart item GET next-api

Added internal Get request at `/api/cart-items`
