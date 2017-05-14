const jwt = require("jsonwebtoken");
const userSchema = require("../../models/user");

exports.register = (req, res) => {
  const { id, password, name, email } = req.body;
  let newUser = null;

  const create = (user) => {
    if (user) {
      throw new Error("id already exists");
    } else {
      return userSchema.create(id, password, name, email);
    }
  }

  const count = (user) => {
    newUser = user;
    return userSchema.count({}).exec();
  }

  const assign = (count) => {
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      return Promise.resolve(false);
    }
  }

  const respond = (isAdmin) => {
    res.json({
      message: "registered successfully",
      admin: isAdmin ? true : false
    });
  }

  const onError = (error) => {
    res.status(409).json({
      message: error.message
    });
  }

  userSchema.findOneById(id)
  .then(create)
  .then(count)
  .then(assign)
  .then(respond)
  .catch(onError)
}

exports.login = (req, res) => {
  const { id, password } = req.body;
  const secret = req.app.get("jwt-secret");

  const check = (user) => {
    if(!user) {
      throw new Error("login failed");
    } else {
      if (user.verify(password)) {
        const p = new Promise((resolve, reject) => {
          jwt.sign({
            id: user.id,
            admin: user.admin
          },
          secret,
          {
            expiresIn: "7d",
            issuer: "localhost",
            subject: "userinfo"
          }, (err, token) => {
            if (err) reject(err);
            resolve(token);
          });
        });
        return p;
      } else {
        throw new Error("login failed");
      }
    }
  }

  const respond = (token) => {
    res.json({
      message: "logged in successfully",
      token
    });
  }

  const onError = (err) => {
    res.status(403).json({
      message: err.message
    });
  }

  userSchema.findById(id)
  .then(check)
  .then(respond)
  .catch(onError);

}
