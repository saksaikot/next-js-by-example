# Next js by example - Mirko Nasato

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

- λ, this page are rendered at server runtime(uses `getInitialProps` or `getServerSideProps` )
- o , static page build at runtime
- ● , filled circle,
  - (SSG, server side generated)automatically generated page at build time , uses getStaticProps
  - (ISR, Incremental Server Regeneration), uses revalidate in getStaticProps.

Then start it with next.`npm run start`, at this time the `console.log` only happening on client side not server side.because the page is already rendered and exported as static page.
The build page can be found in `project-root->.next->server->pages->` folder
