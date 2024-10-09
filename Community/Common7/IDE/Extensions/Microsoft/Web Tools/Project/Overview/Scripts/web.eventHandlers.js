Microsoft.Plugin.addEventListener("pluginready", function () {
    setHtmlText();
});

function setHtmlText() {
    // resource strings used by web.default.html
    setTextContent("#webOverviewHeader", "WebOverviewHeader");
    setTextContent("#webSubTitle", "WebSubTitle");

    setTextContent("#webGetStartedText", "WebGetStartedText");

    setTextContent("#publishToAzureText", "PublishToAzureText");
}
