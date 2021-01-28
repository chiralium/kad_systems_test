export const reducer = function( state = [], action ) {
    switch ( action.type ) {
        case "ADD_CITY":
            return [ ...state, action.item ];
        default:
            return state;
    }
}
