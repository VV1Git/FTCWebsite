/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "labygs5d",
    "name": "zip_code",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "labygs5d",
    "name": "zipcode",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
