//decode JSON Web Tokens (JWTs) (decode opposite to encrypted)
//Decode = Read (not encrypted, not secure)
//Encrypt = Securely hide content
// we'll add this middleware for those API where we need the admin permission like adding product, removing, display this order nd some other API
//          _____BEARER_____
// When you log in as an admin, your backend gives you a token (a kind of secret key).
// Later, when you try to add a product, the frontend must send that token back to prove:

// “Yes, I’m the same admin — here’s my token!”

// Analogy:
// Think of Bearer like "Ticket"

// And your token like the actual movie ticket code

// You're telling the cinema:

// "Authorization: Ticket ABCD1234"
// → They check if ABCD1234 is real.


//create admin authentication
import jwt from "jsonwebtoken";//jsonwebtoken is a Node.js library used to create, verify

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized, Login Again!" });
      //using return cause when we return this response then this execution will stopped here
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer"
    //if this token is available this we'll decode this token, so to decode this token we'll add :
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);//using this we'll get string , it will be stored in this token decode

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized, Login Again!" });
    }

    next(); //allow request through
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth