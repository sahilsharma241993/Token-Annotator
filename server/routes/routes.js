
const TokenController = require('../controller/TokenController')

module.exports = (router) => {

    /**
     * get a user
     */
    router
        .route('/getTokens')
        .get(TokenController.getTokens);

    
    /**
     * adds a user
     */
    router
        .route('/addToken')
        .post(TokenController.addToken);
}
