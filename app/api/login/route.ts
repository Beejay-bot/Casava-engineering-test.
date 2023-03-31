import Prisma from '../../../functions/initPrisma'
import {createAccessToken, createRefreshToken, sendRefreshToken} from '../../../functions/auth';


export default async (req: { method: string; body: string }, res: { send: (arg0: { user: { id: number; firstName: any; secondName: any; email: string }; accessToken: never }) => void; status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }) => {
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

        if(user?.password === password) {
            const token = createRefreshToken(user)
            sendRefreshToken(res,token)
            const accessToken = createAccessToken(user)
            res.send({user:userForTheClient,accessToken})
        } else {
            console.log('user not found=====>')
            res.status(404).send()
        }
    }
}