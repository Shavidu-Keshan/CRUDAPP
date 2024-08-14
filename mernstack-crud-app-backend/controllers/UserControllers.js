const User = require("../Model/UserModel");
//Display_data
const getAllUsers = async(req,res,next) => {
    let Users;
    //Get_all_users
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    // not found
    if(!users){
        return res.status(404).json({ message: "User is not found" });

    }
    //Display_all_users
    return res.status(200).json({users});

};


//data_inserts
const addUsers = async (req ,res ,next) => {
    const { name, gmail, age, address } = req.body;


    let  users;

    try{
        users = new User({name, gmail, age, address});
        await users.save();

    }catch(err){
        console.log(err);
    }
    //not_inser_users
    if(!users){
        return res.status(404).json({message:"Can't to add users"});
    }
    return res.status(200).json({users});
};

//getid
const getById = async (req,res,next) => {

    const id = req.params.id;
    let user;

    try{
      user =  await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //not_available_users
    if(!user){
        return res.status(404).json({message:"user is not found"});
    }
    return res.status(200).json({user});

}

//update_user_details
const updateUser = async(req,res,next) => {

    const id = req.params.id;
    const { name, gmail, age, address } =req.body;

    let users;
    try{
        users = await User.findByIdAndUpdate(id, 
            {name: name, gmail: gmail, age: age, address: address});
            users = await users.save()


    }catch(err){
        if(!users){
            return res.status(404).json({message:"User details cannot be updated"});
        }
        return res.status(200).json({users});

    }
};

//Delete_user_details
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try{
        user = await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Can not delete user details"});
    }
    return res.status(200).json({user});

}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;