var Conn = {
    conn: undefined,
    messageQueue: [],

    connect: function() {
        if (!this.conn) {
            this.conn = new WebSocket('ws://' + Vitalous.websockets.domain + ':' + Vitalous.websockets.port);
            this.conn.addEventListener('open', this.handleMessageQueue.bind(this));
        }
    },

    onMessage: function(callback) {
        this.conn.addEventListener('message', callback);
    },

    send: function(message) {
        if (typeof message === 'object')
            message = JSON.stringify(message);


        if (this.conn.readyState === this.conn.OPEN) {
            this.conn.send(message);
            return;
        }

        this.messageQueue.push(message);
    },

    handleMessageQueue: function() {
        this.messageQueue.forEach(message => {
           this.send(message);
        });
    }
};

export default Conn;