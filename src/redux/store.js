import { createStore } from "redux";
import { reducer } from "./reducer";

function initalize_state() {
    let data = localStorage.getItem('cities');
    if ( localStorage.getItem('cities') ) {
        let cities = data.split(';');
        return cities.map(
            (item) => {
                return {
                    name : item,
                    weather : null
                }
            }
        );
    } else {
        return [];
    }
}

export default function init_store() {
    return createStore(reducer, initalize_state());
}