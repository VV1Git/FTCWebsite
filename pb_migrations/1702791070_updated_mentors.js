/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bzigqq2t",
    "name": "skill",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "program",
        "design",
        "cad"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("bzigqq2t")

  return dao.saveCollection(collection)
})
