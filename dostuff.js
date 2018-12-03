const mongo_user = ""; // ENTER MONGO USERNAME
const mongo_password = ""; // ENTER STRIPE USERNAME
const stripe_secret_key = ""; // ENTER STRIPE SECRET KEY

const mongoose = require("mongoose"),
    User = require("./models/users"),
    stripe = require("stripe")(stripe_secret_key);

mongoose
    .connect(
        `mongodb://${mongo_user}:${mongo_password}@ds135790.mlab.com:35790/tfc`,
        { useMongoClient: true }
    )
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));

function createStripeUser(email, metadata) {
    stripe.customers.create(
        {
            email: "digiorgio.monique@gmail.com",
            metadata: {
                first_name: customer.first_name,
                last_name: customer.last_name,
                phone: customer.phone,
                address: `${customer.address} ${customer.appt}`,
                city: customer.city,
                state: customer.state,
                zipcode: customer.zip,
                referral: customer.referral
            }
        },
        function(err, newCustomer) {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                console.log("created customer");
                res(newCustomer);
            }
        }
    );
}

function createMongoUser(email, stripe_id, password, pickupDay, glass) {
    let user = new User({
        username: email,
        password: password,
        stripe_id: stripe_id,
        pickupDay: pickupDay,
        glass: glass
    });
    user.save(function(err) {
        console.log("saving...");
        if (err) {
            console.log(err);
        } else {
            console.log("success!");
        }
    });
}

const new_stripe_user = {
    // when updating this, comment out any metadata fields you don't want to include
    email: "", // REQUIRED!
    metadata: {
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        // referral: ""
    }
};

const new_mongo_user = {
    email: "",
    stripe_id: "",
    password: "compost123",
    pickupDay: "", // options are: Monday, Tuesday, Wednesday, Thursday, Friday, na, inactive, Business - THESE ARE CASE SENSITIVE!!!
    glass: false, // options are: true, false - CASE SENSITIVE!!!
};

// createStripeUser(new_stripe_user.email, new_stripe_user.metadata)
createMongoUser(new_mongo_user.email,
    new_mongo_user.stripe_id,
    new_mongo_user.password,
    new_mongo_user.pickupDay,
    new_mongo_user.glass);

// Steps to run a command:
// 1. Open your terminal
// 2. Make sure you are in the same directory as this file (if not, see below)
// 3. Be sure that the proper command is uncommented, and that all other commands are commented. Add // in front of any line to comment it out.
// 3. Type: node dostuff.js in your terminal window and press Enter

// Navigating directories inside Terminal:
// to view contents of current directory, type "ls" and press Enter
// to navigate out of current directory, type "cd .." and press Enter
// to navigate into a directory, type "cd directory_name" and press Enter
// the name of your current directory is listed to the left of the prompt
