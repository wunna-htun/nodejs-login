const CustomApiError=require('../errors/custom-error')
const jwt=require('jsonwebtoken')


const login=(req,res)=>{

    

    // res.send("Login ")


    console.log("Request is Incoming");


    const {username,password}=req.body;
    console.log("body",req.body);
    // console.log("username",username);
    // console.log("password",password);

    if(!username||!password){
        throw new CustomApiError("Please email and password",400)
    }

    const id=new Date().getDate()

    const token=jwt.sign({id,username},process.env.JWT_SECRET,{ expiresIn: '2h' })

    console.log("token",token);
     
    
    res.status(200).json({ msg: 'user created',token })


}

const dashboard=(req,res)=>{


    const authheader=req.headers.authorization;
    // console.log("authheader",req);
    console.log("authheader",authheader);



    if(!authheader||!authheader.startsWith("Bearer")){
        throw new CustomApiError("No token provided",401)

    }

    const token=authheader.split(' ')[1]
    console.log("token",token);

    try{

        const decode =jwt.verify(token,process.env.JWT_SECRET)
        console.log("decode",decode);

    }
    catch(err){
        console.error(err)
        throw new CustomApiError("Not authorized to acces this route",401)

    }
  

    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, hh`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports={
    login,dashboard
} 

