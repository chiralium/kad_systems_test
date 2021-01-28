import React from "react";

import { Page, Card } from '@shopify/polaris';

import AppCityList from "./AppCityList";

class AppWeathers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            default_city : null,
            default_weather : null,
            weather_is_loading : true,
            geo_is_loading : true
        }

        this.get_weather = this.get_weather.bind( this );
    }

    get_weather() {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.state.default_city}&appid=966b0b3a111f1043d1f09e84f6549709&units=metric`,
            {
                method : 'GET'
            }
        ).then( response => response.json() )
            .then(
                (data) => {
                    this.setState({
                        weather_is_loading : false
                    });

                    this.setState({
                        default_weather : {
                            ico : `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                            T : data.main.temp,
                            Tmax : data.main.temp_max,
                            Tmin : data.main.temp_min,
                            Fl : data.main.feels_like
                        }
                    })
                }
            )
    }

    componentDidMount() {
        fetch(
            'https://ipapi.co/json',
            {
                method : 'GET'
            }
        ).then( response => response.json() )
            .then(
                (data) => {
                    this.setState({
                        geo_is_loading : false
                    });

                    this.setState({default_city : data.city}, this.get_weather );
                    this.tick = setInterval(
                        () => this.setState({default_city : data.city}, this.get_weather ),
                        5000
                    );
                }
            );
    }

    componentWillUnmount() {
        clearInterval(this.tick);
    }

    render() {
        return (
            <>
                <Page title="Weather" sectioned>
                    { this.state.default_city &&
                        <Card title={ this.state.geo_is_loading ? "Loading..." : this.state.default_city } sectioned>
                            { this.state.default_weather && !this.state.weather_is_loading &&
                                <div style={{ display: "flex", justifyContent : "space-around", alignItems : "center" }}>
                                    <div>
                                        <p>Temperature: <b>{ this.state.default_weather.T } C</b></p>
                                        <p>Feels like: <b>{ this.state.default_weather.Fl } C</b></p>
                                        <br/>
                                        <p>
                                            T<sub>max</sub>: <b>{ this.state.default_weather.Tmax } C</b>
                                            T<sub>min</sub>: <b>{ this.state.default_weather.Tmin } C</b>
                                        </p>
                                    </div>
                                    <div>
                                        <img src={ this.state.default_weather.ico } />
                                    </div>
                                </div>
                            }
                            { this.state.weather_is_loading &&
                                <p align="center">Loading...</p>
                            }
                        </Card>
                    }
                    <AppCityList/>
                </Page>
            </>
        )
    }
}

export default AppWeathers;