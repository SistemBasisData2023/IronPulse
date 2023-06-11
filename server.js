//////////////////////////////////////////// Import package yang akan digunakan ////////////////////////////////////////////
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

//////////////////////////////////////////// koneksi db neon menggunakan file.env ////////////////////////////////////////////
const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  sslmode: process.env.DB_SSLMODE,
  ssl: process.env.DB_SSL === "true",
});

//mengecek apakah database sudah terkoneksi
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Iron Pulse Fitness berhasil terkoneksi..");
});


// Menggunakan session middleware pada aplikasi Express
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Kunci rahasia untuk mengenkripsi sesi
    saveUninitialized: false, // Menyimpan sesi hanya jika ada perubahan
    resave: false, // Tidak menyimpan ulang sesi yang tidak berubah
    cookie: {
      httpOnly: true, // Hanya mengizinkan akses melalui HTTP
      maxAge: 3600000, // Masa berlaku sesi dalam milidetik (1 jam)
    },
  })
);

//mengetest apakah session sudah berjalan? sudah
app.get("/session", (req, res) => {
  const userId = req.session.user_id;
  const sessionData = req.session;
  res.json(sessionData);
});

//////////////////////////////////////////// account ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil melihat semua account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP GET untuk endpoint '/check_all_account'
app.get("/check_all_account", (req, res) => {
  // Mengeksekusi query SELECT * FROM account pada database
  db.query("SELECT * FROM account", (err, accountResults) => {
    if (err) {
      console.log(err); // Menampilkan kesalahan jika terjadi
      return;
    }
    // Mengirim respons dengan data account dari hasil query
    res.send({ account: accountResults.rows });
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///berhasil register
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP POST untuk endpoint '/register'
app.post("/register", (req, res) => {
  // Menyimpan data yang diterima dari permintaan dalam session sementara
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

  // Memeriksa apakah semua data yang diperlukan telah diterima dan tidak kosong
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
    // Menggunakan bcrypt untuk menghash password yang diterima
    bcrypt.hash(temp.pass, 10, (err, hash) => {
      if (err) {
        res.end("Error!!");
      } else {
        // Membuat query INSERT untuk menyimpan data akun baru ke dalam tabel "account" di database
        const query = `INSERT INTO account (name, email, pass, phone, bdate, weight, height, bmi, gender, admin_priv, accountimg_url, age) VALUES ('${temp.name}', '${temp.email}', '${hash}', '${temp.phone}', '${temp.bdate}', '${temp.weight}', '${temp.height}', '${temp.bmi}', '${temp.gender}', '${temp.admin_priv}', '${temp.accountimg_url}', '${temp.age}')`;
        // Menjalankan query pada database
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

// Menggunakan metode HTTP POST untuk endpoint '/login_admin'
app.post("/login_admin", async (req, res) => {
  const temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;

  // Memeriksa apakah email dan password telah diterima
  if (temp.email !== undefined && temp.pass !== undefined) {
    // Membuat query SELECT untuk mencari akun dengan email yang sesuai
    const query = `SELECT user_id, email, pass, admin_priv FROM account WHERE email = '${temp.email}';`;

    // Menjalankan query pada database
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Memeriksa apakah ada hasil dari query
      if (results.rowCount < 1) {
        res.status(401).send("Invalid email");
      } else {
        // Menyimpan password yang tersimpan, hak admin, dan user_id dari hasil query
        const storedPassword = results.rows[0].pass;
        const adminPriv = results.rows[0].admin_priv || false;
        const userId = results.rows[0].user_id;

        // Membandingkan password yang diberikan dengan password yang tersimpan menggunakan bcrypt
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

// Menggunakan metode HTTP POST untuk endpoint '/login_member'
app.post("/login_member", async (req, res) => {
  const temp = req.session;
  temp.email = req.body.email;
  temp.pass = req.body.pass;

  // Memeriksa apakah email dan password telah diterima
  if (temp.email !== undefined && temp.pass !== undefined) {
    // Membuat query SELECT untuk mencari akun dengan email yang sesuai
    const query = `SELECT user_id, email, pass, admin_priv FROM account WHERE email = '${temp.email}';`;

    // Menjalankan query pada database
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Memeriksa apakah ada hasil dari query
      if (results.rowCount < 1) {
        res.status(401).send("Invalid email");
      } else {
        // Menyimpan password yang tersimpan, hak admin, dan user_id dari hasil query
        const storedPassword = results.rows[0].pass;
        const adminPriv = results.rows[0].admin_priv || false;
        const userId = results.rows[0].user_id;

        // Membandingkan password yang diberikan dengan password yang tersimpan menggunakan bcrypt
        bcrypt.compare(temp.pass, storedPassword, (err, result) => {
          if (err) {
            res.status(500).send("Internal Server Error");
            return;
          }

          if (result) {
            if (adminPriv == false) {
              temp.user_id = userId;
              req.session.user_id = userId; // Menyimpan user_id dalam session
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

// Menggunakan metode HTTP GET untuk endpoint '/check_account'
app.get("/check_account", (req, res) => {
  const temp = req.session;
  temp.email = req.query.email ?? ""; // Mengambil email dari query parameter

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
      res.status(404).json({ message: "Account not found" });
    }
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Berhasil delete_account
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP DELETE untuk endpoint '/delete_account'
app.delete("/delete_account", (req, res) => {
  const { user_id } = req.body;

  // Menghapus data akun berdasarkan user_id
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

// Menggunakan metode HTTP PUT untuk endpoint '/change_account'
app.put("/change_account", (req, res) => {
  const temp = req.session;
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

  // Melakukan pembaruan data akun berdasarkan user_id
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
    accountimg_url='${temp.accountimg_url}',
    age ='${temp.age}' WHERE user_id=${temp.user_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(`Data dengan email ${temp.email} gagal diupdate`);
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

app.get("/check_all_pt", (req, res) => { //Menggunakan metode HHTP PUT untuk end point /check_all_pt
  db.query("SELECT * FROM personal_trainers", (err, ptResults) => { // query menampilkan semua PT
    if (err) {
      console.log(err);
      return;
    }
    res.send({ personal_trainers: ptResults.rows }); //send PT
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2. menambahkan personal trainer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP POST untuk endpoint '/insert_pt'
app.post("/insert_pt", (req, res) => {
  const {
    personal_trainer_id,
    name,
    gender,
    accountimg_url,
    rating_sum,
    rate_count,
  } = req.body;

  // Memasukkan data personal trainer baru ke dalam tabel "personal_trainers"
  db.query(
    `INSERT INTO personal_trainers (name, gender)
    VALUES ('${name}', '${gender}');`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Gagal memasukkan data ke tabel personal_trainers.");
        return;
      }

      res.send("Data berhasil diinput personal_trainers.");
    }
  );
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//3. mengubah salah atribut di personal trainer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP PUT untuk endpoint '/update_pt'
app.put("/update_pt", (req, res) => {
  const {
    name,
    gender,
    personal_trainer_id
  } = req.body;

  console.log(req.body);

  // Memperbarui data personal trainer berdasarkan personal_trainer_id
  db.query(
    `UPDATE personal_trainers 
    SET name='${name}', gender='${gender}' WHERE personal_trainer_id=${personal_trainer_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(
          `Data dengan personal trainer id ${personal_trainer_id} gagal diupdate`
        );
        return;
      }
      res.send(
        `Data dengan personal trainer id ${personal_trainer_id} berhasil diupdate`
      );
    }
  );
});


// Menggunakan metode HTTP DELETE untuk endpoint '/delete_pt'
app.delete("/delete_pt", (req, res) => {
  const { personal_trainer_id } = req.body;

  console.log(req.body);

  // Menghapus data personal trainer berdasarkan personal_trainer_id
  db.query(
    `DELETE FROM personal_trainers WHERE personal_trainer_id = ${personal_trainer_id};`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(`Error deleting personal trainer with ID ${personal_trainer_id}`);
        return;
      }
      res.send(`Personal trainer with ID ${personal_trainer_id} has been deleted`);
    }
  );
});



////////////////////////////////////////////      bookings      ////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil view semua bookings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP GET untuk endpoint '/check_all_booking'
app.get("/check_all_booking", (req, res) => {
  // Mengambil semua data booking dari tabel bookings
  db.query("SELECT * FROM bookings", (err, bookingsResults) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ bookigs: bookingsResults.rows });
  });
});

// Menggunakan metode HTTP GET untuk endpoint '/check_booking'
app.get("/check_booking", (req, res) => {
  const accountId = req.query.user_id;
  if (!accountId) {
    res.status(400).send("Invalid request. Missing account_id parameter.");
    return;
  }

  // Mengambil data booking berdasarkan account_id dari tabel bookings dengan melakukan join dengan tabel class dan left join dengan tabel ratings
  db.query(
    `SELECT b.booking_id, b.class_id, b.user_id, b.booking_status, c.workout, c.pt_name, c.start_time, c.end_time, c.class_date, c.personal_trainer_id, r.rating
    FROM bookings b
    INNER JOIN class c ON b.class_id = c.class_id
    LEFT JOIN ratings r ON b.user_id = r.user_id AND c.personal_trainer_id = r.personal_trainer_id
    WHERE b.user_id = ${accountId}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      
      res.status(200).json({ bookings: results.rows });
    }
  );
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil menambahkan values dalam bookings table
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP POST untuk endpoint '/add_booking'
app.post("/add_booking", (req, res) => {
  const { class_id, user_id } = req.body;

  // Menyisipkan data booking baru ke dalam tabel bookings berdasarkan class_id dan user_id yang diberikan
  db.query(
    `INSERT INTO bookings (class_id, user_id)
    VALUES (${class_id}, ${user_id});`,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to insert data into bookings table.");
        return;
      }
      res.send("Data successfully inserted into bookings table.");
    }
  );
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil bookings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP POST untuk endpoint '/booking'
app.post("/booking", async (req, res) => {
  const booking_id = req.body.booking_id;

  // Memeriksa apakah booking_id yang diberikan valid (lebih besar dari 0)
  if (booking_id > 0) {
    const query = `SELECT booking_id FROM bookings WHERE booking_id = '${booking_id}';`;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Jika tidak ada hasil yang ditemukan dari query, memberikan respons dengan status 401 dan pesan "Invalid booking id"
      if (results.rowCount < 1) {
        res.status(401).send("Invalid booking id");
      } else {
        // Jika ada hasil yang ditemukan dari query, memberikan respons dengan status 200 dan pesan "booking id successful"
        res.status(200).send("booking id successful");
      }
    });
  } else {
    // Jika booking_id tidak valid (kurang dari atau sama dengan 0), memberikan respons dengan status 400 dan pesan "Invalid request"
    res.status(400).send("Invalid request");
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// berhasil delete bookings berdasarkan booking_id
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP DELETE untuk endpoint '/delete_booking'
app.delete("/delete_booking", (req, res) => {
  const { booking_id } = req.body;

  // Melakukan query untuk menghapus data dengan booking_id yang diberikan
  db.query(`DELETE FROM bookings WHERE booking_id=${booking_id}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Memberikan respons dengan pesan yang menyatakan bahwa data dengan booking_id tersebut berhasil dihapus
    res.send(`Data dengan booking_id ${booking_id} berhasil dihapus`);
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//berhasil Merubah value di bookings (error)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menggunakan metode HTTP PUT untuk endpoint '/update_booking'
app.put("/update_booking", (req, res) => {
  const {
    booking_id,
    start_time,
    end_time,
    class_id,
    user_id,
    booking_status,
  } = req.body;

  // Melakukan query untuk mengupdate data dengan booking_id yang diberikan
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
        res.send(`Data dengan booking id ${booking_id} gagal diupdate`);
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

app.get("/check_all_class", (req, res) => { // Menggunakan metode HTTP GET untuk endpoint '/check_all_class'
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

    // Melakukan query ke database untuk mencari kelas dengan class_id yang diberikan
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Jika tidak ada hasil yang ditemukan, mengembalikan respon dengan status 401 dan pesan "Invalid class id"
      if (results.rowCount < 1) {
        res.status(401).send("Invalid class id");
      } else {
        // Jika hasil ditemukan
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }

        // Jika hasil ditemukan dan tidak ada error, mengembalikan respon dengan status 200 dan pesan "class id successful"
        if (results) {
          res.status(200).send("class id successful");
        } else {
          // Jika hasil ditemukan tetapi tidak valid, mengembalikan respon dengan status 401 dan pesan "Invalid class id"
          res.status(401).send("Invalid class id");
        }
      }
    });
  } else {
    // Jika class_id tidak valid, mengembalikan respon dengan status 400 dan pesan "Invalid request"
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// menambah class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/add_class", async (req, res) => {
  const {
    personal_trainer_id,
    difficulty,
    calorie,
    workout,
    capacity,
    class_date,
    start_time,
    end_time
  } = req.body;

  // Melakukan validasi untuk memastikan semua field yang diperlukan telah diberikan
  if (personal_trainer_id && difficulty && calorie && workout && capacity && class_date && start_time && end_time) {
    const query = `
    INSERT INTO class (personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, class_date, start_time, end_time)
    SELECT '${personal_trainer_id}', '${difficulty}', '${calorie}', '${workout}', name, '${capacity}', '${class_date}', '${start_time}', '${end_time}'
    FROM personal_trainers
    WHERE personal_trainer_id = '${personal_trainer_id}'
    RETURNING pt_name;
    `;

    // Menjalankan query untuk menambahkan class baru ke dalam database
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error" + err);
        console.log(err);
        return;
      }

      // Mengambil nama personal trainer yang terkait dengan class yang baru ditambahkan
      const pt_name = results.rows[0].name;

      // Mengembalikan respon dengan status 200 dan pesan sukses beserta nama personal trainer
      res.status(200).json({ message: "Class added successfully", pt_name });
    });
  } else {
    // Jika request tidak valid, mengembalikan respon dengan status 400 dan pesan "Invalid request"
    res.status(400).send("Invalid request");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// memilih class type
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/classtype", async (req, res) => {
  const workoutType = req.query.workout;
  console.log(workoutType);

  // Memeriksa apakah parameter workoutType telah diberikan
  if (workoutType) {
    const query = `SELECT * FROM class WHERE workout = '${workoutType}';`;

    // Melakukan query ke database untuk mencari semua class yang memiliki workoutType yang sesuai
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Jika tidak ada class yang ditemukan, mengembalikan respon dengan status 404 dan pesan "No classes found for the specified workout type"
      if (results.rowCount < 1) {
        res.status(404).send("No classes found for the specified workout type");
      } else {
        // Jika class ditemukan, mengembalikan respon dengan status 200 dan data class yang ditemukan dalam format JSON
        res.status(200).json({ classes: results.rows });
      }
    });
  } else {
    // Jika request tidak valid, mengembalikan respon dengan status 400 dan pesan "Invalid request"
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

  // Memeriksa apakah rating memiliki nilai yang valid (lebih dari 0)
  if (rating < 1) {
    return;
  }

  // Melakukan query untuk memasukkan data rating ke dalam tabel ratings
  db.query(
    `INSERT INTO ratings (personal_trainer_id, user_id, rating, comment)
     VALUES (${personal_trainer_id}, ${user_id}, ${rating}, '${comment}');`,
    (err) => {
      if (err) {
        console.log(err);
        res.send("Gagal memasukkan data ke tabel ratings.");
        return;
      }
    }
  );

  res.send("Data berhasil diinput ke tabel ratings.");
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2. mengubah ratings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/update_ratings", (req, res) => {
  const { rating_id, personal_trainer_id, user_id, rating, comment } = req.body;

  // Melakukan query untuk melakukan update pada data rating berdasarkan rating_id yang diberikan
  db.query(
    `UPDATE ratings SET rating_id='${rating_id}',
            personal_trainer_id='${personal_trainer_id}',
            user_id='${user_id}', 
            rating='${rating}', 
            comment='${comment}' WHERE rating_id=${rating_id};`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(`Data dengan rating id ${rating_id} gagal diupdate`);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//mengambil ratings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/getrating", (req, res) => {
  const personalTrainerId = req.query.personal_trainer_id;
  console.log(personalTrainerId);

  // Memeriksa apakah personal_trainer_id ada
  if (!personalTrainerId) {
    res.status(400).send("Invalid request. Missing personal_trainer_id parameter.");
    return;
  }

  // Melakukan query untuk mendapatkan rating berdasarkan personal_trainer_id
  db.query(
    `SELECT ratings.*, account.name AS account_name
     FROM ratings INNER JOIN account ON ratings.user_id = account.user_id
     WHERE personal_trainer_id = ${personalTrainerId}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.rowCount < 1) {
        res.status(404).send("No ratings found for the specified personal_trainer_id");
        return;
      }
      res.status(200).json({ ratings: results.rows });
    }
  );
});

////////////////////////////////////////////      port server   ////////////////////////////////////////////

app.listen(3300, () => {
  console.log("Server berjalan pada port 3300");
});
