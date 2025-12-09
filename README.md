<center>

![Icon](/.github/images/home.png)

</center>

<h2 align="center">Modern portfolio made by <code>Nuxt 4</code></h2>

<center>

![Pipeline](https://img.shields.io/github/actions/workflow/status/SolsticeLeaf/portfolio/deploy.yaml?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/SolsticeLeaf/portfolio?style=for-the-badge)
![License](https://img.shields.io/github/license/SolsticeLeaf/portfolio?style=for-the-badge)
![CodeSize](https://img.shields.io/github/languages/code-size/SolsticeLeaf/portfolio?style=for-the-badge)
![RepoSize](https://img.shields.io/github/repo-size/SolsticeLeaf/portfolio?style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/SolsticeLeaf/portfolio/master?style=for-the-badge)

</center>

<h2 align="center">
  Created with
</h2>

<center>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)
![FontAwesome](https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

</center>

<p align="center">
<a href="#support">Support</a> •
<a href="#features">Features</a> •
<a href="#installation">Installation</a>
</p>

## Donations

If you want to support the project, then
star this repository ♥

## Support

Join the [Discord](https://discord.gg/ec7y5NY82b) if you have any questions.
Please **don't** open an issue just for the sake of questions.

## Features

- Easy setup
- Optimized code
- Full configuration

## Installation

To install portfolio you need to copy this repository:

```bash
git clone https://github.com/SolsticeLeaf/portfolio.git && cd portfolio
```

Edit files in **config** folder and edit next variables in docker-compose.yml:

```dotenv
# Cryprocloud api key
CRYPTOCLOUD_API_KEY=${CRYPTOCLOUD_API_KEY}
#Cryprocloud shop id
CRYPTOCLOUD_SHOP_ID=${CRYPTOCLOUD_SHOP_ID}
#Mongodb db name
DATABASE_NAME=${DATABASE_NAME}
#Mongodb connection url
DATABASE_URL=${DATABASE_URL}
```

Then run this command:

```bash
npm ci \
&& npm run postinstall \
&& npm run build \
&& docker-compose up -d --build
```

After executing the command, the site will be available at the following address:

```
http://localhost:3000
```
