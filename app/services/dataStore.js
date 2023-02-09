const HandlerError = require("./handlerError");
const { Client } = require("pg");
const db = new Client(process.env.PG_URL);
db.connect();

class DataStore extends HandlerError {
  async get(suffix) {
    console.log("Controle de la valeur du suffix:", suffix);

    const { rows, rowCount } = await db.query(
      "SELECT * FROM shortlink WHERE suffix=$1",
      [suffix]
    );

    if (!rowCount) {
      throw new HandlerError.UnknownSuffixError(suffix);
    }

    return rows[0].target;
  }

  async add(suffix, params) {
    if (await this.has(suffix)) {
      throw new HandlerError.ExistingSuffixError(suffix);
    }

    const { target, password } = params;

    await db.query(
      "INSERT INTO shortlink (suffix, target, password) VALUES ($1, $2, $3);",
      [suffix, target, password]
    );
  }

  async remove(suffix, pass) {
    if (!(await this.has(suffix))) {
      throw new HandlerError.UnknownSuffixError(suffix);
    } else if (!(await this.controlPassword(pass))) {
        throw new HandlerError.UnauthorizedDeletionError(suffix);
    } else {
      await db.query("DELETE FROM shortlink WHERE password=$1 AND suffix=$2;", [
        pass,
        suffix,
      ]);
      console.log(`le shortlink avec le suffix ${suffix} et bien supprimé !`);
    }
  }

  async has(suffix) {
    const { rowCount } = await db.query(
      "SELECT id FROM shortlink WHERE suffix=$1",
      [suffix]
    );

    return !!rowCount;
  }

  async controlPassword(pass){
    const value = await db.query("SELECT * FROM shortlink WHERE password=$1",[pass]);
    return await value.rows[0];
  }
}

module.exports = DataStore;
