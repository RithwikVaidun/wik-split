const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql');


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// MySQL database connection configuration
// const connection = mysql.createConnection({
//     host: '3.145.169.66',
//     user: 'root',
//     password: 'junkrat123',
//     database: 'wikSplit'
// });
  
  // Connect to MySQL
  // connection.connect((err) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL:', err);
  //     return;
  //   }
  //   console.log('Connected to MySQL database!');
  // });

  app.get('/get_users', (req, res) => {
    connection.query('SELECT * FROM Users', (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      } else {
        res.json(results); // Send the fetched user data as JSON response
      }
    });
  });
  
  // add user
  app.post('/add_user', (req, res) => {
    const { user_id, name, email } = req.body;
    console.log("reqBODY",req.body);
    const INSERT_USER_QUERY = `INSERT INTO Users (user_id, name, email) VALUES('${user_id}', '${name}', '${email}')`;
    connection.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        console.error('Error inserting user to MySQL:', err);
        res.status(500).send('Error inserting user to MySQL');
      } else {
        res.send('Successfully inserted user to MySQL');
      }
    });
  });

app.post('/create_group', (req, res) => {
  console.log("came into create group backend", req.body)
    const groupName = req.body.groupName;
    const ids = req.body.groupIDS;

    const ADD_GROUP_QUERY = `INSERT INTO \`Groups\` (group_name) VALUES (?)`;

    // Step 1: Insert group name into the Groups table
    connection.query(ADD_GROUP_QUERY, [groupName], (err, result) => {
        if (err) {
            console.error('Error inserting group to MySQL:', err);
            res.status(500).send('Error inserting group to MySQL');
        } else {
            // Step 2: Retrieve the autogenerated group_id
            const groupId = result.insertId;
            console.log('GROUP ID:', groupId)

            // Step 3: Insert user_ids along with the retrieved group_id into GroupUsers table
            const INSERT_GROUP_USERS_QUERY = `INSERT INTO GroupUsers (group_id, user_id) VALUES ?`;
            const values = ids.map(user_id => [groupId, user_id]);

            connection.query(INSERT_GROUP_USERS_QUERY, [values], (err, results) => {
                if (err) {
                    console.error('Error inserting group users to MySQL:', err);
                    res.status(500).send('Error inserting group users to MySQL');
                } else {
                    res.send('Successfully created group and associated users');
                }
            });
        }
    });
});

app.get('/get_groups', (req, res) => {
  user_id = req.query.user_id;
  console.log("USER ID BACKEND",  user_id)
  const query = `SELECT * FROM GroupUsers WHERE user_id = ?`;
  connection.query(query, [user_id], (error, results) => {
    if (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ error: 'Error fetching groups' });
    } else {
      var groups = []
      for(var i = 0; i < results.length; i++){
        groups.push(results[i].group_id)
      }
      console.log("groups:", groups)
      const groupNamesQuery = `SELECT group_name FROM \`Groups\` WHERE group_id IN (${groups.join(', ')}) `;
      connection.query(groupNamesQuery, (error, results) => {
        if (error) {
          console.error('Error fetching groups:', error);
          res.status(500).json({ error: 'Error fetching groups' });
        } else {
          console.log("GROUP NAMES:", results)
          // res.json(results); // Send the fetched user data as JSON response
        }
      });

      names = []

      const namesInEachGroupQuery = 'SELECT user_id FROM GroupUsers WHERE group_id IN (' + groups.join(', ') + ') GROUP BY group_id, user_id';
      connection.query(namesInEachGroupQuery, (error, results) => {
        if (error) {
          console.error('Error fetching groups:', error);
          res.status(500).json({ error: 'Error fetching groups' });
        } else {
          console.log("GROUP NAMES MAGICYA:", results)
          // res.json(results); // Send the fetched user data as JSON response
        }
      });
      

      res.json(results); // Send the fetched user data as JSON response
    }
  });
});

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})
app.listen(process.env.PORT || 8081)