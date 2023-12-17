/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wgbyhiroadm6w3")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wgbyhiroadm6w3")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Pu33dxU` ON `mentees` (`number`)"
  ]

  return dao.saveCollection(collection)
})
