const express = require('express')
const app = express()
const  { Client }  = require('pg')
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

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

// Menampilkan table //
app.get('/', (req, res) => {
    db.query('SELECT * FROM account', (err, accountResults) => {
      if (err) {
        console.log(err);
        return;
      }
  
      db.query('SELECT * FROM bookings', (err, bookingsResults) => {
        if (err) {
          console.log(err);
          return;
        }
  
        db.query('SELECT * FROM class', (err, classResults) => {
          if (err) {
            console.log(err);
            return;
          }
  
          db.query('SELECT * FROM personal_trainers', (err, trainersResults) => {
            if (err) {
              console.log(err);
              return;
            }
  
            db.query('SELECT * FROM ratings', (err, ratingsResults) => {
              if (err) {
                console.log(err);
                return;
              }
  
              res.send({
                account: accountResults.rows,
                bookings: bookingsResults.rows,
                class: classResults.rows,
                personal_trainers: trainersResults.rows,
                ratings: ratingsResults.rows
              });
            });
          });
        });
      });
    });
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Insert table account //
  app.post('/insert_account', (req, res) => {
    const { user_id,name, email, phone, bdate, age, weight, height,bmi ,gender, admin_priv, accountimg_url } = req.body;
    db.query(`INSERT INTO account (user_id,name, email, phone, bdate, age, weight, height, gender, admin_priv, accountimg_url)
      VALUES ('${user_id}','${name}', '${email}', '${phone}', '${bdate}', ${age}, ${weight}, ${height}, ${bmi}','${gender}', ${admin_priv}, '${accountimg_url}');`, (err) => {
      if (err) {
        console.log(err);
        res.send('Gagal memasukkan data ke tabel account.');
        return;
      }
    });
    res.send('Data berhasil diinput ke table account.');
})

// Insert table bookings //
app.post('/insert_bookings', (req, res) => {
    const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
    db.query(`INSERT INTO bookings (booking_id,start_time, end_time, class_id, user_id, booking_status)
      VALUES ('${booking_id}','${start_time}', '${end_time}', ${class_id}, ${user_id}, '${booking_status}');`, (err) => {
      if (err) {
        console.log(err);
        res.send('Data gagal diinput ke table bookings.');
        return;
      }
    });
    res.send('Data berhasil diinput ke table bookings.');
})

// Insert table class //
app.post('/insert_class', (req, res) => {
    const { class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked} = req.body;
  
    db.query(`INSERT INTO class (class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked)
      VALUES (${class_id},${duration}, ${personal_trainer_id}, '${difficulty}', ${calorie}, '${workout}', '${pt_name}', ${capacity}, ${booked});`, (err) => {
      if (err) {
        console.log(err);
        res.send('Gagal memasukkan data ke tabel class.');
        return;
      }
    });
    res.send('Data berhasil diinput class.');
})
 
// Insert table personal trainers //
app.post('/insert_personal_trainers', (req, res) => {
    const { personal_trainer_id,name, gender, accountimg_url } = req.body;
    db.query(`INSERT INTO personal_trainers (personal_trainer_id,name, gender, accountimg_url)
      VALUES ('${personal_trainer_id}','${name}', '${gender}', '${accountimg_url}');`, (err) => {
      if (err) {
        console.log(err);
        res.send('Gagal memasukkan data ke tabel personal_trainers.');
        return;
      }
    });
    res.send('Data berhasil diinput personal_trainers.');
})
 
// Insert table ratings //
app.post('/insert_ratings', (req, res) => {
    const { rating_id,personal_trainer_id, user_id, rating, rating_sum, rate_count, comment} = req.body;
    db.query(`INSERT INTO ratings (rating_id,personal_trainer_id, user_id, rating, rating_sum, rate_count, comment)
      VALUES (${rating_id},${personal_trainer_id}, ${user_id}, ${rating}, ${rating_sum}, ${rate_count}, '${comment}');`, (err) => {
      if (err) {
        console.log(err);
        res.send('Gagal memasukkan data ke tabel ratings.');
        return;
      }
    });
    res.send('Data berhasil diinput ke table ratings.');
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // update table account //
  app.put('/update_account', (req, res) => {
    const { user_id,name, email, phone, bdate, age, weight, height,bmi,gender, admin_priv, accountimg_url } = req.body;
    db.query(`UPDATE account 
      SET user_id='${user_id}',
      name='${name}',
      email='${email}', 
      phone='${phone}',
      bdate='${bdate}',  
      age='${age}',
      weight='${weight}',
      height='${height}',
      bmi='${bmi}',
      gender='${gender}',
      admin_priv='${admin_priv}',
      accountimg_url='${accountimg_url}' WHERE user_id=${user_id};`,(err)=>{

if(err){
  console.log(err)
  res.send('Data dengan user id ${user_id} gagal diupdate');
  return
}
res.send(`Data dengan user id ${user_id} berhasil diupdate`)
})
})

// update table bookings //
app.put('/update_bookings', (req, res) => {
    const {booking_id,start_time, end_time, class_id, user_id, booking_status } = req.body;
        db.query(`UPDATE bookings 
            SET start_time='${start_time}',
            end_time='${end_time}',
            class_id='${class_id}', 
            user_id='${user_id}',
            booking_status='${booking_status}' WHERE booking_id=${booking_id};`,(err)=>{

      if(err){
          console.log(err)
          res.send('Data dengan booking id ${booking_id} gagal diupdate');
          return
      }
      res.send(`Data dengan booking id ${booking_id} berhasil diupdate`)
  })
})

// update table class //
app.put('/update_class', (req, res) => {
    const { class_id,duration, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked} = req.body;
    db.query(`UPDATE class 
            SET duration='${duration}',
            personal_trainer_id='${personal_trainer_id}',
            difficulty='${difficulty}', 
            calorie='${calorie}',
            workout='${workout}',  
            pt_name='${pt_name}',
            capacity='${capacity}',
            booked='${booked}' WHERE class_id=${class_id};`,(err)=>{

      if(err){
          console.log(err)
          res.send('Data dengan class id ${class_id} gagal diupdate');
          return
      }
      res.send(`Data dengan class id ${class_id} berhasil diupdate`)
  })
})
 
// update table personal trainers //
app.put('/update_personal_trainers', (req, res) => {
  const { personal_trainer_id,name, gender, accountimg_url } = req.body;
  db.query(`UPDATE personal_trainers 
            SET name='${name}',
            gender='${gender}', 
            accountimg_url='${accountimg_url}' WHERE personal_trainer_id=${personal_trainer_id};`,(err)=>{

      if(err){
          console.log(err)
          res.send('Data dengan personal trainer id ${personal_trainer_id} gagal diupdate');
          return
      }
      res.send(`Data dengan personal trainer id ${personal_trainer_id} berhasil diupdate`)
  })
})
 
// update table ratings //
app.put('/update_ratings', (req, res) => {
  const { rating_id, personal_trainer_id, user_id, rating, rating_sum, rate_count, comment } = req.body;
  db.query(`UPDATE ratings 
            SET personal_trainer_id='${personal_trainer_id}', 
            user_id='${user_id}',
            rating='${rating}', 
            rating_sum='${rating_sum}', 
            rate_count='${rate_count}', 
            comment='${comment}' WHERE rating_id=${rating_id};`,(err)=>{
      if(err){
          console.log(err)
          res.send('Data dengan rating id ${rating_id} gagal diupdate');
          return
      }
      res.send(`Data dengan rating id ${rating_id} berhasil diupdate`)
  })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Menghapus values di account bermasalah
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

// Menghapus values di bookings
app.delete('/delete_bookings',(req,res)=>{
  const { booking_id } = req.body
  db.query(`DELETE FROM bookings WHERE booking_id=${booking_id}`,(err)=>{
      if(err){
          console.log(err)
          return
      }
      res.send(`Data dengan booking_id ${booking_id} berhasil dihapus`)
  })
})

// Menghapus values di class bermasalah
app.delete('/delete_class',(req,res)=>{
  const { class_id } = req.body
  db.query(`DELETE FROM class WHERE class_id=${class_id}`,(err)=>{
      if(err){
          console.log(err)
          return
      }
      res.send(`Data dengan class_id ${class_id} berhasil dihapus`)
  })
})

// Menghapus values di personal trainers
app.delete('/delete_personal_trainers',(req,res)=>{
  const { personal_trainer_id } = req.body
  db.query(`DELETE FROM personal_trainers WHERE personal_trainer_id=${personal_trainer_id}`,(err)=>{
      if(err){
          console.log(err)
          return
      }
      res.send(`Data dengan personal_trainer_id ${personal_trainer_id} berhasil dihapus`)
  })
})

// Menghapus values di ratings
app.delete('/delete_ratings',(req,res)=>{
  const { rating_id } = req.body
  db.query(`DELETE FROM ratings WHERE rating_id=${rating_id}`,(err)=>{
      if(err){
          console.log(err)
          return
      }
      res.send(`Data dengan rating_id ${rating_id} berhasil dihapus`)
  })
})

app.listen(3200,()=>{
    console.log('Server berjalan pada port 3200')
})
  