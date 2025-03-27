export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', 
        "https://novel-index.com",
        "https://www.novel-index.com", 
        "https://novel-index-nextjs.vercel.app", 
        "https://trad-index.com/",
        "https://www.trad-index.com/", 
        "https://my-strapi-project-yysn.onrender.com/"], // Frontend autorisé
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Méthodes autorisées
      headers: ['Content-Type', 'Authorization'], // En-têtes autorisés
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
