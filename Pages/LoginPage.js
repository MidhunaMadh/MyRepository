const{expect} = require("@playwright/test")

class Login {

    constructor(page) {

        // Initialize page object and define locators for login elements
        this.page = page
        this.username = "//input[@type='email']"
        this.password = "//input[@type='password']"
        this.loginbutton = "//button[@id='next']"
        this.loginimage = "//div[@class='portal-badge']/img"
        //this.sendcode = "//button[@id='emailVerificationControl_but_send_code']"

    }

    async loginToPortal() {

        // Browse the portal URL
        await this.page.goto(process.env.BASE_URL)

        // Enter the user credentials
        await this.page.fill(this.username, process.env.USER_EMAIL)
        await this.page.fill(this.password, process.env.USER_PASSWORD)

        // Click on login button to submit the credentials
        await this.page.click(this.loginbutton)
        await this.page.waitForTimeout(8000)

        // Locate the send code button and click it to trigger the email verification
        // const code = await this.page.$(this.sendcode);
        // await this.page.evaluate(element => element.click(), code);
        // await this.page.waitForTimeout(10000)

        // Verify the club portal image
        const logo = await this.page.locator(this.loginimage)
        await expect(logo).toBeVisible()
        await this.page.waitForTimeout(2000)

        // Zoom out to 70%
        await this.page.evaluate(() => {
            document.body.style.zoom = '70%' 
          });


    }

} module.exports = { Login }