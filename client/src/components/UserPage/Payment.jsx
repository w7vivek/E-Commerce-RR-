import React from 'react';
import '../../style/Payment.css';
import { Link } from 'react-router-dom';

const Payment = () => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const username =
        user?.firstName || "Customer";

    return (

        <section className="payment-page">

            <div className="payment-card">

                <p className="payment-tag">
                    Secure Prepaid Order
                </p>

                <h1 className="payment-title">
                    Payment Details
                </h1>

                <p className="payment-note">

                    Hey
                    <span className="highlight-name">
                        {" "}{username}
                    </span>

                    , thank you for your purchasing.

                    This is a prepaid order,
                    so you have to pay the
                    amount now using the
                    UPI ID mentioned below.

                    After payment, please send
                    the screenshot to the email
                    given below for confirmation.

                </p> <br />

                <p className="payment-note">

                    Hey
                    <span className="highlight-name">
                        {" "}{username}
                    </span>

                    ,आपकी खरीदारी के लिए धन्यवाद। यह एक prepaid order है, इसलिए आपको नीचे दिए गए UPI ID पर अभी payment करना होगा। Payment करने के बाद, कृपया उसका screenshot नीचे दिए गए email पर confirmation के लिए भेज दें।
                </p> <br />

                <p className="payment-note">

                    Hey
                    <span className="highlight-name">
                        {" "}{username}
                    </span>

                    ,, તમારી ખરીદી માટે આભાર। આ prepaid order છે, તેથી તમારે નીચે આપેલા UPI ID પર હમણાં payment કરવાનું રહેશે। Payment કર્યા પછી, કૃપા કરીને તેનો screenshot confirmation માટે નીચે આપેલા email પર મોકલો.

                </p>

                <div className="payment-grid">

                    <div className="payment-box">

                        <h3>
                            UPI ID 💲💸
                        </h3>

                        <p>
                            rrstationery@upi
                        </p>

                    </div>

                    <div className="payment-box">

                        <h3>
                            Email Address📧
                        </h3>

                        <p>
                            rrstationery@gmail.com
                        </p>

                    </div>

                    <div className="payment-box">

                        <h3>
                            WhatApp 
                        </h3>

                        <p>
                            +91 97232 38047
                        </p>

                    </div>

                </div>

                <div className="payment-info">

                    <p>
                        ✔ Once payment is verified,
                        your order will be packed.
                    </p>

                    <p>
                        ✔ Delivery details will be
                        shared by email.
                    </p>

                </div>

                <div className="payment-info">

                    <p>
                        ✔ Payment verify होने के बाद आपका order pack कर दिया जाएगा।
                    </p>

                    <p>
                        ✔ Delivery की details आपको email द्वारा भेज दी जाएगी।
                    </p>

                </div>

                <div className="payment-info">

                    <p>
                        ✔ Payment verify થયા પછી તમારો order pack કરવામાં આવશે।
                    </p>

                    <p>
                        ✔ Delivery ની details તમને email દ્વારા મોકલી આપવામાં આવશે।
                    </p>

                </div>

                <div className="payment-btn-box">

                    <Link
                        to="/UserDashboard"
                        className="home-btn"
                    >
                        Back To Home
                    </Link>

                </div>

            </div>

        </section>

    );
};

export default Payment;