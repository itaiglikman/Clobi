class AppConfig {

    // Server Port:
    public port = 4000;
    dataFiles: {
        clocks: '../../Data/clocks.json',
        // users: './src/data/users.json',
        // roles: './src/data/roles.json'
      }
}
const appConfig = new AppConfig();

export default appConfig;
