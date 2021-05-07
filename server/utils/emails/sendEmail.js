const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

const CLIENT_ID = '754246735652-rt5pm47ctndoeonb3qcehaeh1krri2j4.apps.googleusercontent.com'
const CLIENT_SECRET = 'tSaLdaU_LAYYYCH5rktvDlXO'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04CY_dlfxRt6TCgYIARAAGAQSNwF-L9Ir8Ld69HWwvUegzinZoq1JxuR9hPLMacS4EWB4Mer4jR0oFIxHHNr0vWDXzxvs1G9M014'

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
                // clientId: CLIENT_ID,
                // clientSecret: CLIENT_SECRET,
                // refreshToken: REFRESH_TOKEN,
                // accessToken: ACCESS_TOKEN
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
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
        return error
    }
}

module.exports = sendEmail