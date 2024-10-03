class MFA {

    constructor(page) {

        // Initialize page object and define locators for mfa elements
        this.page = page
        this.mailrurl = "https://tempmail.plus/en/#!"
        this.mailtextbox = "//input[@id='pre_button']"
        this.topmail = "//*[@id='container-body']/div/div[1]/div[2]/div"
        this.otp = "//span[contains(text(), 'Your code is:')]"
        this.verificationtextbox = "//input[@id='VerificationCode']"
        this.verifycode = "//button[@class='verifyCode']"
        this.proceedlogin = "//button[@id='continue']"
        this.cookies = "//button[text()='Accept All Cookies']"

    }

    async authentication() {

        // Open a new browser tab in the current context
        const emailPage = await this.page.context().newPage()

        // Navigate to the email inbox
        await emailPage.goto(this.mailrurl)
        await emailPage.waitForTimeout(10000)

        // Extract the username from the email
        const email = process.env.USER_EMAIL
        const username = email.split('@')[0];

        // Fill the email field with only the username part
        await emailPage.fill(this.mailtextbox, username)
        await emailPage.waitForTimeout(10000)
        await emailPage.press(this.mailtextbox, 'Enter');
        await emailPage.waitForTimeout(10000)

        // Click on the topmost email to get the verfication code
        await emailPage.click(this.topmail)
        await emailPage.waitForTimeout(10000)

        // Fetch the verification code from the mail

        const otpText = await emailPage.$eval(this.otp, el => el.textContent);
        const otp = otpText.replace('Your code is: ', '').trim();

        // Navigate back to the portal
        await this.page.bringToFront();

        // Fill the fetched verification code
        await this.page.fill(this.verificationtextbox, otp)

        const verify = await this.page.$(this.verifycode);
        await this.page.evaluate(element => element.click(), verify);
        await this.page.waitForTimeout(10000)

        await this.page.focus(this.proceedlogin);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Enter')
        await this.page.waitForTimeout(10000)

        // Accept cookies
        const cook = await this.page.$(this.cookies);
        await this.page.evaluate(element => element.click(), cook);

        // Proceed the login process
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }),
            this.page.click(this.proceedlogin)
        ]);

        await this.page.waitForTimeout(50000)
    }
} module.exports = { MFA }