const express=require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup,findChat,deleteGroupChat} = require("../controllers/chatController");
const router=express.Router();



router.route('/').post(protect,accessChat);  //to acess chat bw login user and other user -->if chat doesn't exist it creates the chat
router.route('/').get(protect,fetchChats);
router.route('/').delete(protect,deleteGroupChat);
router.route('/chats').post(protect,findChat);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addToGroup);






module.exports=router;