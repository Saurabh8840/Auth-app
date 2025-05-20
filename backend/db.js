const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.log(" MongoDB error:", err));


