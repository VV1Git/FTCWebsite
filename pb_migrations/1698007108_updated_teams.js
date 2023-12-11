/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("vnca6wfl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgfbaxhz",
    "name": "mentor",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "mentor",
        "mentee"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gvr41rmg",
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
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vnca6wfl",
    "name": "mentor",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("xgfbaxhz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gvr41rmg",
    "name": "meeting",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "in-person",
        "virtual",
        "both"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
