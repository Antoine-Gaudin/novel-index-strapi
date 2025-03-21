export default {
    routes: [
      {
        method: "GET",
        path: "/sync",
        handler: "sync.receiveData",
        config: {
          policies: [],
          auth: false, // À sécuriser plus tard si besoin
        },
      },
      {
        method: "POST",
        path: "/sync",
        handler: "sync.receiveData",
        config: {
          policies: [],
          auth: false, // Peut être sécurisé avec une clé API
        },
      },
    ],
  };
  
  