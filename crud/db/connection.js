const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/cred', {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log(`connected successfully`);
}).catch((e) => {
    console.log(`errorconnection ${e}`);
});
