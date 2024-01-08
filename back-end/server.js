const express = require('express');
const app = express();
const indexRouter = require('./routes')
const userRouter = require('./routes/user')
const cors = require('cors');

app.set('port', process.env.PORT || 3002);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'),'waiting...')
})