/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("llg7b1x8izf35bm")

  // remove
  collection.schema.removeField("wqgciswh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3g7hx4tf",
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
  const collection = dao.findCollectionByNameOrId("llg7b1x8izf35bm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wqgciswh",
    "name": "team",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "bqpr4wsegw014ed",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("3g7hx4tf")

  return dao.saveCollection(collection)
})
