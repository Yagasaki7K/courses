const modules = require('./module'); // Requires is different to import (ES6)
console.log(modules)

const FullName = modules.FullName
console.log(FullName())

const { nameUser, lastName, FullName } = require('./module')
console.log(nameUser, lastName)

//

const { People } = require('./module')

const firstPerson = new People('Luiz', 'Miranda')
console.log(firstPerson) // Luiz Miranda

//

const path = require('path')
const axios = require('axios')

axios('https://jsonplaceholder.typicode.com/users')
.then(response => console.log(response.data))
.catch(error => console.log(error))

//

const multiply = require('./module')
console.log(multiply(2, 3)) // 6

//

const Dog = require('./module')

const LilDog = new Dog('Lil Dog')
LilDog.sayName() // My name is Lil Dog