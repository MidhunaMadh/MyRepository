const { loadClubData } = require("../Pages/dataloader")

class SearhClub {

    constructor(page) {

        // Initialize page object and define locators for search club elements
        this.page = page
        this.dropdownicon = "//img[@class='dropdown-icon ng-star-inserted']"
        this.searchbox = "//input[@placeholder='Search Club']"
        this.firstclub = "//div[@id='club-dropdown-menu']/div[1]"
        this.teamlist = "//div[@class='text-ctr']/div"

    }

    async searchMyClub() {

        const clubs = loadClubData();

        // Select a random club from the loaded Club data
        const randomClub = clubs[Math.floor(Math.random() * clubs.length)]

        // Search the required club from the data provided
        await this.page.click(this.dropdownicon)
        await this.page.fill(this.searchbox, randomClub.clubname)
        await this.page.waitForTimeout(1000)

        // Fetch the first matching result
        await this.page.click(this.firstclub)
        await this.page.waitForTimeout(1000)

        //Navigate to team listing screen
        await this.page.click(this.teamlist)
        await this.page.waitForTimeout(3000)

    }

} module.exports = { SearhClub }