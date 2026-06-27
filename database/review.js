let mongoose = require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/demoreview");
};
main()
.then(()=>{
    console.log("Connected SuccessFully");
})
.catch((err)=>{
    console.log(err);
});
let reviewSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    }
});
let Review = mongoose.model("Review",reviewSchema);
// Review.insertMany([
//     {
//         username : "Jagan Kumar",
//         email : "rathjaga83@gmail.com",
//         message : "Hello World",
//     },
//     {
//         username : "Gedu Bhai",
//         email : "gedulouda@gmail.com",
//         message : "Hii 80",
//     },
//     {
//         username : "Nimda Sunil",
//         email : "sunil@gmail.com",
//         message : "Hi Bro",
//     },
//     {
//         username : "Samit Pendu",
//         email : "email@gmail.com",
//         message : "Hello",
//     },
//     {
//         username : "The Chakan",
//         email : "chakanbabu@gmail.com",
//         message : "Hello I am A Digital Marketing Specialist",
//     },
//     {
//         username : "The Nitish",
//         email : "nitish12@gmail.com",
//         message : "Bhai Anugul Ase",
//     },
// ])
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });
module.exports = Review;