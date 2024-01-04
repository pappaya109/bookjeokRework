const express = require('express');
const app = express();
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('port', process.env.PORT || 3001 );

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());



app.use('/', indexRouter);
app.use('/user', userRouter);


app.listen(app.get(port), ()=> {
    console.log('waiting...')
});



