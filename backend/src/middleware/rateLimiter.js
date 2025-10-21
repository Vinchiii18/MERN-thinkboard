import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    // normally we would try to limit based on user ID (instead if "my-limt-key", we must use userID/user or something)
    // but since we don't have authentication yet, we'll use IP address
    // still WIP
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) return res.status(429).json({ message: "Too many requests! please try again later!" });

        next();

    } catch (error) {
        console.log("Rate limit error:", error);
        next(error);
    }
    

}

export default rateLimiter;