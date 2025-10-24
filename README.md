<center>

![Icon](https://github.com/SolsticeLeaf/portfolio/blob/master/.github/images/home.png?raw=true)

</center>

<h2 align="center">Modern portfolio made by <code>nuxt 3</code></h2>

<center>

![Pipeline](https://img.shields.io/gitlab/pipeline-status/sleaf%2Fportfolio?gitlab_url=https%3A%2F%2Fgit.sleaf.dev%2F&branch=master&style=for-the-badge)
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

![Nuxtjs](https://img.shields.io/badge/Nuxt.js-3-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)
![FontAwesome](https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)

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

