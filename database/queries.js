const getEmail = "select email from astrologer where email=(?)";
const createAstrologer =
  "insert into astrologer (name,email,phone,password,astrologer_type,gender) values (?,?,?,?,?,?)";
const getAstrologer = "select * from astrologer";
const getAstrologerOne = "select * from astrologer where id =?";
const selectEmailPassword =
  "select email,password from astrologer where email = (?)";
const selectId = "select id from astrologer where email =?";
const deleteAstrologerUser = "delete from astrologer where id = (?)";
const profileAstrologer =
  "select * from astrologer where email = (?) and id = (?) ";
const updateAstrologerUser = "update astrologer set name=?, email=?, phone=?, password=?, astrologer_type=?, gender=? where id= (?)";
const getAstrologerProfile = "select * from astrologer where id = ?";


module.exports = {
  getEmail,
  createAstrologer,
  getAstrologer,
  selectEmailPassword,
  selectId,
  deleteAstrologerUser,
  getAstrologerOne,
  profileAstrologer,
  updateAstrologerUser,
  getAstrologerProfile
};
