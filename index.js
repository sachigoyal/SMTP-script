const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({

    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log(`onConnect `, session.id)
        cb() // accepting the connection
        // cb (new Error('cannot accept)) if we dont want to accept the connection
    }, 
    onMailFrom(address, session, cb) {
        console.log(`onMailFrom`, address.address, session.id);
        cb()
    },
    onRcptTo(address, session, cb){
        console.log(`onRcptTo`, address.address, session.id);
        cb()
    },
    onData(stream, session, cb){
        stream.on('data', (data) => {
            console.log(`onData ${data.toString()}`)
        })// when the stream of data is coming 
        stream.on('end', cb) // when the stream of data is ended 
        cb()
    },

});

server.listen(25, () => console.log('Server Running on Port 25'))
