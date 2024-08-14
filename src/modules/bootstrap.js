import addressRouter from "./Address/Address.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./Brand/Brand.routes.js"
import cartRouter from "./Cart/Cart.routes.js"
import categoryRouter from "./Category/Category.routes.js"
import couponRouter from "./Coupon/Coupon.routes.js"
import orderRouter from "./Order/Order.routes.js"
import productRouter from "./Product/Product.routes.js"
import reviewRouter from "./Review/Review.routes.js"
import SubCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./User/Userroutes.js"
import wishlistRouter from "./Wishlist/Wishlist.routes.js"

export const bootstrap = (app)=>{
    app.use('/api/categories', categoryRouter)
    app.use('/api/subcategories', SubCategoryRouter)
    app.use('/api/brands', brandRouter)
    app.use('/api/product', productRouter)
    app.use('/api/users', userRouter)
    app.use('/api/auth/', authRouter)
    app.use('/api/review', reviewRouter)
    app.use('/api/wishlist', wishlistRouter)
    app.use('/api/addresses', addressRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/order', orderRouter)






    






}