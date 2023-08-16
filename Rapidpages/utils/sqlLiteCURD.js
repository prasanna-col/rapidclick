import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, score INTEGER)',
      [],
      () => {
        console.log('Database and table created successfully.');
      },
      error => {
        console.log('Error creating database or table:', error);
      }
    );
  });
};

const insertData = (playername, clickcount) => {
  let name = playername;
  let score = Number(clickcount)

  db.transaction(tx => {
    tx.executeSql('INSERT INTO users (name, score) VALUES (?, ?)', [name, score], (tx, results) => {
      console.log("insertData results", results.rowsAffected)
      if (results.rowsAffected > 0) {
        console.log("data inserted")
      }
      console.log("insertData tx", tx)
      // Handle success or error
    });
  });
};

export default function getUsers() {

  return new Promise((resolve, reject) => {
    try {
      db.transaction(async tx => {
        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
          console.log("getUsers - results.rows", results.rows)
          let users = [];
          for (let i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
          }
          console.log("getUsers in util", users)
          resolve((users.sort((a, b) => b.score - a.score)).slice(0, 3)); // sort and return only top 3 data
        });
      });
    }
    catch (err) {
      console.log("err", err)
      reject([])
    }
  })

};

const updateUser = (id, newName) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE users SET name = ? WHERE id = ?', [newName, id], (tx, results) => {
      console.log("updateUser results", results)
      console.log("updateUser tx", tx)
      // Handle success or error
    });
  });
};

const deleteUser = id => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM users WHERE id = ?', [id], (tx, results) => {
      console.log("deleteUser results", results)
      console.log("deleteUser tx", tx)
      // Handle success or error
    });
  });
};

export { initializeDatabase, insertData, updateUser, deleteUser };
