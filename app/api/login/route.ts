import Prisma from '../../../functions/initPrisma'
import {createAccessToken, createRefreshToken, sendRefreshToken} from '../../../functions/auth';

const bcrypt = require('bcrypt');
type IREQUEST = { method: string; body: string };
type IRESPONSE = { send: (arg0: { user: { id: number; firstName: any; secondName: any; email: string }; 
        accessToken: never }) => void; status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }

export default async (req:IREQUEST , res: IRESPONSE ) => {
    console.log(req.method)
    if(req.method === 'POST') {
        const {email, password} = JSON.parse(req.body)
        const user = await Prisma.user.findUnique({
            where: {
                email
            }
        })
        
        const userForTheClient = {
            id:user?.id,
            username:user?.username,
            email:user?.email
        }

        bcrypt.compare(password, user?.password, function(err: any, result: boolean) {
            if(result) {
                const token = createRefreshToken(user)
                sendRefreshToken(res,token)
                const accessToken = createAccessToken(user)
                res.send({user:userForTheClient,accessToken})
            } else {
                console.log('user not found=====>', err)
                res.status(404).send()
            }
        });
    }
}