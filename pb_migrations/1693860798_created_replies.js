/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "c6xbbe2c3xpwkn3",
    "created": "2023-09-04 20:53:18.880Z",
    "updated": "2023-09-04 20:53:18.880Z",
    "name": "replies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sdxbchgr",
        "name": "request",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "llg7b1x8izf35bm",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "blzxowid",
        "name": "body",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("c6xbbe2c3xpwkn3");

  return dao.deleteCollection(collection);
})
