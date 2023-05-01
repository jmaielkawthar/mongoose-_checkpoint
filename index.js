const env = require('dotenv').config();
let mongoose = require('mongoose');
const { deleteMany } = require('./model/user');
let UserModel = require('./model/user')
// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
// const database = 'mongoose';      // REPLACE WITH YOUR DB NAME

const run = async () => {
try{
    /*-------    create record unsing save  -------*/

    let user = new UserModel({
        name: 'kawthar',
        age: 22,
        favoriteFoods: [
            'pizza',
            'seafood',
            'burritos'
        ]
      })
    user.save().then(doc => {
       console.log(doc)
     })
     .catch(err => {
       console.error(err)
     }) 
    /*--------   Create many documents at once using create   -------*/
    let user = await UserModel.create(
        [
            {
            name: "Chidera Ndukwe",
            age: 26,
            favoriteFoods: [
                'ketchup',
                'burritos',
                'turkey'
            ]
            },
            {
            name: "Elijah Azubuike",
            age: 26,
            favoriteFoods: [
                'burritos',
                'koskos'
            ]
            },
            {
            name: "Emeka Isiolu",
            age: 26,
            favoriteFoods: [
                'burritos',
                'safood',
                'turkey'
            ]
            }
        ]
    )
    return UserModel

    /*------    fetch all record    -------*/
    var person1 = await UserModel.find()

    /*------    fetch record by name     -------*/
    var person2 = await UserModel.find({
        name: 'ala'   
    })

    console.log(person2);
    /*------    fetch record by specific favorite food using findOne()    -------*/
    var person3 =  await UserModel.findOne({
    favoriteFoods:
        'koskos' 
    })
    console.log(person3);

    /*---- Use model.findById() to Search Your Database By _id ------*/
    var person4 =  await UserModel.findById("644875f7b78bd5a406e685ab")
        console.log(person4);

    /*---- Find a person by _id  and Add "hamburger" to the list of the person's favoriteFoods ------*/
    var person5 =  await UserModel.findById("644875f7b78bd5a406e685ab")
    person5.favoriteFoods.push("hamburger")
    console.log(person5);

    /*------    Find a person by Name and set the person's age to 20 model.findOneAndUpdate()     -------*/
    var person6 = await UserModel.findOneAndUpdate(
        {name: 'ala' , age: 33    },
        {age: 20   }
    )
    console.log(person6);
    /*-------- delete many remove --------- */
    var person7 = await UserModel.deleteMany({
        name:'Emeka Isiolu',
    })
    console.log(person7); 

    /*---------- Query Helpers  Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age.     ---------------*/

    const person8 = await UserModel.find(
    {
        favoriteFoods:
        'burritos' 
    }).limit(2).sort({ name: 1 })
     .select({ age: 0 })
     .exec()
     console.log(person8);


        

}
catch(err){
throw err;
}
}
run()


/* connectection to  data base with url  */
class Database {
  constructor() {
    this._connect()
  }

_connect() {
    //  mongoose.connect(`mongodb://${server}/${database}`)
     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()