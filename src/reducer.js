export const ON_INCREMENT = 'Counter/Reducer/ON-INCREMENT'
export const ON_RESET = 'Counter/Reducer/ON-RESET'
export const INCORRECT_VALUE = 'Counter/Reducer/INCORRECT-VALUE'
export const ON_CHANGE_MAX_VALUE = 'Counter/Reducer/ON-CHANGE-MAX-VALUE'
export const ON_CHANGE_MIN_VALUE = 'Counter/Reducer/ON-CHANGE-MIN-VALUE'
export const ON_GET_TO_SETTINGS = 'Counter/Reducer/ON-GET-TO-SETTINGS'
export const ON_CLICK_SET = 'Counter/Reducer/ON-CLICK-SET'

const initialState = {
    // data: {
    count: 0,
    minCount: 0,
    maxCount: 5,
    error: false,
    editMode: false
    // }

}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_INCREMENT:
            return {
                ...state, count: state.count + 1

                // data: {
                //     ...state.data,
                //     count: state.data.count + 1
                // }

                // if (state.count === state.maxCount) {
                // ...state,
                //         error:
            }
        case ON_RESET:
            return {
                ...state, count: action.startCount
            }
        case INCORRECT_VALUE:
            return {
                ...state, count: 'Incorrect value'
            }
        case ON_CHANGE_MAX_VALUE:
            return {
                ...state, maxCount: Number(action.maxCount)
            }
        case ON_CHANGE_MIN_VALUE:
            return {
                ...state, minCount: Number(action.minCount)
            }
        case ON_GET_TO_SETTINGS:
            return {
                ...state, count: "Enter values and press 'set'"
            }
            case ON_CLICK_SET:
            return {
                ...state, count: action.minCount
            }
        default:
            return state
    }

};


export const incrementCountAC = () => {
    return {type: ON_INCREMENT}
}
export const onResetAC = (startCount) => {
    return {type: ON_RESET, startCount}
}
export const onIncorrectValueAC = () => {
    return {type: INCORRECT_VALUE}
}
export const onChangeMaxValueAC = (maxCount) => {
    return {type: ON_CHANGE_MAX_VALUE, maxCount}
}
export const onChangeMinValueAC = (minCount) => {
    return {type: ON_CHANGE_MIN_VALUE, minCount}
}
export const onGetToSettingsAC = () => {
    return {type: ON_GET_TO_SETTINGS}
}
export const onClickSetAC = (minCount) => {
    return {type: ON_CLICK_SET, minCount}
}