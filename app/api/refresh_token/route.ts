import { GetPublicKeyOrSecret, verify } from 'jsonwebtoken'
import {createAccessToken, sendRefreshToken, createRefreshToken} from '../../../functions/auth';
import cookie from 'cookie'
import Prisma from '../../../functions/initPrisma'
import { User } from '@prisma/client'


export default async function refresh_token(req: { method: string; headers: { cookie: string } }, res: { send: (arg0: { ok: boolean; accessToken: string; user?: User }) => any; status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }) {
    if (req.method === 'POST') {
        if(!req.headers.cookie) return res.send({ok: false,accessToken: ''})
        const getToken = cookie.parse(req.headers.cookie)
        const token = getToken.refreshToken

        if(!token) return res.send({ok: false,accessToken: ''})
        let payload = null

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET as unknown as GetPublicKeyOrSecret)
            
            const user = await Prisma.user.findUnique({
                where: {
                    id: payload?.userId
                },
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            })

            if (!user) return res.send({ok: false,accessToken: ''})

            sendRefreshToken(res, createRefreshToken(user));
            const accessToken = createAccessToken(user)

            return res.send({ ok: true, accessToken,user });
        } catch (e) {
            console.log(e)
            return res.send({ok: false,accessToken: ''})
        }

    } else {
      res.status(500).send()
    }
  }