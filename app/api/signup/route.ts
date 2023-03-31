import { User } from '@prisma/client'
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../../functions/auth';
import Prisma from '../../../functions/initPrisma';
import { hash  } from 'bcrypt'

type IREQ = { body: string }
type IRES = { status: (arg0: number) => { (): any; new(): any; 
    send: { (): any; new(): any } }; send: (arg0: { user: User; accessToken: never }) => void }

export default async (req: IREQ, res: IRES ) => {
    const {email, username, password} = JSON.parse(req.body)
    
    //checking if someone have used the email
    const checkIfExist = await Prisma.user.findUnique({
        where: {
            email
        }
    })

    if(checkIfExist) return res.status(409).send()

    let hashedPassword = await hash(password, 12);

    const user = await Prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        }
    })

    const token = createRefreshToken(user)
    sendRefreshToken(res,token)
    
    const accessToken = createAccessToken(user)
    res.send(({user,accessToken}))
}