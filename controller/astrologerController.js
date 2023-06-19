const bcrypt = require("bcrypt");
const moment = require("moment")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ASTROLOGER";
const db = require("../database/config");

expiresIn = '24h'
  
  // .......................................... ASTROLOGER signup .............................................//
  
module.exports = {
signupAstrologer : async (req, res) => {
  const { name, email, phone, password, astrologer_type, gender } = req.body;
  try {
    const getEmail = "select email from astrologer where email=(?)";
      await db.query(getEmail, [email], async (error, result)=>{
      if(error)console.log(error);
      else if(result[0]?.email == email){
        return res.status(400).json({ message: "email already exist" });
      }else if(phone.length!=10){
        return res.status(400).json({ message: "phone number is not valid" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const createAstrologer ="insert into astrologer (name,email,phone,password,astrologer_type,gender) values (?,?,?,?,?,?)";
        await db.query(createAstrologer,[name, email, phone, hashedPassword, astrologer_type, gender],(error, result)=>{
            if (error) console.log(error);
            res.status(200).json({message:"astrologer created"})
          }
        );
      }
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "server problem" });
  }
},

// .......................................... ASTROLOGER signin .............................................//

signinAstrologer : (req, res) => {
    const {email,password} = req.body;
    try{
      const selectEmailPassword ="select email,password from astrologer where email = (?)";
        db.query(selectEmailPassword,[email], async (error,result)=>{
            if(error) console.log(error)
            if(result[0]?.email!=email){
              return res.status(400).json({message:"user not found."})
            }
            const isMatch = await bcrypt.compare(password,result[0].password)
            if(!isMatch){
              return res.status(400).json({message:"wrong password"})
            } 
            const selectId = "select id from astrologer where email =?";
            await db.query(selectId,[email],(error,result)=>{
                if(error) console.log(error)
                const token = jwt.sign({email:email,id:result[0].id},SECRET_KEY,{expiresIn});
                return res.status(200).json({message:"bhramastra user loggedin",token:token})
            });
          })
    }catch(error){
        console.log(error);
    }
},

// .......................................... ASTROLOGER delete .............................................//

deleteAstrologer : (req, res) => {
    let id = req.astrologerId;
    const getAstrologerOne = "select * from astrologer where id =?";
    db.query(getAstrologerOne,[id],(error,result)=>{
        const deleted_astrologer = result;
        const deleteAstrologerUser = "delete from astrologer where id = (?)";
        db.query(deleteAstrologerUser,[id],(error,result)=>{
            if(error) console.log(error);  
                res.status(200).json({message:"astrologer deleted",astrologerDeleted:deleted_astrologer})
          })
    })
    
},

// .......................................... ASTROLOGER update .............................................//
updateAstrologer :async (req, res) => {
    let id = req.astrologerId;
    const { name, phone, password, astrologer_type, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const updateAstrologerUser = "update astrologer set name=?, phone=?, password=?, astrologer_type=?, gender=? where id= (?)";
    db.query(updateAstrologerUser,[name, phone, hashedPassword, astrologer_type, gender, id],(error,result)=>{
      if(error) console.log(error);
      if(name&&phone&&password&&astrologer_type&&gender&&phone.length==10){
        res.status(200).json({message:"astrologer updated..",updated:{name, phone, password, astrologer_type, gender }});
      }else{
        res.status(400).json({message:"bad request"});
      }
    })
},

// .......................................... ASTROLOGER all ................................................//
allAstrologer : (req, res) => {
  const getAstrologer = "select * from astrologer";
    db.query(getAstrologer,(error,result)=>{
        if(error) console.log(error);
        let allAstrologers =result
        console.log(result)
        res.status(200).json({data:allAstrologers});
    })
},

astrologerByType : (req,res)=>{
  const {astrologer_type} = req.query;
  let typeArray = astrologer_type;
  const placeholders = typeArray.map(() => "?").join(",");
  const sql = "SELECT * FROM astrologer WHERE astrologer_type IN (" + placeholders + ")";
  console.log(sql)
  db.query(sql, typeArray, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.status(200).json({ result });
    }
  });
},

// .......................................... ASTROLOGER profile ................................................//

profile : (req,res)=>{
  const id = req.astrologerId;
  const email = req.astrologerEmail
  console.log(id,email);
  const profileAstrologer =
  "select * from astrologer where email = (?) and id = (?) ";
  db.query(profileAstrologer,[email,id],(error,result)=>{
    if(error) console.log(error);
    if(result!=undefined){
      // console.log(result)
      res.status(200).json({message:"astrologer is valid",astrologer:result})
    }else{
      console.log("user does not exist");
    }
  })
},

// .......................................... ASTROLOGER by ID ................................................//

getAstrologerById : (req,res)=>{
  let id = req.params.id;
  const getAstrologerOne = "select * from astrologer where id =?";
  db.query(getAstrologerOne,[id],(error,result)=>{
    if(error) console.log(error);
      res.status(200).json({profile_data:result})
  })
},

//............................................. create leave astrologer ............................................//

createLeave: function (req, res) {
  const { astrologerId, startDate, endDate, reason } = req.body;

  // Validate input values
  if (!astrologerId || !startDate || !endDate || !reason) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  // Calculate total number of days for the leave
  const start = moment(startDate);
  const end = moment(endDate);
  const totalDays = end.diff(start, "days");

  const query = `INSERT INTO \`leave\` (astrologer_id, start_date, end_date, reason, total_days) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [astrologerId, startDate, endDate, reason, totalDays],
    (err, result) => {
      if (err) {
        console.error("Error saving leave application: ", err);
        res
          .status(500)
          .json({
            error: "An error occurred while saving the leave application.",
          });
        return;
      }
      res.json({
        message: "Leave application saved successfully.",
        leaveId: result.insertId,
        totalDays,
      });
    }
  );
},

}

