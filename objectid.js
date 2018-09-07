const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid('5b922e4bcdb364815dfa2'));