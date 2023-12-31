--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: booking_enum; Type: TYPE; Schema: public; Owner: mohammadvarrel23
--

CREATE TYPE public.booking_enum AS ENUM (
    'Booked',
    'cancelled',
    'Done'
);


ALTER TYPE public.booking_enum OWNER TO mohammadvarrel23;

--
-- Name: difficulty_enum; Type: TYPE; Schema: public; Owner: mohammadvarrel23
--

CREATE TYPE public.difficulty_enum AS ENUM (
    'Easy',
    'Medium',
    'Hard'
);


ALTER TYPE public.difficulty_enum OWNER TO mohammadvarrel23;

--
-- Name: gender_enum; Type: TYPE; Schema: public; Owner: mohammadvarrel23
--

CREATE TYPE public.gender_enum AS ENUM (
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.gender_enum OWNER TO mohammadvarrel23;

--
-- Name: workout_type; Type: TYPE; Schema: public; Owner: mohammadvarrel23
--

CREATE TYPE public.workout_type AS ENUM (
    'Muay Thai',
    'Yoga',
    'High-intensity interval training (HIIT)',
    'Zumba',
    'Pilates',
    'Poundfit'
);


ALTER TYPE public.workout_type OWNER TO mohammadvarrel23;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: mohammadvarrel23
--

CREATE TABLE public.account (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    pass text NOT NULL,
    phone character varying(20) NOT NULL,
    bdate date NOT NULL,
    weight double precision NOT NULL,
    height double precision NOT NULL,
    bmi double precision,
    gender public.gender_enum NOT NULL,
    admin_priv boolean NOT NULL,
    accountimg_url text,
    age interval
);


ALTER TABLE public.account OWNER TO mohammadvarrel23;

--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: mohammadvarrel23
--

CREATE SEQUENCE public.account_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO mohammadvarrel23;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohammadvarrel23
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: mohammadvarrel23
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    class_id integer NOT NULL,
    user_id integer NOT NULL,
    booking_status public.booking_enum DEFAULT 'Booked'::public.booking_enum
);


ALTER TABLE public.bookings OWNER TO mohammadvarrel23;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: mohammadvarrel23
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_booking_id_seq OWNER TO mohammadvarrel23;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohammadvarrel23
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: class; Type: TABLE; Schema: public; Owner: mohammadvarrel23
--

CREATE TABLE public.class (
    class_id integer NOT NULL,
    personal_trainer_id integer NOT NULL,
    difficulty public.difficulty_enum NOT NULL,
    calorie integer NOT NULL,
    workout public.workout_type NOT NULL,
    pt_name character varying(255) NOT NULL,
    capacity integer NOT NULL,
    booked integer DEFAULT 0,
    class_date date,
    start_time time without time zone,
    end_time time without time zone
);


ALTER TABLE public.class OWNER TO mohammadvarrel23;

--
-- Name: class_class_id_seq; Type: SEQUENCE; Schema: public; Owner: mohammadvarrel23
--

CREATE SEQUENCE public.class_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_class_id_seq OWNER TO mohammadvarrel23;

--
-- Name: class_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohammadvarrel23
--

ALTER SEQUENCE public.class_class_id_seq OWNED BY public.class.class_id;


--
-- Name: personal_trainers; Type: TABLE; Schema: public; Owner: mohammadvarrel23
--

CREATE TABLE public.personal_trainers (
    personal_trainer_id integer NOT NULL,
    name character varying(50) NOT NULL,
    gender public.gender_enum NOT NULL,
    accountimg_url text,
    rating_sum integer,
    rate_count integer
);


ALTER TABLE public.personal_trainers OWNER TO mohammadvarrel23;

--
-- Name: personal_trainers_personal_trainer_id_seq; Type: SEQUENCE; Schema: public; Owner: mohammadvarrel23
--

CREATE SEQUENCE public.personal_trainers_personal_trainer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_trainers_personal_trainer_id_seq OWNER TO mohammadvarrel23;

--
-- Name: personal_trainers_personal_trainer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohammadvarrel23
--

ALTER SEQUENCE public.personal_trainers_personal_trainer_id_seq OWNED BY public.personal_trainers.personal_trainer_id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: mohammadvarrel23
--

CREATE TABLE public.ratings (
    rating_id integer NOT NULL,
    personal_trainer_id integer NOT NULL,
    user_id integer NOT NULL,
    rating double precision,
    comment text
);


ALTER TABLE public.ratings OWNER TO mohammadvarrel23;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: mohammadvarrel23
--

CREATE SEQUENCE public.ratings_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_rating_id_seq OWNER TO mohammadvarrel23;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohammadvarrel23
--

ALTER SEQUENCE public.ratings_rating_id_seq OWNED BY public.ratings.rating_id;


--
-- Name: account user_id; Type: DEFAULT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: class class_id; Type: DEFAULT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.class ALTER COLUMN class_id SET DEFAULT nextval('public.class_class_id_seq'::regclass);


--
-- Name: personal_trainers personal_trainer_id; Type: DEFAULT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.personal_trainers ALTER COLUMN personal_trainer_id SET DEFAULT nextval('public.personal_trainers_personal_trainer_id_seq'::regclass);


--
-- Name: ratings rating_id; Type: DEFAULT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.ratings ALTER COLUMN rating_id SET DEFAULT nextval('public.ratings_rating_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: mohammadvarrel23
--

COPY public.account (user_id, name, email, pass, phone, bdate, weight, height, bmi, gender, admin_priv, accountimg_url, age) FROM stdin;
9	najwa	Najwa12@gmail.com	test12	1111	1990-05-20	70.2	70.2	79.2	Male	f	https://example.com/rijal.jpg	\N
18	rijal	rijal@gmail.com	$2b$10$J2EESie7zxy2LiO/1pqzruVvlgIcJZxJMhFwc42E0vtdghUBlu482	7777	1990-05-20	70.2	70.2	80.1	Male	t	https://example.com/rijal.jpg	\N
19	brams	brams123@gmail.com	$2b$10$vQIeUSaHBnezsLRg0x1iX.7UMtaerdfJRPKBxmi/jBdfMdpm3Y0vq	7777	1990-05-20	70.2	70.2	80.1	Male	f	https://example.com/brams.jpg	\N
20	nama	email	$2b$10$Tet20JcKaM76s0ZmHmezUeyrCjY9CfCDSgeR10CEdzM7p2eikrn.i	0812	2002-11-23	12	12	833.3333333333334	Male	t	kuda	00:00:21
21	test	kuda	$2b$10$/O9eIvcYBfStzWxBU91OXujS.uOspeASYfqoDvQdtSe48uoDJQb1S	76767	2023-06-14	12	12	833.3333333333334	Male	t	kuda	00:00:00
22	test2	test@email.com	$2b$10$Ei5r4JHwZqKtnMjmKK.UUe6boDoFh8LWtcR5WYJw9Fn8gWc5/Zpp6	2662	2023-06-06	12	12	833.3333333333334	Male	t	kuda	00:00:00
23	testing	testuser@email.com	$2b$10$gE8S71Fn3XXkMNZdlomBYenplMHOUC5lY1zz96UWkr8W1KEi4eyiG	0812	2023-06-23	12	10	1199.9999999999998	Female	f	kuda	00:00:00
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: mohammadvarrel23
--

COPY public.bookings (booking_id, class_id, user_id, booking_status) FROM stdin;
4	1	1	Booked
3	1	1	Booked
5	1	1	Booked
6	4	23	Booked
7	4	23	Booked
8	3	23	Booked
9	3	23	Booked
10	3	23	Booked
11	2	23	Booked
12	1	1	Booked
\.


--
-- Data for Name: class; Type: TABLE DATA; Schema: public; Owner: mohammadvarrel23
--

COPY public.class (class_id, personal_trainer_id, difficulty, calorie, workout, pt_name, capacity, booked, class_date, start_time, end_time) FROM stdin;
1	3	Medium	300	Yoga	John Doe	20	1	\N	\N	\N
2	3	Easy	300	Muay Thai	bramz	20	1	\N	\N	\N
3	3	Hard	300	Muay Thai	najwa	20	1	\N	\N	\N
4	4	Easy	200	Muay Thai	John Doe	10	0	2023-06-11	09:00:00	10:00:00
5	5	Medium	150	Yoga	Jane Smith	15	0	2023-06-12	18:30:00	19:30:00
6	6	Hard	300	Yoga	Mike Johnson	8	0	2023-06-13	14:00:00	15:30:00
\.


--
-- Data for Name: personal_trainers; Type: TABLE DATA; Schema: public; Owner: mohammadvarrel23
--

COPY public.personal_trainers (personal_trainer_id, name, gender, accountimg_url, rating_sum, rate_count) FROM stdin;
2	John Doe	Male	https://example.com/johndoe.jpg	10	10
3	brams	Male	https://example.com/johndoe.jpg	10	10
1	najwa fathiadisa	Female	https://example.com/najwa.jpg	35	35
4	Trainer 4	Male	https://example.com/trainer4.jpg	\N	\N
5	Trainer 5	Female	https://example.com/trainer5.jpg	\N	\N
6	Trainer 6	Male	https://example.com/trainer6.jpg	\N	\N
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: mohammadvarrel23
--

COPY public.ratings (rating_id, personal_trainer_id, user_id, rating, comment) FROM stdin;
1	2	9	45	Great trainer!
\.


--
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mohammadvarrel23
--

SELECT pg_catalog.setval('public.account_user_id_seq', 23, true);


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mohammadvarrel23
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 12, true);


--
-- Name: class_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mohammadvarrel23
--

SELECT pg_catalog.setval('public.class_class_id_seq', 1, true);


--
-- Name: personal_trainers_personal_trainer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mohammadvarrel23
--

SELECT pg_catalog.setval('public.personal_trainers_personal_trainer_id_seq', 1, false);


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mohammadvarrel23
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 1, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: class class_pkey; Type: CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);


--
-- Name: personal_trainers personal_trainers_pkey; Type: CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.personal_trainers
    ADD CONSTRAINT personal_trainers_pkey PRIMARY KEY (personal_trainer_id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rating_id);


--
-- Name: bookings bookings_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(class_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_personal_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_personal_trainer_id_fkey FOREIGN KEY (personal_trainer_id) REFERENCES public.personal_trainers(personal_trainer_id);


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mohammadvarrel23
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.account(user_id);


--
-- PostgreSQL database dump complete
--

