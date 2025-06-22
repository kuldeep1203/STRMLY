import zod from "zod";

export const signup  =  zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
});