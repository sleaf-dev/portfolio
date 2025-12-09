export default defineAppConfig({
  data: {
    nickname: 'SolsticeLeaf',
    mail: 'me@sleaf.dev',
    mailLink: 'mailto:me@sleaf.dev',
    discordLink: 'https://discord.com/users/SolsticeLeaf',
  },
  images: {
    astronautImg: 'https://s3.sleaf.dev/portfolio/astronaut.webp',
    errorImg: 'https://s3.sleaf.dev/portfolio/error.webp',
  },
  icons: {
    nav_home: 'mingcute:home-3-fill',
    nav_projects: 'mingcute:server-2-fill',
    nav_lang: 'mingcute:globe-2-fill',
    email: 'mingcute:mail-fill',
    discord: 'mingcute:discord-fill',
    back_home: 'mingcute:left-fill',
  },
  socialLinks: [
    {
      icon: 'pixel:github',
      url: 'https://github.com/SolsticeLeaf',
    },
    {
      icon: 'pixel:linkedin',
      url: 'https://www.linkedin.com/in/SolsticeLeaf',
    },
  ],
  typer: ['Developer', 'Backend', 'Frontend', 'Full-stack'],
  tools: ['kotlin', 'java', 'micronaut', 'spring', 'typescript', 'javascript', 'nuxtjs', 'gradle', 'mysql', 'mongodb', 'postgresql', 'redis'],
});
