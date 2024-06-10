const jwt = require('jsonwebtoken');

exports.EncodeToken = (email, user_id) => {

    let KEY = "123-ABC-XYZ";
    let EXPIRE = { expiresIn: '24h' };
    const PAYLOAD = { email: email, user_id: user_id };
    return jwt.sign(PAYLOAD,KEY,EXPIRE);
}

exports.DecodeToken = (token) => {
    try {
        let KEY = "123-ABC-XYZ";
        let result = jwt.verify(token,KEY);
        console.log(result);
        return result;
    } 
    catch (error) {
        console.log(error);
        return null;
    }
}
