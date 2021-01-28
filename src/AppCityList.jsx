import React from 'react';

import { Page, Card } from '@shopify/polaris';

import { connect } from 'react-redux';

class AppCityList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.cities.length > 0 &&
                    <Page title="Cities" sectioned>
                        { this.props.cities.map(
                            ( city , index) => {
                                return (
                                    <City
                                        city={city}
                                        key={index}
                                    />
                                )
                            }
                          )
                        }
                    </Page>
                }
            </>
        )
    }
}

class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather_is_loading : true,
            weather : null,
            city_not_found : false
        }

        this.get_weather_by_city = this.get_weather_by_city.bind( this );
    }

    get_weather_by_city() {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.props.city.name}&appid=966b0b3a111f1043d1f09e84f6549709&units=metric`,
            {
                method : 'GET'
            }
        ).then( response => response.json() )
            .then(
                (data) => {
                    this.setState({
                        weather_is_loading : false
                    });

                    if ( data.cod !== 200 ) throw data.message;

                    this.setState({
                        weather : {
                            ico : `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                            T : data.main.temp,
                            Tmax : data.main.temp_max,
                            Tmin : data.main.temp_min,
                            Fl : data.main.feels_like
                        }
                    })
                }
            )
            .catch(
                (e) => {
                    this.setState(
                        {
                            city_not_found : true
                        }
                    )
                }
            );
    }

    componentDidMount() {
        this.get_weather_by_city();
    }

    render() {
        return (
            <Card title={ this.props.city.name } sectioned>
                { this.state.weather &&
                    <div style={{ display: "flex", justifyContent : "space-around", alignItems : "center" }}>
                        <div>
                            <p>Temperature: <b>{ this.state.weather.T } C</b></p>
                            <p>Feels like: <b>{ this.state.weather.Fl } C</b></p>
                            <br/>
                            <p>
                                T<sub>max</sub>: <b>{ this.state.weather.Tmax } C</b>
                                T<sub>min</sub>: <b>{ this.state.weather.Tmin } C</b>
                            </p>
                        </div>
                        <div>
                            <img src={ this.state.weather.ico } />
                        </div>
                    </div>
                }
                { this.state.weather_is_loading &&
                    <p align="center">Loading...</p>
                }
                { this.state.city_not_found &&
                    <p align="center" style={{ "color" : "red", fontSize: "16pt" }}>
                        <span>
                            City Not Found...
                        </span>
                    </p>
                }
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        cities: state
    }
}

const AppReduxCityList = connect(
    mapStateToProps
)(AppCityList)


export default AppReduxCityList;