

class Users {
  constructor(user) {
    this.user   = user;
  }

  
  addUser(user) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  removeUserById(id) {
    this.users = this.users.filter(user => user.id !== id);
  }


  checkPasswordStrength(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }
  
}
