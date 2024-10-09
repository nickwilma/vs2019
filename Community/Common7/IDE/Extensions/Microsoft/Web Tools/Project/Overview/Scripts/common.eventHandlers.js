Microsoft.Plugin.addEventListener("pluginready", function () {
    setCommonHtmlText();
});

function setTextContent(selector, contentKey) {
    try {
        var content = Microsoft.Plugin.Resources.getString(contentKey);
        document.querySelector(selector).innerHTML = content;
    }
    catch (e) { /* this block intentionally left blank */ }
}

function setAltText(selector, contentKey) {
    try {
        var content = Microsoft.Plugin.Resources.getString(contentKey);
        document.querySelector(selector).setAttribute('alt', content);
    }
    catch (e) { /* this block intentionally left blank */ }
}

function setCommonHtmlText() {
    // resource strings used by all overview pages
    setTextContent("#buildYourAppHeader", "BuildYourAppHeader");
    setTextContent("#learnToolsHeader", "LearnToolsHeader");
    setTextContent("#connectHeader", "ConnectHeader");

    setTextContent("#dotnetArchitectureText", "DotnetArchitectureText");

    setTextContent("#getStartedWithAspNetAzureText", "GetStartedWithAspNetAzureText");

    setTextContent("#productivityGuide", "ProductivityGuide");
    setTextContent("#refactoringTools", "RefactoringTools");

    setAltText("#buildYourAppAltText", "BuildYourAppHeader");
    setAltText("#learnToolsAltText", "LearnToolsHeader");
    setAltText("#connectAltText", "ConnectHeader");
}
