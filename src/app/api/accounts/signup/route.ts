import { NextApiRequest, NextApiResponse } from "next";


export default  async function  (req: NextApiRequest, res: NextApiResponse)  {
    const {email,password} = req.body
    if(!email || !password)return res.status(403).json({message:"invalid fields"})
    console.log(email)
    console.log(password)
    res.status(201).json({ message: "registred!" })
}