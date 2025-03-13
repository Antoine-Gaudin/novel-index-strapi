module.exports = ({ env }) => ({
    upload: {
      config: {
        providerOptions: {
          allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Autorise le format WEBP
        },
      },
    },
  });
