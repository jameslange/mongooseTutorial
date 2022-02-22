const mongoose = require("mongoose");
const User = require("./User");
//second/third options not necessary typically.
mongoose.connect(
  "mongodb://localhost/testdb",
  () => {
    console.log("connected");
  },
  (e) => console.log(e)
);

//user created in our program but not in database

//must use save function (async)

run1();

// async function run() {
//     //findByIdAndDelete,Remove,Update or findOneAndDelete....
//     //these do not go through validation, recommended to not use them
//     //it is mostly superior to .findById().save() for example

//   //User.create does the same thing as new User and user.save
//   //using try catch will allow us to debug if the wrong value is inputted aka a string into a number schema
//   try {
//     const user = await User.create({
//       name: "Kyle",
//       age: 26,
//       email: "asdf@asdf.com",
//       hobbies: ["Weight Lifting", "Bowling"],
//       address: {
//         street: "Main St.",
//       },
//     });
//     console.log(user);
//   } catch (e) {
//     //there are plugins for mongoose to give users better error messages
//     //many different keys on error object than message, but mostly will only care about the message
//     console.log(e.message);
//   }
//   //   user.name = "Sally";
//   //   await user.save();
//   //   const user = new User({ name: "Kyle", age: 26 });
//   //   await user.save();
//   //console.log(user);
// }

// async function run1() {
//   try {
//     //like mongodb
//     // const user = await User.findById("621491b8ffd06f1722edfa73")
//     // const user = await User.find({name:"kyle"})
//     //also findOne
//     //exists... returns bool
//     //deleteMany, deleteOne

//     //apparently this is confusing to some, so mongoose introduced queries.
//     //finds all users named kyle
//     //const user = await User.where("name").equals("kyle")
//     //can chain messages
//     //limit is limiting returns, select returns only this field
//     const user = await User.where("age")
//       .gt("12")
//       .lt("31")
//       .where("name")
//       .equals("Kyle")
//       .limit(1)
//     //doing join without really doing join
//       .populate("bestFriend");
//     console.log(user);
//     // user[0].bestFriend = "621491b8ffd06f1722edfa73";
//     // await user[0].save();
//   } catch (e) {
//     console.log(e.message);
//   }
// }

async function run1() {
  try {
    const user = await User.findOne({ name: "Kyle", email: "asdf@asdf.com" });
    console.log(user);
    //this is virtual property meaning not saved in database, only inside of our code
    //don't want to save this in DB because it duplicates data, but want to use across application, that's why virtual is best way to do that.
    //console.log(user.namedEmail);
    await user.save();
    console.log(user);
    // user.sayHi();
  } catch (e) {
    console.log(e);
  }
}
