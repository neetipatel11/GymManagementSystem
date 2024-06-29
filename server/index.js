import express, { json, response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gymreact"
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    }else {
        console.log("Connected");
    }
})
// Start Enquiry Details ...
app.post('/addEnquiry', (req, res) => {
    const { name, contact, email, age, gender } = req.body;
  
    const sql = 'INSERT INTO enquiry (name, contact, email, age, gender) VALUES (?, ?, ?, ?, ?)';
    const values = [name, contact, email, age, gender];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while creating the enquiry.' });
      }
  
      return res.status(200).json({ message: 'Enquiry added successfully.' });
    });
  });

app.get('/getEnquiry/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Select * FROM enquiry where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get enquiry error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/updateEnquiry/:id', (req, res) => {
    const id = req.params.id;
    const { name, contact, email, age, gender } = req.body;
    const sql = "UPDATE enquiry SET name = ?, contact = ?, email = ?, age = ?, gender = ? WHERE id = ?";
    const params = [name, contact, email, age, gender, id];
    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Update enquiry error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
  });

app.get('/getEnquiry', (req, res) => {
    const sql = "Select * FROM Enquiry";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get enquiry error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/deleteEnquiry/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM enquiry WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Update enquiry error in sql"});
        return res.json({Status: "Success"})
    })
})
// End Enquiry Details ...

// Start Plan Details ...
app.post('/addPlan', (req, res) => {
    const { name, price, duration } = req.body;
  
    const sql = 'INSERT INTO plan (name, price, duration) VALUES (?, ?, ?)';
    const values = [name, price, duration];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while creating the enquiry.' });
      }
  
      return res.status(200).json({ message: 'Plan added successfully.' });
    });
  });

app.get('/getPlan/:id', (req, res) => {
    const p_id = req.params.id;
    const sql = "Select * FROM plan where id = ?";
    con.query(sql, [p_id], (err, result) => {
        if(err) return res.json({Error: "Get plan error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/updatePlan/:id', (req, res) => {
    const p_id = req.params.id;
    const { name, price, duration } = req.body;
    const sql = "UPDATE plan SET name = ?, price = ?, duration = ? WHERE id = ?";
    const params = [name, price, duration, p_id];
    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Update plan error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
  });

app.get('/getPlan', (req, res) => {
    const sql = "Select * FROM Plan";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get enquiry error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/deletePlan/:id', (req, res) => {
    const p_id = req.params.id;
    const sql = "Delete FROM plan WHERE id = ?";
    con.query(sql, [p_id], (err, result) => {
        if(err) return res.json({Error: "Update plan error in sql"});
        return res.json({Status: "Success"})
    })
})
// End Plan Details ...

// Start Equipment Details ...

app.post('/addEquipment', (req, res) => {
    const { name, price, unit, date, description } = req.body;
  
    const sql = 'INSERT INTO equipment (name, price, unit, date, description) VALUES (?, ?, ?, ?, ?)';
    const values = [name, price, unit, date, description];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while creating the equipment.' });
      }
  
      return res.status(200).json({ message: 'Equipment added successfully.' });
    });
  });

app.get('/getEquipment/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Select * FROM equipment where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get equipment error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/updateEquipment/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, unit, date, description } = req.body;
    const sql = "UPDATE equipment SET name = ?, price = ?, unit = ?, date = ?, description = ? WHERE id = ?";
    const params = [name, price, unit, date, description, id];
    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Update equipment error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
  });

app.get('/getEquipment', (req, res) => {
    const sql = "Select * FROM Equipment";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get equipment error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/deleteEquipment/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM equipment WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Update equipment error in sql"});
        return res.json({Status: "Success"})
    })
})
// End Equipment Details ...

// Start Member Details ...

app.get('/getPlans', (req, res) => {
    const sql = 'SELECT * FROM Plan';
    con.query(sql, (err, result) => {
      if (err) {
        console.error('Get plan error in SQL:', err);
        return res.status(500).json({ error: 'An error occurred while fetching plans.' });
      }
      return res.status(200).json(result);
    });
  });

app.post('/addMember', (req, res) => {
    const { name, planId, contact, email, age, gender, jdate, edate, inamount } = req.body;
  
    const sql = 'INSERT INTO member (name, planId, contact, email, age, gender, jdate, edate, inamount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, planId, contact, email, age, gender, jdate, edate, inamount];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while creating the member.' });
      }
  
      return res.status(200).json({ message: 'Member added successfully.' });
    });
  });

app.get('/getMember/:id', (req, res) => {
    const m_id = req.params.id;
    const sql = "Select * FROM Member where id = ?";
    con.query(sql, [m_id], (err, result) => {
        if(err) return res.json({Error: "Get member error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/updateMember/:id', (req, res) => {
    const m_id = req.params.id;
    const { name, planId, contact, email, age, gender, jdate, edate, inamount } = req.body;
    const sql = "UPDATE member SET name = ?, planId = ?, contact = ?, email = ?, age = ?, gender = ?, jdate = ?, edate = ?, inamount = ? WHERE m_id = ?";
    const params = [name, planId, contact, email, age, gender, jdate, edate, inamount, m_id];
    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Update member error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
  });

app.get('/getMember', (req, res) => {
    const sql = "Select * FROM Member";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get member error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/deleteMember/:id', (req, res) => {
    const m_id = req.params.id;
    const sql = "Delete FROM member WHERE id = ?";
    con.query(sql, [m_id], (err, result) => {
        if(err) return res.json({Error: "Update member error in sql"});
        return res.json({Status: "Success"})
    })
})
// End Member Details ...

// Start Dashboard Details ...
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
      return res.json({Error: "You are no Authenticate"});
  } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
          if(err) return res.json({Error: "Token wrong"});
          req.role = decoded.role;
          req.id = decoded.id;
          next();
      })
  }
}

app.get('/dashboard', verifyUser, (req, res) => {
const sql = "SELECT * FROM Users";
con.query(sql, (err, result) => {
  if (err) {
    return res.status(500).json({ Error: "Error retrieving users from the database" });
  }
  const { role, id } = req;
  return res.json({ Status: "Success", Result: result, role, id });
});
});

app.get('/enquiryCount', (req, res) => {
    const sql = "Select count(id) as enquiry from enquiry";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: 'Error in running query'});
        return res.json(result);
    })
})

app.get('/equipmentCount', (req, res) => {
    const sql = "Select count(id) as equipment from equipment";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: 'Error in running query'});
        return res.json(result);
    })
})

app.get('/memberCount', (req, res) => {
    const sql = "Select count(id) as member from member";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: 'Error in running query'});
        return res.json(result);
    })
})

app.get('/planCount', (req, res) => {
    const sql = "Select count(id) as plan from plan";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: 'Error in running query'});
        return res.json(result);
    })
})
// End Dashboard Details ...


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ Status: 'Error', Error: 'Error in running query' });
        } else if (result.length === 0) {
            res.send({ Status: 'Error', Error: 'Invalid login credentials' });
        } else {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            res.send({ Status: 'Success', Data: result });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.listen(8081, () => {
    console.log("Running");
})