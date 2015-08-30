var User = require('./models/user'),
  SuperAdmin = require('./models/superadmin');


module.exports = (function() {  
  // Приклади

  console.log("===== Реєстрація користувачів =====");
  var roma = User.signUp({
    firstName: "Роман", 
    lastName: "Кацала", 
    email: "rkatsala@gmail.com", 
    password: "qwerty1234", 
    birthday: new Date("1985-03-21") 
  });

  var user = User.signUp({
    firstName: "Василь", 
    lastName: "Путін", 
    email: "user@user.org", 
    password: "123", 
    birthday: new Date() 
  });

  var john = User.signUp({
    firstName: "Ваня", 
    lastName: "Доу", 
    email: "john@doe.com", 
    password: "qqq111", 
    birthday: new Date() 
  });

  console.log("===== Зміна даних користувача =====");
  console.log("----- До -----");
  user.showProfile();
  console.log("----- Після -----");
  user.editProfile({
    firstName: "Вася", lastName: "Пупкін", password: "ytrewq4321" 
  });
  user.showProfile();

  console.log("===== Створення контенту =====");
  user.addContent("post", "1-й пост", "Текст першого посту");
  user.addContent("post", "2-й пост", "Текст другого посту");
  user.addContent("post", "3-й пост", "Текст третього посту");

  user.showContent("post");

  // console.log("===== Редагування контенту =====");
  // user.editContent('post', 1, 'Другий пост', 'Редагований текст');
  // user.showContent('post');

  // console.log("===== Видалення контенту =====");
  // user.removeContent('post', 1);
  // user.showContent('post');

  console.log("===== Додавання друзів =====");
  user.addFriend("rkatsala@gmail.com");
  user.addFriend("john@doe.com");
  user.showFriends();

  console.log("===== Видалення друзів =====");
  user.removeFriend("rkatsala@gmail.com");
  user.showFriends();

  console.log("===== Запрошення дружити =====");
  user.inviteFriend("rkatsala@gmail.com");
  user.inviteFriend('ivan@ivanov.ru');

  console.log("===== Перегляд контенту іншого користувача =====");
  john.showUserContent("user@user.org", 'post');
  roma.showUserContent("user@user.org", 'post');

  console.log("===== Реєстрація адміністратора =====");
  var admin = SuperAdmin.signUp({
    firstName: "Віктор", 
    lastName: "Петрович", 
    email: "admin@vrokashy.org", 
    password: "SuperComplicatePassword", 
    birthday: new Date("1965-09-13") 
  });

  console.log("===== Перелік користувачів =====");
  admin.showUsers();

  console.log("===== Перегляд контенту користувача адміністратором  =====");
  admin.showUserContent("user@user.org", 'post');

  // console.log("===== Видалення контенту користувача =====");
  // console.log("----- До -----");
  // user.showContent('post');
  // admin.removeUserContent("user@user.org", 'post', 1);
  // console.log("----- Після -----");
  // user.showContent('post');
  // console.log("----- Видалення типу контенту -----");
  // admin.removeUserContent("user@user.org", 'post');
  // user.showContent('post');

  // console.log("===== Видалення користувача =====");
  // admin.removeUser("user@user.org");
  // admin.showUsers();

  console.log("===== Вхід та вихід користувача і адміністратора =====");
  // Розкоментувати, щоб перевірити
  // User.login();
  roma.logout();
  // SuperAdmin.login();
  admin.logout();

})();