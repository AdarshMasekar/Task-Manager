const zod = require("zod");

const taskSchema = zod.object(
    {
        title:zod.string().min(3,"title should contain atleast 3 letters!"),
        description:zod.string().min(5,"description should contain atleast 5 letters!"),
        priority:zod.enum(["Low","Medium","High"]),
        userId:zod.string()
    }
)

const taskValidator = ({title,description,priority,userId}) => taskSchema.safeParse({title,description,priority,userId});

const TaskUpdateSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    priority: zod.enum(["Low", "Medium", "High"]),
    subtasks: zod
      .array(
        zod.object({
          title: zod.string(),
          status: zod.enum(["Pending", "Completed"]),
        })
      ),
    deadLine: zod
      .string()
      .datetime({ offset: true }), // Zod validates ISO 8601 strings for dates
    userId: zod.string(), // You can add validation for ObjectId format if needed
  });


const updateTaskValidator = ({title,description,priority,subtasks,deadLine,userId}) => TaskUpdateSchema.safeParse({title,description,priority,subtasks,deadLine,userId});

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
    updateTaskValidator,
    signInValidator
}
