export default {
    async receiveData(ctx) {
      console.log("📩 Données reçues :", ctx.request.body);
  
      const apiKey = ctx.request.headers["x-sync-key"];
  
      // Vérification de la clé API
      if (apiKey !== process.env.SYNC_SECRET_KEY) {
        console.error("❌ Clé API invalide !");
        return ctx.unauthorized("Invalid API Key");
      }
  
      try {
        const { model, entry } = ctx.request.body;
  
        if (!model || !entry) {
          return ctx.badRequest("Invalid payload");
        }
  
        // 📌 Cas 1 : Ajout d’une œuvre
        if (model === "oeuvre") {
          const newOeuvre = await strapi.entityService.create("api::oeuvre.oeuvre", {
            data: {
              titre: entry.titre,
              titrealt: entry.titrealt || null,
              auteur: entry.auteur || null,
              annee: entry.annee || null,
              type: entry.type || null,
              categorie: entry.categorie || null,
              synopsis: entry.synopsis || null,
              etat: entry.etat || null,
              couverture: entry.couverture || null,
              licence: entry.licence || false,
              langue: entry.langue || "fr",
            },
          });
  
          console.log("✅ Nouvelle œuvre ajoutée :", newOeuvre);
          return ctx.send({ message: `Oeuvre '${entry.titre}' ajoutée avec succès !` });
        }
  
        // 📌 Cas 2 : Ajout d’un chapitre
        else if (model === "chapitre") {
          // Vérifier si l'œuvre existe déjà
          const existingOeuvre = await strapi.entityService.findMany("api::oeuvre.oeuvre", {
            filters: { titre: entry.oeuvres.titre }
          });
  
          if (existingOeuvre.length === 0) {
            return ctx.badRequest(`❌ L'œuvre '${entry.oeuvres.titre}' associée n'existe pas.`);
          }
  
          // Générer l'URL du chapitre avec documentId
          const chapitreUrl = `https://trad-index.com/chapitre/${entry.id}`;
  
          // Création du chapitre dans `novel-index`
          const newChapitre = await strapi.entityService.create("api::chapitre.chapitre", {
            data: {
              titre: entry.titre,
              tome: entry.tome || null,
              order: entry.order || null,
              url: chapitreUrl,
              texte: entry.texte || null,
              pdf: entry.pdf || null,
              oeuvres: existingOeuvre[0].id, // Liaison avec l'œuvre existante
            },
          });
  
          console.log("✅ Nouveau chapitre ajouté :", newChapitre);
          return ctx.send({ message: `Chapitre '${entry.titre}' ajouté avec succès !` });
        }
  
        return ctx.badRequest("❌ Modèle non reconnu.");
  
      } catch (error) {
        console.error("❌ Erreur de synchronisation :", error);
        ctx.internalServerError("Erreur de synchronisation");
      }
    },
  };
  