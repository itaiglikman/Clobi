class AppConfig {
    public port = 4000;
    public server = "http://localhost:" + this.port + "/data";
    public baseUrl = "http://localhost:" + this.port;
    public clocksUrl = this.server + "/clocks";
    public germanyTimeUrl = "http://timeapi.io/api/time/current/Europe/Berlin";
    // public germanyTimeUrl = "http://worldtimeapi.org/api/timezone/Europe/Berlin";
}

const appConfig = new AppConfig();

export default appConfig;
