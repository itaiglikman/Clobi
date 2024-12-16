import * as path from 'path';

class AppConfig {

    // Server Port:
    public port = 4000;
    public dataFiles = {
        clocks: path.resolve(__dirname, '../../../Data/clocks.json'),
        users: path.resolve(__dirname, '../../../Data/users.json'),
        lastId: path.resolve(__dirname, '../../../Data/last-id.json')
    };
}

const appConfig = new AppConfig();

export default appConfig;
