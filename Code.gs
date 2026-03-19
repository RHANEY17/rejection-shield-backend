function doGet(e) {
  // Runs when they click your Lovable button and authenticate
  createRejectionFilter();
  
  // A stupid simple success screen before they close the tab
  return HtmlService.createHtmlOutput(
    "<body style='background-color:#09090b; color:#22c55e; font-family:sans-serif; text-align:center; padding-top:20%;'>" +
    "<h2>Boom. Inbox Shielded.</h2>" +
    "<p style='color:#a1a1aa;'>Job rejections are now routed straight to the trash. You can close this tab and go touch grass.</p>" +
    "</body>"
  );
}

function createRejectionFilter() {
  // The god-tier master list of corporate HR bullshit
  const badWords = [
    // The Classics
    "unfortunately, we have decided to move forward with other candidates",
    "thank you for your interest, however",
    "after careful consideration we will not be moving forward",
    "decided to pursue other candidates",
    "while your background is impressive",
    "we regret to inform you",
    
    // The "Close but no cigar"
    "other candidates who are a closer fit",
    "we have decided to proceed with other applicants",
    "although your qualifications are impressive",
    "decided to advance other candidates",
    
    // The "Black Hole" 
    "due to the volume of applications we received",
    "keep your resume on file for future",
    "keep your details on file",
    "not selected for further consideration",
    "position has been filled",
    
    // The fake polite sign-offs
    "wishing you the best in your job search",
    "wish you success in your future endeavors",
    "best of luck in your career search"
  ];
  
  // Formats it so Google understands it as an exact match query
  const query = badWords.map(word => `"${word}"`).join(" OR ");
  
  // Tells Gmail what to do: Skip Inbox and Trash it
  const filter = {
    criteria: { query: query },
    action: {
      addLabelIds: ["TRASH"],
      removeLabelIds: ["INBOX"]
    }
  };
  
  try {
    // The API call that injects the filter into the user's account
    Gmail.Users.Settings.Filters.create(filter, 'me');
  } catch (error) {
    Logger.log("Shit broke: " + error.toString());
  }
}
