const zod = require("zod");

const taskSchema = zod.object(
    {
        title:zod.string().min(3,"title should contain atleast 3 letters!"),
        description:zod.string().min(5,"title should contain atleast 5 letters!"),
        priority:zod.enum(["Low","Medium","High"]),
        userId:zod.string()
    }
)

const taskValidator = ({title,description,priority,userId}) => taskSchema.safeParse({title,description,priority,userId});

const userSchema = zod.object(
    {
        firstName:zod.string().min(2,"firstName should contain atleast 3 letters!"),
        lastName:zod.string().min(2,"lastName should contain atleast 5 letters!"),
        email:zod.string().email(),
        password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.")
    }
)

const signInSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.")
})

const userValidator = ({firstName,lastName,email,password}) => userSchema.safeParse({firstName,lastName,email,password})
const signInValidator = ({email,password}) => signInSchema.safeParse({email,password});


module.exports = {
    taskValidator,
    userValidator,
    signInValidator
}
