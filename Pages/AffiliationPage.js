const { loadTeamData, loadStatusData } = require("../Pages/dataloader")
const { expect } = require("@playwright/test")

class ProAffiliation {

    constructor(page) {

        // Initialize page object and define locators for affiliation elements
        this.page = page
        this.affiliationbutton = "text='Affiliate Teams'"
        this.continueaffiliation = "text='YES, CONTINUE'"
        this.startaffiliation = "text='START NOW'"
        this.continueprocess = "text='CONTINUE'"
        this.check = "//div[@class='cursor-pointer']"
        this.continueteamselect = "text='NEXT'"
        this.enterteamname = "[placeholder='Search Teams']"
        this.continuetosummary = "//*[@id='team_selection_next']"
        this.submitapp = "//*[@id='affiliation-summary']/div[3]/div[2]/button"
        this.teamlistpage = "text='Go To Teams'"
        this.teamsearchbox = "//input[@placeholder='Search Teams']"
        this.affiliationstatus = "//*[@id='all-teams']/div[2]/div/div[1]/div[2]/div/app-status-indicator/div/div[2]"




    }

    async proAffiliation() {

        const set = loadTeamData()

        for (const users of set) {

            // Click on affiliation buttom from team listing
            const affiliateButton = await this.page.$(this.affiliationbutton);
            await this.page.evaluate(element => element.click(), affiliateButton);
            await this.page.waitForTimeout(4000);

            // Initiate affiliation
            const initiateAffiliation = await this.page.$(this.continueaffiliation);
            await this.page.evaluate(element => element.click(), initiateAffiliation);
            await this.page.waitForTimeout(4000);

            // Process affiliation
            const processAffiliation = await this.page.$(this.startaffiliation);
            if (processAffiliation) {
                await this.page.evaluate(element => element.click(), processAffiliation);
                await this.page.waitForTimeout(4000);
            }

            else {
                const continueButton = await this.page.$(this.continueprocess);
                await this.page.evaluate(element => element.click(), continueButton);
                await this.page.waitForTimeout(4000);
            }

            // Enable the club checks
            const enableCheck = await this.page.$(this.check);
            await this.page.evaluate(element => element.click(), enableCheck);
            await this.page.waitForTimeout(3000);

            // Navigate to team selection page           
            const proceedTeamSelection = await this.page.$(this.continueteamselect);
            await this.page.evaluate(element => element.click(), proceedTeamSelection);
            await this.page.waitForTimeout(3000);

            // search the affiliating team
            await this.page.locator(this.enterteamname).fill(users.name);
            await this.page.waitForTimeout(3000);

            // Navigate to submmission page
            const submitScreen = await this.page.$(this.continuetosummary);
            await this.page.evaluate(element => element.click(), submitScreen);
            await this.page.waitForTimeout(5000);

            // Submit application
            const submitApp = await this.page.$(this.submitapp);
            await this.page.evaluate(element => element.click(), submitApp);
            await this.page.waitForTimeout(5000);

            // Navigation to team listing
            const gotoTeams = await this.page.$(this.teamlistpage);
            await this.page.evaluate(element => element.click(), gotoTeams);
            await this.page.waitForTimeout(5000);

            // Search processed team
            await this.page.locator(this.teamsearchbox).fill(users.name);
            await this.page.waitForTimeout(3000);

            // Load affiliated status from the web page
            const affiliatedStatus = await this.page.locator(this.affiliationstatus).innerText();

            // Load status data from Excel
            const statusData = loadStatusData();

            // Check if the affiliated status matches any of the statuses from Excel
            const isStatusMatched = statusData.some(status => status['status'] === affiliatedStatus);

            // Assertion - Ensure the status is matched
            await expect(isStatusMatched).toBeTruthy();
            await this.page.waitForTimeout(3000);

        }
    }
} module.exports = { ProAffiliation }