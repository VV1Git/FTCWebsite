/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6xbbe2c3xpwkn3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a6llv8cs",
    "name": "team",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6xbbe2c3xpwkn3")

  // remove
  collection.schema.removeField("a6llv8cs")

  return dao.saveCollection(collection)
})
