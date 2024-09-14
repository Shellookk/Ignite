import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? [];
  
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          if (row[key]) {

            const searchValue = value.trim().replace(/\s+/g, ' ').toLowerCase();
            const rowValue = row[key].toString().trim().replace(/\s+/g, ' ').toLowerCase();
  
            return rowValue.includes(searchValue);
          }
          return false;
        });
      });
    }
  
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, newData) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
  
    if (rowIndex > -1) {
      const existingRow = this.#database[table][rowIndex];
  
      this.#database[table][rowIndex] = { ...existingRow, ...newData };
  
      this.#persist();
    }
  }
  
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
