const { getItem, getItems, addItem , deleteItem, updateItem} = require('../controllers/items');
const items = require('../items');

// Item Schema

const Item = {
     type: 'object',
    properties: {
        id: { type: 'integer'},
        name: {type: 'string'}
    }
};

// Options for get all items
// handles the structure of response returned
// freedom to change the type of property ex-item.id(string) -> item.id(integer) = converts and returns in specified type.
const getItemsOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
    handler: getItems
};

const getItemOps = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}
const postItemOps = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'}
            },
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}
const deleteItemOps = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
        }
    },
    handler: deleteItem
}
const updateItemOps = {
    schema: {
        response: {
            200: Item,
        }
    },
    handler: updateItem
}
function itemRoutes (fastify, options, done) {
   // get all items
    fastify.get('/items', getItemsOps);

    // get single items
    fastify.get('/items/:id', getItemOps);

    // Add item
    fastify.post('/items', postItemOps);

    // Delete item
    fastify.delete('/items/:id', deleteItemOps);
    // Update item
    fastify.put('/items/:id', updateItemOps);
    done();
}

module.exports = itemRoutes;