var Content = require('./content');


// ***** Модель користувача *****
function User(properties) {
  // Записано в такому вигляді, щоб можна було потім використати при зміні даних користувача
  this._firstName = properties.firstName || this._firstName;
  this._lastName = properties.lastName || this._lastName;
  this._email = properties.email || this._email;
  this._password = properties.password ||  this._password; // бажано було б зберігати зашифрованим
  this._birthday = properties.birthday || this._birthday  ;
  
  this._fullName = this._firstName + ' ' + this._lastName;
  
  this._friendsLink = this._fullName; // посилання для друзів (в майбутньому можна замінити чимось іншим)
}

// Наслідування користувача
User.prototype = Object.create(Content.prototype);
User.prototype.constructor = User;

// Створення облікового запису користувача (Реєстрація)
// Поліморфна функція, при виклику без аргументів потрібно заповнити всі поля через prompt 
User.signUp = function(properties) {
  if (!User.db) {
    User.db = {}; // тут будуть зберігатися користувачі
  }
  
  // Можливо це потім можна буде видалити
  if (!arguments.length) {
    var properties = {};
    
    properties.firstName = prompt("Введіть ім'я", "");
    properties.lastName = prompt("Введіть прізвище", "");
    
    properties.email = prompt("Введіть електронну пошту", "");
    while (User.db[email]) {
      properties.email = prompt("Користувач з такою електронною поштою вже зареєстрований. Введіть іншу електронну пошту");
    }
    
    properties.password = prompt("Введіть пароль", "");
    properties.birthday = new Date( prompt("Ведіть день народження в форматі РРРР-ММ-ДД", "1991-08-24") );
  }
  
  if (!User.db[properties.email]) {
    User.db[properties.email] = new User(properties);
    console.log("Зареєстрований новий користувач " + properties.firstName + " " + properties.lastName);
    return User.db[properties.email];
  } else {
    throw new Error("Користувач з такою електронною поштою вже зареєстрований");
  }
  
}

// Вхід користувача (заглушка)
User.login = function() {
  var email = prompt("Введіть електронну пошту", "");
  while (!User.db[email]) {
    email = prompt("Користувач з такою електронною поштою не зареєстрований. Введіть правильну електронну пошту");
  }
  
  var password = prompt("Введіть пароль", "");
  while (User.db[email]._password !== password) {
    password = prompt("Введіть вірний пароль");
  }
  
  console.log("Користувач " + User.db[email]._fullName + " зайшов в мережу");
}

// ***** Методи користувача *****

// Вихід користувача (заглушка)
User.prototype.logout = function() {
  console.log("Користувач " + this._fullName + " вийшов з мережі");
}

// Зміна даних користувача
User.prototype.editProfile = function(properties) {
  User.call(this, properties);
}

// Вивід даних користувача в консоль
User.prototype.showProfile = function() {
  var props = {};
  
  for (var key in this) {
    if (key[0] == '_') {
      props[key] = this[key];
    }
  }
  
  console.dir(props);
}

// Створення контенту користувача
User.prototype.addContent = function(type, head, body) {
  // type задає тип контенту, наприклад 'post', 'music', 'video', 'photo'
  if (!this._content) {
    this._content = {}; // тут буде зберігатися весь контент користувача
  }
  
  if (!this._content[type]) {
    this._content[type] = []; // контент буде зберігатися по типам
  }
  
  this._content[type].push( new Content(head, body) );
}

// Редагування контенту користувача
User.prototype.editContent = function(type, index, newHead, newBody){
  Content.prototype.editContent.call(this._content[type][index], newHead, newBody);
}

// Видалення контенту користувача
User.prototype.removeContent = function(type, index){
  this._content[type].splice(index, 1);
}

// Вивід контенту в консоль
User.prototype.showContent = function(type) {
  var content = this._content && this._content[type];
  if (!content) return;
  
  for (var i = content.length - 1; i >= 0; i--) {
    var str = content[i]._head + "     " +  content[i]._date.toLocaleString() + "\n" + content[i]._body;
    console.log(str);
  }
}

// Вивід в консоль контенту іншого користувача
User.prototype.showUserContent = function(userEmail, type) {
  var userToShow = User.db[userEmail];
  if (!userToShow) return;

  this.showContent.call(userToShow, type);
}

// Додавання користувача до списку друзів
User.prototype.addFriend = function(email) {
  if (!User.db[email]) {
    throw new Error("Користувач з електронною поштою " + email + " не зареєстрований в мережі");
  }
  
  if (!this._friends) {
    this._friends = {}; // тут буде зберігатися перелік друзів
  }
  
  if (!this._friends[email]) {
    this._friends[email] = User.db[email]._friendsLink; 
  }
}

// Видалення користувача зі списку друзів
User.prototype.removeFriend = function(email) {
  if (this._friends && this._friends[email]) {
    delete this._friends[email];
  } else {
    throw new Error("Користувач з електронною поштою " + email + " не записаний у списку друзів");
  }
}

// Запрошення дружити / реєструватися в мережі (заглушка)
User.prototype.inviteFriend = function(email) {
  if (User.db[email]) {
    // Запропонувати користувачу email дружити
    console.log(this._fullName + " пропонує дружити користувачу " + User.db[email]._fullName)
  } else {
    // Наділати на email запрошення приєднатися до мережі
    console.log("Відіслано запрошення приєднатися до мережі на " + email)
  }
}

// Вивід списку друзів у консоль
User.prototype.showFriends = function() {
  var friends = this._friends;
  if (!friends) return;
  
  for (var email in friends) {
    console.log( friends[email] );
  }
}


module.exports = User;