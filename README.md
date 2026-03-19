# 🛡️ Rejection Shield Backend

Nuke corporate HR rejection emails before you even wake up. 

This is the raw, open-source Google Apps Script backend that powers **Rejection Shield**. 

## Why does this exist?
Because waking up to three "unfortunately, we have decided to move forward with other candidates" emails from a soulless ATS like Workday is a garbage way to start the day when you're grinding through endless IT interviews. You should be focusing on the next application, not reading automated corporate sympathy.

## Why is Google throwing an "Unverified App" warning?
Because this is a free, open-source tool built by an indie dev, not a mega-corp paying Google $15,000+ for a third-party CASA Tier 2 security audit. 

This script requires the `https://www.googleapis.com/auth/gmail.settings.basic` scope to inject a filter into your Gmail account. Because that touches your inbox settings, Google's automated systems flag it as "sensitive" and throw a scary red warning.

**To bypass the warning:** Click `Advanced` -> `Go to Rejection Shield (unsafe)`.

## What does this code actually do?
Don't trust me, read the `Code.gs` file yourself. It's basically 30 lines of vanilla JavaScript. It does exactly two things:
1. Takes a master list of generic corporate rejection phrases.
2. Calls the Gmail API once to create a user-level filter that automatically routes any incoming emails containing those exact phrases straight to the Trash.

**Zero Server Access.** We never read your emails. We don't have a database. We don't track your data. This script lives entirely inside your own Google account infrastructure.

## The Kill List
The filter targets these exact strings to prevent false positives:
* "unfortunately, we have decided to move forward with other candidates"
* "thank you for your interest, however"
* "after careful consideration we will not be moving forward"
* "decided to pursue other candidates"
* "while your background is impressive"
* "we regret to inform you"
* "other candidates who are a closer fit"
* "we have decided to proceed with other applicants"
* "although your qualifications are impressive"
* "decided to advance other candidates"
* "due to the volume of applications we received"
* "keep your resume on file for future"
* "keep your details on file"
* "not selected for further consideration"
* "position has been filled"
* "wishing you the best in your job search"
* "wish you success in your future endeavors"
* "best of luck in your career search"

---
*Built with spite & caffeine.* 🍺 [Buy the dev a beer](https://ko-fi.com/rico2017)
