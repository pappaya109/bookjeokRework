const express = require('express');
const app = express();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const qnaRouter = require('./routes/question');
const bookRouter = require('./routes/book');
const commentRouter = require('./routes/comment');
const reviewRouter = require('./routes/review');
const tagRouter = require('./routes/tag');
const cors = require('cors');

app.set('port', process.env.PORT || 3002);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/question', qnaRouter);
// app.use('/book', bookRouter);
// app.use('/comment', commentRouter);
// app.use('/review', reviewRouter);
// app.use('/tag', tagRouter);

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'),'waiting...')
})