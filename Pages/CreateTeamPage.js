const { expect } = require("@playwright/test")
const { loadTeamData } = require("../Pages/dataloader")

class Team {

    constructor(page) {

        // Initialize page object and define locators for team elements
        this.page = page
        this.createbutton = 'text="Create Team"'
        this.type = "text='Select team type'"
        this.age = "text='Select team age'"
        this.disability = "text='Select team disability'"
        this.format = "text='Select a team format'"
        this.day = "text='Select a matchday'"
        this.gender = "text='Select team gender'"
        this.name = "[data-placeholder='Enter team name']"
        this.createteambutton = "//div[text()='Create Team']"
        this.backbutton = "#secondary-navigation > div > div.back-btn.ng-star-inserted"

    }

    async createTeam() {

        const teams = loadTeamData()

        for (const team of teams) {

            // Click on the create team button from team listing
            const teamCreateButton = await this.page.$(this.createbutton);
            await this.page.evaluate(element => element.click(), teamCreateButton);
            await this.page.waitForTimeout(3000);

            // Fetch the team type and select the team type
            const teamType = await this.page.$(this.type);
            await this.page.evaluate(element => element.click(), teamType);
            await this.page.waitForTimeout(1000);

            const selectTeamType = await this.page.$(`//span[contains(text(), '${team.type}')]`);
            await this.page.evaluate(element => element.click(), selectTeamType);
            await this.page.waitForTimeout(1000);

            // Fetch the team age and select the team age
            const teamAge = await this.page.$(this.age);
            await this.page.evaluate(element => element.click(), teamAge);
            await this.page.waitForTimeout(1000);

            const selectTeamAge = await this.page.$(`//span[contains(text(), '${team.age}')]`);
            await this.page.evaluate(element => element.click(), selectTeamAge);
            await this.page.waitForTimeout(1000);

            // Fetch the team disability and select the team disability
            const teamDisability = await this.page.$(this.disability);
            await this.page.evaluate(element => element.click(), teamDisability);
            await this.page.waitForTimeout(1000);

            const selectTeamDisability = await this.page.$(`//span[contains(text(), '${team.disability}')]`);
            await this.page.evaluate(element => element.click(), selectTeamDisability);
            await this.page.waitForTimeout(1000);

            // Fetch the team format and select the team format
            const teamFormat = await this.page.$(this.format);
            await this.page.evaluate(element => element.click(), teamFormat);
            await this.page.waitForTimeout(1000);

            const selectTeamFormat = await this.page.$(`//span[contains(text(), '${team.format}')]`);
            await this.page.evaluate(element => element.click(), selectTeamFormat);
            await this.page.waitForTimeout(1000);

            // Fetch the day and select the day
            const teamDay = await this.page.$(this.day);
            await this.page.evaluate(element => element.click(), teamDay);
            await this.page.waitForTimeout(1000);

            const selectTeamDay = await this.page.$(`//span[contains(text(), '${team.day}')]`);
            await this.page.evaluate(element => element.click(), selectTeamDay);
            await this.page.waitForTimeout(1000);

            // Fetch the team gender and select the team gender
            const teamGender = await this.page.$(this.gender);
            await this.page.evaluate(element => element.click(), teamGender);
            await this.page.waitForTimeout(1000);

            const selectTeamGender = await this.page.$(`//span[contains(text(), '${team.gender}')]`);
            await this.page.evaluate(element => element.click(), selectTeamGender);
            await this.page.waitForTimeout(1000);

            // Fetch the team name and fill the team name
            await this.page.locator(this.name).fill(team.name);
            await this.page.waitForTimeout(1000);

            // Create a team with provided team details
            const createTeam = await this.page.$(this.createteambutton);
            await this.page.evaluate(element => element.click(), createTeam);
            await this.page.waitForTimeout(3000);

            // Navigate to team listing from team details page
            const backTeam = await this.page.$(this.backbutton);
            await this.page.evaluate(element => element.click(), backTeam);
            await this.page.waitForTimeout(5000);

            // Verify the created team present in listing page
            const createdteamlocator = await this.page.locator(`text=${team.name}`)
            await expect(createdteamlocator).toBeVisible()
            await this.page.waitForTimeout(1000);

        }

    }

} module.exports = { Team }