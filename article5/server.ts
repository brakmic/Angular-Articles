import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as path from 'path';
import * as _ from 'lodash';

class Server {
    public static init(): Hapi.Server {
        const server = new Hapi.Server({
            connections: {
                routes: {
                    files: {
                        relativeTo: path.join(__dirname, 'dist')
                    }
                }
            }
        });
        server.settings.connections.router.stripTrailingSlash = true;
        server.settings.connections.routes.timeout.server = 10000;
        server.connection(<Hapi.IServerConnectionOptions>{
            port: 10000,
            routes: {
                cors: true,
            }
        });
        server.register(Inert, () => {});
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true
                }
            }
        });
        return server;
    }
}

export default (function(){
    const server = Server.init();
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
}());
