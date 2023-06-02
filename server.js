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

app.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false
    })
);

//////////////////////////////////////////// account ////////////////////////////////////////////

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
///berhasil register
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/register', (req, res) => {
  temp = req.session;

  temp.name = req.body.name;
  temp.email = req.body.email;
  temp.pass = req.body.pass;
  temp.phone = req.body.phone;
  temp.bdate = req.body.bdate;
  //age INTERVAL DEFAULT (AGE(CURRENT_DATE, bdate)),
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
            res.end('Register berhasil !');
          }
        });
      }
    });
  } else {
    res.end('empty');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil login admin
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login_admin', async (req, res) => {
  temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;
  // const email = req.body.email;
  // const password = req.body.pass;

  if (temp.email !== undefined && temp.pass !== undefined) {
    const query = `SELECT email, pass,admin_priv  FROM account WHERE email = '${temp.email}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send('Invalid email');
      } else {
        const storedPassword = results.rows[0].pass;
        const adminPriv  = results.rows[0].admin_priv || false;

        bcrypt.compare(temp.pass, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }

          if (result) {
            if (adminPriv == true) {
              res.status(200).json({
                message: 'Login successful (Admin)'
              });

            } else {
              res.status(401).json({
                message: 'Invalid account'
              });
            }
          } else {
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
///berhasil login member
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login_member', async (req, res) => {
  temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;
  // const email = req.body.email;
  // const password = req.body.pass;

  if (temp.email !== undefined && temp.pass !== undefined) {
    const query = `SELECT email, pass,admin_priv  FROM account WHERE email = '${temp.email}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send('Invalid email');
      } else {
        const storedPassword = results.rows[0].pass;
        const adminPriv  = results.rows[0].admin_priv || false;

        bcrypt.compare(temp.pass, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }

          if (result) {
            if (adminPriv == false) {
              res.status(200).json({
                message: 'Login successful (member)'
              });

            } else {
              res.status(401).json({
                message: 'Invalid account'
              });
            }
          } else {
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
///Berhasil check_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/check_account', (req, res) => {
  temp = req.session;
  temp.email = req.body.email;
  temp.email = req.query.email ?? ''; 

  if (temp.email.length === 0) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const query = `SELECT * FROM account WHERE email = '${temp.email}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.rowCount > 0) {
      temp.account = results.rows[0];
      res.status(200).json(temp.account);
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
///Berhasil mengupdate account berdasarkan user_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/change_account', (req, res) => {
    temp = req.session;

    temp.user_id = req.body.user_id;
    temp.name = req.body.name;
    temp.email = req.body.email;
    temp.pass = req.body.pass;
    temp.phone = req.body.phone;
    temp.bdate = req.body.bdate;
    //age INTERVAL DEFAULT (AGE(CURRENT_DATE, bdate)),
    temp.weight = req.body.weight;
    temp.height = req.body.height;
    temp.bmi = req.body.bmi;
    temp.gender = req.body.gender;
    temp.admin_priv = req.body.admin_priv;
    temp.accountimg_url = req.body.accountimg_url;

    db.query(`UPDATE account 
      SET user_id='${temp.user_id}',
      name='${temp.name}',
      email='${temp.email}',
      pass ='${temp.pass}',  
      phone='${temp.phone}',
      bdate='${temp.bdate}',  
      weight='${temp.weight}',
      height='${temp.height}',
      bmi='${temp.bmi}',
      gender='${temp.gender}',
      admin_priv='${temp.admin_priv}',
      accountimg_url='${temp.accountimg_url}' WHERE user_id=${temp.user_id};`,(err)=>{

  if(err){
    console.log(err)
    res.send('Data dengan email ${temp.email} gagal diupdate');
    return
  }
    res.send(`Data dengan email ${temp.email} berhasil diupdate`)
  })
})

//////////////////////////////////////////// personal trainers ////////////////////////////////////////////
//1. view semua personal trainer
//2. menambahkan personal trainer
//3. menghapus personal trainer
//4. mengubah salah atribut di personal trainer

////////////////////////////////////////////      bookings      ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil view semua bookings 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/check_all_booking', (req, res) => {
  db.query('SELECT * FROM bookings', (err, bookingsResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({bookigs: bookingsResults.rows});
})
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil menambahkan values dalam bookings table
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/add_booking', (req, res) => {
    const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
    db.query(`INSERT INTO bookings (booking_id,start_time, end_time, class_id, user_id, booking_status)
      VALUES ('${booking_id}','${start_time}', '${end_time}', ${class_id}, ${user_id}, '${booking_status}');`, (err) => {
      if (err) {
        console.log(err);
        // res.send('Data gagal diinput ke table bookings.');
        return;
      }
    });
    res.send('Data berhasil diinput ke table bookings.');
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil bookings 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/booking', async (req, res) => {
  const booking_id = req.body.booking_id;

  if (booking_id > 0) {
    const query = `SELECT booking_id FROM bookings WHERE booking_id = '${booking_id}';`; //user_id

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send('Invalid booking id');
      }

      else {

          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }

          if (results) {
            res.status(200).send('booking id successful');
          } else {
            res.status(401).send('Invalid booking id');
          }
      }
    });
  } else {
    res.status(400).send('Invalid request');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// berhasil delete bookings berdasarkan booking_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/delete_booking',(req,res)=>{
  const { booking_id } = req.body
  db.query(`DELETE FROM bookings WHERE booking_id=${booking_id}`,(err)=>{
      if(err){
          console.log(err)
          return
      }
      res.send(`Data dengan booking_id ${booking_id} berhasil dihapus`)
  })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil Merubah value di bookings (error)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put('/update_booking', (req, res) => {
    const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
        db.query(`UPDATE bookings 
            SET booking_id = '${booking_id}', 
            start_time='${start_time}',
            end_time='${end_time}',
            class_id='${class_id}', 
            user_id='${user_id}',
            booking_status='${booking_status}' WHERE booking_id=${booking_id};`,(err)=>{

      if(err){
          console.log(err)
          res.send('Data dengan booking id ${booking_id} gagal diupdate');
          return
      }else{
      res.send(`Data dengan booking id ${booking_id} berhasil diupdate`)
      }
  })
})

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

