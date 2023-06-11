require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection Successful to MongoDB DataBase`);
}).catch((err) => console.log(`Cannot Connect to DataBase ==>> ${err}`));
