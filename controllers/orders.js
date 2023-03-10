import { asyncError } from "../middlewares/error.js";
import { Orders } from "../models/Order.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/error.js";
import {stripe} from '../server.js'
export const processPayment=asyncError(async(req,res,next)=>{
    const {totalAmount}=req.body;
    const {client_secret}=await stripe.paymentIntents.create({
        amount:Number(totalAmount*100),
        currency:"inr",
    });
    res.status(200).json({
        success:true,
        client_secret,
    })
})

export const createOrder=asyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    }=req.body;

    await Orders.create({
        user:req.user._id,
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    });
    for (let i = 0; i < orderItems.length; i++) {
        const product=await Product.findById(orderItems[i].product);
        product.stock-=orderItems[i].quantity;
        await product.save();
    }
    res.status(201).json({
        success:true,
        message:"Order Placed Successfully",
    })
})

export const getAdminOrder=asyncError(async(req,res,next)=>{
    const orders=await Orders.find({});
    res.status(200).json({
        success:true,
        orders,
    })
})

export const getMyOrder=asyncError(async(req,res,next)=>{
    const orders=await Orders.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders,
    })
})

export const getOrderDetails=asyncError(async(req,res,next)=>{
    const orders=await Orders.findById(req.params.id);
    if(!orders) return next(new ErrorHandler("Order Not Found",404))
    res.status(200).json({
        success:true,
        orders,
    })
})

export const processOrder=asyncError(async(req,res,next)=>{
    const order=await Orders.findById(req.params.id);
    if(!order) return next(new ErrorHandler("Order Not Found",404))
    if(order.orderStatus==="Preparing") order.orderStatus="Shipped";
    else if(order.orderStatus==="Shipped"){
        order.orderStatus="Delivered";
        order.deliveredAt=new Date(Date.now())
    }else return next(new ErrorHandler("Order Already Delivered",400))
    await order.save();
    res.status(200).json({
        success:true,
        message:"Order Processed Successfully",
    })
})
