// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"

// const app = express()

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// app.use(express.json());
// app.use(express.urlencoded({extended: true}))
// app.use(express.static("public"))
// app.use(cookieParser())

// import adminRouter from './src/routes/admin.routes.js';
// import projectRouter from './src/routes/project.routes.js'
// import experienceRouter from './src/routes/experience.routes.js'
// import contactRouter from './src/routes/contact.routes.js'

// // Mount API Routes
// app.use('/api/v1/admin', adminRouter);
// app.use('/api/v1/projects', projectRouter)
// app.use('/api/v1/experiences', experienceRouter)
// app.use('/api/v1/contact', contactRouter)
// app.use('/api/v1/contacts', contactRouter)

// export default app;

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// 1. Dynamic CORS Configuration for Local Dev + Production Deployment
const allowedOrigins = [
  "http://localhost:5173", // Local Vite Frontend
  "http://localhost:2000",
  process.env.CLIENT_URL,  // Production Vercel/Netlify URL (from .env)
].filter(Boolean); // Removes undefined values if CLIENT_URL isn't set locally

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Mobile apps, Postman, or server-to-server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS Policy Restriction: Origin not allowed"));
    }
  },
  credentials: true // Required for httpOnly cookies across origins
}));

// 2. Standard Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// 3. Import Routes
import adminRouter from './src/routes/admin.routes.js';
import projectRouter from './src/routes/project.routes.js';
import experienceRouter from './src/routes/experience.routes.js';
import contactRouter from './src/routes/contact.routes.js';

// 4. Mount API Routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/experiences', experienceRouter);
app.use('/api/v1/contacts', contactRouter); // Cleaned duplicate route

export default app;
//mongodb://muhammadahmedzahid2002_db_user:HEuXGpCCAZu0tAU1@ac-sa2plk5-shard-00-00.mbz50fk.mongodb.net:27017,ac-sa2plk5-shard-00-01.mbz50fk.mongodb.net:27017,ac-sa2plk5-shard-00-02.mbz50fk.mongodb.net:27017/?ssl=true&replicaSet=atlas-b0qqxn-shard-0&authSource=admin&appName=Cluster0