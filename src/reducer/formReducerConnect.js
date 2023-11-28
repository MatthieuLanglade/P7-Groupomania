// Reducer LOGIN/SIGNUP
const formReducerConnect = (state, action) => {
    const payload = action.payload
    switch(action.type) {
        case "HANDLE INPUT TEXT" :
            return {
                ...state, 
                form : {
                    ...state.form,
                    [action.field]: payload}
            }
        case "HANDLE REGEX" :
            return {
                ...state, 
                regex : {
                    ...state.regex,
                    [action.field]: payload}
            }
        case "TOGGLE REDIRECT" :
            return {
                ...state,
                states : {
                    ...state.states,
                    redirectToReferrer: true,
                }
            }
        case "TOGGLE CHECKED" :
            return {
                ...state,
                states : {
                    ...state.states,
                    checked: !state.states.checked,},
                form : {
                    ...state.form,
                    date: state.states.checked ? null : ''}
            }
        case "TOGGLE PASSWORD" :
            return {
                ...state,
                states : {
                    ...state.states,
                    showPassword: !state.states.showPassword}
            }
        case "NEW FILE" :
            return {
                ...state, 
                files : {
                    [action.field]: payload,
                }
            }
        case "DELETE FILE" :
            return {
                ...state,
                files: {
                    profilPicture: null}
            };

        default : 
            return state
    }
}
export default formReducerConnect;