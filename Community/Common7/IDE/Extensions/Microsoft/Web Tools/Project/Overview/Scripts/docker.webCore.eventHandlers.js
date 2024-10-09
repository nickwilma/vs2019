Microsoft.Plugin.addEventListener("pluginready", function () {
    setHtmlText();
});

function setHtmlText() {
    // resource strings used by docker.web.default.html
    setTextContent("#dockerWebCoreOverviewHeader", "DockerWebCoreOverviewHeader");
    setTextContent("#dockerWebCoreSubTitle", "DockerWebCoreSubTitle");

    setTextContent("#browseDocsText", "BrowseDocsText");

    setTextContent("#publishToAppServicesText", "PublishToAppServicesText");
}
