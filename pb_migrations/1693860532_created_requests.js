/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "llg7b1x8izf35bm",
    "created": "2023-09-04 20:48:52.202Z",
    "updated": "2023-09-04 20:48:52.202Z",
    "name": "requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "geal8ywj",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qjg2x82m",
        "name": "description",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("llg7b1x8izf35bm");

  return dao.deleteCollection(collection);
})
