


class User {
  constructor({id=null, username = '', email = '', password = '', role = 'user', terms = false } = {}) {
    this.id = id 
    this.username = username;
    this.email = email; // Default to empty string
    this.password = password; // Default to empty string        '';
    this.role = role
    this.passwordHash
  }


  async changeAvatar(file) {


    if (!file) return
    if (file.type.startsWith('image/')) {


      try {

        const arrayBuffer = await file.arrayBuffer();
        
        const nombre = file.name;

        const avatar = await window.electron.database.select('files', {
        where: `user_id=? AND tag=?`, // Use a parameterized query to prevent SQL injection
        // Pass the email as a parameter 
      },
        [1,'user_avatar'],
        { one: true }
      );
        
      const fileOb ={
        "file_type":file.type ,
        "file_name":file.name,
         "file_buffer":arrayBuffer,
         "size":file.size,
         'user_id':this.id,
         'tag':'user_avatar'
      }
      let result 
      if(avatar){
       result  = await window.electron.database.update("files",
          {
            columns:["file_type", "file_name", "file_buffer", "size", 'user_id', 'tag'],
            where:"user_id=?"
          },
          [file.type, file.name, arrayBuffer, file.size, this.id, 'user_avatar',this.id],
        )

        fileOb.id = result.lastInsertRowid
        console.log(result)
        
      }else{

       result =  await window.electron.database.insert("files",
          ["file_type", "file_name", "file_buffer", "size", 'user_id', 'tag'],
          [file.type, file.name, arrayBuffer, file.size, this.id, 'user_avatar'],
        )

        fileOb.id = result.lastInsertRowid
      }


        return fileOb


      } catch (error) {
        console.error(error)

        return { error: error.message }
        //toast.error("Solo se aceptan archivos de imagenes");

      }

    } else {
      return { error: "Solo puedes subir imagenes al avatar" }
    }
  }

  async getPasswordHash({ username, email }) {
    const result = await window.electron.database.select('users', {
      where: `${username ? "username" : "email"} = ?`, // Use a parameterized query to prevent SQL injection
      // Pass the email as a parameter

    },
      [username ? username : email],
      { one: true }// Pass the email as a parameter
    );

    this.passwordHash = result ? result.password : ''

    return result.password
  }
  async checkPassword(password) {

    try {

      const query = this.username ? { username: this.username } : { email: this.email }

      await this.getPasswordHash(query)

      console.log(this.passwordHash)

      const match = await window.electron.password.verify(password, this.passwordHash)
      console.log(match)
      return match

    } catch (error) {
      console.log(error)
    }
  }

  async emailExists() {

    try {
      const result = await window.electron.database.select('users', {
        where: `email = ?`, // Use a parameterized query to prevent SQL injection
        // Pass the email as a parameter

      },
        [this.email],
        { one: true }// Pass the email as a parameter
      );
      console.log('Email existence check result:', result);
      return result ? true : false; // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of error
    }
  }

  async exists() {
    try {
      const result = await window.electron.database.select('users', {
        where: `username = ?`, // Use a parameterized query to prevent SQL injection
        // Pass the email as a parameter

      },
        [this.username],
        { one: true }// Pass the email as a parameter
      );
      console.log('Username existence check result:', result);
      return result ? true : false // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of error
    }


  }


  async getAvatar() {

    function bufferToBase64(buffer) {
      const typedArray = new Uint8Array(buffer);
      const binaryString = typedArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      return btoa(binaryString);
    }

    try {


      const result = await window.electron.database.select('files', {
        where: `user_id=? `, // Use a parameterized query to prevent SQL injection
        // Pass the email as a parameter 
      },
        [1],
        { one: true }
      );
      console.log(result)

      // const res = await window.electronAPI.obtenerImagenPorId(1);
      if (result?.file_buffer) {
        const base64 = bufferToBase64(result.file_buffer);
        delete result.file_buffer
        result.src = `data:${result.file_type};base64,${base64}`;

      }

      return result
    } catch (error) {
      console.log(error)
    }
  }
  async getUser() {
    try {

      const query = this.username ? { username: this.username } : { email: this.email }

      const result = await window.electron.database.select('users', {
        where: `${query.username ? "username" : "email"} = ?`, // Use a parameterized query to prevent SQL injection
        // Pass the email as a parameter

      },
        [query.username ? query.username : query.email],
        { one: true }// Pass the email as a parameter
      );
      console.log('Username existence check result:', result);
      this.id = result.id
      return result // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of error
    }

  }


  async hashPassword() {
    if (!this.password) {
      console.error('Password is required to hash.');
      return;
    }

    try {
      const hash = await window.electron.password.hash(this.password);

      console.log('Password hashed successfully:', hash);
      this.password = hash; // Store the hashed password
    } catch (error) {
      console.error('Error hashing password:', error);
      return;
    }
  }



  async insert() {

    try {
      // Check if username and email are provided
      // If not, log an error and return
      if (!this.username || !this.email) {
        console.error('Username and email are required to insert a user.');
        return;
      }


      await this.hashPassword();

      //TODO: save user in the database
      const result = await window.electron.database.insert('users', ['username', 'email', 'password', 'role'], [
        this.username, this.email, this.password, this.role])

        //TODO: save  the user information
           await window.electron.database.insert('information', ['name','user_id'], [
        "tu nombre",result.lastInsertRowid])


      console.log('User inserted successfully:', result);

      this.id = result.lastInsertRowid; // Assuming the database returns the last inserted ID

    } catch (error) {
      console.error('Error inserting user:', error);
      return;

    }


  }

  async authToken() {
    try {

      const token = await window.electron.token.generate({
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