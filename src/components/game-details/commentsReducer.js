//action types as constants, so a typo is an error instead of a silently ignored action
export const COMMENTS_ACTIONS = {
    GET_ALL: 'GET_ALL',
    ADD: 'ADD',
};

//reducer must be pure: return new state, never change the old one
export default function commentsReducer(state, action) {
    switch (action.type) {
        case COMMENTS_ACTIONS.GET_ALL:
            return action.payload;

        case COMMENTS_ACTIONS.ADD:
            return [...state, action.payload];

        default:
            return state;
    }
}
