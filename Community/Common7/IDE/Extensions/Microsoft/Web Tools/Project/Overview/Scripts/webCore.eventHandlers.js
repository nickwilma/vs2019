Microsoft.Plugin.addEventListener("pluginready", function () {
    setHtmlText();
});

function setHtmlText() {
    // resource strings used by webCore.default.html
    setTextContent("#webCoreOverviewHeader", "WebCoreOverviewHeader");
    setTextContent("#webSubTitle", "WebSubTitle");

    setTextContent("#browseDocsText", "BrowseDocsText");

    setTextContent("#publishToAzureText", "PublishToAzureText");
}
