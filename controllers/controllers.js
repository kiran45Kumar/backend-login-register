import db from '../db/db.js';
export const register = (req, res)=>{
    const {name, email, password} = req.body;
    const checkEmailSql = 'SELECT * from users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, results)=>{
        if (err) return res.status(500).json({error:err.message});
        if(results.length > 0){
            return res.status(400).json({message:"User already Exists!"})
        }
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name,email,password],(err, results)=>{
        if (err) return res.status(500).json({error:err.message});
        res.status(201).json({message:"User Registered Successfully"});
    });
    })
    
};

export const login = (req, res)=>{
    const {email, password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results)=>{
        if(err) return res.status(500).json({error:err.message});
        if (results.length === 0) return res.status(404).json({message:"User Not found"});
        const user = results[0];
        console.log(results);
        
        console.log(user);
        if(user.password !== password){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        res.status(200).json({message:"Login Successful", user});
    });
};