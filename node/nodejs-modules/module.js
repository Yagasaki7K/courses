const nameUser = 'Luiz'
const lastName = 'Miranda'

const FullName = () => {
    return nameUser + ' ' + lastName
}

// module.exports.nameUser = nameUser
// module.exports.lastName = lastName

// exports.nameUser = nameUser
exports.NAMEUSER = nameUser
// exports.lastName = lastName
exports.LASTNAME = lastName
this.anything = 'Anything'

console.log(exports)

//

class People {
    constructor(name, lastName) {
        this.name = name
        this.lastName = lastName
    }
}

exports.People = People

//

module.exports = function(x, y) {
    return x * y
}