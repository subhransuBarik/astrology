const express = require("express")
const astrologerRouter = express.Router()

const astrologerController = require("../controller/astrologerController");
const astroCallListController = require("../controller/astroCallListController")
const astrologercalllist = require("../controller/astrologercalllist")
const SetRateController = require("../controller/SetRateController")
const shortcutController = require("../controller/shortcutController")
const astrologerChatController = require("../controller/astrologerChatController")


const auth = require("../middlewares/auth")
//............................................... astrologer controller ...........................................................//
astrologerRouter.post("/signup",astrologerController.signupAstrologer);
astrologerRouter.post("/signin",astrologerController.signinAstrologer);
astrologerRouter.get("/astrologer",astrologerController.astrologerByType);
astrologerRouter.get("/astrologer-all",astrologerController.allAstrologer);
astrologerRouter.get("/astrologer/:id",astrologerController.getAstrologerById);
astrologerRouter.post("/delete-astrologer",auth,astrologerController.deleteAstrologer);
astrologerRouter.post("/update-astrologer",auth,astrologerController.updateAstrologer);
astrologerRouter.get("/profile",auth,astrologerController.profile);

astrologerRouter.post('/createLeave',auth, astrologerController.createLeave);//leave application

//.......................................... astrologer calllist controller ........................................................//
astrologerRouter.post('/astrologer-calls',auth,astroCallListController.astrologerCalls);

//.......................................... astrologercalllist.....................................................................//
astrologerRouter.post('/createCalls',auth,astrologercalllist.createCallList)
astrologerRouter.get('/getCallerId/:caller_id',astrologercalllist.getCallerId);

//.......................................... set rate controller ..................................................................//
astrologerRouter.post('/createrate',   SetRateController.createAstrologerRate);
astrologerRouter.post('/astrologers/discount',auth, SetRateController.calculateDiscountedRates);
astrologerRouter.get('/astrologers',  SetRateController.getAstrologers);
astrologerRouter.post('/astrologers/rate', SetRateController.setAstrologerRate);

//.......................................... shortcut controller ................................................................//
astrologerRouter.post('/shortcuts',auth, shortcutController.createMessage);
astrologerRouter.get('/shortcuts',auth, shortcutController.getMessage);
astrologerRouter.post('/shortcutsid/:id',auth, shortcutController.updateMessage);
astrologerRouter.delete('/astrologer/shortcuts/:id',auth, shortcutController.deleteMessage);

//.........................................astrologer chat controller .............................................................//
// astrologerRouter.get("/user_chat/:chat_id",astrologerChatController.userChatHistory)//checking user is talking to which astro
// astrologerRouter.post("/user_send",astrologerChatController.userChatPost)//user sending data to astrologer
astrologerRouter.get("/astrologer_chat/:chat_id",auth,astrologerChatController.astrologerChatHistory)//checking astrologer is talking to which user
astrologerRouter.post("/astrologer_send",auth,astrologerChatController.astrologerChatPost)//user sending data to astrologer


module.exports = astrologerRouter;

