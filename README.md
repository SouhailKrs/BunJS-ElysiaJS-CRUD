<h1 align="center"> BunJS ElysiaJS CRUD  </h1> <br>


## Introduction

This repository effectively highlights the use of **BunJS** ( JavaScript runtime) , which has recently attained a stable, production-ready status as of September 8th 2023 . Paired with **ElysiaJS**, a TypeScript framework boasting an impressive 18-fold performance improvement over Express, as per their website claims, it showcases a streamlined User CRUD example. This demonstration underscores the seamless integration of Bun's integrated features such as  **password hashing** and **bun:sqlite** for efficient data storage, all while exemplifying the remarkable speed and efficiency of **ElysiaJS** in practical use.


## Build Process

- Follow the [Bun's Guide](https://bun.sh/docs) for initial setup.
- You can find a **Postman** collection that contains all the **API endpoints**  [here](https://www.postman.com/spaceflight-astronaut-41736688/workspace/souhail-krissaane-public-workspace/collection/28535822-a4dde544-6f96-4cc6-b470-7ca437658a0d).

- **For windows users**, please refer to this [Guide](https://blog.bitsrc.io/getting-started-with-bun-js-and-create-a-react-app-46bac6bdb947) to download and install Bun.
- Clone or download the project repository using the following command:

```{r klippy, echo=FALSE, include=TRUE}
git clone https://github.com/SouhailKrs/BunJS-ElysiaJS-Auth-CRUD
``` 

-  Navigate to the project root directory and install the required dependencies:

```{r klippy, echo=FALSE, include=TRUE}
bun install
```
- Change your working directory to the project's source folder:

```{r klippy, echo=FALSE, include=TRUE}
cd src
```
-  Finally, start the project with the following command:

```{r klippy, echo=FALSE, include=TRUE}
bun index.ts
```

