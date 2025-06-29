import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import CourseModel from '../course/course.model';
import OrderModel from './order.model';
import { orderServices } from './order.service';
import User from '../user/user.model';


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await CourseModel.findById(req?.body?.courseId)
    const coursePrice = course?.discountPrice ? (course?.price - course?.discountPrice * 0.01 * course?.price).toFixed(2) : course?.price.toFixed(2);

    const order = req.body;


    const isAlreadyEnrolled = course?.studentsEnrolled?.includes(order.userId);
    if (isAlreadyEnrolled) {
      res.status(400).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
      return;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/courses/${course?._id}`,
      customer_email: order?.email,
      client_reference_id: order?.userId,
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            unit_amount: Math.round(parseFloat(coursePrice as string) * 100),
            product_data: {
              name: course?.title ?? 'Unknown Product',
              description: course?.description ?? 'No description available',
              images: course?.thumbnail ? [course.thumbnail] : [],
            },
          },
          quantity: 1,
        },
      ],
    };

    const session = await stripe.checkout.sessions.create(sessionData);

    // Create new order in your database
    const newOrder = new OrderModel({
      name: order?.name,
      email: order?.email,
      mobile: order?.mobile,
      price: coursePrice,
      status: 'paid',
      courseId: order?.courseId,
      userId: order?.userId,
      session: session.id,
    });

    // Save order in database
    await newOrder.save();
    const result = await orderServices.createOrderIntoDB(newOrder);

    // Directly add student to the course (for practice)
    await CourseModel.findByIdAndUpdate(order?.courseId, {
      $addToSet: { studentsEnrolled: order?.userId },
    });
    // Directly add student to the course (for practice)
    await User.findByIdAndUpdate(order?.userId, {
      $addToSet: { enrolledCourses: order?.courseId },
    });


    res.status(200).json({
      message: 'Enrolled successfully',
      success: true,
      session,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




export const orderControllers = {
  createOrder,
}