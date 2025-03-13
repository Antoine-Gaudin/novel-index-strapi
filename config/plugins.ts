export default ({ env }) => ({
  upload: {
    config: {
      provider: 'local', // Le fournisseur de stockage
      providerOptions: {
        sizeLimit: 10000000, // Limite de taille (en octets, ici 10 Mo)
      },
    },
  },
});

