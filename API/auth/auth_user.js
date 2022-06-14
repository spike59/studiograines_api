module.exports =(user,password,done)=>{
    let authenticated_user = { id: 123, name: "Kyle"}
    return done (null, authenticated_user )
};
