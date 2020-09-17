const exprees = require('express');
const app = exprees();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid');
app.set('view engine', 'ejs');
app.use(exprees.static('public'))


app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-conected');
    })
})



server.listen(3030);
