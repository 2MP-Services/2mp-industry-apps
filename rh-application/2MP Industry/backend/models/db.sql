-- Utilisateurs
 CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(50) UNIQUE NOT NULL,
 password_hash TEXT NOT NULL,
 role_id INT REFERENCES roles(id)
 );

-- Rôles
 CREATE TABLE roles (
 id SERIAL PRIMARY KEY,
 name VARCHAR(50) UNIQUE NOT NULL
 );

-- Employés
 CREATE TABLE employees (
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(100) NOT NULL,
 last_name VARCHAR(100) NOT NULL,
 profession_id INT REFERENCES professions(id),
 cin VARCHAR(15) UNIQUE NOT NULL,
 hire_date DATE NOT NULL
 );

-- Professions
 CREATE TABLE professions (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) UNIQUE NOT NULL
 );

-- Transports
 CREATE TABLE transports (
 id SERIAL PRIMARY KEY,
 type VARCHAR(50) NOT NULL,
 brand VARCHAR(50) NOT NULL,
 model VARCHAR(50) NOT NULL,
 registration VARCHAR(20) UNIQUE NOT NULL,
 purchase_date DATE NOT NULL
 );

-- Hiérarchie géographique
 CREATE TABLE wilayas (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) UNIQUE NOT NULL
 );
 CREATE TABLE dairas (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 wilaya_id INT REFERENCES wilayas(id)
 );
 CREATE TABLE communes (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 daira_id INT REFERENCES dairas(id)
 );

-- Ordres de mission
 CREATE TABLE mission_orders (
 id SERIAL PRIMARY KEY,
 order_number VARCHAR(20) UNIQUE NOT NULL,
 employee_id INT REFERENCES employees(id),
 depart_commune_id INT REFERENCES communes(id),
 transport_id INT REFERENCES transports(id),
 validity_from DATE NOT NULL,
 validity_to DATE NOT NULL,
 reason TEXT NOT NULL,
 created_by INT REFERENCES users(id)
 validated BOOLEAN DEFAULT TRUE,
 );

-- Destinations multiples
 CREATE TABLE mission_destinations (
 mission_id INT REFERENCES mission_orders(id),
 commune_id INT REFERENCES communes(id),
 PRIMARY KEY (mission_id, commune_id)
 );

 CREATE TABLE "ExitAuthorizations" (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES "Employees"(id) NOT NULL,
    reason TEXT NOT NULL,
    sortie_date DATE NOT NULL,
    sortie_time TIME NOT NULL,
    entree_date DATE NOT NULL,
    entree_time TIME NOT NULL,
    created_by INT REFERENCES "Users"(id) NOT NULL,
    validated BOOLEAN DEFAULT FALSE
);

 ALTER TABLE "Transports"
ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "updatedAt" SET DEFAULT NOW();

-- Table: public.Wilayas

-- DROP TABLE IF EXISTS public."Wilayas";
CREATE TABLE IF NOT EXISTS public."Pays"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);
