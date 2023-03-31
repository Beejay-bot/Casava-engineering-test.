import cookie from 'cookie'
export default (req: { method: string }, res: { setHeader: (arg0: string, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }) => {
    if(req.method === 'POST') {
        //deletes refresh token
        res.setHeader('Set-Cookie',cookie.serialize('refreshToken','', {
            httpOnly: true,
            maxAge: 0,
            path: '/'
        }))
        res.status(200).send()
    }
}