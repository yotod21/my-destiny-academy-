import pool from '../db.js';

export async function initDb(){
  const conn = await pool.getConnection();
  try{
    await conn.query(`CREATE TABLE IF NOT EXISTS posts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      slug VARCHAR(255),
      content TEXT,
      author VARCHAR(120),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS events (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      date DATE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS gallery (
      id INT PRIMARY KEY AUTO_INCREMENT,
      url VARCHAR(255),
      caption VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS courses (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      code VARCHAR(60),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS announcements (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120),
      email VARCHAR(180),
      subject VARCHAR(255),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);

    // seed sample data if empty
    const [pcount] = await conn.query("SELECT COUNT(*) AS c FROM posts");
    if(pcount[0].c === 0){
      await conn.query("INSERT INTO posts (title,slug,content,author) VALUES (?,?,?,?)", ['Welcome to Destiny Future Academy','welcome','This is the first post for Destiny Future Academy website.','Admin']);
    }
    const [ecount] = await conn.query("SELECT COUNT(*) AS c FROM events");
    if(ecount[0].c === 0){
      await conn.query("INSERT INTO events (title,date,description) VALUES (?,?,?)", ['Opening Ceremony','2025-09-01','Join us for the opening of Destiny Future Academy.']);
    }
    const [gcount] = await conn.query("SELECT COUNT(*) AS c FROM gallery");
    if(gcount[0].c === 0){
      await conn.query("INSERT INTO gallery (url,caption) VALUES (?,?)", ['https://placehold.co/600x400','Academy Building']);
    }
    const [ccount] = await conn.query("SELECT COUNT(*) AS c FROM courses");
    if(ccount[0].c === 0){
      await conn.query("INSERT INTO courses (title,code,description) VALUES (?,?,?)", ['Introduction to Programming','CS101','Learn programming basics.']);
    }
    const [acount] = await conn.query("SELECT COUNT(*) AS c FROM announcements");
    if(acount[0].c === 0){
      await conn.query("INSERT INTO announcements (title,content) VALUES (?,?)", ['Welcome','Destiny Future Academy is open for enrollment.']);
    }
  } finally {
    conn.release();
  }
}
