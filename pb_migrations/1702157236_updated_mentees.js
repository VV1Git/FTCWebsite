/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdf9xod2",
    "name": "country",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xxteqdyy",
    "name": "state",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tw8owck0",
    "name": "city",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("stlmcy8caydy6qb")

  // remove
  collection.schema.removeField("jdf9xod2")

  // remove
  collection.schema.removeField("xxteqdyy")

  // remove
  collection.schema.removeField("tw8owck0")

  // remove
  collection.schema.removeField("labygs5d")

  return dao.saveCollection(collection)
})
