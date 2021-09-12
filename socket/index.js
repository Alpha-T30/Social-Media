const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})


let userlist=[] ; 
console.log("this is the user list --->",userlist); 


const addusers=(userId,socketId) =>{
    !userlist.some((e)=>e.userId===userId) && userlist.push({ userId, socketId}); 
    // we can write the same thing like this >>> userlist.push({userId,sockedId})
}

const disconnect_user=(user) =>{
    userlist.filter((e)=>e.socketId!==user)
    
}

const getreceiver=(userId) =>{
    return userlist.find(e=>e.userId===userId) ; 
}


io.on("connection", (socket) => {
    console.log("a user is connected..") ; 

    io.emit("welcome","hello user  this is socket server") ; 
    socket.on("addUser",(u)=>{
       

             addusers(u,socket.id) ; 
             io.emit("getUsers",userlist) ; 
    }) ; 

    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const receiver= getreceiver(receiverId) ; 
        io.to(receiver?.socketId).emit ("getMessage",{
            senderId,
            text
        })
    })

    socket.on("disconnect", ()=>{
        console.log("a user is disconnected") ; 
        disconnect_user(socket.id)

    }) ; 



})

// const io = require("socket.io")(8900, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });
  
//   let users = [];
//   console.log(users)
  
//   const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
//   };
  
//   io.on("connection", (socket) => {
//     //when ceonnect2
//     console.log("a user connected.");
  
//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//     });
  
//     //send and get message
//     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//       const user = getUser(receiverId);
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     });
  
//     //when disconnect
//     socket.on("disconnect", () => {
//       console.log("a user disconnected!");
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
//   });