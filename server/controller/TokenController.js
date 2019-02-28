
/** */
const Token = require('../model/token')

module.exports = {
    addToken: (req, res, next) => {
        new Token(req.body).save((err, tokens) => {
            if (err)
                res.send(err)
            else if (!Token)
                res.send(400)
            else
                res.json({result: tokens});
            return res
        });
    },
    getTokens: (req, res, next) => {
        Token.find({}).then((err, tokens)=> {
            if (err)
                res.send(err)
            else if (!tokens)
                res.send(404)
            else
                res.send(tokens)
            return res           
        })
    },

    deleteToken: (req, res, next) => {
        Token.remove({_id: req.body._id}).then((err, tokens)=> {
            if (err)
                res.send(err)
            else if (!tokens)
                res.send(404)
            else
                res.send(tokens)
            return res           
        })
    },
}