# Next js by example - Mirko Nasato

# 01 Getting Started

## 001. Next blog - overview

Overview talks about the things it wll cover -

- how to setup next.js project
- what is pre-rendering
- How page navigation and Routing works in next.js
- styling components with styled jsx
- Loading data from a markdown page, this is similar of loading data from api
- How dynamic routes work
- Dark mode theme switch
- how hydration works, which is server side rendering to incorporate in client side rendering
- Deployment with vercel or any other hosting.

## 003. Next.js project setup

### way to install

1. using npx or yarn - `npx create-next-app@latest` or `yarn create-next-app@latest`
2. with typescript support `npx create-next-app --ts` or `yarn create-react-app --typescript`
3. using a normal npm project, entirely from scratch

#### Installing from the scratch

- Create empty package.json in the project folder. add name and private property. name is the package name and private is true, since it is not a library.**Name need to be without space**.
- then install `next` `react` and `react-dom` packages `npm i next react react-dom`
- all packages will be installed under `node_modules` folder.
- inside `node_modules` folder there is a bin folder where all the executable files are located
- we will use the next executable file which is inside the bin folder
- we can execute it by npx and the executable file name, ie:`npx next`, and to run the next help argument `npm next --help` which will show us the help instruction of next command.
- we will mainly use `dev,start,build,export`
- to start the server in development mode we execute `npx next dev`
- Soon we execute the command it will give us an error message that the `pages` folder not found, you need to create the pages folder in the project directory.
- since we are going to use it frequently we can make an alias of this command so we can run it from `npm run`, we need to create a property in package.json under scripts property like "command-name":"command" `"scripts":{"dev":"next dev"}`,also we can add other command shortcut as well.
- now we can run the next dev by simply `npm run dev`
- after running the command our server will running in `localhost:3000`, if we open it we will see a 404 not found page, because we don't have any page inside pages folder.
- we can add index.js file inside the pages folder. it is the default file for the root address or for `localhost:3000`. it is simply a react component.
- added a index.jsx react functional component with `hello world`
- It also support hot refreshing, means it will run the updated code after saving.
- when running the next dev command it will create a `.next` folder, which is used by next to keep temporary build files. we need to remove it from git or any other version controlling system. we need to add the node_modules folder as well.
- we already build our first next app, which is simply a react page, but how its work is different than the react.

## 004 Source code

All codes are in github repository [next blog](https://github.com/mirkonasato/next-blog).all the videos are committed there. to view the commits there is a link under code download button. to view the changes you need to visit the commit link named by the video file. In this next-blog there will file up to section 6. to view the code with file you need to visit the commit and then from top right there is a link of `Browse files` to see the files at that point.teacher also talks about the q/a section of udemy but this is not the scope here.

## 005. pre-rendering

In react the html page that loaded by the browser, only has a div with id root,ie`<div id="root"></div>`. the contents are loaded when the js is executed. So without the js there will be no content.But in next-js with the help of pre-rendering the content is already included in the html file, most of the time, ie`<div>hello world</div>`. with this the page render faster, it also help seo, search engin optimization which helps in search rank as well.

## 006 . Development vs production

If we put a console log in our index page `console.log('[Index page] function called')` we will see that this is get printed both in browser console and the terminal console.this is because when the browser request the page the server first render the file and then it send the file to browser then its again executed.Though this two time rendering is happening because of dev mode also to reflect with latest changes. If it is running under the production mode than there may be only client side rendering.there are times when server side rendering can happen in production mode.

### Production mode

first we need to build the app, `npx next build` then we need to start it `npx next start`. we can add these commands to package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

When we run `npm run build` we will see some outputs:
`Generating static pages` where we will find our `console.log` is printed.The list of pages, in our case the root and 404 pages. in front of pages there is a circle without filled up or same as `o`. Which meant that it is a static page.there are other page type,

- ??, this page are rendered at server runtime(uses `getInitialProps` or `getServerSideProps` )
- o , static page build at runtime
- ??? , filled circle,
  - (SSG, server side generated)automatically generated page at build time , uses getStaticProps + json data
  - (ISR, Incremental Server Regeneration), uses revalidate in getStaticProps.

Then start it with next.`npm run start`, at this time the `console.log` only happening on client side not server side.because the page is already rendered and exported as static page.
The build page can be found in `project-root->.next->server->pages->` folder

# 02 Routing and Navigation

## 001. Adding new pages

next-js uses filesystem based router.It scan the pages folder to get the urls. ie: it expose `about.js` as `localhost:3000/about` url, and subfolder will add deeper or folder path to url as well, `pages->more->about.js` will be `localhost:3000/more/about`. We know that react uses react-router which will uses like this

```jsx
<Switch>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

But next uses built in router which is simple and strait-forward.
Now we can create the about page, which is simple react component.

## 002. Next link component

now we will add a navbar to have links of our page. We can use `a` tag to link, but then we will loose the client side rendering. we can verify that by looking in browser development tools ->network->doc, we will see that the new page is loading from the server. To have the client side rendering next-js has a link component, to use the Link component we need to wrap our `a` tag into `Link` component and move the `href` to `Link`.ie:

```jsx

<a href="/about">about</a>
// to
<Link href="/about"><a>about</a></Link>
```

Inside this Link component we can use other component as well,

## Shared NavBar Component

We have a navbar in `index` page and we want the same navbar in every page. so we need to make a navbar component so we can reuse it. If we make the component inside `pages` folder then it will expose to url automatically. But we don't want this. So we move it to outside `pages` folder. A good practice is to keep our components in `components` folder which is under root of our project.
So inside components folder we can keep any our components.

## 004 Custom App component

We can already see that both the home page and the about page have some common structure. In next-js we can use a special page as a page template which can be used as template and this page will be called every time a page is requested. This special page is named `_app.js`, and it start with a `_`.The basic structure of this page is

```jsx
export default function _app({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

The app function will take `Component` and `pageProps` as argument,for about page the about.jsx will be its `Component` and its props will the `pageProps` and then we need to render it. we can add any additional component we need. here we can make it like a template. Before we can see the changes we need to restart our dev server. This is one of few case where hot refresh will not work.If we put a console.log then we can see that the `_app.jsx` is called before the page.Now we can move the header section here, so that every page can automatically include the header. This means we don't need any header section in the pages any more, and for any new page it will be automatically included.
now the `_app.jsx` will look like this

```jsx
return (
  <>
    <header>
      <NavBar />
    </header>
    <Component {...pageProps} />
  </>
);
```

## 005. Next Head Component

For every page there is title, description and other meta tags. Luckily there is a way in next-js that we can add these information inside our component, and next-js will automatically update it based on the page. the component is `Head`, we can add this anywhere to apply it to header.

# 03 Styling

## 001. Global styles

We can simply add a css file into `_app.js` to import our css, we can also import as many css files we want. we simply styled the nav.

## 002. Component Styles with styled jsx

In global css we can write styles for simple one or two pages. If the project is bigger than writing it in single files can be difficult, in next-js we can write the css in the component, so that the style is not applied in other part and can be easily maintained.to write style in next-js we add a style component with jsx attribute, the css is within `{}`and using text literal ie:

```jsx
<style jsx>{`
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
`}</style>
```

and we can use any styled component that supported by react.

## 003. Images and other Assets

We can put our static assets or files under `public` folder, it will serve as it is. we can put here our images, files. To complete the tutorial we will add a robots.txt and a favicon file. robots.txt to tell search engin to allow all files, and the favicon for the site icon. We can add the icon in `head` section of `_app` page.ie:

```jsx
<Head>
  <link rel="icon" href="icons/favicon.ico" />
</Head>
```

# 04 Loading Data

## 001. First post page

added ul linked list of blog post in home page, created `posts/first-post.jsx`.

## 002. Markdown Syntax

we can store our post files in a markdown file. markdown files have .md extension.
to add a header we start with # then after a space we can write our header `# this is my post header`. to have paragraph just simply write the text. to have bold text `__Bold-Text__` write the text between`__ __` or `** **`, to have a list start the line with a `*`.
created our post markdown file `first-post.md` under `contents` folder

## 003. getStaticProps Function

we can receive props in our component, if we log the props in our post page we will see that the props is empty, cause in a sense it is a top level component. But we can pass props in next.js, to pass props we need build a `async` function called getStaticProps, we need to export the function as well, we can simple return an object then it will be available in the `props` of the component.The return object must return the value inside props key,ie

```js
export async function getStaticProps() {
  return {
    props: {
      prop1: "value1",
      prop2: "value2",
    },
  };
}
```

Now that we can pass props we can pass our title and the body as props. example

```js
export async function getStaticProps() {
  return {
    props: {
      title: "My First Post",
      body: "My first paragraph from getStaticProps",
    },
  };
}
```

now we can use it in our component, like `<title>{title}</title>`, here title is destructured.

## 004 getStaticProps in Production Mode

If we place a console log inside getStaticProps function then we can see that it is called only server side not client side.And this is little bit mix and complex that some codes of same file run only server side and some in client side.next-js doing this in cleaver way and keeping the logic in same page.this getStaticProps is called in the build time and it creates the `ssg` server side static generation including a props json file. this ssg will rendered and will include the content ready, along with this, it will also generate a props json file, which will then use to get the props from client side when we navigate from browser. ie: from home page to post page, it will simply get the json props to render the page and not the whole page.If we build our app then we will see that while building our post page, the getStaticProps called and this page is marked as filled circle which means it generated the static page along with the props json.
![1](/screen-shots/004%20getStaticProps%20in%20Production%20Mode__1.jpg)
If we run the app we will see that the getStaticProps are no longer running in server-side because its already build the static page. But when it run in dev mode to reflect the latest change it call getStaticProps every time .

## 005. Reading a File

Since `getStaticProps` is server side function and its run by node, we can use the node to access file of our app.we can use the `fs` filesystem module of node to access the file.we will use the promise variant.And load a json file for simplicity.
first we import the readFile from fs/promises `import {readFile} from "fs/promises"` then use the readFile function to load the file. `const data=await readFile(file_location,'utf-8')`, here is a note that, the file location is not relative is from the project root, ie `../../contents/posts/first-post.json` will not work but `contents/posts/first-post.json` will work. then simply we parse the json and send it as props.then we can verify in our browser that the post is came from the json file.

## 006. lib module

Lets refactor our code of getting the post data. we made a async getPost function which receive a `slug`, a `slug` is a part of url which identify specific data. our getPost function is like -

```js
async function getPost(slug) {
  const data = await readFile(`contents/posts/${slug}.json`, "utf-8");

  return JSON.parse(data);
}
```

Now we can move the getPost function to other place, since the post page is not concern how the post data is collected. A common approach is to move this type of code under lib folder so we can separate logic of concern.
now our posts.js file under lib is

```js
import { readFile } from "fs/promises";

export async function getPost(slug) {
  const data = await readFile(`contents/posts/${slug}.json`, "utf-8");

  return JSON.parse(data);
}
```

so in `first-post.jsx` we simply import the getPost function and use it as required.

## 007 Rendering Markdown

To convert the markdown to html we can use the library marked, then we can simply use it like this

```js
import { marked } from "marked";
const html = marked(`# header`);
```

`html` will have the html version of the given markdown file

```html
<h1 id="header">header</h1>
```

In the latest marked library the `marked` is not the default export so we need to destructure it.
Since we can convert markdown to html we can now convert out `.md` to html, but this is single file and for now we don't have the title, we can simply send the body, and leave the title for now.
But if we see the post all out html is scaped. because it is inside a `p` tag.to pass html we need to follow special procedure. Because passing html directly have a security issue, anyone can add `script` tag to harm the site, but since it came from our markdown file, we know that we can use it.to use the html we need to set a property and pass the value like this,

```jsx
<Component dangerouslySetInnerHTML={{ __html: value }} />
```

The process is complicated.
Now we can use it to parse the html. We will use `article` instead of `p` since it have other html tags and also it uses the semantic html.

```jsx
<article dangerouslySerInnerHTML={{ __html: body }} />
```

Now we can see our first post parsed our html.

## 008 Front matter

By using the marked we can only extract the body but we need to extract our title as well.In markdown file we can add meta data, this is called front matter. this is written on top and the block is encapsulated by three dash and new line at start and the end. inside we can have data as yml format

```md
---
title: "my first post title"
author: "Saikot"
---
```

**Note: After `:` you need to add a space**
and to extract the front matter data we use the package called gray-matter
gray-matter return two data, `content` and `data` the content is the exact markdown without the front matter block, and the data is object of the front matter provided in the markdown file.
so lets install the gray-matter `npm i gray-matter`
Note: in the getStaticProps we cannot pass `date` data, we need to convert it into number or string, it is a limitation of next-js

## 009. Dynamic Route and getStaticPaths

Lets create another markdown post.Then in posts pages we need to create a new `second-post.jsx` file which will be same as the `first-post.jsx`.But next-js have the dynamic page feature. we can simply make a post page for all of our post pages.Before that we need to change our posts filename in a way that can be exposed for all posts. Let assume, we name the url part of each post is slug, I already noted what is slug. ie, `localhost:3000/post/first-post` and `localhost:3000/post/second-post` here the `first-post` and the `second-post` is slug and this slug is identifying the post page we need.So we need to tell next-js that for all page we accept slug. to expose this slug in posts url we make the file name like this `[slug].jsx`. here inside `[]` meaning this is a special file and anything after the `localhost:3000/posts/` will be placed in slug. ie: `localhost:3000/post/first-post` the slug value is `first-post`. slug is in a sense a wildcard which matches everything after the `/post/` url.But in next-js we need to validate this slug, we need to tell next-js which paths are valid. this is why when we set the filename as wildcard we need to also provide the `getStaticPaths` where we define our valid paths.Now if we look at our request url path we will see that the will be look like this `localhost:3000/post/first-page` we know `first-page` is slug, or it is stored in slug variable. but next-js get it inside `params` object,like this, `{params:{slug:'first-post'}}`, using this concept we can send a paths array, where we mention our valid path as array item. this paths array need to send as object. so like this,

```js
{
  paths: [
    {
      params: { slug: "first-post" },
    },
    {
      params: { slug: "second-post" },
    },
  ];
}
```

Again the getStaticPath need to be async and exported.

Along with the paths property we need to also provide the `fallback` property, the fallback property wii tell what action need to take in case paths are not matched, in our case we want to set fallback as false, ie `fallback:false`, meaning in case we don't have a valid path then show the 404 error message. next-js also provide feature to make the page on-demand if requested page is not found.when we use the `getStaticPaths` our `getStaticProps` can receive the data from the `getStaticPaths` we call it context.If we update the `getStaticProps` to receive the context and log it,we will see this log-

```txt
[Post page] [getStaticProps-context] {
  params: { slug: 'first-post' },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}
```

Here we can see that the context has a params property and inside it slug property, but we need only this slug so we can destructure it at parameter section,ie:`{params:{slug}}`, using this slug we can pass it to `getPost` method to get the post by the url. now we can see the first post from home page link and the second post manually entering the url `localhost:3000/post/second-post`, because we did not setup second post link. but we can see that all are working as expected.

## 010. Listing files in a folder

In getStaticPaths we are manually providing the path or slug, and if we add a third-post.md then again we need add it manually, we can see that the slug array is the files in the `content/posts` folder, so if we can make a list from this files then we don't need to manually enter each slug. we can do this by reading the dir files using `readdir` method of node fs module. first we get all files and filter the files that endsWith `.md` then we need to remove the extension. so we can make a function `getSlugs` to get an array of all slugs.

And in the post page we can use it in getStaticPaths to generate the list of path.Since the `getSlugs` method is returning slugs as array, we can map through it can generate the `params` of `slug` array.
After we can see that we can access the third-post page, though we need to enter the url manually. and with this approach we just add the markdown file of our post and it simply added to our `getStaticPaths` function.

## 011. Listing posts

In the index page we can dynamically add post link, to generate the link we need to have the post slug and the post title of each post. We can make the getPosts function and using our already created function we can make the getPosts method which will have all posts with their slug.  
**NOTE: I need to learn and understand `for..of` and `for..in`**.
Then we can simply pass props using getStaticProps function.
**NOTE: I also have a problem, the props i was sending in `getStaticProps` without giving a key, like ,`{props:props}` but i need to do it like this, `{props:{posts:posts}}`**

# 012. Dynamic routes in production mode

If we build our app then we will see that now the index page and the post pages are SSG, and have filled circle.  
![012. Dynamic routes in production mode](screen-shots/012.%20Dynamic%20routes%20in%20production%20mode.jpg)  
Also we can see that next build three post pages for us. this ssg pages are static. and next-js build this page as static and json. It first uses the `getStaticPaths` to get the paths and the passes it to `getStaticProps` then it passes the props to page and then next.js rendered the page and generate the static html file.We can see our files at `project_root->.next->server`. This information is already written earlier.

**Note: even we write the code for dynamic page but using the getStaticPaths and getStaticProps next-js make it static. and we can use it any hosting provider that only support static page ie: github pages.**

# 05 Client-side Functionality

## 001. ThemeSwitch Component

As we can see our web page has no interactive element other than the nav link.Now we want to add a button in the nav so when it clicked the theme of the page change.we will have a dark mode and light mode.  
we created the `ThemeSwitch` button component. added the functionality if, clicked the darkTheme state will altered and the text will change as well. and added some style.

## 002. Dark Mode Style

For our dark theme we want the text color be white and the background is dark, and for light those are opposite. we can use the custom variable of css to do that, we need to fix the link color as well cause on dark background the link color red is not working well.
And also in dark theme our button color is black, so we need to change it, we can simply put color to inherit
so using these three custom property we can switch the theme manually

```css
/* for light theme */
:root {
  --color: rgb(32, 32, 32);
  --background-color: rgb(252, 243, 243);
  --link-color: rgb(204, 24, 24);
}

/* for dark theme */
:root {
  --background-color: rgb(32, 32, 32);
  --color: rgb(252, 243, 243);
  --link-color: rgb(194, 109, 11);
}
```

## 003. DarkTheme Component

since we have the light and dark theme ready and we are applying the light theme default. apart from the `<style jsx>` component which is only apply in the component we can add a global attribute to make it apply globally, ie `<style jsx global>`. here we can put our dark theme css code to apply the dark theme. so our button to make it work we could make it conditional rendering, means only apply when the `darkTheme` is on. But conditional style component is not working. we can overcome this by creating the style component a separate component. we can create the `DarkTheme` component where have all the dark theme styles as global jsx style. then we can conditional render this DarkTheme component.

## 004. Hydration

In dev mode our app is rendered twice,means both on server and client.But this is not happen for most of the time when the app is build.Unlike react, next-js have most of the component with the html file. and to make the react part working they do not call `ReactDom.render()` directly, instead they use a method `hydration`,ie `ReactDom.hydrate()`. with this the html component get attached to react and then it work like react.

## 005. Saving preference to local storage

As far now we can switch theme, but as soon refresh the page theme go back to default light.So our choice is not persistent.To make our choice persistent we can use localStorage to save our preference.
But if we use localStorage, we can save data to localStorage as usual but when we try to save it, then it will show error that localStorage not defined. We can save the data but when getting the data it is showing not defined. this is because some of our code run in server side and some in client side. on server side the `onClick` function is not executed, that why the saving data is working, since is it running inside browser and browser have localStorage. But when retrieving the value at server side, node does not have a localStorage, thats why it is giving the undefined error. so we need to careful about the nature of next-js.

**Note: for the hot refresh feature the first render will happen only at client side, but after reload it will first rendered at server side.**

this undefined problem will be solved in next lecture.

## 006. Feature detection

if we run `typeof localStorage` in browser it will return `object`, in node it will return `undefined` so we can check if a feature is undefined then it is running inside server, so change the code accordingly.

**Note: typeof name, return string value**

after adding this checking our app running normally, but in console we can see a warning. it is telling that the text of button is not matched, ie: at server side the button text is 'Dark Theme' but at client side, the text is based on user preference.This is useful feature that next is telling that something may be wrong, also it is happening at hydration stage, it checking the server rendered document is same in client rendered.

Since it is our preferred solution, and we can scape the warning by giving the button element this attribute,`suppressHydrationWarning`. It will solve our problem.

# 06 Deployment

## 001 Deployment Options

There can be two type of next-js app,

1. Only static and SSG(Server Side Static Generation). without ISR and server side rendering.
2. With ISR (Incremental Server Regeneration), or server side rendering

For option 1 we can host anywhere as static site.
For option 2. we need a server that support node-js or has support for next-js

1. serverless next-js support-
   - vercel
   - netlify
2. own managed server with node, ie: cloud computing server where you can setup node-js
3. or serverless node supported platform, ie: aws

**for the other part I already did, so I'm skipping**
