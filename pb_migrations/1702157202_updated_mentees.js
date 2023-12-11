/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ws6yedsa",
    "name": "program",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "fll",
        "ftc",
        "frc"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f4dd9v44",
    "name": "meeting",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "in-person",
        "virtual"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // remove
  collection.schema.removeField("ws6yedsa")

  // remove
  collection.schema.removeField("f4dd9v44")

  return dao.saveCollection(collection)
})
