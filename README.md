<br />
<div align="center">
  <h1 align="center">:mechanical_arm: Iron Pulse Fitness :mechanical_arm:</h1>
</div>

#### _Iron Pulse Fitness_
> Iron Pulse Fitness is an implementation of a gym membership system that will be developed as a web application. The components of Iron Pulse Fitness consist of customers, courses, and admins. Customers have the ability to book a course, where each course has multiple schedules throughout the day. Each schedule is led by a different personal trainer. The personal trainer component includes their name, age, rating, and gender. On the other hand, customers have components such as name, email, phone number, weight, and height. The course component includes duration, level, calorie burn, workout type, the name of the personal trainer, and the class capacity.

#### SBD Group E5:
- Ibrahim Rijal - 2106633323
- Mohammad varrel bramasta - 2106733811
- Najwa Fathiadisa - 2106654391

#### Features
- Login and Register
- Login has two types: admin login and member login
- Users have the ability to rate personal trainers
- User passwords are already encrypted.


## Explanation of Tables in the Program
#### 1.  ```Account```

The Account table is used to store the data of the ```Account``` on the website. This table has several attributes, including:
```
1.  user_ID
2.  name
3.  email
4.  pass
5.  phone
6.  bdate
7.  age
8.  weight
9.  height
10. bmi
11. gender
12. admin_priv
13. accountimg_url
```
#### 2.  ```personal_trainers```

The personal_trainers table is used to store the data of the ```personal_trainers``` on the website. This table has several attributes, including:
```
1. personal_trainer_id
2. name
3. gender
4. accountimg_url
5. rating_sum
6. rate_count
```
#### 3.  ```class```

The class table is used to store the data of the ```class``` on the website. This table has several attributes, including:
```
1. class_id
2. duration
3. personal_trainer_id
4. difficulty
5. calorie
6. workout
7. pt_name
8. capacity
9. booked
```

#### 4.  ```bookings```

The bookings table is used to store the data of the ```bookings``` on the website. This table has several attributes, including:
```
1. booking_id
2. start_time
3. end_time
4. class_id
5. user_id
6. booking_status
```
#### 5.  ```ratings```

The ratings table is used to store the data of the ```ratings``` on the website. This table has several attributes, including:
```
1. rating_id
2. personal_trainer_id
3. user_id
4. rating
5. comment
```

### Relation Table and UML Diagram View

```Table Relational or ERD:```
  ![ERD](https://github.com/varrel123/Proyek-Akhir-SBD/blob/f1fffbf23515ca02e517d5f107b8cc4c2e47fb25/Table%20relational.png)

```UML:```
  ![ERD](https://github.com/SistemBasisData2023/IronPulse/blob/646756f9b885256f35cbc75bce8b0377ada843b9/UML.jpg)
  
### Flowchart View

```Flowchart```
  ![Flowchart](https://github.com/varrel123/Proyek-Akhir-SBD/blob/f1fffbf23515ca02e517d5f107b8cc4c2e47fb25/Flowchart.png)
