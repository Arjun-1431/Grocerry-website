const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // Ensure the built-in crypto module is imported correctly
const Razorpay = require("razorpay");
const Payment = require("./models/Payment");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const GoogleAuthsignup = require('./models/googlesignup');
const passport = require("passport");
const session = require("express-session");
const contact = require('./models/contactus')
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8000;
// MONGODB CONNACTION
// console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));


  const clientid = process.env.Clientid;
const clientsecret = process.env.Clientsecret;

app.use(session({
  secret: process.env.Secret,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});




// model
const userModel = mongoose.model("user", userSchema);


/////////////////////

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Order creation API
app.post("/api/payment/order", (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || amount < 1) {
    return res.status(400).json({
      error: "Invalid amount. Amount must be at least ₹1 (100 paise).",
    });
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // Convert rupees to paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log("Order Creation Error:", error);
        return res.status(500).json({ message: "Failed to create order." });
      }
      res.status(200).json({ data: order });
      console.log("Order created successfully:", order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

// Payment verification API
app.post("/api/payment/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, fullName, email, mobileNumber, productName,address } = req.body;

  const secret = process.env.RAZORPAY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      fullName,
      amount,
      email,
      mobileNumber,
      productName,
      address,
    });

    payment
      .save()
      .then(() => {
        res.status(200).json({ message: "Payment verified successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error saving payment details" });
      });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
});


//////////////////////////////////////







app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new contact({
      name,
      email,
      message,
    });
    await newContact.save();

    // Send email using Nodemailer or other services here
    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send the message. Please try again later." });
  }
});



// API
app.get("/", (req, res) => {
  res.send("Server is running");
});


//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});
//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      //   console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

// get product
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});




////////////////////////////////////////////////
// google signup //
passport.use(new OAuth2Strategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
      let user = await GoogleAuthsignup.findOne({ googleId: profile.id });

      if (!user) {
          user = new GoogleAuthsignup({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              mobile: profile._json.phone_number, // Handle optional mobile field
              isAdmin: false // Default value
          });

          await user.save();
      }

      return done(null, user);
  } catch (error) {
      return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await GoogleAuthsignup.findById(id);
      done(null, user);
  } catch (error) {
      done(error, null);
  }
});

// Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/",
  failureRedirect: "http://localhost:3000/login"
}));

app.get("/login/success", async (req, res) => {
  if (req.user) {
      res.status(200).json({ message: "User logged in", user: req.user });
  } else {
      res.status(400).json({ message: "Not Authorized" });
  }
});













app.listen(PORT, () => console.log("Server is running at port: " + PORT));
// om12345
