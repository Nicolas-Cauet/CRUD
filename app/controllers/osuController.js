const schema = require("../schema/shortlink");

const DataStore = require("../services/dataStore");

//! Instanciation de la classe DataStore !
const store = new DataStore();

const osuController = {
  access: async (request, response, next) => {
    const { suffix } = request.params;
    try {
      const shortlinkTarget = await store.get(suffix);

      response.redirect(shortlinkTarget);
    } catch (err) {
      console.error(err.message);
      next();
    }
  },

  // POST
  create: async (request, response) => {
    const isValid = schema.validate(request.body);
    console.log(isValid);
    /* une décomposition */
    const { target, password } = request.body;

    const { suffix } = request.params;

    try {
      await store.add(suffix, { target, password });
      response.status(201).end();
    } catch (err) {
      console.error(err.message);

      response.status(409).json(err.message);
    }
  },

  update: async (request, response) => {
    try {
      const { suffix } = request.params;
      const shortlinkTarget = await store.get(suffix);
      const { target, password } = request.body;
      return await store.update(shortlinkTarget,target, password);
    } catch (err) {
      console.log(err);
    }
  },

  // DELETE
  delete: async (request, response) => {
    const { password } = request.query;

    const { suffix } = request.params;

    try {
      await store.remove(suffix, password);
      response.status(204).end();
    } catch (err) {
      console.error(err.message);
      if (err) {
        response.status(401).json(err.message);
      } else {
        response.status(404).json(err.message);
      }
    }
  },

  // 404 HTML
  notFound: (request, response) => {
    response.sendFile("/views/404.html", { root: __dirname + "/.." });
  },
};

module.exports = osuController;
