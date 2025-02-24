$id = function(id){return document.getElementById(id)};

var objKeywordsResults = [];
var priorURL = '';

var arr1Words = [];
var arr2Words = [];
var arr3Words = [];

var iTotalClicks = 0;
var iTotalImpressions = 0;

var iReportedClicks = 0;
var iReportedQueries1plus = 0;

var iReportedImpressions = 0;

var iMaxClicksValue = 0;

var accumulatedTrafficShareTotal = 0;

var colorClicksShare = '#009600';
var colorClicksShareEnd = '#009600';

var bHighlightTrafficShare = true;
var colorImpressionsShare = '#009600';
var colorImpressionsShareEnd = '#009600';


function RemoveDomaimIfURL(sValue){
	let sPageValue = sValue;
	try {
		let objPageURL = new URL(sPageValue);
		sPageValue = objPageURL.pathname + objPageURL.search;
	} catch (e) {
	}	
	return sPageValue
}


function GetMatchingCriteriaText(sCriteria){
	switch (sCriteria) {
		case "!" : 
			return "is";
			break;
		case "*" : 
			return "incl";
			break;	
		case "-" : 
			return "excl";
			break;	
		case "~" : 
			return "RegEx incl";
			break;	
		case "_" : 
			return "RegEx excl";
			break;		
		default : 
			return "";
	}
}


function GerGradientEnd(sStartColor) {
	let iRed = parseInt(sStartColor.substring(1, 3), 16);
	let iGreen = parseInt(sStartColor.substring(3, 5), 16);
	let iBlue = parseInt(sStartColor.substring(5, 7), 16);
	iRed = iRed + 40;
	if (iRed > 255){
		iRed = 255;
	}
	iGreen = iGreen + 40;
	if (iGreen > 255){
		iGreen = 255;
	}
	iBlue = iBlue + 40;	
	if (iBlue > 255){
		iBlue = 255;
	}	
  return '#' + iRed.toString(16) + iGreen.toString(16) + iBlue.toString(16);
}


function countWords(str) {
  return str.trim().split(/\s+/).length;
}


function findWord(sWords, arrSourceWords) {
	let arrWords = sWords.split(' ');  
	
	if (arrWords.length > arrSourceWords.length){
		return false;
	}
	
	for (let i = 0; i < arrSourceWords.length - arrWords.length + 1; i++){
				
		let bFullEqual = true;
		for (let j = 0; j < arrWords.length; j++){	
		
			if (arrWords[j] != arrSourceWords[i + j]){
				bFullEqual = false;
				break;
			} 
		}
		
		if (bFullEqual){							
			return true;
		}	
		
	} 
	return false;
}


/*function findWord(sWords, arrSourceWords) {
	let arrWords = sWords.split(' ');  //arrWords always has 2 elements
	for (let i = 0; i < arrSourceWords.length - 1; i++){
		if ((arrSourceWords[i] == arrWords[0]) && (arrSourceWords[i + 1] == arrWords[1])){
			return true;
		}
	} 
	return false;
}*/
	
/*function findWord(word, str) {	
	//RegExp('\\W').test(":")  RegExp("\\W").test("$")
  //return RegExp('\\b'+ word +'\\b').test(str);
 // return RegExp('(^|\\s)'+ word +'(\\s|$)').test(str);
  return RegExp('(\\b|^|\\s)'+ word +'(\\b|\\s|$)').test(str);
}*/


function RemoveFilterNGram(){
	$id('idDownload0').style.display = "block";
	$id('idFullTable').style.display = "block";
	$id('idLabelTab0').textContent = "By Query";
	$id('idFilterNGram').style.display = "none";
	$id('idFilteredTable').style.display = "none";		
}


function ShowFiltered1GramTable(sKeyword){
	$id('tab-btn-0').checked = true;
	$id('idLabelTab0').textContent = "By Query (filtered)";
	TabClick();
	$id('idDownload0').style.display = "none";
	$id('idFullTable').style.display = "none";
	$id('idFilterNGram').style.display = "block";
	$id('idFilteredTable').style.display = "block";	
	$id('idFilteredTableKeywordsBody').innerHTML = "";
	FillFiltered1GramTable(sKeyword);
}


function ShowFiltered2GramTable(sKeyword){
	$id('tab-btn-0').checked = true;
	$id('idLabelTab0').textContent = "by Query (filtered)";
	TabClick();
	$id('idDownload0').style.display = "none";
	$id('idFullTable').style.display = "none";
	$id('idFilterNGram').style.display = "block";
	$id('idFilteredTable').style.display = "block";	
	$id('idFilteredTableKeywordsBody').innerHTML = "";
	FillFiltered2GramTable(sKeyword);
}


function ShowFiltered3GramTable(sKeyword){
	$id('tab-btn-0').checked = true;
	$id('idLabelTab0').textContent = "by Query (filtered)";
	TabClick();
	$id('idDownload0').style.display = "none";
	$id('idFullTable').style.display = "none";
	$id('idFilterNGram').style.display = "block";
	$id('idFilteredTable').style.display = "block";	
	$id('idFilteredTableKeywordsBody').innerHTML = "";
	FillFiltered3GramTable(sKeyword);
}


function FillFiltered1GramTable(sKeyword){
	
	let tableKeywords =  $id('idFilteredTableKeywordsBody');	
	
	for (let k = 0; k < objKeywordsResults.length; k++){	

		let bWordFound = false;	
		for (let i = 0; i < objKeywordsResults[k].arrWords.length; i++){
			if (objKeywordsResults[k].arrWords[i] == sKeyword){
				bWordFound = true;	
				break;
			}
		}
		
		if (!bWordFound){
			continue;
		}
			
	
		let newrow = tableKeywords.insertRow();	
			let celNumber = newrow.insertCell();
			celNumber.innerHTML = (k + 1);		
			
			let objAURL = new URL(priorURL);
			objAURL.searchParams.set('query', '!' + objKeywordsResults[k].keywords);
			objAURL.searchParams.set('breakdown', 'page');
			
			let sLink = objAURL.href.replaceAll("query=%21", "query=!");
			let sLinkQuery = ' https://www.google.com/search?q=' + encodeURIComponent(objKeywordsResults[k].keywords);		
			
			let keywordsCel = newrow.insertCell();
			//keywordsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].keywords + '</a>';		
			//keywordsCel.innerHTML = '<a href="' + sLink + '"></a>';
			keywordsCel.innerHTML = '<a href="' + sLinkQuery + '"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = objKeywordsResults[k].keywords;			
			//keywordsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');	
			keywordsCel.setAttribute('title', 'Search for "'+ objKeywordsResults[k].keywords + '" on Google');	

			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].clicks.toLocaleString() + '</a>';
			clicksCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].impressions.toLocaleString() + '</a>';
			impressionsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let ctrCel = newrow.insertCell();		
			ctrCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].ctr.toLocaleString() + '%' + '</a>';				
			ctrCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let positionCel = newrow.insertCell();
			positionCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].position.toLocaleString() + '</a>';	
			positionCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');

			let wordCountCel = newrow.insertCell();
			wordCountCel.innerHTML = countWords(objKeywordsResults[k].keywords);

			let roundedPositiontCel = newrow.insertCell();
			roundedPositiontCel.innerHTML = Math.round(objKeywordsResults[k].position);	

			let serpPageCel = newrow.insertCell();
			serpPageCel.innerHTML = (Math.floor((Math.round(objKeywordsResults[k].position) - 1)/10)) + 1;	

			let roundedImpressionsCel = newrow.insertCell();
			if (objKeywordsResults[k].impressions > 5){
				roundedImpressionsCel.innerHTML = (Math.round(objKeywordsResults[k].impressions/10))*10;
			} else {
				roundedImpressionsCel.innerHTML = objKeywordsResults[k].impressions;
			}
					
			let trafficShareCel = newrow.insertCell();
			//trafficShareCel.classList.add('"chart"');
			trafficShareCel.className = "chart";
			trafficShareCel.innerHTML =  ((objKeywordsResults[k].clicks/iTotalClicks) * 100).toFixed(2) + '%';
			trafficShareCel.setAttribute('title', 'Percentage of Clicks Attributed to This Query (Calculated as [Keyword Clicks] / [Total Clicks reported by GSC]).');
			
			if (bHighlightTrafficShare){
				let iCurrValueClicks = Math.round(objKeywordsResults[k].clicks/iMaxClicksValue *100);	
				trafficShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';				
			}			

	}	
}


function RemoveFilterKeyword(){
	$id('idSaveCSV').disabled  = false;	
 	$id('idCopyToClipboard').disabled  = false;	
	FillMainTable('');	
	$id('idRemoveFilterKeyword').disabled = true;
	$id('idFilterText').value = "";
}


function DoFilterKeyword(){
	if ($id('idFilterText').value.trim() != ''){
		$id('idSaveCSV').disabled  = true;	
		$id('idCopyToClipboard').disabled  = true;
	
		FillMainTable($id('idFilterText').value.toLowerCase());
		$id('idRemoveFilterKeyword').disabled = false;			
	}
}



function FillFiltered2GramTable(sKeyword){
	
	let tableKeywords =  $id('idFilteredTableKeywordsBody');	
	
	for (let k = 0; k < objKeywordsResults.length; k++){
		
		let bTwoWordFound = false;	
		
		if (objKeywordsResults[k].arrWords.length > 1){
			for (let p = 0; p < objKeywordsResults[k].arrWords.length - 1; p++){
				
								
				let sTwoWords = objKeywordsResults[k].arrWords[p] + " " + objKeywordsResults[k].arrWords[p + 1];	
				if  (sTwoWords == sKeyword){
					bTwoWordFound = true;
					break;
				}
	
			}
		}	
		
		if (!bTwoWordFound){
			continue;
		}
	
		let newrow = tableKeywords.insertRow();	
			let celNumber = newrow.insertCell();
			celNumber.innerHTML = (k + 1);		
			
			let objAURL = new URL(priorURL);
			objAURL.searchParams.set('query', '!' + objKeywordsResults[k].keywords);
			objAURL.searchParams.set('breakdown', 'page');
			
			let sLink = objAURL.href.replaceAll("query=%21", "query=!");
			let sLinkQuery = ' https://www.google.com/search?q=' + encodeURIComponent(objKeywordsResults[k].keywords);		
			
			let keywordsCel = newrow.insertCell();
			keywordsCel.innerHTML = '<a href="' + sLinkQuery + '"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = objKeywordsResults[k].keywords;				
			keywordsCel.setAttribute('title', 'Search for "'+ objKeywordsResults[k].keywords + '" on Google');	

			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].clicks.toLocaleString() + '</a>';
			clicksCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].impressions.toLocaleString() + '</a>';
			impressionsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let ctrCel = newrow.insertCell();		
			ctrCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].ctr.toLocaleString() + '%' + '</a>';				
			ctrCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let positionCel = newrow.insertCell();
			positionCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].position.toLocaleString() + '</a>';	
			positionCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');

			let wordCountCel = newrow.insertCell();
			wordCountCel.innerHTML = countWords(objKeywordsResults[k].keywords);

			let roundedPositiontCel = newrow.insertCell();
			roundedPositiontCel.innerHTML = Math.round(objKeywordsResults[k].position);	

			let serpPageCel = newrow.insertCell();
			serpPageCel.innerHTML = (Math.floor((Math.round(objKeywordsResults[k].position) - 1)/10)) + 1;	

			let roundedImpressionsCel = newrow.insertCell();
			if (objKeywordsResults[k].impressions > 5){
				roundedImpressionsCel.innerHTML = (Math.round(objKeywordsResults[k].impressions/10))*10;
			} else {
				roundedImpressionsCel.innerHTML = objKeywordsResults[k].impressions;
			}
					
			let trafficShareCel = newrow.insertCell();
			trafficShareCel.className = "chart";
			trafficShareCel.innerHTML =  ((objKeywordsResults[k].clicks/iTotalClicks) * 100).toFixed(2) + '%';	
			trafficShareCel.setAttribute('title', 'Percentage of Clicks Attributed to This Query (Calculated as [Keyword Clicks] / [Total Clicks reported by GSC]).');
			
			if (bHighlightTrafficShare){
				let iCurrValueClicks = Math.round(objKeywordsResults[k].clicks/iMaxClicksValue *100);	
				trafficShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';				
			}			

	}		
}


function FillFiltered3GramTable(sKeyword){
	
	let tableKeywords =  $id('idFilteredTableKeywordsBody');	
	
	for (let k = 0; k < objKeywordsResults.length; k++){
		
		let bThreeWordFound = false;	
		
		if (objKeywordsResults[k].arrWords.length > 2){
			for (let p = 0; p < objKeywordsResults[k].arrWords.length - 2; p++){
				
								
				let sThreeWords = objKeywordsResults[k].arrWords[p] + " " + objKeywordsResults[k].arrWords[p + 1] + " " + objKeywordsResults[k].arrWords[p + 2];	
				if  (sThreeWords == sKeyword){
					bThreeWordFound = true;
					break;
				}
	
			}
		}	
		
		if (!bThreeWordFound){
			continue;
		}
	
		let newrow = tableKeywords.insertRow();	
			let celNumber = newrow.insertCell();
			celNumber.innerHTML = (k + 1);		
			
			let objAURL = new URL(priorURL);
			objAURL.searchParams.set('query', '!' + objKeywordsResults[k].keywords);
			objAURL.searchParams.set('breakdown', 'page');
			
			let sLink = objAURL.href.replaceAll("query=%21", "query=!");
			let sLinkQuery = ' https://www.google.com/search?q=' + encodeURIComponent(objKeywordsResults[k].keywords);		
			
			let keywordsCel = newrow.insertCell();
			keywordsCel.innerHTML = '<a href="' + sLinkQuery + '"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = objKeywordsResults[k].keywords;				
			keywordsCel.setAttribute('title', 'Search for "'+ objKeywordsResults[k].keywords + '" on Google');	

			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].clicks.toLocaleString() + '</a>';
			clicksCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].impressions.toLocaleString() + '</a>';
			impressionsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let ctrCel = newrow.insertCell();		
			ctrCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].ctr.toLocaleString() + '%' + '</a>';				
			ctrCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let positionCel = newrow.insertCell();
			positionCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].position.toLocaleString() + '</a>';	
			positionCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');

			let wordCountCel = newrow.insertCell();
			wordCountCel.innerHTML = countWords(objKeywordsResults[k].keywords);

			let roundedPositiontCel = newrow.insertCell();
			roundedPositiontCel.innerHTML = Math.round(objKeywordsResults[k].position);	

			let serpPageCel = newrow.insertCell();
			serpPageCel.innerHTML = (Math.floor((Math.round(objKeywordsResults[k].position) - 1)/10)) + 1;	

			let roundedImpressionsCel = newrow.insertCell();
			if (objKeywordsResults[k].impressions > 5){
				roundedImpressionsCel.innerHTML = (Math.round(objKeywordsResults[k].impressions/10))*10;
			} else {
				roundedImpressionsCel.innerHTML = objKeywordsResults[k].impressions;
			}
					
			let trafficShareCel = newrow.insertCell();
			trafficShareCel.className = "chart";
			trafficShareCel.innerHTML =  ((objKeywordsResults[k].clicks/iTotalClicks) * 100).toFixed(2) + '%';	
			trafficShareCel.setAttribute('title', 'Percentage of Clicks Attributed to This Query (Calculated as [Keyword Clicks] / [Total Clicks reported by GSC]).');
			
			if (bHighlightTrafficShare){
				let iCurrValueClicks = Math.round(objKeywordsResults[k].clicks/iMaxClicksValue *100);	
				trafficShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';				
			}			

	}		
}


function filter1GramClick(e){
	e.preventDefault();	
	ShowFiltered1GramTable(e.target.getAttribute("keyword"));
	$id('idFilterNGramCondition').textContent = e.target.getAttribute("keyword");

	return false;
}	


function filter2GramClick(e){
	e.preventDefault();	
	ShowFiltered2GramTable(e.target.getAttribute("keyword"));
	$id('idFilterNGramCondition').textContent = e.target.getAttribute("keyword");

	return false;
}


function filter3GramClick(e){
	e.preventDefault();	
	ShowFiltered3GramTable(e.target.getAttribute("keyword"));
	$id('idFilterNGramCondition').textContent = e.target.getAttribute("keyword");

	return false;
}	


function FillOptionsTable(sURL){
	let objURL = new URL(sURL);
	
	let sQueryValue = "not set";
	let sCondition = '';
	if (objURL.searchParams.has("query")){		
		let sQuery = objURL.searchParams.get("query");
		sCondition = GetMatchingCriteriaText(sQuery[0]);		
		/*sCondition = sQuery[0];		
		switch (sCondition) {
			case '!': sCondition = "is exactly";
			break;
			
			case '*': sCondition = "contains";
			break;

			case '-': sCondition = "does not contain";
			break;	
			
			case '~': sCondition = "RegEx includes";
			break;		
			
			case '_': sCondition = "RegEx excludes";
			break;					
		}	*/
		sQueryValue = decodeURIComponent(sQuery.substring(1));
		
	}
	$id('idConfQuery').innerHTML = '<a href="' + sURL + '"><strong>' + sCondition + "</strong> " + sQueryValue + '</a>';
	$id('idConfQuery').parentElement.setAttribute('title', sCondition + " " + sQueryValue);
	
	
	let sPageValue = "not set";
	sCondition = '';	
	if (objURL.searchParams.has("page")){
		
		let sPage = objURL.searchParams.get("page");
		
		sCondition = GetMatchingCriteriaText(sPage[0]);
		/*sCondition = sPage[0];			
		switch (sCondition) {
			case '!': sCondition = "is exactly";
			break;
			
			case '*': sCondition = "contains";
			break;

			case '-': sCondition = "does not contain";
			break;	
			
			case '~': sCondition = "RegEx includes";
			break;		
			
			case '_': sCondition = "RegEx excludes";
			break;					
		}	*/	
		sPageValue = decodeURIComponent(sPage.substring(1));
		sPageValue = RemoveDomaimIfURL(sPageValue);
	}
	
	$id('idConfPage').innerHTML = '<a href="' + sURL + '"><strong>' + sCondition + "</strong> " + sPageValue + '</a>';
	//$id('idConfPage').innerHTML = '<a href="' + sURL + '">' + sCondition + " " + sPageValue + '</a>';
	$id('idConfPage').parentElement.setAttribute('title', sCondition + " " + sPageValue);
			
	
	let sCountry = 'not set';
	if (objURL.searchParams.has("country")){
		sCountry = objURL.searchParams.get("country").toUpperCase();
	}
	$id('idConfCountry').innerHTML = '<a href="' + sURL + '">' + sCountry + '</a>';
	$id('idConfCountry').parentElement.setAttribute('title', sCountry);

	let sDevice = 'not set';
	if (objURL.searchParams.has("device")){
		sDevice = objURL.searchParams.get("device");
	}
	$id('idConfDevice').innerHTML = '<a href="' + sURL + '">' + sDevice + '</a>';
	$id('idConfDevice').parentElement.setAttribute('title', sDevice);	
	
	let sSearchAppearance = 'not set';
	if (objURL.searchParams.has("sap")){ 
		sSearchAppearance = objURL.searchParams.get("sap").toLowerCase();
		sSearchAppearance = sSearchAppearance.replaceAll("_", " ");	
	}
	$id('idConfSearchAppearance').innerHTML = '<a href="' + sURL + '">' + sSearchAppearance + '</a>';	
	$id('idConfSearchAppearance').parentElement.setAttribute('title', sSearchAppearance);	
	
	//let sPeriod = 'not set';
	let sPeriod = "Last 3 months";
	if (objURL.searchParams.has("num_of_days")){
		sPeriod = "Last " + objURL.searchParams.get("num_of_days") + " days";
	} else  if (objURL.searchParams.has("num_of_months")){
		sPeriod = "Last " + objURL.searchParams.get("num_of_months") + " month";
	} else  if ((objURL.searchParams.has("start_date")) && (objURL.searchParams.has("end_date"))){
		let sStart = objURL.searchParams.get("start_date");
		sStart = sStart.slice(-2,8) + '.' + sStart.slice(-4,-2) + '.' + sStart.slice(0,4);
		
		let sEnd = objURL.searchParams.get("end_date");
		sEnd = sEnd.slice(-2,8) + '.' + sEnd.slice(-4,-2) + '.' + sEnd.slice(0,4);		
		
		sPeriod = sStart + " - " + sEnd;
	}	
	$id('idConfPeriod').innerHTML = '<a href="' + sURL + '">' + sPeriod + '</a>';	
	$id('idConfPeriod').parentElement.setAttribute('title', sPeriod);

	let sProperty = 'not set';
	if (objURL.searchParams.has("resource_id")){
		sProperty = objURL.searchParams.get("resource_id");
	}
	$id('idConfProperty').innerHTML = '<a href="' + sURL + '">' + sProperty + '</a>';
	$id('idConfProperty').parentElement.setAttribute('title', sProperty);		
}


function FillMainTable(sFilter){
	let tableKeywords =  $id('idTableKeywordsBody');		
	
	tableKeywords.innerHTML = "";
	
	for (let k = 0; k < objKeywordsResults.length; k++){	
	
		if ((sFilter != '') && (!objKeywordsResults[k].keywords.includes(sFilter))){
			continue;
		}
	
		//iReportedClicks = iReportedClicks + objKeywordsResults[k].clicks; 
		iReportedImpressions = iReportedImpressions + objKeywordsResults[k].impressions; 

		if (objKeywordsResults[k].clicks > 0){
			iReportedQueries1plus = iReportedQueries1plus + 1;
		}		
	
		let newrow = tableKeywords.insertRow();	
			let celNumber = newrow.insertCell();
			celNumber.innerHTML = (k + 1);		
			
			let objAURL = new URL(priorURL);
			objAURL.searchParams.set('query', '!' + objKeywordsResults[k].keywords);
			objAURL.searchParams.set('breakdown', 'page');
			
			objAURL.searchParams.delete("page");
			
			let sLink = objAURL.href.replaceAll("query=%21", "query=!");
			let sLinkQuery = ' https://www.google.com/search?q=' + encodeURIComponent(objKeywordsResults[k].keywords);		
			
			let keywordsCel = newrow.insertCell();
			//keywordsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].keywords + '</a>';		
			//keywordsCel.innerHTML = '<a href="' + sLink + '"></a>';
			keywordsCel.innerHTML = '<a href="' + sLinkQuery + '"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = objKeywordsResults[k].keywords;			
			//keywordsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');	
			keywordsCel.setAttribute('title', 'Search for "'+ objKeywordsResults[k].keywords + '" on Google');	

			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].clicks.toLocaleString() + '</a>';
			clicksCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].impressions.toLocaleString() + '</a>';
			impressionsCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let ctrCel = newrow.insertCell();		
			ctrCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].ctr.toLocaleString() + '%' + '</a>';				
			ctrCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');
			
			let positionCel = newrow.insertCell();
			positionCel.innerHTML = '<a href="' + sLink + '">' + objKeywordsResults[k].position.toLocaleString() + '</a>';	
			positionCel.setAttribute('title', 'Analyze the query "'+ objKeywordsResults[k].keywords + '" in GSC');

			let wordCountCel = newrow.insertCell();
			wordCountCel.innerHTML = countWords(objKeywordsResults[k].keywords);

			let roundedPositiontCel = newrow.insertCell();
			roundedPositiontCel.innerHTML = Math.round(objKeywordsResults[k].position);	

			let serpPageCel = newrow.insertCell();
			serpPageCel.innerHTML = (Math.floor((Math.round(objKeywordsResults[k].position) - 1)/10)) + 1;	

			let roundedImpressionsCel = newrow.insertCell();
			if (objKeywordsResults[k].impressions > 5){
				roundedImpressionsCel.innerHTML = (Math.round(objKeywordsResults[k].impressions/10))*10;
			} else {
				roundedImpressionsCel.innerHTML = objKeywordsResults[k].impressions;
			}
					
			let trafficShareCel = newrow.insertCell();
			trafficShareCel.className = "chart";
			trafficShareCel.innerHTML =  ((objKeywordsResults[k].clicks/iTotalClicks) * 100).toFixed(2) + '%';	
			trafficShareCel.setAttribute('title', 'Percentage of Clicks Attributed to This Query (Calculated as [Keyword Clicks] / [Total Clicks reported by GSC]).');
			
			let accumulatedTrafficShareCel = newrow.insertCell();
			accumulatedTrafficShareCel.className = "chart";
			accumulatedTrafficShareCel.innerHTML =	objKeywordsResults[k].accumulatedTrafficShare.toFixed(2) + '%';	
			accumulatedTrafficShareCel.setAttribute('title', 'Cumulative Traffic Share Percentage of All Keywords So Far."');
			
			if (bHighlightTrafficShare){
				let iCurrValueClicks = Math.round(objKeywordsResults[k].clicks/iMaxClicksValue *100);	
				trafficShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';	
				let iCurrAccumulatedTrafficShare = Math.round(objKeywordsResults[k].accumulatedTrafficShare/accumulatedTrafficShareTotal *100);	
				accumulatedTrafficShareCel.style='background-size: ' + iCurrAccumulatedTrafficShare +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';				
			}			
	}	
}


async function ProcessResults(resultsObj) {
	
	let objItems = await chrome.storage.local.get(["HighlightTrafficShare", "colorClicksShare", "colorImpressionsShare"]); 	
	
	if (objItems.HighlightTrafficShare == 'yes'){
		bHighlightTrafficShare = true;
	} else {
		bHighlightTrafficShare = false;
	}
	
	if (objItems.colorClicksShare){
		colorClicksShare = objItems.colorClicksShare;		
	}	
	
	if (objItems.colorImpressionsShare){
		colorImpressionsShare = objItems.colorImpressionsShare;		
	}		

	colorClicksShareEnd	= GerGradientEnd(colorClicksShare);
	colorImpressionsShareEnd = GerGradientEnd(colorImpressionsShare);	
	
	objKeywordsResults = [...resultsObj.arrResultsKeywords];
	priorURL = resultsObj.priorURL;
	
	FillOptionsTable(priorURL);
	
	iTotalClicks = resultsObj.TotalClicks;
	iTotalImpressions = resultsObj.TotalImpressions;	
	
	objKeywordsResults.sort(function(a,b){
		return b.clicks - a.clicks
	})

	for (let k = 0; k < objKeywordsResults.length; k++){
		iReportedClicks = iReportedClicks + objKeywordsResults[k].clicks;
		accumulatedTrafficShareTotal = accumulatedTrafficShareTotal + (objKeywordsResults[k].clicks/iTotalClicks * 100);	

		if (objKeywordsResults[k].clicks > iMaxClicksValue){
			iMaxClicksValue = objKeywordsResults[k].clicks;
		}
		
		objKeywordsResults[k].accumulatedTrafficShare = accumulatedTrafficShareTotal;

		objKeywordsResults[k].arrWords = objKeywordsResults[k].keywords.trim().split(/\s+/);

		if (objKeywordsResults[k].arrWords.length > 1){

			for (j=objKeywordsResults[k].arrWords.length - 1; j >= 0; j--){
				if ((objKeywordsResults[k].arrWords[j].length == 1) && (RegExp("\\W").test(objKeywordsResults[k].arrWords[j]))){				
					objKeywordsResults[k].arrWords.splice(j, 1);						
				}
			}

		}		
	}
	
	FillMainTable('');	
	
	$id('idClicksCverage').innerHTML = (iReportedClicks/iTotalClicks * 100).toFixed(2) + '%';		
	$id('idTotalClicks').innerHTML = iTotalClicks.toLocaleString();	
	$id('idReportedClicks').innerHTML = iReportedClicks.toLocaleString();	
	$id('idReportedQueries').innerHTML = objKeywordsResults.length.toLocaleString();	
	$id('idLastQueryStats').innerHTML = objKeywordsResults[objKeywordsResults.length - 1].clicks.toLocaleString();
	$id('idReportedQueries1plus').innerHTML = iReportedQueries1plus.toLocaleString();	
	$id('idTotalImpressions').innerHTML = iTotalImpressions.toLocaleString();
	$id('idReportedImpressions').innerHTML = iReportedImpressions.toLocaleString();	
	
	
	let table1Word =  $id('idTable1WordBody');	
	let table2Words =  $id('idTable2WordsBody');	
	let table3Words =  $id('idTable3WordsBody');		

	let iMaxClicksValue1word = 0;
	let iMaxImpressionsValue1word = 0;
	
	let iMaxClicksValue2words = 0;
	let iMaxImpressionsValue2words = 0;	
	
	let iMaxClicksValue3words = 0;
	let iMaxImpressionsValue3words = 0;		
	
	for (let k = 0; k < objKeywordsResults.length; k++){
			
		for (let i = 0; i < objKeywordsResults[k].arrWords.length; i++){
			let bWordFound = false;
				
			for (let m = 0; m < arr1Words.length; m++){				
				if (arr1Words[m].keyword == objKeywordsResults[k].arrWords[i]){
					bWordFound = true;
					break;
				}
			}
					
			if (!bWordFound){
				let obj1Word = {};
				obj1Word.keyword = objKeywordsResults[k].arrWords[i];
				obj1Word.iInQueries = 0;
				obj1Word.iTotalClicks = 0;
				obj1Word.iTotalImpressions = 0;
				
				for (let j = k; j < objKeywordsResults.length; j++){
					for (let o = 0; o < objKeywordsResults[k].arrWords.length; o++){
						if (obj1Word.keyword == objKeywordsResults[j].arrWords[o]){
							obj1Word.iInQueries = obj1Word.iInQueries + 1;
							obj1Word.iTotalClicks = obj1Word.iTotalClicks + objKeywordsResults[j].clicks;
							obj1Word.iTotalImpressions = obj1Word.iTotalImpressions + objKeywordsResults[j].impressions;
							break;
						}
					}
				}
				
				if (obj1Word.iTotalClicks > iMaxClicksValue1word){
					iMaxClicksValue1word = obj1Word.iTotalClicks;
				}
				
				if (obj1Word.iTotalImpressions > iMaxImpressionsValue1word){
					iMaxImpressionsValue1word = obj1Word.iTotalImpressions;
				}				
								
				arr1Words.push(obj1Word);				
			}			
		}	


		if (objKeywordsResults[k].arrWords.length > 1){
			for (let p = 0; p < objKeywordsResults[k].arrWords.length - 1; p++){
								
				let sTwoWords = objKeywordsResults[k].arrWords[p] + " " + objKeywordsResults[k].arrWords[p + 1];
				let bTwoWordFound = false;	
					
				for (let m = 0; m < arr2Words.length; m++){
					if (arr2Words[m].twoKeywords == sTwoWords){
						bTwoWordFound = true;
						break;
					}
				}
			
				if (!bTwoWordFound){
					let obj2Word = {};
					obj2Word.twoKeywords = sTwoWords;
					obj2Word.iInQueries = 0;
					obj2Word.iTotalClicks = 0;
					obj2Word.iTotalImpressions = 0;	

					for (let j = k; j < objKeywordsResults.length; j++){						
						//if ((objKeywordsResults[k].arrWords.length > 1) && (findWord(sTwoWords, objKeywordsResults[j].keywords))) {
						//if ((objKeywordsResults[k].arrWords.length > 1) && (findWord(sTwoWords, objKeywordsResults[j].arrWords.join(" ")))) {	
						if ((objKeywordsResults[k].arrWords.length > 1) && (findWord(sTwoWords, objKeywordsResults[j].arrWords))) {
							obj2Word.iInQueries = obj2Word.iInQueries + 1;
							obj2Word.iTotalClicks = obj2Word.iTotalClicks + objKeywordsResults[j].clicks;
							obj2Word.iTotalImpressions = obj2Word.iTotalImpressions + objKeywordsResults[j].impressions;
						}
					}
					
					if (obj2Word.iTotalClicks  > iMaxClicksValue2words){
						iMaxClicksValue2words = obj2Word.iTotalClicks;
					}
				
					if (obj2Word.iTotalImpressions > iMaxImpressionsValue2words){
						iMaxImpressionsValue2words = obj2Word.iTotalImpressions;
					}						

					arr2Words.push(obj2Word);	
				}
			}
		}
		
		if (objKeywordsResults[k].arrWords.length > 2){
			for (let p = 0; p < objKeywordsResults[k].arrWords.length - 2; p++){
								
				let sThreeWords = objKeywordsResults[k].arrWords[p] + " " + objKeywordsResults[k].arrWords[p + 1] + " " + objKeywordsResults[k].arrWords[p + 2];
				let bThreeWordFound = false;	
					
				for (let m = 0; m < arr3Words.length; m++){
					if (arr3Words[m].threeKeywords == sThreeWords){
						bThreeWordFound = true;
						break;
					}
				}
			
				if (!bThreeWordFound){
					let obj3Word = {};
					obj3Word.threeKeywords = sThreeWords;
					obj3Word.iInQueries = 0;
					obj3Word.iTotalClicks = 0;
					obj3Word.iTotalImpressions = 0;	

					for (let j = k; j < objKeywordsResults.length; j++){							
						if ((objKeywordsResults[k].arrWords.length > 1) && (findWord(sThreeWords, objKeywordsResults[j].arrWords))) {
							obj3Word.iInQueries = obj3Word.iInQueries + 1;
							obj3Word.iTotalClicks = obj3Word.iTotalClicks + objKeywordsResults[j].clicks;
							obj3Word.iTotalImpressions = obj3Word.iTotalImpressions + objKeywordsResults[j].impressions;
						}
					}
					
					if (obj3Word.iTotalClicks  > iMaxClicksValue3words){
						iMaxClicksValue3words = obj3Word.iTotalClicks;
					}
				
					if (obj3Word.iTotalImpressions > iMaxImpressionsValue3words){
						iMaxImpressionsValue3words = obj3Word.iTotalImpressions;
					}						

					arr3Words.push(obj3Word);	
				}
			}
		}		
	}
	
	arr1Words.sort(function(a,b){
		return b.iTotalClicks - a.iTotalClicks;
	})
	
	arr2Words.sort(function(a,b){
		return b.iTotalClicks - a.iTotalClicks;
	})
	
	arr3Words.sort(function(a,b){
		return b.iTotalClicks - a.iTotalClicks;
	})	
		
	let objGramURL = new URL(priorURL);
	objGramURL.searchParams.set('metrics', 'CLICKS,IMPRESSIONS,CTR,POSITION');
	
	for (let n = 0; n < arr1Words.length; n++){
		
		objGramURL.searchParams.set('query', '~\\b(?:' + arr1Words[n].keyword + ')\\b');  //   \b(?:blumen)\b
		let s1GramLink = objGramURL.href.replaceAll("query=%7E", "query=~");
		
		let newrow = table1Word.insertRow();
			let celNumber = newrow.insertCell();
			celNumber.className = "rownumber";
			celNumber.innerHTML = (n + 1);				
		
			let keywordsCel = newrow.insertCell();
			
			keywordsCel.innerHTML = '<a href="' + s1GramLink + '" title="See all Search Queries with the n-gram in GSC"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = arr1Words[n].keyword;					
			
			let inqueriesCel = newrow.insertCell();	
			inqueriesCel.innerHTML = arr1Words[n].iInQueries;
			
			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = arr1Words[n].iTotalClicks.toLocaleString();
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = arr1Words[n].iTotalImpressions.toLocaleString();	
			
			let ctrCel = newrow.insertCell();
			ctrCel.innerHTML = ((arr1Words[n].iTotalClicks/arr1Words[n].iTotalImpressions)*100).toFixed(2) + '%';	

			let filterCel = newrow.insertCell();
			filterCel.innerHTML = '<a href="" title="Filter \'By Query\' for this n-gram">show queries with this n-gram</a>';	
			let aLinkFilter = filterCel.querySelector('a');
			aLinkFilter.onclick = filter1GramClick;
			aLinkFilter.setAttribute('keyword', arr1Words[n].keyword);

			let clicksShareCel = newrow.insertCell();
			clicksShareCel.className = "chart";
			
			let impressionsShareCel = newrow.insertCell();
			impressionsShareCel.className = "chart";
			
			clicksShareCel.innerHTML = ((arr1Words[n].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%';	
			impressionsShareCel.innerHTML = ((arr1Words[n].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%';	

			if (bHighlightTrafficShare){
				
				let iCurrValueClicks = Math.round(arr1Words[n].iTotalClicks/iMaxClicksValue1word *100);

				let iCurrValueImpressions = Math.round(arr1Words[n].iTotalImpressions/iMaxImpressionsValue1word *100);			
			
				clicksShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';
				impressionsShareCel.style='background-size: ' + iCurrValueImpressions +  '% 100%; background-image: linear-gradient(to right, ' + colorImpressionsShare + ', ' + colorImpressionsShareEnd + ');';			
			}
			
		
	}	

	for (let n = 0; n < arr2Words.length; n++){
		
		objGramURL.searchParams.set('query', '~\\b(?:' + arr2Words[n].twoKeywords + ')\\b');
		let s2GramLink = objGramURL.href.replaceAll("query=%7E", "query=~");		
		
		let newrow = table2Words.insertRow();
			let celNumber = newrow.insertCell();
			celNumber.className = "rownumber";
			celNumber.innerHTML = (n + 1);		
		
			let keywordsCel = newrow.insertCell();
			//keywordsCel.innerHTML = arr2Words[n].twoKeywords;	
			//keywordsCel.innerHTML = '<a href="' + s2GramLink + '">' + arr2Words[n].twoKeywords + '</a>';
			
			keywordsCel.innerHTML = '<a href="' + s2GramLink + '" title="See all Search Queries with the n-gram in GSC"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = arr2Words[n].twoKeywords;				
			
			let inqueriesCel = newrow.insertCell();	
			inqueriesCel.innerHTML = arr2Words[n].iInQueries;
			
			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = arr2Words[n].iTotalClicks.toLocaleString();
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = arr2Words[n].iTotalImpressions.toLocaleString();	
			
			let ctrCel = newrow.insertCell();
			ctrCel.innerHTML = ((arr2Words[n].iTotalClicks/arr2Words[n].iTotalImpressions)*100).toFixed(2) + '%';		

			let filterCel = newrow.insertCell();
			filterCel.innerHTML = '<a href="" title="Filter \'By Query\' for this n-gram">show queries with this n-gram</a>';	
			let aLinkFilter = filterCel.querySelector('a');
			aLinkFilter.onclick = filter2GramClick;
			aLinkFilter.setAttribute('keyword', arr2Words[n].twoKeywords);			

			let clicksShareCel = newrow.insertCell();
			clicksShareCel.className = "chart";
			
			let impressionsShareCel = newrow.insertCell();
			impressionsShareCel.className = "chart";
			
			clicksShareCel.innerHTML = ((arr2Words[n].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%';	
			impressionsShareCel.innerHTML = ((arr2Words[n].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%';

			if (bHighlightTrafficShare){						
				let iCurrValueClicks = Math.round(arr2Words[n].iTotalClicks/iMaxClicksValue2words *100);	
				let iCurrValueImpressions = Math.round(arr2Words[n].iTotalImpressions/iMaxImpressionsValue2words *100);	
			
				clicksShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';	
				impressionsShareCel.style='background-size: ' + iCurrValueImpressions +  '% 100%; background-image: linear-gradient(to right, ' + colorImpressionsShare + ', ' + colorImpressionsShareEnd + ');';	
			}			
		
	}	
	
	for (let n = 0; n < arr3Words.length; n++){
		
		objGramURL.searchParams.set('query', '~\\b(?:' + arr3Words[n].threeKeywords + ')\\b');
		let s3GramLink = objGramURL.href.replaceAll("query=%7E", "query=~");		
		
		let newrow = table3Words.insertRow();
			let celNumber = newrow.insertCell();
			celNumber.className = "rownumber";
			celNumber.innerHTML = (n + 1);		
		
			let keywordsCel = newrow.insertCell();
			
			keywordsCel.innerHTML = '<a href="' + s3GramLink + '" title="See all Search Queries with the n-gram in GSC"></a>';
			let aLink = keywordsCel.querySelector('a');
			aLink.textContent = arr3Words[n].threeKeywords;				
			
			let inqueriesCel = newrow.insertCell();	
			inqueriesCel.innerHTML = arr3Words[n].iInQueries;
			
			let clicksCel = newrow.insertCell();			
			clicksCel.innerHTML = arr3Words[n].iTotalClicks.toLocaleString();
			
			let impressionsCel = newrow.insertCell();
			impressionsCel.innerHTML = arr3Words[n].iTotalImpressions.toLocaleString();	
			
			let ctrCel = newrow.insertCell();
			ctrCel.innerHTML = ((arr3Words[n].iTotalClicks/arr3Words[n].iTotalImpressions)*100).toFixed(2) + '%';		

			let filterCel = newrow.insertCell();
			filterCel.innerHTML = '<a href="" title="Filter \'By Query\' for this n-gram">show queries with this n-gram</a>';	
			let aLinkFilter = filterCel.querySelector('a');
			aLinkFilter.onclick = filter3GramClick;
			aLinkFilter.setAttribute('keyword', arr3Words[n].threeKeywords);			

			let clicksShareCel = newrow.insertCell();
			clicksShareCel.className = "chart";
			
			let impressionsShareCel = newrow.insertCell();
			impressionsShareCel.className = "chart";
			
			clicksShareCel.innerHTML = ((arr3Words[n].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%';	
			impressionsShareCel.innerHTML = ((arr3Words[n].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%';

			if (bHighlightTrafficShare){						
				let iCurrValueClicks = Math.round(arr3Words[n].iTotalClicks/iMaxClicksValue3words *100);	
				let iCurrValueImpressions = Math.round(arr3Words[n].iTotalImpressions/iMaxImpressionsValue3words *100);	
			
				clicksShareCel.style='background-size: ' + iCurrValueClicks +  '% 100%; background-image: linear-gradient(to right, ' + colorClicksShare + ', ' + colorClicksShareEnd + ');';	
				impressionsShareCel.style='background-size: ' + iCurrValueImpressions +  '% 100%; background-image: linear-gradient(to right, ' + colorImpressionsShare + ', ' + colorImpressionsShareEnd + ');';	
			}			
	}		
		
}


function SaveTableCSV(){
	let csvData = '"Row number","Top queries","Clicks","Impressions","CTR","Position","Word count","Rounded position","SERP page","Rounded impressions","Traffic Share","Accumulated Traffic Share"\r\n';
	 let collRows = $id('idTableKeywordsBody').querySelectorAll('tr');
	 for (let i=0; i < collRows.length; i++){
		 let collCells = collRows[i].querySelectorAll('td');
			for (let j=0; j < collCells.length; j++){
								
				switch (j) {
					case 1: 
						csvData = csvData + '" ' +collCells[j].textContent + '"';
						break;
								
					default:
						csvData = csvData + '" ' +collCells[j].textContent.replace(/[^\d\.\%]/g, "") + '"';
						break;						
				}				
				
				if (j < collCells.length - 1){
					csvData = csvData + ','; 
				}
			}
			csvData = csvData + "\r\n";	
	 }		
	 
	 SaveCSVFile(csvData);
}


function SaveCSV(){
	let accumulatedTrafficShare = 0;	
	let csvData = '"Row number","Top queries","Clicks","Impressions","CTR","Position","Word count","Rounded position","SERP page","Rounded impressions","Traffic Share","Accumulated Traffic Share","1-gram","2-gram"\r\n';
	
	 for (let i=0; i < objKeywordsResults.length; i++){	
		let iRoundedImpressions = 0;
	 
		if (objKeywordsResults[i].impressions > 5){
			iRoundedImpressions = (Math.round(objKeywordsResults[i].impressions/10))*10;
		} else {
			iRoundedImpressions = objKeywordsResults[i].impressions;
		}	 
		
		accumulatedTrafficShare = accumulatedTrafficShare + (objKeywordsResults[i].clicks/iTotalClicks * 100);	

		let s1GramText = objKeywordsResults[i].arrWords.join(';');
		
		let s2GramText = "";
		
		if (objKeywordsResults[i].arrWords.length > 1){
			for (let p = 0; p < objKeywordsResults[i].arrWords.length - 1; p++){				
				if 	(p > 0){
					s2GramText = s2GramText + ";";
				}			
				s2GramText = s2GramText + objKeywordsResults[i].arrWords[p] + " " + objKeywordsResults[i].arrWords[p + 1];	
			}
		}		
		 
		  csvData = csvData +  '"' + 
							(i + 1) + '","' + 	
							objKeywordsResults[i].keywords + '","' +  
							objKeywordsResults[i].clicks + '","' + 
							objKeywordsResults[i].impressions + '","' + 
							objKeywordsResults[i].ctr + '%' + '","' + 
							" " + objKeywordsResults[i].position + '","' +
							countWords(objKeywordsResults[i].keywords) + '","' + 
							Math.round(objKeywordsResults[i].position) + '","' + 
							((Math.floor((Math.round(objKeywordsResults[i].position) - 1)/10)) + 1) + '","' +
							iRoundedImpressions + '","' +
							" " + ((objKeywordsResults[i].clicks/iTotalClicks) * 100).toFixed(2) + '%' + '","' +
							" " + accumulatedTrafficShare.toFixed(2) + '%' + '","' +
							s1GramText + '","' +
							s2GramText + '"' +							
							"\r\n";	 							
	 }	
	 SaveCSVFile(csvData);
}	


function SaveCSV1Gram(){
	let csvData = '"Row number","1-gram","1-gram count","Clicks","Impressions","CTR","Clicks Share","Impressions Share"\r\n';	
	 for (let i=0; i < arr1Words.length; i++){
		  csvData = csvData +  '"' + 
							(i + 1) + '","' + 	
							arr1Words[i].keyword + '","' +
							arr1Words[i].iInQueries + '","' +
							arr1Words[i].iTotalClicks + '","' +
							arr1Words[i].iTotalImpressions + '","' +
							" " + ((arr1Words[i].iTotalClicks/arr1Words[i].iTotalImpressions)*100).toFixed(2) + '%' + '","' +
							" " + ((arr1Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + '","' +
							" " + ((arr1Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + '"' +
							"\r\n";								
	 }
	 SaveCSVFile(csvData);	
}


function SaveCSV2Gram(){
	let csvData = '"Row number","2-gram","2-gram count","Clicks","Impressions","CTR","Clicks Share","Impressions Share"\r\n';	
	 for (let i=0; i < arr2Words.length; i++){
		  csvData = csvData +  '"' + 
							(i + 1) + '","' + 	
							arr2Words[i].twoKeywords + '","' +
							arr2Words[i].iInQueries + '","' +
							arr2Words[i].iTotalClicks + '","' +
							arr2Words[i].iTotalImpressions + '","' +
							" " + ((arr2Words[i].iTotalClicks/arr2Words[i].iTotalImpressions)*100).toFixed(2) + '%' + '","' +
							" " + ((arr2Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + '","' +
							" " + ((arr2Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + '"' +
							"\r\n";								
	 }
	 SaveCSVFile(csvData);		
}


function SaveCSV3Gram(){
	let csvData = '"Row number","3-gram","3-gram count","Clicks","Impressions","CTR","Clicks Share","Impressions Share"\r\n';	
	 for (let i=0; i < arr3Words.length; i++){
		  csvData = csvData +  '"' + 
							(i + 1) + '","' + 	
							arr3Words[i].threeKeywords + '","' +
							arr3Words[i].iInQueries + '","' +
							arr3Words[i].iTotalClicks + '","' +
							arr3Words[i].iTotalImpressions + '","' +
							" " + ((arr3Words[i].iTotalClicks/arr3Words[i].iTotalImpressions)*100).toFixed(2) + '%' + '","' +
							" " + ((arr3Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + '","' +
							" " + ((arr3Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + '"' +
							"\r\n";								
	 }
	 SaveCSVFile(csvData);		
}


function SaveCSVFile(sCSVData){
	
	let currDate = new Date();
	let currDayOfMonth = ("0" + currDate.getDate()).slice(-2);
	let sMonth = ("0" + (currDate.getMonth() + 1)).slice(-2); //two digits month UTC (1-12)
	let dYear = currDate.getFullYear();

	let sResultsFileName = currDayOfMonth + sMonth + dYear +  "-gsc-helper-export-byQuery.csv";	
	
    let csvContent = "data:text/csv;charset=utf-8," + sCSVData;
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", sResultsFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);	
}


function CopyTableToClipboard(){
	 let sClipboardText = "Row number\tTop queries\tClicks\tImpressions\tCTR\tPosition\tWord count\tRounded position\tSERP page\tRounded impressions\tTraffic Share\tAccumulated Traffic Share\r\n";
	 let collRows = $id('idTableKeywordsBody').querySelectorAll('tr');
	 for (let i=0; i < collRows.length; i++){
		 let collCells = collRows[i].querySelectorAll('td');
			for (let j=0; j < collCells.length; j++){
				
				switch (j) {
					case 1: 
						sClipboardText = sClipboardText + ' ' + collCells[j].textContent + "\t";
						break;
								
					default:
						sClipboardText = sClipboardText + ' ' + collCells[j].textContent.replace(/[^\d\.\%]/g, "") + "\t";
						break;						
				}
				
			}
			sClipboardText = sClipboardText + "\r\n";	
	 }	
	 copyToTheClipboard(sClipboardText);	 
}


function CopyToClipboard(){
	let accumulatedTrafficShare = 0;	
	let sClipboardText = "Row number\tTop queries\tClicks\tImpressions\tCTR\tPosition\tWord count\tRounded position\tSERP page\tRounded impressions\tTraffic Share\tAccumulated Traffic Share\t1-gram\t2-gram\r\n";
	
	 for (let i=0; i < objKeywordsResults.length; i++){	
		let iRoundedImpressions = 0;
	 
		if (objKeywordsResults[i].impressions > 5){
			iRoundedImpressions = (Math.round(objKeywordsResults[i].impressions/10))*10;
		} else {
			iRoundedImpressions = objKeywordsResults[i].impressions;
		}	 
		
		accumulatedTrafficShare = accumulatedTrafficShare + (objKeywordsResults[i].clicks/iTotalClicks * 100);	 
		
		let s1GramText = objKeywordsResults[i].arrWords.join(';');
		
		let s2GramText = "";
		
		if (objKeywordsResults[i].arrWords.length > 1){
			for (let p = 0; p < objKeywordsResults[i].arrWords.length - 1; p++){				
				if 	(p > 0){
					s2GramText = s2GramText + ";";
				}			
				s2GramText = s2GramText + objKeywordsResults[i].arrWords[p] + " " + objKeywordsResults[i].arrWords[p + 1];	
			}
		}				
		 
		  sClipboardText = sClipboardText + 
							(i + 1) + "\t" + 	
							objKeywordsResults[i].keywords + "\t" +  
							objKeywordsResults[i].clicks + "\t" + 
							objKeywordsResults[i].impressions + "\t" + 
							objKeywordsResults[i].ctr + '%' + "\t" + 
							" " + objKeywordsResults[i].position + "\t" +
							countWords(objKeywordsResults[i].keywords) + "\t" + 
							Math.round(objKeywordsResults[i].position) + "\t" + 
							((Math.floor((Math.round(objKeywordsResults[i].position) - 1)/10)) + 1) + "\t" +
							iRoundedImpressions + "\t" +
							" " + ((objKeywordsResults[i].clicks/iTotalClicks) * 100).toFixed(2) + '%' + "\t" +
							" " + accumulatedTrafficShare.toFixed(2) + '%' + "\t" +
							s1GramText + "\t" +
							s2GramText + "\t" +
							"\r\n";	 							
	 }
	 copyToTheClipboard(sClipboardText);	 
}	


function CopyToClipboard1Gram(){
	let sClipboardText = "Row number\t1-gram\t1-gram count\tClicks\tImpressions\tCTR\tClicks Share\tImpressions Share\r\n";	
	 for (let i=0; i < arr1Words.length; i++){
		  sClipboardText = sClipboardText + 
							(i + 1) + "\t" + 	
							arr1Words[i].keyword + "\t" +
							arr1Words[i].iInQueries + "\t" +
							arr1Words[i].iTotalClicks + "\t" +
							arr1Words[i].iTotalImpressions + "\t" +
							" " + ((arr1Words[i].iTotalClicks/arr1Words[i].iTotalImpressions)*100).toFixed(2) + '%' + "\t" +
							" " + ((arr1Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + "\t" +
							" " + ((arr1Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + "\t" +
							"\r\n";								
	 }
	 copyToTheClipboard(sClipboardText);	 
} 


function CopyToClipboard2Gram(){
	let sClipboardText = "Row number\t2-gram\t2-gram count\tClicks\tImpressions\tCTR\tClicks Share\tImpressions Share\r\n";	
	 for (let i=0; i < arr2Words.length; i++){
		  sClipboardText = sClipboardText + 
							(i + 1) + "\t" + 	
							arr2Words[i].twoKeywords + "\t" +
							arr2Words[i].iInQueries + "\t" +
							arr2Words[i].iTotalClicks + "\t" +
							arr2Words[i].iTotalImpressions + "\t" +
							" " + ((arr2Words[i].iTotalClicks/arr2Words[i].iTotalImpressions)*100).toFixed(2) + '%' + "\t" +
							" " + ((arr2Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + "\t" +
							" " + ((arr2Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + "\t" +
							"\r\n";								
	 }
	 copyToTheClipboard(sClipboardText);		
} 


function CopyToClipboard3Gram(){
	let sClipboardText = "Row number\t3-gram\t3-gram count\tClicks\tImpressions\tCTR\tClicks Share\tImpressions Share\r\n";	
	 for (let i=0; i < arr3Words.length; i++){
		  sClipboardText = sClipboardText + 
							(i + 1) + "\t" + 	
							arr3Words[i].threeKeywords + "\t" +
							arr3Words[i].iInQueries + "\t" +
							arr3Words[i].iTotalClicks + "\t" +
							arr3Words[i].iTotalImpressions + "\t" +
							" " + ((arr3Words[i].iTotalClicks/arr3Words[i].iTotalImpressions)*100).toFixed(2) + '%' + "\t" +
							" " + ((arr3Words[i].iTotalClicks/iReportedClicks) * 100).toFixed(2) + '%' + "\t" +
							" " + ((arr3Words[i].iTotalImpressions/iReportedImpressions) * 100).toFixed(2) + '%' + "\t" +
							"\r\n";								
	 }
	 copyToTheClipboard(sClipboardText);		
} 


function copyToTheClipboard(textToCopy){
    const el = document.createElement('textarea');
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    var result = document.execCommand('copy');
    document.body.removeChild(el);
    return result;	
}


function TabClick(){
	if ($id('tab-btn-0').checked){
		$id('idTab0').style.display = "block";
	} else {
		$id('idTab0').style.display = "none";
	}
	
	if ($id('tab-btn-1').checked){
		$id('idTab1').style.display = "block";
	} else {
		$id('idTab1').style.display = "none";
	}

	if ($id('tab-btn-2').checked){
		$id('idTab2').style.display = "block";
	} else {
		$id('idTab2').style.display = "none";
	}
	
	if ($id('tab-btn-3').checked){
		$id('idTab3').style.display = "block";
	} else {
		$id('idTab3').style.display = "none";
	}	
}
	

TabClick();

$id('tab-btn-0').onclick = TabClick;	
$id('tab-btn-1').onclick = TabClick;
$id('tab-btn-2').onclick = TabClick;	
$id('tab-btn-3').onclick = TabClick;

$id('idSaveCSV').onclick = SaveCSV;	
$id('idCopyToClipboard').onclick = CopyToClipboard;	

$id('idSaveCSV1Gram').onclick = SaveCSV1Gram;	
$id('idCopyToClipboard1Gram').onclick = CopyToClipboard1Gram;	

$id('idSaveCSV2Gram').onclick = SaveCSV2Gram;	
$id('idCopyToClipboard2Gram').onclick = CopyToClipboard2Gram;	

$id('idSaveCSV3Gram').onclick = SaveCSV3Gram;	
$id('idCopyToClipboard3Gram').onclick = CopyToClipboard3Gram;	

$id('idRemoveFilterNGram').onclick = RemoveFilterNGram;	
$id('idRemoveFilterKeyword').onclick = RemoveFilterKeyword;	

$id('idFilterButton').onclick = DoFilterKeyword;	

$id('idRemoveFilterKeyword').disabled = true;

chrome.runtime.sendMessage({msg: 'GSC_SHOW_KEYWORDS_RESULTS'}, ProcessResults);