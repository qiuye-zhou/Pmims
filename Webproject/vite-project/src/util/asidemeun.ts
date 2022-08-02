export const initmeun = (meun: any,user: string[]) => {
    for (let i = 0 ; i < user.length ; i++) {
        meun[i] = user[i]
    }
}