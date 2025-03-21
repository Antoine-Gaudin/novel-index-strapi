export default {
    async receiveData(ctx) {
      console.log("📩 Données reçues :", ctx.request.body);
  
      return ctx.send({ message: "L'API fonctionne !" });
    },
  };
  