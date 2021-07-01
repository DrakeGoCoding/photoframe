const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendEmail = async (email, subject, payload, template) => {
    try {
        const ACCESS_TOKEN = await oauth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USERNAME,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            },
        })

        const source = fs.readFileSync(path.join(__dirname, template), "utf-8")
        const compiledTemplate = handlebars.compile(source)
        const options = () => {
            return {
                from: process.env.FROM_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            }
        }

        transporter.sendMail(options(), (error, info) => {
            if (error) return error
            console.log(`Email ${info.messageId} sent.`);
        })
    } catch (error) {
		console.log(error);
        return error
    }
}

module.exports = sendEmail