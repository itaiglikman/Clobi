class AppConfig {
    public port = 4000;
    public baseUrl = "http://localhost:" + this.port;
    public loginUrl = this.baseUrl + "/data/login/";
    public usersUrl = this.baseUrl + "/data/users/";
    public registerUrl = this.baseUrl + "/data/register/";
    public clocksUrl = this.baseUrl + "/data/clocks/";

    private readonly timezoneDbAPIKey = "C0U73DCVEA0Z"
    private readonly zone = "Europe/Berlin";
    public readonly timezoneDbApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${this.timezoneDbAPIKey}&format=json&by=zone&zone=${this.zone}`;
}

const appConfig = new AppConfig();

export default appConfig;
