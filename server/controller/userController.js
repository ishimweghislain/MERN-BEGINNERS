import User from "../model/userModel.js";

// function to create a new user
// this function will be used in the route file to create a new user

export const create = async (req, res) =>{
    try{
        const newUser = new User(req.body); // new user object
        const {email} = newUser;  //this extracts the users email

        //lets make a condition if maybe some user inputs the same address email and will display error message
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exists, use other credentials"});
        }
        //And what if the user does not exist? we will have to save the user then

       const savedData = await newUser.save();
       //res.status(200).json(savedData);
       res.status(200).json({message: "User created successfully"});
    } catch(error){
    res.status(500).json({errorMessage:error.message})
    }
};


//now this function is for retrieving all users from the database
export const getAllUsers = async (req, res) =>{
    try{
        
        const userData = await User.find();
        // this is if the user does not exist
        if(!userData || userData === 0){
            return res.status(404).json({message: "User data not found"})
        }

        //else then if the user exists we will have to return the user with his data.
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({errorMessage:error.message})
    }
};



//Retrinving the user by his ID .
export const getUserById = async (req, res) =>{
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
       //and if the user is there
       res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({errorMessage:error.message}) 
    }
}

//Now lets update the user 

export const update = async (req, res) =>{

    try {

        //paste from the userid if he exists 
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
 
        //now if the user exists lets update him

        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })

        //now ofcourse lets write a response

        // res.status(200).json(updatedData);
        res.status(200).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({errorMessage:error.message}) 
    }
}

//lastly lets delete a user now 

export const deleteUser = async (req, res) =>{
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }

        //and if the user exist we will have to delete him or her
        await User.findOneAndDelete(id);
        res.status(200).json({message: "User has been deleted successfully"});
    } catch (error) {
        res.status(500).json({errorMessage:error.message}) 
    }

}