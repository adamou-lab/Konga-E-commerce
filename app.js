const express = require('express')
const app = express()


require('dotenv').config()
const connectDB = require('./db/connection')
const router = require('./routes/auth')

app.use(express.static('./public/uploads'))


const {verifyToken, verifyAdmin} = require('./middlewares/authMiddleware')



const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const reviewRouter = require('./routes/review')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const dashboardRouter = require('./routes/dashboard')


app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1', reviewRouter)
app.use('/api/v1/carts', verifyToken, cartRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/dashboard', verifyAdmin, dashboardRouter)

const port = 3000 || process.env.port

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`App is listening at port ${port}...`))
        
    } catch (error) {
        console.log(error);
        
    }
}

start()