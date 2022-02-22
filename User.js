//different file typically for each schema

const mongoose = require("mongoose");

//nested schemas can be useful for more complex objects
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  //age: Number,
  age: {
    type: Number,
    min: 1,
    max: 100,
    //can write validation on model, therefore no need to worry about writing it all over the place
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  //email: String,
  email: {
    type: String,
    minLength: 10,
    //this required will check the syntax to ensure an email address is given
    required: true,
    //will automatically save input as lowercase, can also put uppercase:true
    lowercase: true,
  },
  //createdAt: Date,
  createdAt: {
    type: Date,
    //this will create a static date, the same for each obj
    //default: new Date(),

    //now with this it checks to see if there is a value for createdAt and if not it runs that function returning the date  as of right now
    default: () => Date.now(),

    //unable to change it after being created
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  //reference to another user Object
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    //ref tells mongoose what model this references
    ref: "User",
  },
  //could leave this blank to be array of anything, or specify type, in this case String
  hobbies: [String],
  //   address: {
  //     street: String,
  //     city: String,
  //   },
  address: addressSchema,
});

//useful when you want to do a lot of different things related to model, don't need to define it everywhere, only on model itself
//can't use arrowfunctions because need to use this
userSchema.methods.sayHi = function () {
  console.log(`Hi, my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  //regex so case insensitive
  return this.where({ name: new RegExp(name, "i") });
};

//only putting on query, so it will only work on .find or .where, not .findByName
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

//this is middleware. Mostly only care about save, validate, and remove.
//if you want it to run before thing we're talking about, use pre. If after, then post

//do something before remove, validate or save for example
userSchema.pre("save", function (next) {
  //everytime we save user, it updates the updatedAt field
  this.updatedAt = Date.now();
  //must use next otherwise it won't move on to the next middleware
  //continue on with rest of code
  next();
});

//can't use this because it's going to pass to us the document that's been saved
userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});
//see name User in mongoDB, then pass schema
module.exports = mongoose.model("User", userSchema);
