# Patrón Repository

### Docker
- Ejecuta `docker-compose up -d` para levantar una base de datos postgres y mongo en tu local.
- El archivo scripts.txt contiene 1 script para crear una tabla Paladin y otro script para crear que puedas ejecutar y crear una collection en mongo
- Puedes instalar cualquier cliente para visualizar los datos. En el video he usado Beekeeper Studio para SQL y MongoDB Compass para Mongo

### scripts.txt
```SQL
CREATE TABLE paladins (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rank VARCHAR(255) NOT NULL,
    kingdom VARCHAR(255) NOT NULL,
);
```

```js
db.createCollection("paladins", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "_id", "name", "rank", "kingdom" ],
          properties: {
             _id: {
                bsonType: "objectId",
                description: "must be an ObjectId and is required"
             },
             name: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             rank: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             kingdom: {
                bsonType: "string",
                description: "must be a string and is required"
             }
          }
       }
    }
})
```

### Clientes de bases de dato

Beekeeper Studio https://www.beekeeperstudio.io/

MongoDB Compass https://www.mongodb.com/products/tools/compass

### Contribuciones
Si quieres contribuir a este repositorio, puedes hacer un PULL REQUEST

