


class User {
  constructor({ username = '', email = '', password = '', role='user',terms = false } = {}) {
    this.id = null
    this.username = username;
    this.email = email; // Default to empty string
    this.password = password; // Default to empty string        '';
    this.role = role
    this.passwordHash
  }


  async getPasswordHash({username,email}){
       const result =await window.electron.database.select('users', {
        where: `${username ?"username" : "email"} = ?`, // Use a parameterized query to prevent SQL injection
         // Pass the email as a parameter
        
       },                                                                                                                                                                                                                                                                               
       [username ? username : email] ,                                                    
       {one:true}// Pass the email as a parameter
      );

      this.passwordHash =result?  result.password : ''
      
      return result.password
  }
  async checkPassword(password){

    try {
      
      const query = this.username ? {username:this.username} : {email:this.email}

      await this.getPasswordHash(query)

      console.log(this.passwordHash)

       const match = await window.electron.password.verify(password,this.passwordHash)
      console.log(match)
       return match

    } catch (error) {
      console.log(error)
    }
  }

 async  emailExists(){

    try {
      const result =await window.electron.database.select('users', {
        where: `email = ?`, // Use a parameterized query to prevent SQL injection
         // Pass the email as a parameter
        
       },                                                                                                                                                                                                                                                                               
       [this.email] ,                                                    
       {one:true}// Pass the email as a parameter
      );
     console.log('Email existence check result:', result);
      return result ? true :false; // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of error
    }
  }
 
 async exists(){
     try {
      const result =await window.electron.database.select('users', {
        where: `username = ?`, // Use a parameterized query to prevent SQL injection
         // Pass the email as a parameter
       
       }, 
       [this.username] ,
       {one:true}// Pass the email as a parameter
      );
      console.log('Username existence check result:', result);
      return result ? true : false // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of error
    }


  }

  async getUser(){
    try {

        const query = this.username ? {username:this.username} : {email:this.email}

           const result =await window.electron.database.select('users', {
          where: `${query.username ?"username" : "email"} = ?`, // Use a parameterized query to prevent SQL injection
          // Pass the email as a parameter
          
        },                                                                                                                                                                                                                                                                               
        [query.username ? query.username : query.email] ,                                                    
        {one:true}// Pass the email as a parameter
        );
          console.log('Username existence check result:', result);

          return result // Returns true if email exists, false otherwise
        } catch (error) {
          console.error('Error checking email existence:', error);
          return false; // Return false in case of error
        }
    
  }


 async hashPassword() {
    if (! this.password) {
      console.error('Password is required to hash.');
      return;
    }

    try {
      const hash =await window.electron.password.hash(this.password);

      console.log('Password hashed successfully:', hash);
      this.password = hash; // Store the hashed password
    } catch (error) {
      console.error('Error hashing password:', error);
      return;
    }
  }



 async insert(){

    try {
       // Check if username and email are provided
    // If not, log an error and return
    if (!this.username || !this.email) {
      console.error('Username and email are required to insert a user.');
      return;
    }
 

    await this.hashPassword();
      
      const result =await window.electron.database.insert('users', ['username', 'email', 'password','role'], [
        this.username,this.email, this.password,this.role ])    

        console.log('User inserted successfully:', result);

        this.id = result.lastInsertRowid; // Assuming the database returns the last inserted ID
     
    } catch (error) {
      console.error('Error inserting user:', error);
      return;
      
    }
   
    
  }

  async authToken(){
    try {
     
      const token =await window.electron.token.generate({
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role
    });

    return token; // Return the generated token
    } catch (error) {
      console.error('Error generating auth token:', error);
    }
    
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setTerms(terms) {
    this.terms = terms;
  }

  getUserData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      terms: this.terms,
    };
  }
}


export default User;