import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { trackingService } from "../services/trackingService.js";

const trackingRouter = Router();

trackingRouter.post("/tracking/food", async (req, res, next) => {
    try {
        const { data } = req.body;

        const newTracking = await trackingService.addFoodTracking({ data });

        if (newTracking.errorMessage) {
            throw new Error(newTracking.errorMessage);
        }

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

// trackingRouter.post("/user/login", async function (req, res, next) {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const user = await trackingService.getUser({ email, password });

//         if (user.errorMessage) {
//             throw new Error(user.errorMessage);
//         }

//         return res.status(200).send(user);
//     } catch (error) {
//         next(error);
//     }
// });

// trackingRouter.get("/user/current", login_required, async function (req, res, next) {
//     try {
//         const user_id = req.currentUserId;
//         const currentUserInfo = await trackingService.getUserById({ user_id });

//         if (currentUserInfo.errorMessage) {
//             throw new Error(currentUserInfo.errorMessage);
//         }

//         return res.status(200).send(currentUserInfo);
//     } catch (error) {
//         next(error);
//     }
// });

// trackingRouter.get("/user/:id", login_required, async function (req, res, next) {
//     try {
//         const { id } = req.params;
//         const currentUserInfo = await trackingService.getUserById({ id });

//         if (currentUserInfo.errorMessage) {
//             throw new Error(currentUser.errorMessage);
//         }

//         return res.status(200).send(currentUserInfo);
//     } catch (error) {
//         next(error);
//     }
// });

// trackingRouter.get("/userlist", login_required, async function (req, res, next) {
//     try {
//         const users = await trackingService.getUsers();
//         return res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// });

export { trackingRouter };
