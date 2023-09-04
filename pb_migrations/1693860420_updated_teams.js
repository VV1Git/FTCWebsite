/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bqpr4wsegw014ed")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KQUMLef` ON `teams` (`number`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bqpr4wsegw014ed")

  collection.indexes = []

  return dao.saveCollection(collection)
})
