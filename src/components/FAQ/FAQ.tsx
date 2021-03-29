import React from "react"
import { Card, CardHeader, Typography } from "@material-ui/core"
import FAQItem from "./FAQItem"

const FAQ = () => (
    <Card>
        <CardHeader title="FAQ" titleTypographyProps={{ align: "center" }} />

        <FAQItem id="faq-question-sign-up" question="How do I sign up?">
            <Typography>
                You can sign up by signing in with your gmail account or by
                creating an account with us. If you sign in with an email that
                doesn't yet have an account associated with it, and account will
                be generated for you. Signing in through gmail is preferred!
                Then they can handle password resets and the such for you. We
                won't have access to your account other than your display name
                and profile picture.
            </Typography>
        </FAQItem>

        <FAQItem id="faq-question-benefits" question="Why should I sign up?">
            <Typography>
                Most of the site is accessible without an account! Signing up
                allows you to buy and keep track of your raffle tickets. You get
                one free raffle ticket for signing up!
            </Typography>
        </FAQItem>
        <FAQItem id="faq-question-trust" question="Why should I trust you?">
            <Typography component="div">
                Depends on if you trust:
                <ul>
                    <li>
                        <a href="https://umcptasa.com">UMCP TASA</a>, the
                        organization that created this application
                    </li>
                    <li>
                        Google's Firebase which is used as our authentication
                        server and database
                    </li>
                    <li>Stripe which we use to process payments</li>
                </ul>
            </Typography>
        </FAQItem>

        <FAQItem id="faq-question-data" question="What data do you store?">
            <>
                <Typography>
                    We use Google's Firebase to authenticate and store user
                    information. The only two pieces of identifiable information
                    we store are your email address and display name. You either
                    provide us with a display name when creating an account
                    through email or Firebase grabs it from whatever service you
                    signed in with. You can delete your account at any time!
                </Typography>
                <Typography>
                    We also use Stripe to handle payments. Stripe stores your
                    basic credit card info such as last four digits, expiration
                    date, type, and issuer. Stripe also stores your email you
                    used to sign up in order to send a receipt email. Currently
                    we don't have a method of deleting these records along with
                    your account, but that is in the works!
                </Typography>
            </>
        </FAQItem>

        <FAQItem
            id="faq-question-delete"
            question="What happens when I delete my account?"
        >
            <Typography>
                Your user account and profile will be deleted from our Firebase
                Firestore to the extent that Firebase deletes it. All raffle
                tickets associated with your account will also be deleted and
                re-enter the pool of potential tickets
            </Typography>
        </FAQItem>
    </Card>
)

export default FAQ
