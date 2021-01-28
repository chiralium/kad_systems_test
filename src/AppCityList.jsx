import React from 'react';

import { Page, Card } from '@shopify/polaris';

class AppCityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [
                { name : "London", weather : null },
                { name : "Kursk", weather : null }
            ]
        }

        this.get_weathers_by_cities = this.get_weathers_by_cities.bind( this );
    }

    get_weathers_by_cities() {
        this.state.cities.map(
            ( city , index) => {
                fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=da421e8a1dd13d27c7467803e6c8e91d&units=metric`,
                    {
                        method : 'GET'
                    }
                ).then( response => response.json() )
                    .then(
                        (data) => {
                            let weather = {
                                ico: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                                T: data.main.temp,
                                Tmax: data.main.temp_max,
                                Tmin: data.main.temp_min,
                                Fl: data.main.feels_like
                            }

                            let copied = [...this.state.cities];
                            copied[index].weather = weather;

                            console.log( copied );

                            this.setState({
                                cities : copied
                            });
                        }
                    )
            }
        )
    }

    componentDidMount() {
        this.get_weathers_by_cities();
    }

    render() {
        return (
            <>
                <Page title="Cities" sectioned>
                    { this.state.cities.length > 0 &&
                        <>
                            { this.state.cities.map(
                                ( city , index) => {
                                    return (
                                        <Card title={ city.name } key={index} sectioned>
                                            { city.weather &&
                                                <div style={{ display: "flex", justifyContent : "space-around", alignItems : "center" }}>
                                                    <div>
                                                        <p>Temperature: <b>{ city.weather.T } C</b></p>
                                                        <p>Feels like: <b>{ city.weather.Fl } C</b></p>
                                                        <br/>
                                                        <p>
                                                            T<sub>max</sub>: <b>{ city.weather.Tmax } C</b>
                                                            T<sub>min</sub>: <b>{ city.weather.Tmin } C</b>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <img src={ city.weather.ico } />
                                                    </div>
                                                </div>
                                            }
                                            { !city.weather &&
                                                <p align="center">Loading...</p>
                                            }
                                        </Card>
                                    )
                                }
                              )
                            }
                        </>
                    }
                </Page>
            </>
        )
    }
}

export default AppCityList;