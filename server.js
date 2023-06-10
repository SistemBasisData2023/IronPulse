//////////////////////////////////////////// package ////////////////////////////////////////////
const express = require("express");
const app = express();
const { Client } = require("pg");
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const session = require("express-session");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

//////////////////////////////////////////// koneksi db neon ////////////////////////////////////////////
const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  sslmode: process.env.DB_SSLMODE,
  ssl: process.env.DB_SSL === "true",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Iron Pulse Fitness berhasil terkoneksi..");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

//test session
app.get("/session", (req, res) => {
  const userId = req.session.user_id;
  const sessionData = req.session;
  res.json(sessionData);
});

//////////////////////////////////////////// account ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil melihat semua account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/check_all_account", (req, res) => {
  db.query("SELECT * FROM account", (err, accountResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ account: accountResults.rows });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil register
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register", (req, res) => {
  temp = req.session;
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
  temp.age = req.body.age;

  if (
    temp.pass !== undefined &&
    temp.name !== undefined &&
    temp.email !== undefined &&
    temp.phone !== undefined &&
    temp.bdate !== undefined &&
    temp.weight !== undefined &&
    temp.height !== undefined &&
    temp.bmi !== undefined &&
    temp.gender !== undefined &&
    temp.admin_priv !== undefined &&
    temp.accountimg_url !== undefined &&
    temp.age !== undefined &&
    temp.pass.length > 0 &&
    temp.name.length > 0 &&
    temp.email.length > 0 &&
    temp.phone.length > 0 &&
    temp.bdate.length > 0 &&
    temp.weight.length > 0 &&
    temp.height.length > 0 &&
    temp.bmi.length > 0 &&
    temp.gender.length > 0 &&
    temp.admin_priv.length > 0 &&
    temp.accountimg_url.length > 0 &&
    temp.age.length > 0
  ) {
    bcrypt.hash(temp.pass, 10, (err, hash) => {
      if (err) {
        res.end("Error!!");
      } else {
        const query = `INSERT INTO account (name, email, pass, phone,bdate ,weight, height,bmi,gender, admin_priv,accountimg_url,age) VALUES ('${temp.name}', '${temp.email}', '${hash}', '${temp.phone}','${temp.bdate}' ,'${temp.weight}','${temp.height}','${temp.bmi}' ,'${temp.gender}', '${temp.admin_priv}','${temp.accountimg_url}','${temp.age}')`;
        db.query(query, (err, results) => {
          if (err) {
            console.log(err);
            res.end("Error!!");
          } else {
            res.end("Register berhasil !");
          }
        });
      }
    });
  } else {
    res.end("empty");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil login admin
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/login_admin", async (req, res) => {
  const temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;

  if (temp.email !== undefined && temp.pass !== undefined) {
    const query = `SELECT user_id,email, pass,admin_priv FROM account WHERE email = '${temp.email}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send("Invalid email");
      } else {
        const storedPassword = results.rows[0].pass;
        const adminPriv = results.rows[0].admin_priv || false;
        const userId = results.rows[0].user_id; // Menyimpan user_id dari hasil query

        bcrypt.compare(temp.pass, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send("Internal Server Error");
            return;
          }

          if (result) {
            if (adminPriv == true) {
              temp.user_id = userId;

              res.status(200).json({
                message: "Login successful (Admin)",
              });
            } else {
              res.status(401).json({
                message: "Invalid account",
              });
            }
          } else {
            res.status(401).send("Invalid password");
          }
        });
      }
    });
  } else {
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil login member
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/login_member", async (req, res) => {
  const temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;

  if (temp.email !== undefined && temp.pass !== undefined) {
    const query = `SELECT user_id,email, pass, admin_priv FROM account WHERE email = '${temp.email}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send("Invalid email");
      } else {
        const storedPassword = results.rows[0].pass;
        const adminPriv = results.rows[0].admin_priv || false;
        const userId = results.rows[0].user_id; // Menyimpan user_id dari hasil query

        bcrypt.compare(temp.pass, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send("Internal Server Error");
            return;
          }

          if (result) {
            if (adminPriv == false) {
              temp.user_id = userId;
              req.session.user_id = userId; // Save the user_id in the session
              res.status(200).json({
                message: "Login successful (member)",
                user_id: req.session.user_id,
              });
            } else {
              res.status(401).json({
                message: "Invalid account",
              });
            }
          } else {
            res.status(401).send("Invalid password");
          }
        });
      }
    });
  } else {
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil check_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/check_account", (req, res) => {
  temp = req.session;
  temp.email = req.body.email;
  temp.email = req.query.email ?? "";

  if (temp.email.length === 0) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const query = `SELECT * FROM account WHERE email = '${temp.email}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.rowCount > 0) {
      temp.account = results.rows[0];
      res.status(200).json(temp.account);
    } else {
      res.status(404).json({ message: "Account tidak dapat ditemukan" });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil delete_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/delete_account", (req, res) => {
  const { user_id } = req.body;
  db.query(`DELETE FROM account WHERE user_id=${user_id}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`Data dengan user_id ${user_id} berhasil dihapus`);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil mengupdate account berdasarkan user_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/change_account", (req, res) => {
  temp = req.session;
  temp.user_id = req.body.user_id;
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
  temp.age = req.body.age;

  db.query(
    `UPDATE account 
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
      accountimg_url='${temp.accountimg_url}' ,
      age ='${temp.age}' WHERE user_id=${temp.user_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Data dengan email ${temp.email} gagal diupdate");
        return;
      }
      res.send(`Data dengan email ${temp.email} berhasil diupdate`);
    }
  );
});

//////////////////////////////////////////// personal trainers ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//view semua personal trainer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/check_all_pt", (req, res) => {
  db.query("SELECT * FROM personal_trainers", (err, ptResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ personal_trainers: ptResults.rows });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2. menambahkan personal trainer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/insert_pt", (req, res) => {
  const {
    personal_trainer_id,
    name,
    gender,
    accountimg_url,
    rating_sum,
    rate_count,
  } = req.body;
  db.query(
    `INSERT INTO personal_trainers (personal_trainer_id,name, gender, accountimg_url,rating_sum,rate_count)
      VALUES ('${personal_trainer_id}','${name}', '${gender}', '${accountimg_url}','${rating_sum}','${rate_count}');`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Gagal memasukkan data ke tabel personal_trainers.");
        return;
      }
    }
  );
  res.send("Data berhasil diinput personal_trainers.");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//3. mengubah salah atribut di personal trainer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/update_pt", (req, res) => {
  const {
    personal_trainer_id,
    name,
    gender,
    accountimg_url,
    rating_sum,
    rate_count,
  } = req.body;
  db.query(
    `UPDATE personal_trainers 
            SET personal_trainer_id='${personal_trainer_id}',
            name='${name}',
            gender='${gender}', 
            accountimg_url='${accountimg_url}',
            rating_sum='${rating_sum}', 
            rate_count='${rate_count}' WHERE personal_trainer_id=${personal_trainer_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(
          "Data dengan personal trainer id ${personal_trainer_id} gagal diupdate"
        );
        return;
      }
      res.send(
        `Data dengan personal trainer id ${personal_trainer_id} berhasil diupdate`
      );
    }
  );
});

////////////////////////////////////////////      bookings      ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil view semua bookings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/check_all_booking", (req, res) => {
  db.query("SELECT * FROM bookings", (err, bookingsResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ bookigs: bookingsResults.rows });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil menambahkan values dalam bookings table
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/add_booking", (req, res) => {
  const {
    booking_id,
    start_time,
    end_time,
    class_id,
    user_id,
    booking_status,
  } = req.body;
  db.query(
    `INSERT INTO bookings (booking_id,start_time, end_time, class_id, user_id, booking_status)
      VALUES ('${booking_id}','${start_time}', '${end_time}', ${class_id}, ${user_id}, '${booking_status}');`,
    (err) => {
      if (err) {
        console.log(err);
        // res.send('Data gagal diinput ke table bookings.');
        return;
      }
    }
  );
  res.send("Data berhasil diinput ke table bookings.");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil bookings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/booking", async (req, res) => {
  const booking_id = req.body.booking_id;

  if (booking_id > 0) {
    const query = `SELECT booking_id FROM bookings WHERE booking_id = '${booking_id}';`; //user_id

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send("Invalid booking id");
      } else {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }

        if (results) {
          res.status(200).send("booking id successful");
        } else {
          res.status(401).send("Invalid booking id");
        }
      }
    });
  } else {
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// berhasil delete bookings berdasarkan booking_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/delete_booking", (req, res) => {
  const { booking_id } = req.body;
  db.query(`DELETE FROM bookings WHERE booking_id=${booking_id}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`Data dengan booking_id ${booking_id} berhasil dihapus`);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil Merubah value di bookings (error)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/update_booking", (req, res) => {
  const {
    booking_id,
    start_time,
    end_time,
    class_id,
    user_id,
    booking_status,
  } = req.body;
  db.query(
    `UPDATE bookings 
            SET booking_id = '${booking_id}', 
            start_time='${start_time}',
            end_time='${end_time}',
            class_id='${class_id}', 
            user_id='${user_id}',
            booking_status='${booking_status}' WHERE booking_id=${booking_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Data dengan booking id ${booking_id} gagal diupdate");
        return;
      } else {
        res.send(`Data dengan booking id ${booking_id} berhasil diupdate`);
      }
    }
  );
});

////////////////////////////////////////////      class        ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//1. view semua class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/check_all_class", (req, res) => {
  db.query("SELECT * FROM class", (err, classResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ class: classResults.rows });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2.Memilih class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/class", async (req, res) => {
  const class_id = req.body.class_id;

  if (class_id > 0) {
    const query = `SELECT class_id FROM class WHERE class_id = '${class_id}';`; //user_id

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(401).send("Invalid class id");
      } else {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }

        if (results) {
          res.status(200).send("class id successful");
        } else {
          res.status(401).send("Invalid class id");
        }
      }
    });
  } else {
    res.status(400).send("Invalid request");
  }
});

app.get("/classtype", async (req, res) => {
  const workoutType = req.query.workout;
  console.log(workoutType);

  if (workoutType) {
    const query = `SELECT * FROM class WHERE workout = '${workoutType}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(404).send("No classes found for the specified workout type");
      } else {
        res.status(200).json({ classes: results.rows });
      }
    });
  } else {
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//3. menghapus class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete("/delete_class", (req, res) => {
  const { class_id } = req.body;
  db.query(`DELETE FROM class WHERE class_id = ${class_id}; `, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Terjadi kesalahan dalam menghapus data.");
      return;
    }
    res.send(`Data dengan class_id ${class_id} berhasil dihapus.`);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//4. mengubah salah atribut di class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////      ratings      ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//1. menambahkan ratings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/insert_ratings", (req, res) => {
  const { rating_id, personal_trainer_id, user_id, rating, comment } = req.body;
  db.query(
    `INSERT INTO ratings (rating_id,personal_trainer_id, user_id, rating,comment)
            VALUES (${rating_id},${personal_trainer_id}, ${user_id},${rating} ,'${comment}');`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Gagal memasukkan data ke tabel ratings.");
        return;
      }
    }
  );
  res.send("Data berhasil diinput ke table ratings.");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2. mengubah ratings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/update_ratings", (req, res) => {
  const { rating_id, personal_trainer_id, user_id, rating, comment } = req.body;
  db.query(
    `UPDATE ratings SET rating_id='${rating_id}',
            personal_trainer_id='${personal_trainer_id}',
            user_id='${user_id}', 
            rating='${rating}', 
            comment='${comment}' WHERE rating_id=${rating_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Data dengan rating id ${rating_id} gagal diupdate");
        return;
      }
      res.send(`Data dengan rating id ${rating_id} berhasil diupdate`);
    }
  );
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//3. menghapus ratings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete("/delete_ratings", (req, res) => {
  const { rating_id } = req.body;
  db.query(`DELETE FROM ratings WHERE rating_id = ${rating_id}; `, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Terjadi kesalahan dalam menghapus data.");
      return;
    }
    res.send(`Data dengan rating_id ${rating_id} berhasil dihapus.`);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//4. Melihat semua rating
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/check_all_ratings", (req, res) => {
  db.query("SELECT * FROM ratings", (err, ratingsResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ ratings: ratingsResults.rows });
  });
});


app.get("/getrating", (req, res) => {
  const personalTrainerId = req.query.personal_trainer_id;
  console.log(personalTrainerId);

  if (!personalTrainerId) {
    res.status(400).send("Invalid request. Missing personal_trainer_id parameter.");
    return;
  }

  db.query(
    `SELECT * FROM ratings WHERE personal_trainer_id = ${personalTrainerId}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(404).send("No ratings found for the specified personal_trainer_id");
      } else {
        res.status(200).json({ ratings: results.rows });
      }
    }
  );
});

////////////////////////////////////////////      port server   ////////////////////////////////////////////

app.listen(3300, () => {
  console.log("Server berjalan pada port 3300");
});
