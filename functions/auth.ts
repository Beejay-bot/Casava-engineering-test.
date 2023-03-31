import {sign} from 'jsonwebtoken'
import cookie from 'cookie'
import { User } from '@prisma/client'

export const refreshToken = () => {
    return fetch('/api/refresh_token', {
        method: "POST",
        credentials: "include"
    }).then(res => res.json())
    .then(data => {return data})
}

export const createAccessToken = (user: { email: string; username: string; id: number } | null) => {
    return sign({ userId: user?.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });
  };
  
  export const createRefreshToken = (user: { email: string; username: string; id: number } | null) => {
    return sign(
        { userId: user?.id },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: "7d"
        }
    );
};

export const sendRefreshToken = (res: { send?: ((arg0: { user: User; accessToken: never }) => void) | ((arg0: { user: { id: number; firstName: any; secondName: any; email: string }; accessToken: never }) => void) | ((arg0: { ok: boolean; accessToken: string; user?: User | undefined }) => any); status?: ((arg0: number) => { (): any; new(): any; send: { (): any; new(): any } }) | ((arg0: number) => { (): any; new(): any; send: { (): void; new(): any } }) | ((arg0: number) => { (): any; new(): any; send: { (): void; new(): any } }); setHeader?: any },token: string) => {
    res.setHeader('Set-Cookie',cookie.serialize('refreshToken',token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    }))
};