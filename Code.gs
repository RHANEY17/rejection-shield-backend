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
    // --- The "Moving Forward" Matrix ---
    "decided to move forward with other",
    "decided to move forward with another",
    "decided not to move forward",
    "decided to proceed with other",
    "decided to proceed with another",
    "decided to pursue other",
    "decided to pursue another",
    "chosen to move forward with other",
    "chosen to move forward with another",
    "will not be moving forward",
    "won't be moving forward",
    "not moving forward with your",
    "unable to move forward with",
    
    // --- The "Not Selected" Brutality ---
    "not been selected for further",
    "not selected for further",
    "not been selected for the position",
    "not selected for the role",
    "was not selected for this",
    "not be moving your candidacy",
    "not be able to explore this",
    "no longer in consideration",
    "will not be invited to",
    
    // --- The "Boilerplate BS" Triggers ---
    "thank you for your interest, however",
    "thank you for your interest but",
    "thank you for your interest in the",
    "while your background is impressive",
    "while your qualifications are impressive",
    "although your background is impressive",
    "although your qualifications are impressive",
    "after careful consideration we will",
    "careful consideration of your",
    "after reviewing your application",
    
    // --- The "Silver Lining" Lies ---
    "keep your resume on file",
    "keep your application on file",
    "keep your details on file",
    "keep your information on file",
    "encourage you to apply for",
    "explore other opportunities to join",
    "consider you for similar roles",
    
    // --- The "Position Filled" / Sign-offs ---
    "position has been filled",
    "role has been filled",
    "job has been filled",
    "best of luck in your career search",
    "best of luck in your job search",
    "success in your future endeavors",
    "wishing you the best in your job",
    "wishing you the best in your career"
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
