
const TokenController = require('../controller/TokenController')

module.exports = (router) => {

    /**
     * get tokend
     */
    router
        .route('/getTokens')
        .get(TokenController.getTokens);

    
    /**
     * adds token
     */
    router
        .route('/addToken')
        .post(TokenController.addToken);
    
     /**
     * delete token
     */
    router
        .route('/deleteToken')
        .delete(TokenController.deleteToken);
}
