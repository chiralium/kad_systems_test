import React from 'react';
import { transliterate as tr } from "transliteration";

import {TopBar, ActionList } from '@shopify/polaris';

class AppSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_result_is_visible : false,
            search_value : '',
            city : '',
            error : null
        }

        this.handleSearchResultsDismiss = this.handleSearchResultsDismiss.bind( this );
        this.handleSearchChange = this.handleSearchChange.bind( this );
        this.accept_city = this.accept_city.bind( this );
    }

    accept_city() {
        this.setState({
            search_value : '',
            search_result_is_visible : false
        });
    }

    handleSearchResultsDismiss() {
        this.setState({
            search_result_is_visible : false,
            search_value : ''
        });
    }

    handleSearchChange(value) {
        fetch(
            'https://countriesnow.space/api/v0.1/countries/population/cities',
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    city : tr(value)
                })
            }
        ).then( response => response.json() )
            .then(
                (data) => {
                    if ( !data.error ) {
                        this.setState({
                            search_result_is_visible : true,
                            search_value : data.data.city,
                            city : data.data.city,
                            error : null
                        });
                    } else throw data.msg;
                }
            )
            .catch(
                (error) => {
                    this.setState({
                        search_result_is_visible : true,
                        error : error,
                        city : 'No suggestions...'
                    });
                }
            )
    }

    render() {
        const searchResultsMarkup = (
            <ActionList
                items={
                    [
                        {
                            content : this.state.city,
                            onAction : this.accept_city
                        }
                    ]
                }
            />
        );

        const searchFieldMarkup = (
            <TopBar.SearchField
                onChange={this.handleSearchChange}
                value={this.state.searchValue}
                placeholder="Search"
                showFocusBorder
            />
        );

        const topBarMarkup = (
            <TopBar
                showNavigationToggle
                searchResultsVisible={ this.state.search_result_is_visible }
                searchField={searchFieldMarkup}
                searchResults={searchResultsMarkup}
                onSearchResultsDismiss={this.handleSearchResultsDismiss}
            />
        );

        return topBarMarkup;
    }
}

export default AppSearch;