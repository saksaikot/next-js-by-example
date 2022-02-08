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
