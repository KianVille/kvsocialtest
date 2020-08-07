const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
// const mongoose = require('mongoose');
// const cors = require('cors');

// const authRoute = require('./routes/auth');
// const validTokenRoute = require('./routes/validToken');
// const userRoute = require('./routes/user');
// const postRoute = require('./routes/post');
// const timelineRoute = require('./routes/timeline');
// const searchRoute = require('./routes/search');

// require('dotenv').config();

// mongoose.connect(
//     process.env.MONGO_DB_KEY,
//     { useNewUrlParser: true,
//       useUnifiedTopology: true },
//     () => {
//     console.log('connected to MongoDB!')
// });


// // Middleware
// app.use(express.json());
// app.use(cors());

// app.use('/accounts', authRoute);
// app.use('/validToken', validTokenRoute);
// app.use('/user', userRoute);
// app.use('/post', postRoute);
// app.use('/timeline', timelineRoute);
// app.use('/search', searchRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

app.listen(PORT, () => console.log(`connected to port ${PORT}.`));
