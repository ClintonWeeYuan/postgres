const { response } = require("express");
const express = require("express");
const app = express();
const pool = require ("./routes/db");

app.use(express.json()) 

//ROUTES//

//get all users
app.get("/users", async(req, res) => {
  try {
    const all_users = await pool.query("SELECT * FROM users");

    res.json(all_users.rows);
  } catch(err) {
    console.error(err.message);
  }
})

//get a user
app.get("/users/:id", async(req, res) => {
  const {id} = req.params;
  try{
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
    res.json(user.rows[0]);
  } catch(err){
    console.error(err.message);
  }
}) 

//create a user
app.post("/users", async(req, res) => {
  try {
    const {description} = req.body;
    const new_user = await pool.query("INSERT INTO users (description) VALUES ($1) RETURNING *", 
    [description]
    );

    res.json(new_user.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
})

//update a user

app.put("/users/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const {description} = req.body;

    const update_user = await pool.query("UPDATE users SET description = $1 WHERE user_id = $2",
    [description, id]);

    res.json('User has been updated!');
  } catch(err) {
    console.error(err.message);
  }
})

//delete a user
app.delete("/users/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const delete_user = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

    res.json("User was successfully deleted");
  } catch(err){
    console.error(err.message);
  }
})


module.exports = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

