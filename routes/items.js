const { getItem, getItems } = require('../controllers/items');
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

function itemRoutes (fastify, options, done) {
   // get all items
    fastify.get('/items', getItemsOps);

    // get single items
    fastify.get('/items/:id', getItemOps)
    done();
}

module.exports = itemRoutes;