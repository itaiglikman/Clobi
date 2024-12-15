class AppConfig {

    // Server Port:
    public port = 4000;
    // mongo connection string - 127.0.0.1 = localhost in this computer/ 27017 = popular port / name of DB
    public connectionString = "mongodb://127.0.0.1:27017/_____";
}
const appConfig = new AppConfig();

export default appConfig;
