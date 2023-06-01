//////////////////////////////////////////// package ////////////////////////////////////////////
const express = require('express')
const app = express()
const  { Client }  = require('pg')
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
const session = require('express-session'); 
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

//////////////////////////////////////////// koneksi db neon ////////////////////////////////////////////
const db = new Client({
    host    : 'ep-polished-water-013849.ap-southeast-1.aws.neon.tech',
    database: 'Iron_pulse_fitness',
    user    : 'mohammadvarrel23',
    password: 'n2GKNID3iWsS',
    port    : 5432,
    sslmode : 'require',
    ssl     : true
})


db.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Database Iron Pulse Fitness berhasil terkoneksi..')
})


//////////////////////////////////////////// account ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil login
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  if (email && password) {
    const query = `SELECT email, pass FROM account WHERE email = '${email}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send('Invalid email');
      } else {
        const storedPassword = results.rows[0].pass;

        bcrypt.compare(password, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }

          if (result) {
            // Passwords match, login successful
            res.status(200).send('Login successful');
          } else {
            // Passwords don't match
            res.status(401).send('Invalid password');
          }
        });
      }
    });
  } else {
    res.status(400).send('Invalid request');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil register
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/register', (req, res) => {
  let temp = {};

  temp.name = req.body.name;
  temp.email = req.body.email;
  temp.pass = req.body.pass;
  temp.phone = req.body.phone;
  temp.bdate = req.body.bdate;
  temp.weight = req.body.weight;
  temp.height = req.body.height;
  temp.bmi = req.body.bmi;
  temp.gender = req.body.gender;
  temp.admin_priv = req.body.admin_priv;
  temp.accountimg_url = req.body.accountimg_url;

  if (
    temp.pass !== undefined && temp.name !== undefined && temp.email !== undefined && temp.phone !== undefined &&temp.bdate !== undefined&&
    temp.weight !== undefined && temp.height !== undefined && temp.bmi !== undefined && temp.gender !== undefined && temp.admin_priv !== undefined && temp.accountimg_url !== undefined &&
    temp.pass.length > 0 && temp.name.length > 0 && temp.email.length > 0 && temp.phone.length > 0 &&temp.bdate.length > 0 &&
    temp.weight.length > 0 && temp.height.length > 0 && temp.bmi.length > 0 && temp.gender.length > 0 && temp.admin_priv.length > 0 && temp.accountimg_url.length > 0
  ) {
    bcrypt.hash(temp.pass, 10, (err, hash) => {
      if (err) {
        res.end('Error!!');
      } else {
        const query = `INSERT INTO account (name, email, pass, phone,bdate ,weight, height,bmi,gender, admin_priv,accountimg_url) VALUES ('${temp.name}', '${temp.email}', '${hash}', '${temp.phone}','${temp.bdate}' ,'${temp.weight}','${temp.height}','${temp.bmi}' ,'${temp.gender}', '${temp.admin_priv}','${temp.accountimg_url}')`;
        db.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.end('Error!!');
          } else {
            res.end('Register berhasi !');
          }
        });
      }
    });
  } else {
    res.end('empty');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil check_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/check_account', (req, res) => {
  const email = req.query.email ?? ''; // Set a default empty string if email is undefined or null

  if (email.length === 0) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const query = `SELECT email, pass FROM account WHERE email = '${email}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.rowCount > 0) {
      const account = results.rows[0];
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: 'Account tidak dapat ditemukan' });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil delete_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/delete_account',(req,res)=>{
    const { user_id } = req.body
    db.query(`DELETE FROM account WHERE user_id=${user_id}`,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.send(`Data dengan user_id ${user_id} berhasil dihapus`)
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil melihat semua account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/check_all_account', (req, res) => {
    db.query('SELECT * FROM account', (err, accountResults) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({account: accountResults.rows});
  })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil mengupdate account berdasarkan user_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put('/change_account', (req, res) => {
    const { user_id,name, email,pass,phone, bdate,weight, height,bmi,gender, admin_priv, accountimg_url } = req.body;
    db.query(`UPDATE account 
      SET user_id='${user_id}',
      name='${name}',
      email='${email}',
      pass ='${pass}',  
      phone='${phone}',
      bdate='${bdate}',  
      weight='${weight}',
      height='${height}',
      bmi='${bmi}',
      gender='${gender}',
      admin_priv='${admin_priv}',
      accountimg_url='${accountimg_url}' WHERE user_id=${user_id};`,(err)=>{

  if(err){
    console.log(err)
    res.send('Data dengan email ${email} gagal diupdate');
    return
  }
    res.send(`Data dengan email ${email} berhasil diupdate`)
  })
})

//////////////////////////////////////////// personal trainers ////////////////////////////////////////////
//1. view semua personal trainer
//2. menambahkan personal trainer
//3. menghapus personal trainer
//4. mengubah salah atribut di personal trainer

////////////////////////////////////////////      bookings      ////////////////////////////////////////////
//1. view semua bookings
//2. menambahkan bookings
//3. menghapus bookings
//4. mengubah salah atribut di bookings

////////////////////////////////////////////      class        ////////////////////////////////////////////
//1. view semua class
//2. menambahkan class
//3. menghapus class
//4. mengubah salah atribut di class

////////////////////////////////////////////      ratings      ////////////////////////////////////////////
//1. menambahkan ratings
//2. mengubah ratings
//3. menghapus ratings 


////////////////////////////////////////////      port server   ////////////////////////////////////////////
app.listen(3200,()=>{
    console.log('Server berjalan pada port 3200')
})

