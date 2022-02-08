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
