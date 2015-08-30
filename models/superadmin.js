var User = require('./user');

// ***** Модель адміністратора *****
function SuperAdmin() {
  User.apply(this, arguments);
  this._isAdmin = true;
}

// ***** Наслідування адміністратора
SuperAdmin.prototype = Object.create(User.prototype);
SuperAdmin.prototype.constructor = SuperAdmin;

// Реєстрація адміністратора
SuperAdmin.signUp = function(properties) {
  if (!User.db) {
    User.db = {}; 
  }
  
  if (!User.db[properties.email]) {
    User.db[properties.email] = new SuperAdmin(properties);
    console.log("Зареєстрований адміністратор " + properties.firstName + " " + properties.lastName);
    return User.db[properties.email];
  } else {
    throw new Error("Адміністратор з такою електронною поштою вже зареєстрований");
  }
}

// Вхід адміністратора (заглушка)
SuperAdmin.login = function() {
  User.login();
  console.log("Даний користувач є адміністратором");
}

// ***** Методи адміністратора *****

// Видалення облікового запису користувача
SuperAdmin.prototype.removeUser = function(email) {
  if (User.db[email]) {
    delete User.db[email];
  }
}

// Видалення контенту користувача
SuperAdmin.prototype.removeUserContent = function(email, type, index) {
  if (User.db[email] && User.db[email]._content[type]) {
    if (arguments.length == 2) {
      delete User.db[email]._content[type]; // видалення всього типу
    } else {
      User.db[email].removeContent(type, index); 
    }
  } else {
    throw new Error("Помилка видалення контенту")
  }
}

// Вивід переліку користувачів у консоль
SuperAdmin.prototype.showUsers = function() {
  for (var user in User.db) {
    console.log(User.db[user]._fullName);
  }
}

module.exports = SuperAdmin;