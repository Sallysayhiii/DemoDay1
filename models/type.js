const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const type = new Schema({
    id: { type: ObjectID },
    name: {
        type: String,
        required: true,
        default: 'No Name'
    }
});

module.exports = mongoose.type || mongoose.model('type', type);