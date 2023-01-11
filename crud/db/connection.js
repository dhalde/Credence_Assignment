const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL

mongoose.set("strictQuery", false);

mongoose.connect(url, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log(`connected successfully`);
}).catch((e) => {
    console.log(`errorconnection ${e}`);
});
