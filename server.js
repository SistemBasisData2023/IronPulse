const express = require('express')
const app = express()
const  { Client }  = require('pg')
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
const session = require('express-session'); 
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');


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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// implementasi 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil login

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
//berhasil register

app.post('/register', (req, res) => {
  let temp = {};

  temp.name = req.body.name;
  temp.email = req.body.email;
  temp.pass = req.body.pass;
  temp.phone = req.body.phone;
  temp.bdate = req.body.bdate;
  temp.weight = req.body.weight;
  temp.height = req.body.height;
  temp.gender = req.body.gender;
  temp.admin_priv = req.body.admin_priv;

  if (
    temp.pass !== undefined && temp.name !== undefined && temp.email !== undefined && temp.phone !== undefined &&temp.bdate !== undefined&&
    temp.weight !== undefined && temp.height !== undefined && temp.gender !== undefined && temp.admin_priv !== undefined &&
    temp.pass.length > 0 && temp.name.length > 0 && temp.email.length > 0 && temp.phone.length > 0 &&temp.bdate.length > 0 &&
    temp.weight.length > 0 && temp.height.length > 0 && temp.gender.length > 0 && temp.admin_priv.length > 0
  ) {
    bcrypt.hash(temp.pass, 10, (err, hash) => {
      if (err) {
        res.end('tidak ada data yang tersedia');
      } else {
        const query = `INSERT INTO account (name, email, pass, phone,bdate ,weight, height, gender, admin_priv) VALUES ('${temp.name}', '${temp.email}', '${hash}', '${temp.phone}','${temp.bdate}' ,'${temp.weight}','${temp.height}', '${temp.gender}', '${temp.admin_priv}')`;
        db.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.end('Error!');
          } else {
            res.end('Selesai');
          }
        });
      }
    });
  } else {
    res.end('empty');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Berhasil check_account

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
app.listen(3200,()=>{
    console.log('Server berjalan pada port 3200')
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menampilkan table //
// app.get('/', (req, res) => {
//     db.query('SELECT * FROM account', (err, accountResults) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
  
//       db.query('SELECT * FROM bookings', (err, bookingsResults) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
  
//         db.query('SELECT * FROM class', (err, classResults) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
  
//           db.query('SELECT * FROM personal_trainers', (err, trainersResults) => {
//             if (err) {
//               console.log(err);
//               return;
//             }
  
//             db.query('SELECT * FROM ratings', (err, ratingsResults) => {
//               if (err) {
//                 console.log(err);
//                 return;
//               }
  
//               res.send({
//                 account: accountResults.rows,
//                 bookings: bookingsResults.rows,
//                 class: classResults.rows,
//                 personal_trainers: trainersResults.rows,
//                 ratings: ratingsResults.rows
//               });
//             });
//           });
//         });
//       });
//     });
//   });

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   // Insert table account //
//   app.post('/insert_account', (req, res) => {
//     const { user_id,name, email, phone, bdate, age, weight, height,bmi ,gender, admin_priv, accountimg_url } = req.body;
//     db.query(`INSERT INTO account (user_id,name, email, phone, bdate, age, weight, height, bmi, gender, admin_priv, accountimg_url)
//       VALUES ('${user_id}','${name}', '${email}', '${phone}', '${bdate}', ${age}, ${weight}, ${height}, ${bmi}','${gender}', ${admin_priv}, '${accountimg_url}');`, (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//     });
//     res.send('Data berhasil diinput ke table account.');
// })

// // Insert table bookings // 
// app.post('/insert_bookings', (req, res) => {
//     const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
//     db.query(`INSERT INTO bookings (booking_id,start_time, end_time, class_id, user_id, booking_status)
//       VALUES ('${booking_id}','${start_time}', '${end_time}', ${class_id}, ${user_id}, '${booking_status}');`, (err) => {
//       if (err) {
//         console.log(err);
//         // res.send('Data gagal diinput ke table bookings.');
//         return;
//       }
//     });
//     res.send('Data berhasil diinput ke table bookings.');
// })

// // Insert table class // 
// app.post('/insert_class', (req, res) => {
//     const { class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked} = req.body;
//     db.query(`INSERT INTO class (class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked)
//       VALUES (${class_id},${duration}, ${personal_trainer_id}, '${difficulty}', ${calorie}, '${workout}', '${pt_name}', ${capacity}, ${booked});`, (err) => {
//       if (err) {
//         console.log(err);
//         res.send('Gagal memasukkan data ke tabel class.');
//         return;
//       }
//     });
//     res.send('Data berhasil diinput class.');
// })
 
// // Insert table personal trainers // 
// app.post('/insert_personal_trainers', (req, res) => {
//     const { personal_trainer_id,name, gender, accountimg_url } = req.body;
//     db.query(`INSERT INTO personal_trainers (personal_trainer_id,name, gender, accountimg_url)
//       VALUES ('${personal_trainer_id}','${name}', '${gender}', '${accountimg_url}');`, (err) => {
//       if (err) {
//         console.log(err);
//         res.send('Gagal memasukkan data ke tabel personal_trainers.');
//         return;
//       }
//     });
//     res.send('Data berhasil diinput personal_trainers.');
// })
 
// // Insert table ratings // 
// app.post('/insert_ratings', (req, res) => {
//     const { rating_id,personal_trainer_id, user_id,rating_sum, rate_count, rating,comment} = req.body;
//     db.query(`INSERT INTO ratings (rating_id,personal_trainer_id, user_id, rating, rating_sum, rate_count, comment)
//       VALUES (${rating_id},${personal_trainer_id}, ${user_id}, ${rating_sum}, ${rate_count},${rating} ,'${comment}');`, (err) => {
//       if (err) {
//         console.log(err);
//         res.send('Gagal memasukkan data ke tabel ratings.');
//         return;
//       }
//     });
//     res.send('Data berhasil diinput ke table ratings.');
// })

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   // update table account //
//   app.put('/update_account', (req, res) => {
//     const { user_id,name, email, phone, bdate, age, weight, height,bmi,gender, admin_priv, accountimg_url } = req.body;
//     db.query(`UPDATE account 
//       SET user_id='${user_id}',
//       name='${name}',
//       email='${email}', 
//       phone='${phone}',
//       bdate='${bdate}',  
//       age='${age}',
//       weight='${weight}',
//       height='${height}',
//       bmi='${bmi}',
//       gender='${gender}',
//       admin_priv='${admin_priv}',
//       accountimg_url='${accountimg_url}' WHERE user_id=${user_id};`,(err)=>{

// if(err){
//   console.log(err)
//   res.send('Data dengan user id ${user_id} gagal diupdate');
//   return
// }
// res.send(`Data dengan user id ${user_id} berhasil diupdate`)
// })
// })

// // update table bookings // 
// app.put('/update_bookings', (req, res) => {
//     const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
//         db.query(`UPDATE bookings 
//             SET start_time='${start_time}',
//             end_time='${end_time}',
//             class_id='${class_id}', 
//             user_id='${user_id}',
//             booking_status='${booking_status}' WHERE booking_id=${booking_id};`,(err)=>{

//       if(err){
//           console.log(err)
//           res.send('Data dengan booking id ${booking_id} gagal diupdate');
//           return
//       }
//       res.send(`Data dengan booking id ${booking_id} berhasil diupdate`)
//   })
// })

// // update table class // 
// app.put('/update_class', (req, res) => {
//     const { class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked} = req.body;
//     db.query(`UPDATE class 
//             SET duration='${duration}',
//             personal_trainer_id='${personal_trainer_id}',
//             difficulty='${difficulty}', 
//             calorie='${calorie}',
//             workout='${workout}',  
//             pt_name='${pt_name}',
//             capacity='${capacity}',
//             booked='${booked}' WHERE class_id=${class_id};`,(err)=>{

//       if(err){
//           console.log(err)
//           res.send('Data dengan class id ${class_id} gagal diupdate');
//           return
//       }
//       res.send(`Data dengan class id ${class_id} berhasil diupdate`)
//   })
// })
 
// // update table personal trainers // 
// app.put('/update_personal_trainers', (req, res) => {
//   const { personal_trainer_id,name, gender, accountimg_url } = req.body;
//   db.query(`UPDATE personal_trainers 
//             SET name='${name}',
//             gender='${gender}', 
//             accountimg_url='${accountimg_url}' WHERE personal_trainer_id=${personal_trainer_id};`,(err)=>{

//       if(err){
//           console.log(err)
//           res.send('Data dengan personal trainer id ${personal_trainer_id} gagal diupdate');
//           return
//       }
//       res.send(`Data dengan personal trainer id ${personal_trainer_id} berhasil diupdate`)
//   })
// })
 
// // update table ratings // 
// app.put('/update_ratings', (req, res) => {
//   const { rating_id, personal_trainer_id, user_id, rating, rating_sum, rate_count, comment } = req.body;
//   db.query(`UPDATE ratings 
//             SET personal_trainer_id='${personal_trainer_id}', 
//             user_id='${user_id}',
//             rating='${rating}', 
//             rating_sum='${rating_sum}', 
//             rate_count='${rate_count}', 
//             comment='${comment}' WHERE rating_id=${rating_id};`,(err)=>{
//       if(err){
//           console.log(err)
//           res.send('Data dengan rating id ${rating_id} gagal diupdate');
//           return
//       }
//       res.send(`Data dengan rating id ${rating_id} berhasil diupdate`)
//   })
// })


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // Menghapus values
// app.delete('/delete_account',(req,res)=>{
//     const { user_id } = req.body
//     db.query(`DELETE FROM account WHERE user_id=${user_id}`,(err)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//         res.send(`Data dengan user_id ${user_id} berhasil dihapus`)
//     })
// })

// // Menghapus values di bookings
// app.delete('/delete_bookings',(req,res)=>{
//   const { booking_id } = req.body
//   db.query(`DELETE FROM bookings WHERE booking_id=${booking_id}`,(err)=>{
//       if(err){
//           console.log(err)
//           return
//       }
//       res.send(`Data dengan booking_id ${booking_id} berhasil dihapus`)
//   })
// })

// // Menghapus values di class 
// app.delete('/delete_class',(req,res)=>{
//   const { class_id } = req.body
//   db.query(`DELETE FROM class WHERE class_id=${class_id}`,(err)=>{
//       if(err){
//           console.log(err)
//           return
//       }
//       res.send(`Data dengan class_id ${class_id} berhasil dihapus`)
//   })
// })

// app.delete('/delete_ratings',(req,res)=>{
//   const { personal_trainer_id } = req.body;

//   db.query(`DELETE FROM ratings WHERE personal_trainer_id = ${personal_trainer_id}; 
//             DELETE FROM personal_trainers WHERE personal_trainer_id = ${personal_trainer_id};`, (err) => {
//     if(err){
//       console.log(err);
//       res.status(500).send('Terjadi kesalahan dalam menghapus data.');
//       return;
//     }
//     res.send(`Data dengan personal trainer id ${personal_trainer_id} berhasil dihapus.`);
//   })
// })
