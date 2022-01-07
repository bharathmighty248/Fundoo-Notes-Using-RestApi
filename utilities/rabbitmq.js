const amqp = require('amqplib/callback_api');

class RabbitMq {
    publisher = (data,queue) => {
        amqp.connect(`amqp://guest:guest@localhost:5672`,(err,connection) => {
            if (err) {
                throw err;
            } else {
                connection.createChannel((error,channel) => {
                    if (error) {
                        throw error;
                    } else {
                        const message = JSON.stringify(data);
                        channel.assertQueue(queue);
                        channel.sendToQueue(queue, Buffer.from(message));
                    }
                })
            }
        })
    };

    subscriber = (queue) => {
        return new Promise((resolve, reject) => {
            amqp.connect(`amqp://guest:guest@localhost:5672`, (error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    connection.createChannel((error, channel) => {
                        if (error) {
                            throw error;
                        } else {
                            channel.assertQueue(queue);
                            channel.consume(queue, (message) => {
                                resolve(message.content.toString());
                            });
                        }
                    })
                }
            })
        })
    };
}

module.exports = new RabbitMq();
