const db = require("../models/index");
const Statistic = db.statistic;

// 🔧 ฟังก์ชันแยกเพื่อจัดกลุ่ม channel
function detectChannelGroup(parsedUrl, requestUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  const fullUrl = requestUrl.toLowerCase();

  const searchEngines = ["google.", "bing.com", "yahoo.com", "duckduckgo.com", "baidu.com"];
  const socialSites = ["facebook.com", "instagram.com", "youtube.com", "twitter.com", "linkedin.com", "tiktok.com", "pinterest.com", "reddit.com"];

  const getParam = (name) => {
    const match = fullUrl.match(new RegExp(`[?&]${name}=([^&#]*)`));
    return match ? decodeURIComponent(match[1]) : "";
  };

  const utmMedium = getParam("utm_medium");
  const utmSource = getParam("utm_source");
  const utmCampaign = getParam("utm_campaign");

  // 1. Paid Search
  if (["cpc", "ppc", "paidsearch"].includes(utmMedium)) {
    return "Paid Search";
  }

  // 2. Organic Search
  if (searchEngines.some(domain => hostname.includes(domain)) && !utmMedium) {
    return "Organic Search";
  }

  // 3. Paid Social
  if (
    ["paidsocial"].includes(utmMedium) ||
    (socialSites.some(domain => hostname.includes(domain)) && utmMedium === "social" && utmCampaign)
  ) {
    return "Paid Social";
  }

  // 4. Organic Social
  if (
    socialSites.some(domain => hostname.includes(domain)) &&
    (!utmMedium || utmMedium === "social") &&
    !utmCampaign
  ) {
    return "Organic Social";
  }

  // 5. Email
  if (utmMedium === "email") {
    return "Email";
  }

  // 6. Affiliates
  if (utmMedium === "affiliate") {
    return "Affiliates";
  }

  // 7. Display
  if (["display", "banner", "cpm"].includes(utmMedium)) {
    return "Display";
  }

  // 8. Video
  if (utmMedium === "video") {
    return "Video";
  }

  // 9. Audio
  if (utmMedium === "audio") {
    return "Audio";
  }

  // 10. SMS
  if (utmMedium === "sms") {
    return "SMS";
  }

  // 11. Mobile Push
  if (["push", "notification", "app"].includes(utmMedium) || utmSource === "push") {
    return "Mobile Push Notifications";
  }

  // 12. Cross-network
  if (utmMedium === "cross-network") {
    return "Cross-network";
  }

  // 13. Other Advertising
  if (["cpv", "cpa", "cpp", "content-text"].includes(utmMedium)) {
    return "Other Advertising";
  }

  // 14. Direct
  if (!hostname || hostname === "") {
    return "Direct";
  }

  // 15. Referral
  if (
    hostname &&
    !searchEngines.some(domain => hostname.includes(domain)) &&
    !socialSites.some(domain => hostname.includes(domain)) &&
    !utmMedium
  ) {
    return "Referral";
  }

  // 16. Fallback
  return "Unassigned";
}

module.exports = async function storeStats(req, res, next) {
  try {
    const latestSession = await Statistic.findOne({
      where: { sessionRef: req.headers.sessionref },
      order: [["createdAt", "DESC"]],
    });

    if (latestSession === null) {
      const statData = {
        ipAddress: req.headers.uniqueuserref,
        currentUrl: req.headers.requesthost,
        userProductId: req.params.id,
        sessionRef: req.headers.sessionref,
      };

      if (req.headers.exactreferer && req.headers.exactreferer !== "") {
        const parsedUrl = new URL(req.headers.exactreferer);
        statData.sourceUrl = parsedUrl.hostname;
        statData.sourceType = detectChannelGroup(parsedUrl, req.headers.requesturl || "");
      } else {
        statData.sourceType = "Direct";
      }

      await Statistic.create(statData);
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: "[pb02] Something went wrong",
      reason: error.message,
    });
  }
};
