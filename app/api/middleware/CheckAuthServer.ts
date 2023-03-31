import { GetPublicKeyOrSecret, verify } from 'jsonwebtoken'

const checkAuth = (handler: (arg0: any, arg1: any) => any) => {
    return async (req: { headers: { [x: string]: any } }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }) => {
        try {
            const authorization = req.headers["authorization"]
            if (!authorization) throw new Error("not authenticated")
            
            const token = authorization.split(" ")[1]
            verify(token, process.env.REFRESH_TOKEN_SECRET as unknown as GetPublicKeyOrSecret);

            return handler(req, res)
        } catch (e) {
            console.log(e)
            res.status(401).send()
        }
    }
}

export default checkAuth