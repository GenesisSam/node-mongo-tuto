const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true},
  pwd: { type: String, required: true },
  name: String,
  admin: {type: Boolean, default: false},
  reg_date: { type: Date, default: Date.now() },
  email: String
},
{
  timestamps: true
});

userSchema.statics.create = function(id, password, name, email) {
  const user = new this({
    id: id,
    pwd: password,
    name: name,
    email: email
  });
  return user.save();
}

userSchema.statics.findOneById = function(id) {
  return this.findOne({id}).exec();
}

userSchema.method.verify = function(password) {
  return this.password === password;
}

userSchema.method.assignAdmin = function() {
  this.admin = true;
  return this.save();
}

module.exports = mongoose.model("user", userSchema);
