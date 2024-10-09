// (c) 2001 Microsoft Corporation
var bValidating = false;

//SET DIRECTION FUNCTION*************************************
//***********************************************************
function setDirection()
{
	if (document.dir == "rtl")
	{
		
		//SET CONTENT FRAME FLOW FOR RTL*********************
		//***************************************************
		var CatcHERa = document.all.tags("LI");
		var CatcHERb = document.all.tags("DIV");
		var CatcHERc = document.all.tags("SPAN");
		var CatcHERd = document.all.tags("INPUT");
		var CatcHERe = document.all.tags("TABLE");
		var CatcHERf = document.all.tags("BUTTON");
		var CatcHERg = document.all.tags("SELECT");
		var CatcHERg = document.all.tags("OBJECT");
		
		if (CatcHERa != null)
		{
		  for (var i = 0; i < CatcHERa.length; i++)
		  {
            if (CatcHERa[i].className.toLowerCase() == "list")
			{
			  CatcHERa[i].style.left = "0px";
			  CatcHERa[i].style.right = "-15px";
			}
		  }
		}
		
		if (CatcHERb != null)
		{
		  for (var i = 0; i < CatcHERb.length; i++)
		  {
            if (CatcHERb[i].className.toLowerCase() == "vertline")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "0px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradiob")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindenta")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "30px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxa")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "15px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
		  }
		}
		
		if (CatcHERc != null)
		{
		  for (var i = 0; i < CatcHERc.length; i++)
		  {
            if (CatcHERc[i].className.toLowerCase() == "vertline1")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "-1px";
			}
            if (CatcHERc[i].className.toLowerCase() == "itemtextindent")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "17px";
			}
		  }
		}
		
		if (CatcHERd != null)
		{
		  for (var i = 0; i < CatcHERd.length; i++)
		  {
            if (CatcHERd[i].className.toLowerCase() == "radio")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "6px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkbox")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "-4px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxa")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "10px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtnb")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindenta")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "comment")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERe != null)
		{
		  for (var i = 0; i < CatcHERe.length; i++)
		  {
            if (CatcHERe[i].className.toLowerCase() == "linktextselected")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextselectedindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktext")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
		  }
		}
		
		if (CatcHERf != null)
		{
		  for (var i = 0; i < CatcHERf.length; i++)
		  {
            if (CatcHERf[i].className.toLowerCase() == "buttonclass")
			{
			  CatcHERf[i].style.marginLeft = "0px";
			  CatcHERf[i].style.marginRight = "8px";
			}
		  }
		}
		
		if (CatcHERg != null)
		{
		  for (var i = 0; i < CatcHERg.length; i++)
		  {
            if (CatcHERg[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "9px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "17px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2a")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "25px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2b")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERh != null)
		{
		  for (var i = 0; i < CatcHERh.length; i++)
		  {
            if (CatcHERh[i].className.toLowerCase() == "itemtext")
			{
			  CatcHERh[i].style.left = "0px";
			  CatcHERh[i].style.right = "8px";
			}
		  }
		}
		
		//SET INTRODUCTION FRAME FLOW FOR RTL****************
		//***************************************************
		
		//SET INTRODUCTION SUBHEADING TEXT ALIGNMENT*********
		document.all("SUBHEAD").style.marginLeft = "0px";
		document.all("SUBHEAD").style.marginRight = "10px";
		
		//SET INTRODUCTION IMAGE ALIGNMENT*******************
		document.all("IMAGE_TABLE").style.textAlign = "left";
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOVER****************
//***********************************************************

function MouseOver(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if ((obj.id != "DatSupBtn") || (obj.id != "BrowseBtn"))
	{
		obj.className = "activelink";
	}
	
	else if (obj.id == "DBSupport")
	{
		if (window.external.FindSymbol("APP_TYPE_DLG"))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	else if (obj.id == "Notifications")
	{
		if (!GENERATE_FILTER.checked) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	else if (obj.id == "DatSupBtn")
	{
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOUT*****************
//***********************************************************
function MouseOut(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if (obj.id == "DBSupport")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (window.external.FindSymbol("APP_TYPE_DLG")) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	
	else if (obj.id == "Notifications")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (!window.external.FindSymbol("GENERATE_FILTER")) 
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "DatSupBtn")
	{
	
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}	
	
	else if (obj.id == "ServerOptions")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_ISAPI")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if (obj.id == "AppOptions")
	{
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_APP")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "BrowseBtn")
	{
		obj.disabled = true;
		
		if ((GENERATE_ISAPI.checked) && (GENERATE_ISAPI.disabled == false))
		{
			obj.disabled = false;
		}
	}	
}

/******************************************************************************
 Description: OnKeyPress event handler for HTML pages
******************************************************************************/
function OnPress()
{
	// get outermost window for new UI with frames
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter
				case 13:
					if (event.srcElement.className && (event.srcElement.className.toLowerCase() == "activelink" || event.srcElement.className.toLowerCase() == "inactivelink"))
					{
						event.cancelBubble = true;
						event.srcElement.click();
						break;
					}
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "button"))
						oDefault.FinishBtn.click();
					break;

				// Backspace		
				case 8:
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "text"))
						event.returnValue = false;
					break;
					
				// Escape
				case 27:
					oDefault.CancelBtn.click();
					break;
			}
		}
	}
}

/*****************************************************************************
 Description: OnKeyDown event handler for HTML pages.
******************************************************************************/
function OnKey()
{
	//Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter key for <SELECT>, other controls handled in OnPress()
				case 13:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.FinishBtn.click();
					break;
					
				// Escape key for <SELECT>, other controls handled in OnPress()
				case 27:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.CancelBtn.click();
					break;

				//F1
				case 112:
					oDefault.HelpBtn.click();
					break;
					
				case 65:
				case 70:
				case 78:
					{
						if (event.ctrlKey)
							event.returnValue = false;
					}
					
					break;
					
				//Case for 33,9,34 have to be in this order
				//Page Up
				case 33:
					bPreviousTab = true;
					
				//Tab
				case 9:
					if (event.shiftKey)
						bPreviousTab = true;
						
				//Page Down
				case 34:
					if (event.ctrlKey && oDefault.tab_array != null && oDefault.tab_array.length > 1)
					{
						for (i = 0; i < oDefault.tab_array.length; i++)
						{
							if ((oDefault.tab_array[i].className.toLowerCase() == "activelink") || (oDefault.tab_array[i].className.toLowerCase() == "inactivelink"))
							{
								var j = 0;
								
								if (bPreviousTab)
								{
									j = i - 1;
									while (j != i)
									{
										if (j < 0)
										{
											j = oDefault.tab_array.length - 1;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j--;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == 0)
										{
											break;
										}
										if (oDefault.tab_array[j - 1].className.toLowerCase() == "inactivelink")
										{
											j--;
										}
										else
										{
											break;
										}
									}
									if (j == 0)
									{
										j = oDefault.tab_array.length - 1;
									}
									else
									{
										j = j - 1;
									}
								}
								else
								{
									j = i + 1;
									while (j != i)
									{
										if (j >= oDefault.tab_array.length)
										{
											j = 0;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j++;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == oDefault.tab_array.length - 1)
										{
											break;
										}
										if (oDefault.tab_array[j + 1].className.toLowerCase() == "inactivelink")
										{
											j++;
										}
										else
										{
											break;
										}
									}
									if (j == oDefault.tab_array.length - 1)
									{
										j = 0;
									}
									else
									{
										j = j + 1;
									}
								}
								//Prevent double notification when we pop up an error
								event.cancelBubble = true;
								oDefault.tab_array[j].click();
								break;
							}
						}
					}
					break;
							
				//Alt-Left arrow
				case 37:
					if (event.altKey)
						event.returnValue = false;
					break;
					
				//Alt-Right arrow
				case 39:					
					if (event.altKey)
						event.returnValue = false;
					break;

				default:
					break;				
			}
		}
	}
}

/******************************************************************************
 Description: KeyDown event handler for WizCombo control
    nKeyCode: Ascii code for key
******************************************************************************/
function OnWizComboKeyDown(nKeyCode)
{
	// Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	switch(nKeyCode)
	{
		// Enter
		case 13:
			oDefault.FinishBtn.click();
			break;
			
		// Escape
		case 27:
			oDefault.CancelBtn.click();
			break;

		// F1
		case 112:
			oDefault.HelpBtn.click();
			break;
	}
}

//DO MOUSEOVER***********************************************
//***********************************************************
function MouseOverActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink")
		{
		  e.className = "activelink2";
		}
}

//DO MOUSEOUT************************************************
//***********************************************************
function MouseOutActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink2")
		{
		  e.className = "activelink";
		}
}


//SET MOUSEOVERS AND MOUSOUTS********************************
//***********************************************************
document.onmouseover = MouseOverActiveText;
document.onmouseout = MouseOutActiveText;
// SIG // Begin signature block
// SIG // MIIjnQYJKoZIhvcNAQcCoIIjjjCCI4oCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // GaS1/sPy4pJLgh6v9hgEgwMJnBviNIQmirRfwck7icig
// SIG // gg2BMIIF/zCCA+egAwIBAgITMwAAAd9r8C6Sp0q00AAA
// SIG // AAAB3zANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIwMTIxNTIxMzE0NVoX
// SIG // DTIxMTIwMjIxMzE0NVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // trsZWRAAo6nx5LhcqAsHy9uaHyPQ2VireMBI9yQUOPBj
// SIG // 7dVLA7/N+AnKFFDzJ7P+grT6GkOE4cv5GzjoP8yQJ6yX
// SIG // ojEKkXti7HW/zUiNoF11/ZWndf8j1Azl6OBjcD416tSW
// SIG // Yvh2VfdW1K+mY83j49YPm3qbKnfxwtV0nI9H092gMS0c
// SIG // pCUsxMRAZlPXksrjsFLqvgq4rnULVhjHSVOudL/yps3z
// SIG // OOmOpaPzAp56b898xC+zzHVHcKo/52IRht1FSC8V+7QH
// SIG // TG8+yzfuljiKU9QONa8GqDlZ7/vFGveB8IY2ZrtUu98n
// SIG // le0WWTcaIRHoCYvWGLLF2u1GVFJAggPipwIDAQABo4IB
// SIG // fjCCAXowHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFDj2zC/CHZDRrQnzJlT7byOl
// SIG // WfPjMFAGA1UdEQRJMEekRTBDMSkwJwYDVQQLEyBNaWNy
// SIG // b3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEWMBQG
// SIG // A1UEBRMNMjMwMDEyKzQ2MzAwOTAfBgNVHSMEGDAWgBRI
// SIG // bmTlUAXTgqoXNzcitW2oynUClTBUBgNVHR8ETTBLMEmg
// SIG // R6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3JsMGEGCCsGAQUFBwEBBFUwUzBRBggrBgEFBQcw
// SIG // AoZFaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEL
// SIG // BQADggIBAJ56h7Q8mFBWlQJLwCtHqqup4aC/eUmULt0Z
// SIG // 6We7XUPPUEd/vuwPuIa6+1eMcZpAeQTm0tGCvjACxNNm
// SIG // rY8FoD3aWEOvFnSxq6CWR5G2XYBERvu7RExZd2iheCqa
// SIG // EmhjrJGV6Uz5wmjKNj16ADFTBqbEBELMIpmatyEN50UH
// SIG // wZSdD6DDHDf/j5LPGUy9QaD2LCaaJLenKpefaugsqWWC
// SIG // MIMifPdh6bbcmxyoNWbUC1JUl3HETJboD4BHDWSWoDxI
// SIG // D2J4uG9dbJ40QIH9HckNMyPWi16k8VlFOaQiBYj09G9s
// SIG // LMc0agrchqqZBjPD/RmszvHmqJlSLQmAXCUgcgcf6UtH
// SIG // EmMAQRwGcSTg1KsUl6Ehg75k36lCV57Z1pC+KJKJNRYg
// SIG // g2eI6clzkLp2+noCF75IEO429rjtujsNJvEcJXg74TjK
// SIG // 5x7LqYjj26Myq6EmuqWhbVUofPWm1EqKEfEHWXInppqB
// SIG // YXFpBMBYOLKc72DT+JyLNfd9utVsk2kTGaHHhrp+xgk9
// SIG // kZeud7lI/hfoPeHOtwIc0quJIXS+B5RSD9nj79vbJn1J
// SIG // x7RqusmBQy509Kv2Pg4t48JaBfBFpJB0bUrl5RVG05sK
// SIG // /5Qw4G6WYioS0uwgUw499iNC+Yud9vrh3M8PNqGQ5mJm
// SIG // JiFEjG2ToEuuYe/e64+SSejpHhFCaAFcMIIHejCCBWKg
// SIG // AwIBAgIKYQ6Q0gAAAAAAAzANBgkqhkiG9w0BAQsFADCB
// SIG // iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEw
// SIG // OTA5WjB+MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQD
// SIG // Ex9NaWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDEx
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // q/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4Bjga
// SIG // BEm6f8MMHt03a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSH
// SIG // fpRgJGyvnkmc6Whe0t+bU7IKLMOv2akrrnoJr9eWWcpg
// SIG // GgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpc
// SIG // oRb0RrrgOGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnn
// SIG // Db6gE3e+lD3v++MrWhAfTVYoonpy4BI6t0le2O3tQ5GD
// SIG // 2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLT
// SIG // swM9sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOE
// SIG // y/S6A4aN91/w0FK/jJSHvMAhdCVfGCi2zCcoOCWYOUo2
// SIG // z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
// SIG // A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL
// SIG // 5zmhD+kjSbwYuER8ReTBw3J64HLnJN+/RpnF78IcV9uD
// SIG // jexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmnEyim
// SIG // p31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8Hh
// SIG // hUSJxAlMxdSlQy90lfdu+HggWCwTXWCVmj5PM4TasIgX
// SIG // 3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0wggHpMBAG
// SIG // CSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXT
// SIG // gqoXNzcitW2oynUClTAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx
// SIG // 0SOJNDBaBgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4G
// SIG // CCsGAQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
// SIG // HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEF
// SIG // BQcCARYzaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
// SIG // aW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsGAQUF
// SIG // BwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5
// SIG // AF8AcwB0AGEAdABlAG0AZQBuAHQALiAdMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKbC5YR4WOS
// SIG // mUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np
// SIG // 22O/IjWll11lhJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r
// SIG // 4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6I/MTfaaQdION
// SIG // 9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWlu
// SIG // WpiW5IP0wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiX
// SIG // mE0OPQvyCInWH8MyGOLwxS3OW560STkKxgrCxq2u5bLZ
// SIG // 2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNA
// SIG // BQamASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPD
// SIG // XVJihsMdYzaXht/a8/jyFqGaJ+HNpZfQ7l1jQeNbB5yH
// SIG // PgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
// SIG // XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbS
// SIG // oqKfenoi+kiVH6v7RyOA9Z74v2u3S5fi63V4GuzqN5l5
// SIG // GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33VtY5E9
// SIG // 0Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZO
// SIG // SEXAQsmbdlsKgEhr/Xmfwb1tbWrJUnMTDXpQzTGCFXQw
// SIG // ghVwAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTECEzMAAAHfa/AukqdKtNAAAAAAAd8wDQYJYIZI
// SIG // AWUDBAIBBQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQB
// SIG // gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
// SIG // ARUwLwYJKoZIhvcNAQkEMSIEIChaETdUMILWv/ntu1Of
// SIG // jf1WnauZU5zLA20gUcv02QAfMEIGCisGAQQBgjcCAQwx
// SIG // NDAyoBSAEgBNAGkAYwByAG8AcwBvAGYAdKEagBhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
// SIG // BQAEggEAEGZNrP+XzshlbplylBpRUUKhC1Bdg2xperbs
// SIG // s1oO3JAT4JphhHPQnH1HQMK/+1tVPa+hGcLtzRSH63L+
// SIG // wY/KBzJvqrw+VRAOrYBU2rohBaJn3/upkiQ/pugzMoeX
// SIG // Y+9Ne/ple8KY2VVjJPkVYlhZuaGsnjK8UfkgsVcMPmR1
// SIG // MBQpKB/oscmZirr9iSN4zvkZqbQLIoQR66LP0bu+If2A
// SIG // 0yo6q7Ex5j+DQ5yhYLkwgzwG400O2TYjSAuvPxE0Z8+l
// SIG // 032g/o/nRaWUHbggVkvpRR72S/WRJBbuhemgZ12kax9/
// SIG // EalIsFCiU9dIfKaLprh9i5Nh05TOu20wdHli4zkoiKGC
// SIG // Ev4wghL6BgorBgEEAYI3AwMBMYIS6jCCEuYGCSqGSIb3
// SIG // DQEHAqCCEtcwghLTAgEDMQ8wDQYJYIZIAWUDBAIBBQAw
// SIG // ggFZBgsqhkiG9w0BCRABBKCCAUgEggFEMIIBQAIBAQYK
// SIG // KwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCDxRuLx
// SIG // tA6/R4Dq9TmBsbBlJUzCbaJtHgdNJw3BNdk0BQIGYUi4
// SIG // myyJGBMyMDIxMDkyNzIwMzUzMC45MTNaMASAAgH0oIHY
// SIG // pIHVMIHSMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQL
// SIG // EyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExp
// SIG // bWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1MgRVNOOjE3
// SIG // OUUtNEJCMC04MjQ2MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloIIOTTCCBPkwggPhoAMC
// SIG // AQICEzMAAAE8i/25sz9Hl/0AAAAAATwwDQYJKoZIhvcN
// SIG // AQELBQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAw
// SIG // HhcNMjAxMDE1MTcyODIzWhcNMjIwMTEyMTcyODIzWjCB
// SIG // 0jELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWlj
// SIG // cm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVk
// SIG // MSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjoxNzlFLTRC
// SIG // QjAtODI0NjElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgU2VydmljZTCCASIwDQYJKoZIhvcNAQEBBQAD
// SIG // ggEPADCCAQoCggEBAJgQKulpA6r2OQ4GkLfjl9DQi86l
// SIG // GorycR76Oiklz/lc02rNqermGt33CJvhF2+m4+PryfkO
// SIG // b9dm7a8KqdajGHLeLGtuBL+uDcJLduqnwCDVRCD/EDPf
// SIG // ZO555M5jVw56VxdFqGiwhyOWuuS/XcBpwVebgBtgwKBg
// SIG // zoHN1koBF5tzrMS/7hALLj7UBXxEdAcQ52iPjY4mlsVa
// SIG // Ue9grNe4zUAfi+aNP2j98KraZYPsiDb8Kloh3aAcrpH5
// SIG // L3T2Irbu5WSNVqnb9JvgBM4sltpVD5fT6FhsRwJ6x/3e
// SIG // D60BBe68Dx0frd2grkjnN1kIXlT/cOJt+XtkIWxTqSz6
// SIG // mHiMmtsCAwEAAaOCARswggEXMB0GA1UdDgQWBBThoWfi
// SIG // yhL6NrNhPyUY6hi/Jmc8RjAfBgNVHSMEGDAWgBTVYzpc
// SIG // ijGQ80N7fEYbxTNoWoVtVTBWBgNVHR8ETzBNMEugSaBH
// SIG // hkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0FfMjAxMC0wNy0w
// SIG // MS5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsGAQUFBzAC
// SIG // hj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2Nl
// SIG // cnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3LTAxLmNydDAM
// SIG // BgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoGCCsGAQUFBwMI
// SIG // MA0GCSqGSIb3DQEBCwUAA4IBAQAy9xCMlN2XeW5IzMWp
// SIG // GTFGSUn4pZFRSUHcjYolVZvgafp5Z0lOJZ0LW7F6MXag
// SIG // 9fRv5f1AiGLy7UBpXv3Z4SK3aVDOpWA+J/JNkYuPMrY6
// SIG // i7g+P8Xnw+naboe6kZ+40B6GWf6FK+8gTmCAScKK/2VW
// SIG // QAk4yUscXfwNs+/unJazQvO/ayNnA8e92G1XyUG05iwT
// SIG // w3HOeVuzJzzS9GdF6qbwlArpnzEAPhJ5jx24UVeFyIRM
// SIG // bYTRuH783ebAafNcnMxtIoAqTMjDpjGp/7MfNY8WKb0M
// SIG // ZnCZyGr7okEq1vgQZPQQW1+oYKs48Pk7u4/BJ2PVqmBe
// SIG // qjsdy3HuFyzmqOnCMIIGcTCCBFmgAwIBAgIKYQmBKgAA
// SIG // AAAAAjANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3Qg
// SIG // Q2VydGlmaWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcNMTAw
// SIG // NzAxMjEzNjU1WhcNMjUwNzAxMjE0NjU1WjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMDCCASIwDQYJKoZIhvcN
// SIG // AQEBBQADggEPADCCAQoCggEBAKkdDbx3EYo6IOz8E5f1
// SIG // +n9plGt0VBDVpQoAgoX77XxoSyxfxcPlYcJ2tz5mK1vw
// SIG // FVMnBDEfQRsalR3OCROOfGEwWbEwRA/xYIiEVEMM1024
// SIG // OAizQt2TrNZzMFcmgqNFDdDq9UeBzb8kYDJYYEbyWEeG
// SIG // MoQedGFnkV+BVLHPk0ySwcSmXdFhE24oxhr5hoC732H8
// SIG // RsEnHSRnEnIaIYqvS2SJUGKxXf13Hz3wV3WsvYpCTUBR
// SIG // 0Q+cBj5nf/VmwAOWRH7v0Ev9buWayrGo8noqCjHw2k4G
// SIG // kbaICDXoeByw6ZnNPOcvRLqn9NxkvaQBwSAJk3jN/LzA
// SIG // yURdXhacAQVPIk0CAwEAAaOCAeYwggHiMBAGCSsGAQQB
// SIG // gjcVAQQDAgEAMB0GA1UdDgQWBBTVYzpcijGQ80N7fEYb
// SIG // xTNoWoVtVTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMA
// SIG // QTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAf
// SIG // BgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBW
// SIG // BgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jv
// SIG // c29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNSb29D
// SIG // ZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEE
// SIG // TjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jv
// SIG // c29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8y
// SIG // MDEwLTA2LTIzLmNydDCBoAYDVR0gAQH/BIGVMIGSMIGP
// SIG // BgkrBgEEAYI3LgMwgYEwPQYIKwYBBQUHAgEWMWh0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9QS0kvZG9jcy9DUFMv
// SIG // ZGVmYXVsdC5odG0wQAYIKwYBBQUHAgIwNB4yIB0ATABl
// SIG // AGcAYQBsAF8AUABvAGwAaQBjAHkAXwBTAHQAYQB0AGUA
// SIG // bQBlAG4AdAAuIB0wDQYJKoZIhvcNAQELBQADggIBAAfm
// SIG // iFEN4sbgmD+BcQM9naOhIW+z66bM9TG+zwXiqf76V20Z
// SIG // MLPCxWbJat/15/B4vceoniXj+bzta1RXCCtRgkQS+7lT
// SIG // jMz0YBKKdsxAQEGb3FwX/1z5Xhc1mCRWS3TvQhDIr79/
// SIG // xn/yN31aPxzymXlKkVIArzgPF/UveYFl2am1a+THzvbK
// SIG // egBvSzBEJCI8z+0DpZaPWSm8tv0E4XCfMkon/VWvL/62
// SIG // 5Y4zu2JfmttXQOnxzplmkIz/amJ/3cVKC5Em4jnsGUpx
// SIG // Y517IW3DnKOiPPp/fZZqkHimbdLhnPkd/DjYlPTGpQqW
// SIG // hqS9nhquBEKDuLWAmyI4ILUl5WTs9/S/fmNZJQ96LjlX
// SIG // dqJxqgaKD4kWumGnEcua2A5HmoDF0M2n0O99g/DhO3EJ
// SIG // 3110mCIIYdqwUB5vvfHhAN/nMQekkzr3ZUd46PioSKv3
// SIG // 3nJ+YWtvd6mBy6cJrDm77MbL2IK0cs0d9LiFAR6A+xuJ
// SIG // KlQ5slvayA1VmXqHczsI5pgt6o3gMy4SKfXAL1QnIffI
// SIG // rE7aKLixqduWsqdCosnPGUFN4Ib5KpqjEWYw07t0Mkvf
// SIG // Y3v1mYovG8chr1m1rtxEPJdQcdeh0sVV42neV8HR3jDA
// SIG // /czmTfsNv11P6Z0eGTgvvM9YBS7vDaBQNdrvCScc1bN+
// SIG // NR4Iuto229Nfj950iEkSoYIC1zCCAkACAQEwggEAoYHY
// SIG // pIHVMIHSMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQL
// SIG // EyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExp
// SIG // bWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1MgRVNOOjE3
// SIG // OUUtNEJCMC04MjQ2MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoD
// SIG // FQAdS3R6Wd5o8ttrXop7rdFHcHrk5qCBgzCBgKR+MHwx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jv
// SIG // c29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMA0GCSqGSIb3
// SIG // DQEBBQUAAgUA5PxxaTAiGA8yMDIxMDkyODAwMzU1M1oY
// SIG // DzIwMjEwOTI5MDAzNTUzWjB3MD0GCisGAQQBhFkKBAEx
// SIG // LzAtMAoCBQDk/HFpAgEAMAoCAQACAgEgAgH/MAcCAQAC
// SIG // AhFsMAoCBQDk/cLpAgEAMDYGCisGAQQBhFkKBAIxKDAm
// SIG // MAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAIAgEA
// SIG // AgMBhqAwDQYJKoZIhvcNAQEFBQADgYEAdIzz4H5NWJrE
// SIG // EtHWQBrO+qRGcGRVyns1lyvjYVnbpi7S12un/mML0vh5
// SIG // N3bawmqiRfRo76M8yQR4pDBzScU1JEHiskdMZbrcXhE2
// SIG // 1tt/AlUwmTo/+gY4xEsrwPCOmxeUxsNK2uI0SjzlrZGD
// SIG // hAY1pFRcOLxx4K4ZPNnWVTNXryAxggMNMIIDCQIBATCB
// SIG // kzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAA
// SIG // ATyL/bmzP0eX/QAAAAABPDANBglghkgBZQMEAgEFAKCC
// SIG // AUowGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8G
// SIG // CSqGSIb3DQEJBDEiBCDkN9dmJE/JDpxNg1nOMUemvJWE
// SIG // Rzb6dENR8+R7NXVFzzCB+gYLKoZIhvcNAQkQAi8xgeow
// SIG // gecwgeQwgb0EIKBJArpNJL/A5zqpt9R8Ea/tiGw98ZiF
// SIG // uBUhiuEm6FpGMIGYMIGApH4wfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAE8i/25sz9Hl/0AAAAAATww
// SIG // IgQgXHiC2nnL5ZOvy3O6SrjIMthiTqeXV2RCmOaxKerb
// SIG // 6p0wDQYJKoZIhvcNAQELBQAEggEAT0my4B5S/G41Nsgx
// SIG // XpIqWvgC1wo40hJKNpxsjT62TD48zx9ByvdpT5dRU41Z
// SIG // n+2RdISM776igemaq1rAM1xnvAfbvjzvSRewbCK6J268
// SIG // Nx4CyhhW+Fn5kIGGdY3l6EsNckjdeDxSzQmt1rhuA21O
// SIG // RSflHoMgQWe1uGvKVjsIYXMq2PklwsB8WHYBGAeHIJK4
// SIG // 5hVVpi1NboQeOGQZJrt7BYhlQKlEb8LV7TmQG7CPK/ua
// SIG // CWHzgrPdfndT93cnFXgbwN6s4Q/h7hSdjPTOrzhAliwo
// SIG // m7XIVuZTkpO59yQUXia6Y9Z1S6vPrnZPTGc86Iy6OuWy
// SIG // c1Ln4hP/nD1rl4h80A==
// SIG // End signature block
