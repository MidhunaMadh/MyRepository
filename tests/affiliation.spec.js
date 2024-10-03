import { test, expect } from '@playwright/test'
import { Login } from '../Pages/LoginPage';
import { SearhClub } from '../Pages/SearchClubPage';
import { MFA } from '../Pages/MFAPage';
import { Team } from '../Pages/CreateTeamPage';
import { ProAffiliation } from '../Pages/AffiliationPage';


test('Pro club affiliation process', async ({ page }) => {

    // Initialize login page object and perform login action
    const loginpage = new Login(page);
    await loginpage.loginToPortal();

    // Initialize MFA object and complete multi-factor authentication
    // const auth = new MFA(page);
    // await auth.authentication();

    // Initialize SearchClub object and search for user's club
    const search = new SearhClub(page);
    await search.searchMyClub();

    // Initialize Team object and create a new team
    const newteam = new Team(page);
    await newteam.createTeam();

    // Initialize ProAffiliation object and handle professional club affiliation process
    const proaffiliation = new ProAffiliation(page);
    await proaffiliation.proAffiliation();

})