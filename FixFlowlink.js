if (window.location.href.toLowerCase().includes("microserve")){
	
	if (window.location.href.includes("shiplink.microserve.ca") && document.getElementById("extensionAlert") == null){
		document.body.insertAdjacentHTML("afterbegin", `<div id="extensionAlert" style="
		    background-color: gold;
		    height: 8vh;
		"><span style="
		    display: table;
		    margin: auto;
		    font-size: medium;
		    padding-top: 2.5vh;
		">You are using an outdated version of the Flowlink extension. Please download the latest version <a href="https://chrome.google.com/webstore/detail/fixflowlink/ccikheenpoompkbpdpolaobjgflgejhc" target="_blank">from the Chrome Webstore</a></span></div>`);
	}
	
//------------SHIPLINK-----------------------------------------------------------------------------------------------------
	if (window.location.search.includes("?cmd=shiplink&action=Receive&id=")){
		if (document.body.style.backgroundColor != 'rgb(254, 254, 254)'){ 
			document.body.style.backgroundColor = 'rgb(254, 254, 254)';
			document.getElementById("mainLayout").insertAdjacentHTML("afterend", `<div id="OuterBulkSLWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);

			shiplinkRcvFunction = function(){
				slsTextBox = document.getElementById("SLPastingBox");
				boxesTextBox = document.getElementById("BoxNumberPastingBox");
				if (typeof slsTextBox === "undefined" || typeof boxesTextBox === "undefined"){
					alert("Something went wrong. Try again.");
				}
				else{
					tempBulkSLList = slsTextBox.value.replace(/^\n|\n$/g, '').split("\n");
					convertedSLsText = [];
					for (let i  = 0; i < tempBulkSLList.length; i++){
						tempBulkSLList[i] = tempBulkSLList[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
						if (tempBulkSLList[i].trim('') != ''){ convertedSLsText.push(tempBulkSLList[i].trim('')); }
					}
					tempBulkSLList = [];
					tempBulkSLList = boxesTextBox.value.replace(/^\n|\n$/g, '').split("\n");
					convertedBoxesText = [];
					for (let i  = 0; i < tempBulkSLList.length; i++){
						if (tempBulkSLList[i].trim('') != ''){ convertedBoxesText.push(tempBulkSLList[i].trim('')); }
					}
					if (convertedSLsText.length == convertedBoxesText.length){
						for (let i = 0; i < convertedSLsText.length; i++){
							window.open('https://shiplink.microserve.ca/Index.php?cmd=shiplink&action=Receive&confirm=true&id=' + convertedSLsText[i] + '&boxes=' + convertedBoxesText[i] + '&closereceive', '_blank').focus();
						}
						window.focus();
						doneBulkSLWindowHTML = `<span class="Title">Receive Bulk Shipments</span><button style="float:right" class="Title" onclick="closeBulkSLWindow()">X</button><br><br><br><span style="margin-left: 12%;">Done.</span>`;
						document.getElementById("ActualBulkSLWindow").innerHTML = doneBulkSLWindowHTML;
					}
					else{
						alert("Amount of Shiplinks does not match amount of numbers. Please check again.");
					}
				}
			};

			openBulkSLWindow = function (){
				backupBulkSLWindowHTML = `<div style="
				  height: 100vh;
				  width: 100vw;
				  position: absolute;
				  top: 0;
				  left: 0;
				  background-color: #0000002b;
				  "><div style="
				  height: 100vh;
				  width: 100vw;
				  position: absolute;
				  top: 0;
				  left: 0;
				  display: none;
				  " id="bulkSLControlsBlocker"></div>
					<div id="ActualBulkSLWindow" style="
					width: 75vw;
					height: 75vh;
					margin-top: 12vh;
					margin-left: 12vw;
					background-color: #ffffff;
					padding: 0.5vw;
					"><span class="Title">Receive Bulk Shipments</span><button style="float:right" class="Title" onclick="closeBulkSLWindow()">X</button><br><br><br><span style="margin-left: 12%;">Paste Shiplinks:</span><span style="float: right; margin-right: 40%;">Paste number of boxes:</span><br>
				<textarea style="width:30%;margin-left: 10%;" rows="30" id="SLPastingBox" class=""></textarea><textarea style="width:30%;float: right; margin-right: 25%;" rows="30" id="BoxNumberPastingBox" class=""></textarea><br><br><br><br><button style="float:right" id="shiplinkRcvButton" onclick="shiplinkRcvFunction()">Receive All</button></div></div>`;
				document.getElementById("OuterBulkSLWindowDiv").innerHTML = backupBulkSLWindowHTML;
				document.getElementById("OuterBulkSLWindowDiv").style.display = "block";
				window.scrollTo(0, 0);
				document.body.style.overflowX = "hidden";
				document.body.style.overflowY = "hidden";
			};

			closeBulkSLWindow = function(){
				document.getElementById("OuterBulkSLWindowDiv").innerHTML = '';
				document.getElementById("OuterBulkSLWindowDiv").style.display = "none";
				document.body.style.overflowX = "scroll";
				document.body.style.overflowY = "scroll";
			};

			document.getElementById("Confirm").innerHTML = '<a id="Confirmlink" href="/Index.php?cmd=shiplink&amp;action=Receive&amp;confirm=true&amp;id=' + document.getElementsByClassName("PropertyValue")[0].innerText + '&amp;boxes=' + document.getElementsByClassName("PropertyValue")[6].innerText + '">Confirm</a>';

			document.getElementsByClassName("SubMenu")[0].querySelectorAll("a")[0].insertAdjacentHTML("afterend", '&nbsp;<a href="javascript:void(0);" id="BulkSLReceive">Bulk</a>');
			document.getElementById("BulkSLReceive").addEventListener("click", openBulkSLWindow);
		}
	}
	
	if (window.location.search.includes("?cmd=shiplink&action=Receive&confirm=true&id=") && window.location.search.includes("&closereceive")){
	    window.close();
	}
	
	if (window.location.href.includes("shiplink.microserve.ca")){
		$(".copyright").each(function(){
		    if (!$(this).html().includes('gurbir')){
			$(this).html($(this).html() + ' || gurbird@sfu.ca');
		    }
		});
		$('img').each(function(){
		    if ($(this).attr("title") == ''){
			$(this)[0].setAttribute("title", "Gurbir Dhillon :)&#13;gurbird@sfu.ca");
			$(this)[0].outerHTML = $(this)[0].outerHTML.replace("amp;", "");
		    }
		});
	}
	
	if (window.location.search.includes("?cmd=shiplink&action=AddProducts&id=")){ //Bulk Add Products
		if (document.body.style.backgroundColor != 'rgb(254, 254, 254)'){ 
			document.body.style.backgroundColor = 'rgb(254, 254, 254)';
			document.getElementsByClassName("SubMenu")[0].querySelectorAll("a")[1].insertAdjacentHTML("afterend", '&nbsp;<a href="javascript:void(0);" id="BulkSLAdd">Bulk Products</a>');
			
			currentAddErrorList = [];
			currentAddAttemptCount = 0;
			productTypesValidFull = [
				'Desktop',
				'Laptop',
				'Network Printer',
				'Thin Client',
				'Tablet',
				'Scanner',
				'Monitor-Tracked',
				'Tracked Docking Station'
			];
			productTypesValidHalf = [
				'desktop',
				'laptop',
				'printer',
				'thin',
				'tablet',
				'scanner',
				'monitor',
				'dock'
			];
			
			openBulkSLAddWindow = function (){
				backupBulkSLAddWindowHTML = `<div style="
				  height: 100vh;
				  width: 100vw;
				  position: absolute;
				  top: 0;
				  left: 0;
				  background-color: #0000002b;
				  "><div style="
				  height: 100vh;
				  width: 100vw;
				  position: absolute;
				  top: 0;
				  left: 0;
				  display: none;
				  " id="addControlsBlocker"></div>
					<div id="ActualBulkSLAddWindow" style="
					width: 85vw;
					height: 75vh;
					margin-top: 12vh;
					margin-left: 7vw;
					background-color: #ffffff;
					padding: 0.5vw;
					"><span class="Title">Add Bulks Products</span><button style="float:right" class="Title" onclick="closeBulkSLAddWindow()">X</button><br><br><br><span style="margin-left: 7%;">Types:</span><span style="margin-left: 11%;">Makes:</span><span style="margin-left: 9%;">Models:</span><span style="margin-left: 9%;">Serials:</span><span style="margin-left: 9%;">Asset Tags:</span><span style="margin-left: 9%;">Workorders:</span><span style="margin-left: 9%;">Notes:</span><br>
				<textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforTypes" class=""></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforMakes" class=""></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforModels" class=""></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforSerials" class=""></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforAssetTags" placeholder="Write &quot;Blank&quot; for none" class=""></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforWorkorders" placeholder="Write &quot;Blank&quot; for none"></textarea><textarea style="width:13%;margin-left: 0.5%;" rows="30" id="boxforNotes" placeholder="Write &quot;Blank&quot; for none"></textarea><br><button style="float:right" id="addProductsButton" onclick="addProductsButtonFunction()">Add All Products</button></div></div>`;
				document.getElementById("OuterBulkSLAddWindowDiv").innerHTML = backupBulkSLAddWindowHTML;
				document.getElementById('OuterBulkSLAddWindowDiv').style.setProperty("top", '0px');
				document.getElementById("OuterBulkSLAddWindowDiv").style.display = "block";
				window.scrollTo(0, 0);
				document.body.style.overflowX = "hidden";
				document.body.style.overflowY = "hidden";
			};
			
			closeBulkSLAddWindow = function (){
				document.getElementById("OuterBulkSLAddWindowDiv").innerHTML = '';
				document.getElementById("OuterBulkSLAddWindowDiv").style.display = "none";
				document.body.style.overflowX = "scroll";
				document.body.style.overflowY = "scroll";
			};
			
			addProductsButtonFunction = function (){
				currentAddErrorList = [];
				currentAddAttemptCount = 0;
				if (typeof document.getElementById("boxforTypes") === "undefined" || typeof document.getElementById("boxforMakes") === "undefined" || typeof document.getElementById("boxforModels") === "undefined" || typeof document.getElementById("boxforSerials") === "undefined" || typeof document.getElementById("boxforAssetTags") === "undefined" || typeof document.getElementById("boxforWorkorders") === "undefined"){
					alert("Something went wrong. Try again.");
					return;
				}
				addinglistTypes = [];
				addinglistMakes = [];
				addinglistModels = [];
				addinglistSerials = [];
				addinglistAssetTags = [];
				addinglistWorkorders = [];
				addinglistNotes = [];
				
				//Serials
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforSerials").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						addinglistSerials.push(tempAddingList[i].trim(''));
					}
				}
				//Types
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforTypes").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					currentTypeTest = '';
					if (addinglistTypes.length > addinglistSerials.length){
						alert("Amount of items do not match, please check again.");
						currentAddErrorList = [];
						return;
					}
					if (tempAddingList[i].trim('') != ''){
						if (addinglistSerials[addinglistTypes.length] == 'SKIPTHISSERIALOK'){
							addinglistTypes.push('SKIPTHISSERIALOK');
						}
						else{
							for (let j = 0; j < productTypesValidHalf.length; j++){
								if ( productTypesValidHalf[j].includes(tempAddingList[i].toLowerCase()) || tempAddingList[i].toLowerCase().includes(productTypesValidHalf[j]) ){
									currentTypeTest = productTypesValidFull[j];
								}
							}
							if (currentTypeTest == 'Monitor-Tracked' && tempAddingList[i].toUpperCase().includes('L')){
								currentTypeTest = 'Leased Monitor';
							}
							else if (currentTypeTest == 'Desktop' && tempAddingList[i].toUpperCase().includes('B')){
								currentTypeTest = 'Leased Desktop Bundle';
							}
							else if (currentTypeTest == 'Laptop' && tempAddingList[i].toUpperCase().includes('B')){
								currentTypeTest = 'Leased Laptop Bundle';
							}
							if (currentTypeTest == ''){
								currentAddErrorList.push(addinglistSerials[addinglistTypes.length]);
								addinglistTypes.push('SKIPTHISSERIALOK');
								addinglistSerials[addinglistTypes.length-1] = 'SKIPTHISSERIALOK';
							}
							else{
								addinglistTypes.push(currentTypeTest);
							}
						}
					currentTypeTest = '';
					}
				}
				if (addinglistTypes.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddAttemptCount = 0;
					currentAddErrorList = [];
					return;
				}
				//Makes
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforMakes").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						addinglistMakes.push(tempAddingList[i].trim(''));
					}
				}
				if (addinglistMakes.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
				//Models
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforModels").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						addinglistModels.push(tempAddingList[i].trim(''));
					}
				}
				if (addinglistModels.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
				//Asset Tags
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforAssetTags").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						if (tempAddingList[i].trim('').trim('"').toLowerCase().includes('blank')){
							addinglistAssetTags.push('');
						}
						else{
							addinglistAssetTags.push(tempAddingList[i].trim(''));
						}
					}
				}
				if (addinglistAssetTags.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
				//Workorders
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforWorkorders").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						if (tempAddingList[i].trim('').toLowerCase().includes('blank')){
							addinglistWorkorders.push('');
						}
						else{
							addinglistWorkorders.push(tempAddingList[i].trim(''));
						}
					}
				}
				if (document.getElementById("boxforWorkorders").value.replace(/\s/g, '').toLowerCase() == 'blank' || document.getElementById("boxforWorkorders").value.replace(/\s/g, '').toLowerCase() == '"blank"' || document.getElementById("boxforWorkorders").value.replace(/\s/g, '').toLowerCase() == ''){
					addinglistWorkorders = [];
					for (let i = 0; i < addinglistSerials.length; i++){
						addinglistWorkorders.push('');
					}
				}
				if (addinglistWorkorders.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
				//Notes
				tempAddingList = [];
				tempAddingList = document.getElementById("boxforNotes").value.replace(/^\n|\n$/g, '').split("\n");
				for (let i = 0; i < tempAddingList.length; i++){
					if (tempAddingList[i].trim('') != ''){
						if (tempAddingList[i].trim('').toLowerCase() == 'blank'){
							addinglistNotes.push('');
						}
						else{
							addinglistNotes.push(tempAddingList[i].trim(''));
						}
					}
				}
				if (document.getElementById("boxforNotes").value.replace(/\s/g, '').toLowerCase() == 'blank' || document.getElementById("boxforNotes").value.replace(/\s/g, '').toLowerCase() == '"blank"' || document.getElementById("boxforNotes").value.replace(/\s/g, '').toLowerCase() == ''){
					addinglistNotes = [];
					for (let i = 0; i < addinglistSerials.length; i++){
						addinglistNotes.push('');
					}
				}
				if (addinglistNotes.length != addinglistSerials.length){
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
				
				//All 7 lists have been made and verified
				if ( addinglistTypes.length == addinglistMakes.length && addinglistMakes.length == addinglistModels.length && addinglistModels.length == addinglistSerials.length && addinglistSerials.length == addinglistAssetTags.length && addinglistAssetTags.length == addinglistWorkorders.length && addinglistWorkorders.length == addinglistNotes.length){
					for (let i = 0; i < addinglistSerials.length; i++){
						if (currentAddErrorList.indexOf(addinglistSerials[i]) == -1 && addinglistTypes[i] != 'SKIPTHISSERIALOK' && addinglistSerials[i] != 'SKIPTHISSERIALOK'){
							myAddProductsFunction([addinglistTypes[i],addinglistMakes[i],addinglistModels[i],addinglistSerials[i],addinglistAssetTags[i],addinglistWorkorders[i],addinglistNotes[i]]);
						}
						else{
							currentAddAttemptCount++;
						}
					}
					document.getElementById("addControlsBlocker").style.display = "block";
					document.getElementById("addProductsButton").innerText = "Please wait...";
					document.body.style.cursor='progress';
					setTimeout(function () {
						waitForAddingP(addinglistTypes.length);
					}, addinglistTypes.length * 500);
				}
				else{
					alert("Amount of items do not match, please check again.");
					currentAddErrorList = [];
					currentAddAttemptCount = 0;
					return;
				}
			};
			
			waitForAddingP = function (listLength){
				if (currentAddAttemptCount >= listLength){
					document.getElementById("addControlsBlocker").style.display = "none";
					document.body.style.cursor='auto';
					showAddedPResults();
				}
				else{
					setTimeout(function () {
						waitForAddingP(listLength);
					}, 2000);
				}
			};
			
			showAddedPResults = function (){
				doneAddingWindowHTML = `<span class="Title">Add Bulk Products</span><button style="float:right" class="Title" onclick="closeBulkSLAddWindow()">X</button><br><br><br><textarea readonly="" style="width:50%;margin-left: 12%;" rows="30" id="erroredAddingSerials" class=""></textarea>`;
				document.getElementById("ActualBulkSLAddWindow").innerHTML = doneAddingWindowHTML;
				document.getElementById("erroredAddingSerials").value = "Done.\n\nThese serial numbers may not have been added. Please check manually:\n\n";
				if (currentAddErrorList.length == 0){
					document.getElementById("erroredAddingSerials").value = "Done.";
				}
				for (let i = 0; i < currentAddErrorList.length; i++){
					document.getElementById("erroredAddingSerials").value = document.getElementById("erroredAddingSerials").value + currentAddErrorList[i] + '\n';
				}
				if (currentAddErrorList.length > 0){
					document.getElementById("erroredAddingSerials").value = document.getElementById("erroredAddingSerials").value + '\nPlease note that you cannot bulk add Hard Drives, Boxes, Peripherals, or Others.';
				}
				currentAddErrorList = [];
				currentAddAttemptCount = 0;
			};
			
			myAddProductsFunction = function(ItemDetailsList){
				if (Object.prototype.toString.call(ItemDetailsList) != '[object Array]'){
					return;
				}
				$.ajax({
					type: 'POST', 
					url: '/Shiplink/Ajax/AddProductToShiplink.php', 
					data: 'ShiplinkID=' + $('#ShiplinkID')[0].value + '&ProductType=' + ItemDetailsList[0] + '&Make=' + ItemDetailsList[1] + '&Model=' + ItemDetailsList[2] + '&Serial=' + ItemDetailsList[3] + '&ClientNum=' + ItemDetailsList[4] + '&Workorder=' + ItemDetailsList[5] + '&Notes=' + ItemDetailsList[6], 
					success: function(result)
					{
						// If there was no error, update the product table.
						if (result.indexOf('Error') == -1)
						{                              
							$.get('/Shiplink/Ajax/ShiplinkProductsTable.php', 'DeleteButton=true&ShiplinkID=' + $('#ShiplinkID')[0].value , function(data)
							{
								$('#ShiplinkProductsTable').html(data);
							});
							currentAddAttemptCount++;
						} else
						{
							currentAddErrorList.push(ItemDetailsList[3]);
							currentAddAttemptCount++;
						}
						
					}
				});
			};
			
			document.getElementById("mainLayout").insertAdjacentHTML("afterend", `<div id="OuterBulkSLAddWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);
			document.getElementById("BulkSLAdd").addEventListener("click", openBulkSLAddWindow);
		}
	}
	
//-------------------------------------------------------------------------------------------------------------------------

//------------FLOWLINK-----------------------------------------------------------------------------------------------------
	if (window.location.href.toLowerCase().includes("shiplink.microserve.ca/flowlink/")){ //Get city
		cityforFlowlink = '';
		colourforIncoming = 'rgb(254, 254, 254)';
		if (window.location.href.toLowerCase().includes("burnaby")){
			cityforFlowlink = 'Burnaby';
			colourforIncoming = 'rgb(212, 245, 255)';
		}
		else if (window.location.href.toLowerCase().includes("calgary")){
			cityforFlowlink = 'Calgary';
		}
		else if (window.location.href.toLowerCase().includes("victoria")){
			cityforFlowlink = 'Victoria';
		}
		else if (window.location.href.toLowerCase().includes("edmonton")){
			cityforFlowlink = 'Edmonton';
		}
		
	if (cityforFlowlink == ''){
		console.log("Couldn't get city");
	}
	else{

	if (window.location.search == "?Screen=Quarantine" && cityforFlowlink == 'Burnaby'){ //Quarantine page
	    if (document.body.style.backgroundColor != 'rgb(254, 254, 254)'){ 
		document.body.style.backgroundColor = 'rgb(254, 254, 254)';
		$('input[name="Edit"]').each(function()
		{
		    id = $(this).attr('binId');
		    $(this).before('<input type="button" value="New Tab" binid="' + id + '" name="NewTab">');
		});
		$('input[name="NewTab"]').click(function()
		{
		    id = $(this).attr('binId');
		    window.open('http://shiplink.microserve.ca/Flowlink/' + cityforFlowlink + '//Index.php?Screen=Bins&Action=Edit&id=' + id, '_blank').focus();
		});
	    }
	}
	
	if (window.location.search == "?Screen=Incoming"){ //Incoming page
	if (document.querySelectorAll("tbody").length == 0 && document.getElementById("MainContent").innerHTML.toLowerCase().includes("execution time")){ //Reload
		window.location.reload();
	}

	else{
	//Disable refreshing
	CallJSONMethod = function (screen, method, params, refresh, url){
		$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=' + screen + '&Action=' + method,
		params,
		function(data){
			  if (data.Result == 'OK')
			  {                      
				  $('#Dialog').html(data.Message);
				  $('#Dialog').dialog(
						'option', 
						'buttons', 
						{ 
							'OK': function()
							{
							   document.body.style.cursor='auto';
							   $('#Dialog').dialog('close');
							   if (typeof refresh !== 'undefined'){
								   if (Object.prototype.toString.call(refresh) == '[object Array]'){
									   if (refresh[1] == "unimport"){ //Change 'Remove' function
											deleteFromTable(refresh[0]);//.replace("unimportButton", ''));
										   //myTable.deleteRow(removeCellsList[refresh[0].replace("unimportButton", '')]);
									   }
								   }
							   }
							}
						}
				  );
				  $('#Dialog').dialog('open');
			  }
			  else if (data.Result == "Fail")
			  {
					  alert(data.Message);
			  }
			  else if (data.Result == 'FatalError')
			  {                  
				  DisplayError(data.Message, data.File, data.Line, data.Trace);
			  }             
		});
	};

	//Edit page
	if (document.body.style.backgroundColor != colourforIncoming){
		document.body.style.backgroundColor = colourforIncoming; //Init
		if (cityforFlowlink == 'Burnaby'){document.getElementById("import").outerHTML = document.getElementById("import").outerHTML;}
		document.getElementById("Main").insertAdjacentHTML("afterend", `<div id="OuterOptionsWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);
		myTable = document.querySelectorAll("tbody")[0];
		allShiplinksList = [];
		showHideButtons = false;
		window.scrollTo(0, document.body.scrollHeight);
		document.addEventListener('keydown', function(event){
			if(event.key === "Escape"){
				closeOptionsWindow();
			}
		});
		changeHeight = false;
		if (document.body.scrollHeight < window.innerHeight){
			changeHeight = true;
		}

		//FUNCTIONS
		deleteFromTable = function (shiplinkToRemove){
			// tempPos = document.body.scrollTop;
			tempList = [];
			if (shiplinkToRemove != ''){
				for (let i = 0; i < allShiplinksList.length; i++){
					if (allShiplinksList[i] == shiplinkToRemove){
						myTable.deleteRow(i);
					}
					else{
						tempList.push(allShiplinksList[i]);
					}
				}
				allShiplinksList = tempList;
			}
			tempList = [];
		};

		tryRemove = function (){
			slToRemove = document.getElementById("tryRmv").value;
			if (slToRemove == ''){return false;}
			else if (allShiplinksList.indexOf(slToRemove) == -1){
				// alert('Shiplink not listed');
				CallJSONMethod(
				'Incoming',
				'UnImportShiplink',
				{
				shiplinkId: slToRemove
				});
			}
			else{
				CallJSONMethod(
				'Incoming',
				'UnImportShiplink',
				{
				shiplinkId: slToRemove
				}, 
				[slToRemove, 'unimport']);
			}
		};

		bulkImport = function (){
			impTextBox = document.getElementById("blkImp");
			if (typeof impTextBox === "undefined"){
				alert("Something went wrong. Try again.");
			}
			else{
				tempImpSLList = impTextBox.value.replace(/^\n|\n$/g, '').split("\n");
				convertedImpText = [];
				for (let i  = 0; i < tempImpSLList.length; i++){
					tempImpSLList[i] = tempImpSLList[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
					if (tempImpSLList[i].trim('') != ''){ convertedImpText.push(tempImpSLList[i].trim('')); }
				}
				for (let i = 0; i < convertedImpText.length; i++){
					$.ajax({url: '/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php',
					data: 
					{
						Screen: 'Incoming',
						Action: 'ImportShiplink',
						shiplink: convertedImpText[i]
					},
					success: function(data)
					{
						var result = $.trim(data);
						if (result == "Done!"){
							var newRow = myTable.insertRow(-1);
							newRow.outerHTML = `<tr class="Highlight"><td class="Highlight" onclick="window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')">` + convertedImpText[i] + `</td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + convertedImpText[i] + `','_blank')"></td><td class="Highlight">` + `<a name="Hide" shiplinkid="` + convertedImpText[i] + `" href="#" style="display: none;" onclick="return false;">Hide</a>` + `</td></tr>`;
							window.scrollTo(0, document.body.scrollHeight);
							document.getElementById('OuterOptionsWindowDiv').style.setProperty("top", (document.body.scrollHeight - window.innerHeight) + 'px');
							allShiplinksList.push(convertedImpText[i]);
							$('a[name="Hide"]').click(function(){
								deleteFromTable($(this).attr('ShiplinkId'));
							});
							if (showHideButtons){
								allHides = document.getElementsByName("Hide");
								for (let j = 0; j < allHides.length; j++){
									allHides[j].style.display = 'Block';
								}
							}
						}
						else{
							alert(result);
						}
					}
				   });
				}
				document.getElementById("blkImp").value = '';
				window.scrollTo(0, document.body.scrollHeight);
			}
		};

		changeHides = function (){
			allHides = document.getElementsByName("Hide");
			allRemoves = document.getElementsByName("Remove");
			if (document.getElementById("showHide").checked == true){
				showHideButtons = true;
				for (let i = 0; i < allRemoves.length; i++){
					allRemoves[i].style.display = 'None';
				}
				for (let i = 0; i < allHides.length; i++){
					allHides[i].style.display = 'Block';
				}
			}
			else{
				showHideButtons = false;
				for (let i = 0; i < allHides.length; i++){
					allHides[i].style.display = 'None';
				}
				for (let i = 0; i < allRemoves.length; i++){
					allRemoves[i].style.display = 'Block';
				}
			}
		};

		openShiplinks = function (){
			openTextBox = document.getElementById("blkOpen");
			if (typeof openTextBox === "undefined"){
				alert("Something went wrong. Try again.");
			}
			else{
				tempOpenSLList = openTextBox.value.replace(/^\n|\n$/g, '').split("\n");
				convertedOpenText = [];
				for (let i  = 0; i < tempOpenSLList.length; i++){
					tempOpenSLList[i] = tempOpenSLList[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
					if (tempOpenSLList[i].trim('') != ''){ convertedOpenText.push(tempOpenSLList[i].trim('')); }
				}
				for (let i = 0; i < convertedOpenText.length; i++){
					window.open('http://shiplink.microserve.ca/Flowlink/' + cityforFlowlink + '//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=' + convertedOpenText[i], '_blank').focus();
				}
				document.getElementById("blkOpen").value = '';
				closeOptionsWindow();
			}
		};

		openOptionsWindow = function (){
			if (changeHeight){
				document.body.style.height = '100vh';
			}
			backupOptionsWindowHTML = `<div style="
			  height: 100vh;
			  width: 100vw;
			  position: absolute;
			  top: 0;
			  left: 0;
			  background-color: #0000002b;
			  "><div style="
			  height: 100vh;
			  width: 100vw;
			  position: absolute;
			  top: 0;
			  left: 0;
			  display: none;
			  " id="OptionsControlsBlocker"></div>
				<div id="ActualOptionsWindow" style="
				width: 75vw;
				height: 75vh;
				margin-top: 12vh;
				margin-left: 12vw;
				background-color: #ffffff;
				padding: 0.5vw;
				"><span class="Title">Advanced Options</span><button style="float:right" class="Title" onclick="closeOptionsWindow()">X</button><br><br><br><br><br><span style="margin-left: 12%;">Attempt Shiplink Remove:     <input type="text" id="tryRmv" name="tryRmv"><button style="" onclick="tryRemove()">Try</button></span><br>
				<br><br><span style="margin-left: 12%;">Bulk Import:     <textarea name="blkImp" id="blkImp" rows="10"></textarea><button onclick="bulkImport()">Go</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bulk Open:  <textarea name="blkOpen" id="blkOpen" rows="10"></textarea><button onclick="openShiplinks()">Open</button></span><br><br><br><br><span style="margin-left: 12%;"><label for="showHide">Show Hide buttons</label><input type="checkbox" id="showHide" name="Show Hide buttons" onclick="changeHides()"></span></div></div>`;
			document.getElementById("OuterOptionsWindowDiv").innerHTML = backupOptionsWindowHTML;
			document.getElementById("OuterOptionsWindowDiv").style.display = "block";
			document.getElementById('OuterOptionsWindowDiv').style.setProperty("top", (document.body.scrollHeight - window.innerHeight) + 'px');
			window.scrollTo(0, document.body.scrollHeight);
			document.body.style.overflowX = "hidden";
			document.body.style.overflowY = "hidden";
			if (showHideButtons){document.getElementById("showHide").checked = true;}
			else{document.getElementById("showHide").checked = false;}
		};

		closeOptionsWindow = function(){
			document.getElementById("OuterOptionsWindowDiv").innerHTML = '';
			document.getElementById("OuterOptionsWindowDiv").style.display = "none";
			document.body.style.overflowX = "scroll";
			document.body.style.overflowY = "scroll";
			if (changeHeight){
				window.scrollTo(0, 0);
			}
			else{
				window.scrollTo(0, document.body.scrollHeight);
			}
		};

		//Refresh table with new tab clicks
		for (let i = 0, row; row = myTable.rows[i]; i++){
			currValue = row.cells[0].innerHTML;
			if (row.querySelectorAll(".Highlight").length > 0){
				for (let j = 0; j < row.cells.length-1; j++){
					col = row.cells[j];
					col.outerHTML = `<td class="Highlight" onclick="window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + currValue + `','_blank')">` + col.innerHTML + `</td>`;
				}
				if (row.querySelectorAll("[name=Remove]").length > 0){
					row.cells[row.cells.length-1].innerHTML = `<a name="Hide" shiplinkid="` + currValue + `" href="#" style="display: none;" onclick="return false;">Hide</a>` + `<a name="Remove" shiplinkid="` + currValue + `" href="#" style="display: block;" onclick="return false;">Remove</a>`;
				}
				else{
					row.cells[row.cells.length-1].innerHTML = `<a name="Hide" shiplinkid="` + currValue + `" href="#" style="display: none;" onclick="return false;">Hide</a>`;
				}
			}
			else{
				row.cells[0].insertAdjacentHTML("beforeend", `<a name="Hide" shiplinkid="` + currValue + `" href="#" style="display: none; float: right;" onclick="return false;">Hide&nbsp;&nbsp;&nbsp;&nbsp;</a>`);
			}
			allShiplinksList.push(currValue);
		}

		//Add remove onclick
		$('a[name="Remove"]').click(function(){
			CallJSONMethod(
			'Incoming',
			'UnImportShiplink',
			{
			shiplinkId: $(this).attr('ShiplinkId')
			}, 
			[$(this).attr('ShiplinkId'), 'unimport']);
		});

		//Add hide onclick
		$('a[name="Hide"]').click(function(){
			deleteFromTable($(this).attr('ShiplinkId'));
		});

		//Add import onclick
		if (cityforFlowlink == 'Burnaby'){
		$('#import').click(function(){
			$.ajax({url: '/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php',
				data: 
				{
					Screen: 'Incoming',
					Action: 'ImportShiplink',
					shiplink: $('#ShiplinkID').val()
				},
				success: function(data)
				{
					var result = $.trim(data);
					if (result == "Done!"){
						alert('Done');
						var newRow = myTable.insertRow(-1);
						newRow.outerHTML = `<tr class="Highlight"><td class="Highlight" onclick="window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')">` + document.getElementById("ShiplinkID").value + `</td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight" onclick=" window.open('http://shiplink.microserve.ca/Flowlink/` + cityforFlowlink + `//Index.php?Screen=Incoming&Action=Shiplink&Project=TRP&id=` + document.getElementById("ShiplinkID").value + `','_blank')"></td><td class="Highlight">` + `<a name="Hide" shiplinkid="` + document.getElementById("ShiplinkID").value + `" href="#" style="display: none;" onclick="return false;">Hide</a>` + `</td></tr>`;
						allShiplinksList.push(document.getElementById("ShiplinkID").value);
						document.getElementById("ShiplinkID").value = '';
						window.scrollTo(0, document.body.scrollHeight);
						$('a[name="Hide"]').click(function(){
							deleteFromTable($(this).attr('ShiplinkId'));
						});
						if (showHideButtons){
							allHides = document.getElementsByName("Hide");
							for (let i = 0; i < allHides.length; i++){
								allHides[i].style.display = 'Block';
							}
						}
					}
					else{
						alert(result);
					}
				}
			});
		});}

		//Add advanced button
		document.getElementById("Logout").insertAdjacentHTML("beforebegin", '<input type="button" class="cssButton" value="Advanced" id="Advanced">');
		document.getElementById("Advanced").addEventListener("click", openOptionsWindow);
	}
	}
	}
	
	if (window.location.search.includes("?Screen=Incoming&Action=Shiplink&")){ //Receive page
	CallJSONMethod = function (screen, method, params, refresh, url){
		$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=' + screen + '&Action=' + method,
		params,
		function(data){
			  if (data.Result == 'OK')
			  {                      
				  $('#Dialog').html(data.Message);
				  $('#Dialog').dialog(
						'option', 
						'buttons', 
						{ 
							'OK': function()
							{
							   document.body.style.cursor='auto';
							   $('#Dialog').dialog('close');
							   if (typeof refresh !== 'undefined'){
								   if (Object.prototype.toString.call(refresh) == '[object Array]'){
									   if (refresh[1] == "purple"){
										   makePurple(refresh[0]);
									   }
									   else if (refresh[1] == "delete"){
											allItems[refresh[0]].style.display = "none";
											allSerials[refresh[0]] = "deletedThisSerial";
									   }
									   else if (refresh[1] == "refresh"){
											window.location.reload();
									   }
								   }
							   }
							   if (method == 'DeleteItem' || method == 'CreatePeripheral' || method == 'ConfirmShiplink'){
								   window.location.reload();
							   }
							}
						}
				  );
				  $('#Dialog').dialog('open');
			  }
			  else if (data.Result == "Fail")
			  {
					  alert(data.Message);
			  }
			  else if (data.Result == 'FatalError')
			  {                  
				  DisplayError(data.Message, data.File, data.Line, data.Trace);
			  }             
		});
	};
	CallJSONMethodNODIALOG = function (screen, method, params, refresh, url){
		$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=' + screen + '&Action=' + method,
			params,
			function(data){
			  if (data.Result == 'OK'){      			  
				if (typeof refresh !== 'undefined'){
				   if (Object.prototype.toString.call(refresh) == '[object Array]'){
					   if (refresh[1] == "purple"){
						   makePurple(refresh[0]);
						   currentRcvAttemptCount++;
					   }
					   else if (refresh[1] == "delete"){
							allItems[refresh[0]].style.display = "none";
							allSerials[refresh[0]] = "deletedThisSerial";
					   }
					   else if (refresh[1] == "refresh"){
							window.location.reload();
					   }
					   else if (refresh[1] == "createPurple"){
						   createPurpleSquare(refresh[0]);
						   currentAddAttemptCount++;
					   }
				   }
				}
			  }
			  else{
				if (typeof refresh !== 'undefined'){
				   if (Object.prototype.toString.call(refresh) == '[object Array]'){
					   if (refresh[1] == "createPurple"){
						   currentAddErrorList.push(refresh[0][3]);
						   currentAddAttemptCount++;
					   }
					   else if (refresh[1] == "purple"){
						   erroredList.push(allItems[refresh[0]].querySelectorAll("[name=OldSerial]")[0].value);
						   currentRcvAttemptCount++;
					   }
					   else if (deleting40A2srn && guessModel(refresh[0]) == "40A2"){
						   CallJSONMethodNODIALOG('Incoming','DeleteSl', {RelationId: RelationId}, [refresh[0], "delete"]);
					   }
				   }
				}
			  } 
			}
		);
	};
	checkNewSerial = function(type){
		if (type == 'Product')
		{
		    CallJSONMethod('Incoming','CreateNewItem', $('#AssetForm').serialize(),[0,"refresh"]);
		    return;
		}
		    $.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=Incoming&Action=CheckSerial',
			{
			    Serial: $('#AssetForm').find('input[name="Serial"]').val()                   
			},
			function(data)
			{
			   switch (data.Result)
			   {
			   case 'FatalError':

			       DisplayError(data.Message, data.File, data.Line, data.Trace);
			       return;
			   break;
			   case "Local Asset":

				 $('#Dialog') 
				    .html('This asset already exists and is in the warehouse.<br/>' + 
					  'It is located at: ' + data.Location)
				    .dialog('option','buttons',{'OK': function(){$('#Dialog').dialog('close');}})
				    .dialog('open');
			   break;
			   case "Found Asset":

				$('#Dialog')
				    .html(
					'<div style="font-size: larger; font-weight: bold">This asset already exists as:</div>' +
					'<div><span style="font-weight: bold; width: 10em;">Type:</span><span style="padding-left: 1em;" >' + data.Type + '</span></div>' +
					'Make:' + data.Make + '<br/>' +
					'Model:' + data.Model + '<br/>' +
					'Serial:' + data.Serial + '<br/>' +
					'Asset Tag:' + data.Tag + '<br/>' +
					'Is this the <b>exact same</b> asset?');

				    $('#Dialog').dialog('option','buttons', 
				    {
					'Yes': function()
					 {
					     $('#Dialog').dialog('close');
					     CallJSONMethod('Incoming','ProcessNewReturn',{ assetId: data.Id, shiplinkId: $('#ShiplinkId').val()},[0,"refresh"]);
					 },
					 'No': function() 
					 {
					     $('#Dialog').dialog('close');
					     return;
					 }
				    });

				    $('#Dialog').dialog('open');
			    break;
			    default:                    
				CallJSONMethod('Incoming','CreateNewItem', $('#AssetForm').serialize(),[0,"refresh"]);
			   }

		    }
	);};
	var callingBulkRN = false;
	var deleting40A2srn = false;
	
	allItems = document.getElementsByClassName("Item");
	allProperties = document.getElementsByClassName("ItemProperties");
	allTypes = [];
	for (let i = 0; i < allProperties.length; i++){
		allTypes[i] = allProperties[i].querySelectorAll(".Property")[0].querySelectorAll("div")[2].innerHTML;
	}
	for (let i = 0; i < document.getElementsByName("OldAssetTag").length; i++){
		if (document.getElementsByName("OldAssetTag")[i].innerText[0] == 'N' || document.getElementsByName("OldAssetTag")[i].innerText[0] == 'n'){
			document.getElementsByName("OldAssetTag")[i].innerText = "N/A";
		}
	}
	for (let i = 0; i < document.getElementsByName("OldType").length; i++){
		if (document.getElementsByName("OldType")[i].innerText == 'Tracked Docking Station'){
			document.getElementsByName("OldType")[i].innerText = "Docking Station";
		}
	}
	for (let i = 0; i < allItems.length; i++){
		if (allItems[i].querySelectorAll("[name=Type]").length > 0){
			if (allItems[i].querySelectorAll("[name=Type]")[0].value == 'Docking Station'){
                    		allItems[i].querySelectorAll("[class=Property]")[allItems[i].querySelectorAll("[class=Property]").length-1].outerHTML = '';
                	}
		}
	}
	document.getElementById("TypeFilter").outerHTML = document.getElementById("TypeFilter").outerHTML;
	typeFilter = document.getElementById("TypeFilter");
	typeFilter.value = "None";
	typeFilter.addEventListener("change",function(){
		if (typeFilter.value == 'None'){
			for (let i = 0; i < allItems.length; i++){
				if (allSerials[i] != "deletedThisSerial"){
					allItems[i].style.display = "block";
				}
			}
		}    
		else{
			for (let i = 0; i < allItems.length; i++){
				if (allTypes[i] == typeFilter.value){
					if (allSerials[i] != "deletedThisSerial"){
						allItems[i].style.display = "block";
					}
				}
				else{
					allItems[i].style.display = "none";
				}
			}
		}
	});
	
	if (document.body.style.backgroundColor != 'rgb(254, 254, 254)'){ 
	document.body.style.backgroundColor = 'rgb(254, 254, 254)';
	notReceived = document.querySelectorAll('.ItemProperties:not(.Confirmed):not(.Done)');
	allSerials = [];
	allControls = document.getElementsByClassName("ControlProperty");
	for (let i = 0; i < allControls.length; i++){
		if (allItems[i].querySelectorAll(".Property").length > 3){
			if (allItems[i].querySelectorAll('.ItemProperties:not(.Confirmed):not(.Done)').length == 0){
				allSerials[i] = allItems[i].querySelectorAll(".Property")[3].querySelectorAll("div")[2].innerHTML;
			}
			else{
				allSerials[i] = allItems[i].querySelectorAll("[name=OldSerial]")[0].innerHTML;
			}
		}
		else{
			allSerials[i] = "OTHER PRODUCT NO SERIAL";
		}
		allControls[i].insertAdjacentHTML('afterend', '<input type="hidden" value="' + i + '" name="myItemID">');
	}
	
	document.getElementById("Main").insertAdjacentHTML("afterend", `<div id="OuterListWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);
	openListWindow = function (){
		backupListWindowHTML = `<div style="
		  height: 100vh;
		  width: 100vw;
		  position: absolute;
		  top: 0;
		  left: 0;
		  background-color: #0000002b;
		  ">
			<div id="ActualListWindow" style="
			width: 75vw;
			height: 75vh;
			margin-top: 12vh;
			margin-left: 12vw;
			background-color: #ffffff;
			padding: 0.5vw;
			"><span class="Title">List Devices</span><button style="float:right" class="Title" onclick="closeListWindow()">X</button>
			<br><br>
		<fieldset style="
			float: left;
			width: 20%;
			display = inline-block;
			box-sizing: border-box;
			margin-left: 25%;
		">
			<legend>Device Type</legend>
			<input type="checkbox" id="checkDesktops" name="Desktop" checked>
		  <label for="checkDesktops">Desktops</label><br>
			<input type="checkbox" id="checkLaptops" name="Laptop" checked>
		  <label for="checkLaptops">Laptops</label><br>
			<input type="checkbox" id="checkMonitors" name="Monitor" checked>
		  <label for="checkMonitors">Monitors</label><br>
			<input type="checkbox" id="checkOthers" name="Other">
		  <label for="checkOthers">Other</label>
		</fieldset>
		<fieldset style="
			float: right;
			width: 20%;
			display = inline-block;
			box-sizing: border-box;
			margin-right: 25%;
		">
			<legend>Status</legend>
			<input type="checkbox" name="Unreceived" id="checkUnreceived" checked>
		  <label for="checkUnreceived">Unreceived</label><br>
			<input type="checkbox" id="checkUnconfirmed" name="Unconfirmed">
		  <label for="checkUnconfirmed">Unconfirmed</label><br>
			<input type="checkbox" id="checkDone" name="Done">
		  <label for="checkDone">Done</label>
		</fieldset><br><br><br><br><br><br><br><button onclick="listWindowShowList()">List Devices</button><br><br><br><br><br><br><br><br><br><br><a href="javascript:;" onclick="exportExcel();" style="
			margin-left: 10%;
		">Export as Excel</a>
		</div></div>`;
		document.getElementById("OuterListWindowDiv").innerHTML = backupListWindowHTML;
		document.getElementById("OuterListWindowDiv").style.display = "block";
		window.scrollTo(0, 0);
		document.body.style.overflowX = "hidden";
		document.body.style.overflowY = "hidden";
	};
	closeListWindow = function(){
		document.getElementById("OuterListWindowDiv").innerHTML = '';
		document.getElementById("OuterListWindowDiv").style.display = "none";
		document.body.style.overflowX = "scroll";
		document.body.style.overflowY = "scroll";
	};
	listWindowShowList = function(){
		HTMLlistWindow = `<div style="
		  height: 100vh;
		  width: 100vw;
		  position: absolute;
		  top: 0;
		  left: 0;
		  background-color: #0000002b;
		  ">
			<div id="ActualListWindow" style="
			width: 75vw;
			height: 75vh;
			margin-top: 12vh;
			margin-left: 12vw;
			background-color: #ffffff;
			padding: 0.5vw;
			"><span class="Title">List Devices</span><button style="float:right" class="Title" onclick="closeListWindow()">X</button><br><br><button onclick="openListWindow()">&lt; back</button><br><br><br><span style="
			margin-left: 20%;
		">List of Serials:</span><br><textarea readonly rows="30" id="listWindowSerialsBox" style="
			width: 20%;
			margin-left: 18%;
		"></textarea><br><button style="float: right" onclick="thanksAlert()">Thanks!</button>
		</div></div>`;
		checkedBoxes = [];
		listOfSerials = [];
		for (let i = 0; i < document.getElementById("ActualListWindow").querySelectorAll("input[type=checkbox]").length; i++){
			if (document.getElementById("ActualListWindow").querySelectorAll("input[type=checkbox]")[i].checked){
				checkedBoxes.push(document.getElementById("ActualListWindow").querySelectorAll("input[type=checkbox]")[i].name);
			}
		}
		if (checkedBoxes.includes("Desktop") || checkedBoxes.includes("Laptop") || checkedBoxes.includes("Monitor") || checkedBoxes.includes("Other")){
			if (checkedBoxes.includes("Unreceived") || checkedBoxes.includes("Unconfirmed") || checkedBoxes.includes("Done")){
				for (let i = 0; i < allItems.length; i++){
					if (checkedBoxes.includes(allTypes[i])){
						if (allSerials[i] != "deletedThisSerial"){
							if (allItems[i].querySelectorAll( '.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
								currentStatus = "Unreceived";
							}
							else if (allItems[i].querySelectorAll('.Confirmed').length > 0){
								currentStatus = "Done";
							}
							else{
								currentStatus = "Unconfirmed";
							}
							if (checkedBoxes.includes(currentStatus)){
								listOfSerials.push(allSerials[i]);
							}
						}
					}
					else if (allTypes[i] != "Desktop" && allTypes[i] != "Laptop" && allTypes[i] != "Monitor" && checkedBoxes.includes("Other")){
						if (allSerials[i] != "deletedThisSerial"){
							if (allItems[i].querySelectorAll( '.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
								currentStatus = "Unreceived";
							}
							else if (allItems[i].querySelectorAll('.Confirmed').length > 0){
								currentStatus = "Done";
							}
							else{
								currentStatus = "Unconfirmed";
							}
							if (checkedBoxes.includes(currentStatus)){
								listOfSerials.push(allSerials[i]);
							}
						}
					}
				}
				document.getElementById("OuterListWindowDiv").innerHTML = HTMLlistWindow;
				if (listOfSerials.length == 0){
					document.getElementById("listWindowSerialsBox").value = "Nothing.";
				}
				else{
					for (let i = 0; i < listOfSerials.length; i++){
						document.getElementById("listWindowSerialsBox").value = document.getElementById("listWindowSerialsBox").value + listOfSerials[i] + "\n";
					}
				}
			}
			else{
				alert("Check something from both sections");
			}
		}
		else{
			alert("Check something from both sections");
		}
	};
	thanksAlert = function(){
		alert("you're welcome");
	};
	exportExcel = function(){
		exportRows = [["Type", "Make", "Model", "Serial", "Asset Tag", "Status"]];
		for (let i = 0; i < allItems.length; i++){
			if (allSerials[i] != "deletedThisSerial"){
				if (allItems[i].querySelectorAll( '.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
					excelcurrentStatus = "Unreceived";
				}
				else if (allItems[i].querySelectorAll('.Confirmed').length > 0){
					excelcurrentStatus = "Done";
				}
				else{
					excelcurrentStatus = "Unconfirmed";
				}
				
				if (excelcurrentStatus == "Done" || (excelcurrentStatus == "Unconfirmed" && allItems[i].querySelectorAll("select").length == 0)){
					if (allItems[i].querySelectorAll(".Property").length > 4){
						currentAssetTag = allItems[i].querySelectorAll(".Property")[4].querySelectorAll("div")[2].innerHTML;
					}
					else{
						currentAssetTag = "";
					}
					exportRows.push([
						allTypes[i],
						allItems[i].querySelectorAll(".Property")[1].querySelectorAll("div")[2].innerHTML,
						allItems[i].querySelectorAll(".Property")[2].querySelectorAll("div")[2].innerHTML,
						allSerials[i],
						currentAssetTag,
						excelcurrentStatus
					]);
				}
				else{
					if (allItems[i].querySelectorAll(".Property").length > 4){
						currentAssetTag = allItems[i].querySelectorAll("[name=OldAssetTag]")[0].innerHTML;
					}
					else{
						currentAssetTag = "";
					}
					exportRows.push([
						allTypes[i],
						allItems[i].querySelectorAll("[name=OldMake]")[0].innerHTML,
						allItems[i].querySelectorAll("[name=OldModel]")[0].innerHTML,
						allSerials[i],
						currentAssetTag,
						excelcurrentStatus
					]);
				}
			}
		}
		let csvContent = "data:text/csv;charset=utf-8,";
		exportRows.forEach(function(rowArray) {
			let row = rowArray.join(",");
			csvContent += row + "\r\n";
		});
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	};
	
	/////--------------------------------BULK ADDING FUNCTIONS---------------------
	
	currentAddErrorList = [];
	currentAddAttemptCount = 0;
	currentRcvAttemptCount = 0;
	possibleTypes = [];
	possibleTypesCaps = [];
	possibleMakes = [];
	possibleMakesCaps = [];
	possibleModels = [];
	possibleModelsCaps = [];
	checkNewSerialNDADD = function (myAsset){
			if (Object.prototype.toString.call(myAsset) != '[object Array]'){
				return;
			}
			$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=Incoming&Action=CheckSerial',{
					Serial: myAsset[3]                   
				},
				function(data)
				{
				   switch (data.Result)
				   {
				   case 'FatalError':
					   currentAddErrorList.push(myAsset[3]);
					   currentAddAttemptCount++;
					   return;
				   break;
				   case "Local Asset":
						currentAddErrorList.push(myAsset[3]);
						currentAddAttemptCount++;
				   break;
				   case "Found Asset":
						 CallJSONMethodNODIALOG('Incoming','ProcessNewReturn',{ assetId: data.Id, shiplinkId: $('#ShiplinkId').val()}, [myAsset, 'createPurple']);
					break;
					default: 
						CallJSONMethodNODIALOG('Incoming','CreateNewItem', 'Type=' + myAsset[0] + '&Make=' + myAsset[1] + '&Model=' + myAsset[2] + '&Serial=' + myAsset[3] + '&AssetTag=' + myAsset[4].replace(/\//g, '') + '&Parent=&MfgMonth=1&MfgYear=2019&Shiplink=' + $('#ShiplinkId').val() + '&Owner=' + $('#owner').val() + '&Organization=' + $('#organization').val() + '&Project=' + $('#project').val() + '&Location=Incoming&ItemType=Asset', [myAsset, 'createPurple']);//.replace(/ /g, "+"), [myAsset, 'createPurple']);
				   }
			});
	};
	
	createPurpleSquare = function (assetList){
		if (Object.prototype.toString.call(assetList) == '[object Array]'){
			
			document.getElementsByClassName("Item")[document.getElementsByClassName("Item").length - 1].insertAdjacentHTML('afterend',
				`<div style="clear:both"></div>
				<div class="Item">
					<form>
					<div class="ItemProperties Done ">  
				<div class="Property">
					<div class="Title">Type</div>
					<div class="OldValue"><span name="OldType"></span></div>
					<div>` + assetList[0] + `</div>
				</div>
				<div class="Property">
					<div class="Title">Make</div>
					<div class="OldValue"><span name="OldMake"></span></div>
					<div>` + assetList[1] + `</div>
					 
				</div>
				 <div class="Property">
					<div class="Title">Model</div>
					<div class="OldValue"><span name="OldModel"></span></div>
					<div>` + assetList[2] + `</div>
					 
				</div>
				 <div class="Property">
					<div class="Title">Serial</div>
					<div class="OldValue"><span name="OldSerial"> </span></div>
					<div>` + assetList[3] + `</div>
				</div>
				 <div class="Property">
					<div class="Title">Asset Tag</div>
					<div class="OldValue"><span name="OldAssetTag"></span></div>
					<div>` + assetList[4] + `</div>
				</div>`
			);
			
			window.scrollTo(0, document.body.scrollHeight);
			document.getElementById('OuterAddWindowDiv').style.setProperty("top", (document.body.scrollHeight - window.innerHeight) + 'px');
			
			//allItems.push(document.getElementsByClassName("Item")[document.getElementsByClassName("Item").length - 1]);
			allItems = document.getElementsByClassName("Item");
			allTypes.push(assetList[0]);
			allSerials.push(assetList[3]);
			
		}
	};
	
	document.getElementById("Main").insertAdjacentHTML("afterend", `<div id="OuterAddWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);
	openAddWindow = function (){
		backupAddWindowHTML = `<div style="
		  height: 100vh;
		  width: 100vw;
		  position: absolute;
		  top: 0;
		  left: 0;
		  background-color: #0000002b;
		  "><div style="
		  height: 100vh;
		  width: 100vw;
		  position: absolute;
		  top: 0;
		  left: 0;
		  display: none;
		  " id="addControlsBlocker"></div>
			<div id="ActualAddWindow" style="
			width: 75vw;
			height: 75vh;
			margin-top: 12vh;
			margin-left: 12vw;
			background-color: #ffffff;
			padding: 0.5vw;
			"><span class="Title">Add Bulks Assets</span><button style="float:right" class="Title" onclick="closeAddWindow()">X</button><br><br><br><span style="margin-left: 12%;">Types:</span><span style="margin-left: 12%;">Makes:</span><span style="margin-left: 12%;">Models:</span><span style="margin-left: 12%;">Serials:</span><span style="margin-left: 12%;">Asset Tags:</span><br>
		<textarea style="width:15%;margin-left: 5%;" rows="30" id="boxforTypes" class=""></textarea><textarea style="width:15%;margin-left: 1%;" rows="30" id="boxforMakes" class=""></textarea><textarea style="width:15%;margin-left: 1%;" rows="30" id="boxforModels" class=""></textarea><textarea style="width:15%;margin-left: 1%;" rows="30" id="boxforSerials" class=""></textarea><textarea style="width:15%;margin-left: 1%;" rows="30" id="boxforAssetTags" class=""></textarea><br><button style="float:right" id="addAssetsButton" onclick="addAssetsButtonFunction()">Add All Assets</button></div></div>`;
		document.getElementById("OuterAddWindowDiv").innerHTML = backupAddWindowHTML;
		document.getElementById('OuterAddWindowDiv').style.setProperty("top", '0px');
		document.getElementById("OuterAddWindowDiv").style.display = "block";
		window.scrollTo(0, 0);
		document.body.style.overflowX = "hidden";
		document.body.style.overflowY = "hidden";
	};
	
	closeAddWindow = function(){
		document.getElementById("OuterAddWindowDiv").innerHTML = '';
		document.getElementById("OuterAddWindowDiv").style.display = "none";
		document.body.style.overflowX = "scroll";
		document.body.style.overflowY = "scroll";
	};
	
	launchBulkAdding = function (){
		possibleTypes = [];
		possibleTypesCaps = [];
		possibleMakes = [];
		possibleMakesCaps = [];
		possibleModels = [];
		possibleModelsCaps = [];
		for (let i = 0; i < document.getElementById("AssetForm").querySelectorAll("[name=Type]")[0].options.length; i++){
			possibleTypes.push(document.getElementById("AssetForm").querySelectorAll("[name=Type]")[0].options[i].value);
			possibleTypesCaps.push(document.getElementById("AssetForm").querySelectorAll("[name=Type]")[0].options[i].value.toUpperCase());
		}
		for (let i = 0; i < document.getElementById("AssetForm").querySelectorAll("[name=Make]")[0].options.length; i++){
			possibleMakes.push(document.getElementById("AssetForm").querySelectorAll("[name=Make]")[0].options[i].value);
			possibleMakesCaps.push(document.getElementById("AssetForm").querySelectorAll("[name=Make]")[0].options[i].value.toUpperCase());
		}
		for (let i = 0; i < document.getElementById("AssetForm").querySelectorAll("[name=Model]")[0].options.length; i++){
			possibleModels.push(document.getElementById("AssetForm").querySelectorAll("[name=Model]")[0].options[i].value);
			possibleModelsCaps.push(document.getElementById("AssetForm").querySelectorAll("[name=Model]")[0].options[i].value.toUpperCase());
		}
		openAddWindow();
	};
	
	addAssetsButtonFunction = function (){
		currentAddErrorList = [];
		currentAddAttemptCount = 0;
		if (typeof document.getElementById("boxforTypes") === "undefined" || typeof document.getElementById("boxforMakes") === "undefined" || typeof document.getElementById("boxforModels") === "undefined" || typeof document.getElementById("boxforSerials") === "undefined" || typeof document.getElementById("boxforAssetTags") === "undefined"){
			alert("Something went wrong. Try again.");
			return;
		}
		addinglistTypes = [];
		addinglistMakes = [];
		addinglistModels = [];
		addinglistSerials = [];
		addinglistAssetTags = [];
		
		//Serials
		tempAddingList = [];
		tempAddingList = document.getElementById("boxforSerials").value.replace(/^\n|\n$/g, '').split("\n");
		for (let i = 0; i < tempAddingList.length; i++){
			if (tempAddingList[i].trim('') != ''){
				addinglistSerials.push(tempAddingList[i].trim(''));
			}
		}
		//Types
		tempAddingList = [];
		tempAddingList = document.getElementById("boxforTypes").value.replace(/^\n|\n$/g, '').split("\n");
		for (let i = 0; i < tempAddingList.length; i++){
			if (addinglistTypes.length > addinglistSerials.length){
				alert("Amount of items do not match, please check again.");
				currentAddErrorList = [];
				return;
			}
			if (tempAddingList[i].trim('') != ''){
				if (addinglistSerials[addinglistTypes.length] == 'SKIPTHISSERIALOK'){
					addinglistTypes.push('SKIPTHISSERIALOK');
				}
				else if (possibleTypesCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) == -1){
					currentAddErrorList.push(addinglistSerials[addinglistTypes.length]);
					addinglistTypes.push('SKIPTHISSERIALOK');
					addinglistSerials[addinglistTypes.length-1] = 'SKIPTHISSERIALOK';
				}
				else if (possibleTypesCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) > -1){
					addinglistTypes.push(possibleTypes[possibleTypesCaps.indexOf(tempAddingList[i].trim('').toUpperCase())]);
				}
			}
		}
		if (addinglistTypes.length != addinglistSerials.length){
			alert("Amount of items do not match, please check again.");
			currentAddAttemptCount = 0;
			currentAddErrorList = [];
			return;
		}
		//Makes
		tempAddingList = [];
		tempAddingList = document.getElementById("boxforMakes").value.replace(/^\n|\n$/g, '').split("\n");
		for (let i = 0; i < tempAddingList.length; i++){
			if (addinglistMakes.length > addinglistSerials.length){
				alert("Amount of items do not match, please check again.");
				currentAddErrorList = [];
				return;
			}
			if (tempAddingList[i].trim('') != ''){
				if (addinglistSerials[addinglistMakes.length] == 'SKIPTHISSERIALOK'){
					addinglistMakes.push('SKIPTHISSERIALOK');
				}
				else if (possibleMakesCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) == -1){
					currentAddErrorList.push(addinglistSerials[addinglistMakes.length]);
					addinglistMakes.push('SKIPTHISSERIALOK');
					addinglistSerials[addinglistMakes.length-1] = 'SKIPTHISSERIALOK';
				}
				else if (possibleMakesCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) > -1){
					addinglistMakes.push(possibleMakes[possibleMakesCaps.indexOf(tempAddingList[i].trim('').toUpperCase())]);
				}
			}
		}
		if (addinglistMakes.length != addinglistSerials.length){
			alert("Amount of items do not match, please check again.");
			currentAddErrorList = [];
			currentAddAttemptCount = 0;
			return;
		}
		//Models
		tempAddingList = [];
		tempAddingList = document.getElementById("boxforModels").value.replace(/^\n|\n$/g, '').split("\n");
		for (let i = 0; i < tempAddingList.length; i++){
			if (addinglistModels.length > addinglistSerials.length){
				alert("Amount of items do not match, please check again.");
				currentAddErrorList = [];
				return;
			}
			if (tempAddingList[i].trim('') != ''){
				if (addinglistSerials[addinglistModels.length] == 'SKIPTHISSERIALOK'){
					addinglistModels.push('SKIPTHISSERIALOK');
				}
				else if (possibleModelsCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) == -1){
					currentAddErrorList.push(addinglistSerials[addinglistModels.length]);
					addinglistModels.push('SKIPTHISSERIALOK');
					addinglistSerials[addinglistModels.length-1] = 'SKIPTHISSERIALOK';
				}
				else if (possibleModelsCaps.indexOf(tempAddingList[i].trim('').toUpperCase()) > -1){
					addinglistModels.push(possibleModels[possibleModelsCaps.indexOf(tempAddingList[i].trim('').toUpperCase())]);
				}
			}
		}
		if (addinglistModels.length != addinglistSerials.length){
			alert("Amount of items do not match, please check again.");
			currentAddErrorList = [];
			currentAddAttemptCount = 0;
			return;
		}
		//Asset Tags
		tempAddingList = [];
		tempAddingList = document.getElementById("boxforAssetTags").value.replace(/^\n|\n$/g, '').split("\n");
		for (let i = 0; i < tempAddingList.length; i++){
			if (tempAddingList[i].trim('') != ''){
				addinglistAssetTags.push(tempAddingList[i].trim(''));
			}
		}
		if (addinglistAssetTags.length != addinglistSerials.length){
			alert("Amount of items do not match, please check again.");
			currentAddErrorList = [];
			currentAddAttemptCount = 0;
			return;
		}
		
		
		//All 5 lists have been made and verified finally bruh
		if ( addinglistTypes.length == addinglistMakes.length && addinglistMakes.length == addinglistModels.length && addinglistModels.length == addinglistSerials.length && addinglistSerials.length == addinglistAssetTags.length){
			for (let i = 0; i < addinglistSerials.length; i++){
				if (currentAddErrorList.indexOf(addinglistSerials[i]) == -1 && addinglistTypes[i] != 'SKIPTHISSERIALOK' && addinglistMakes[i] != 'SKIPTHISSERIALOK' && addinglistModels[i] != 'SKIPTHISSERIALOK' && addinglistSerials[i] != 'SKIPTHISSERIALOK'){
					checkNewSerialNDADD([addinglistTypes[i],addinglistMakes[i],addinglistModels[i],addinglistSerials[i],addinglistAssetTags[i]]);
				}
				else{
					currentAddAttemptCount++;
				}
			}
			document.getElementById("addControlsBlocker").style.display = "block";
			document.getElementById("addAssetsButton").innerText = "Please wait...";
			document.body.style.cursor='progress';
			setTimeout(function () {
				waitForAdding(addinglistTypes.length);
			}, 2000);//addinglistTypes.length * 2000);
		}
		else{
			alert("Amount of items do not match, please check again.");
			currentAddErrorList = [];
			currentAddAttemptCount = 0;
			return;
		}
	};
	
	waitForAdding = function (listLength){
		if (currentAddAttemptCount >= listLength){
			document.getElementById("addControlsBlocker").style.display = "none";
			document.body.style.cursor='auto';
			showAddedResults();
		}
		else{
			setTimeout(function () {
				waitForAdding(listLength);
			}, 5000);
		}
	};
	
	showAddedResults = function (){
		doneAddingWindowHTML = `<span class="Title">Add Bulk Assets</span><button style="float:right" class="Title" onclick="closeAddWindow()">X</button><br><br><br><textarea readonly="" style="width:50%;margin-left: 12%;" rows="30" id="erroredAddingSerials" class=""></textarea>`;
		document.getElementById("ActualAddWindow").innerHTML = doneAddingWindowHTML;
		document.getElementById("erroredAddingSerials").value = "Done.\n\nThese serial numbers may not have been added. Please check manually:\n\n";
		if (currentAddErrorList.length == 0){
			document.getElementById("erroredAddingSerials").value = "Done.";
		}
		for (let i = 0; i < currentAddErrorList.length; i++){
			document.getElementById("erroredAddingSerials").value = document.getElementById("erroredAddingSerials").value + currentAddErrorList[i] + '\n';
		}
		currentAddErrorList = [];
		currentAddAttemptCount = 0;
	};
	
	//Override their dialog window to add bulk button
	function CreateNewItem(type, location, owner, organization, project, shiplink, parent){
    $('#Dialog').load('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php',
                     {
                         Screen: 'Misc',
                         Action: 'GetCreateAssetForm',
                         location: location,
                         owner: owner,
                         shiplink: shiplink,
                         organization: organization,
                         project: project,
                         Parent: parent == undefined ? '' : parent,
                         Type: type
                     },
                         function()
                         {
                             
                            $('#Dialog').dialog('option','buttons',
                            {                                
                                'Bulk': function() { $('#Dialog').dialog('close'); launchBulkAdding(); },
                                'OK': function() { checkNewSerial(type); },
                                'Cancel': function() { $('#Dialog').dialog('close');}
                            });

                            $('#Dialog').dialog('option','width','auto').dialog('open');
                         }

                     );    
	}
	
	////------------------------------END BULK ADDING---------------------------------
	
	for (let i = 0; i < allItems.length; i++){
	if (allItems[i].querySelectorAll("[name=Create]").length > 0){
		allItems[i].querySelectorAll("[name=Create]")[0].outerHTML = allItems[i].querySelectorAll("[name=Create]")[0].outerHTML;
		allItems[i].querySelectorAll("[name=Create]")[0].id = "CreateButton" + i;
	}
	if (allItems[i].querySelectorAll("[name=DeleteSl]").length > 0){
		allItems[i].querySelectorAll("[name=DeleteSl]")[0].outerHTML = allItems[i].querySelectorAll("[name=DeleteSl]")[0].outerHTML;
		allItems[i].querySelectorAll("[name=DeleteSl]")[0].id = "DeleteButton" + i;
	}
	}
	
	if (notReceived.length > 0){ 
		$('input[name=Delete]').click(function(){
			var tableID = $(this).parents('.ItemProperties').children('input[name="tableID"]').val();    
			CallJSONMethod('Incoming','DeleteItem', {TableId: tableID}, [0,"refresh"]);
		});
		allPeripherals = document.getElementsByName("Peripheral");
		for (let i = 0; i < notReceived.length; i++){
			notReceived[i].style.paddingBottom = "5px";
			allPeripherals[i].insertAdjacentHTML('afterend', '<input type="button" value="AutoFill" name="AutoFill" onclick="doAutoFill(' + notReceived[i].querySelectorAll("[name=myItemID]")[0].value + ')">');
		}
		document.getElementById("AddMedia").insertAdjacentHTML('afterend', '<input type="button" value="Bulk Receive" id="BulkReceive"><input type="button" value="List Devices" id="ListDevices">');
		const fireReceiveEvent = new Event("animationiteration");
		const e = new Event("change");
		
		makePurple = function (itemIndex){
			allItems[itemIndex].querySelectorAll(".ControlProperty")[0].style.display = "none";
			allItems[itemIndex].querySelectorAll(".ItemProperties")[0].classList.add("Done");
			for (let i = 0; i < allItems[itemIndex].querySelectorAll("input, .NewProperty, label").length; i++){
				allItems[itemIndex].querySelectorAll("input, .NewProperty, label")[i].style.display = "none";
			}
			allItems[itemIndex].querySelectorAll("[name=OldType]")[0].innerHTML = allItems[itemIndex].querySelectorAll("[name=Type]")[1].innerHTML;
			allItems[itemIndex].querySelectorAll("[name=Type]")[1].style.display = "none";
			for (let j = 0; j < allItems[itemIndex].querySelectorAll("select").length; j++){
				allItems[itemIndex].querySelectorAll("select")[j].style.display = "none";
			}
			allItems[itemIndex].querySelectorAll("[name=OldType]")[0].style.color = "black";
			allItems[itemIndex].querySelectorAll("[name=OldMake]")[0].innerHTML = allItems[itemIndex].querySelectorAll("[name=Make]")[0].value;
			allItems[itemIndex].querySelectorAll("[name=OldMake]")[0].style.color = "black";
			allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML = allItems[itemIndex].querySelectorAll("[name=Model]")[0].value;
			allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].style.color = "black";
			if (allItems[itemIndex].querySelectorAll("[name=OldSerial]").length > 0){
				allItems[itemIndex].querySelectorAll("[name=OldSerial]")[0].innerHTML = allItems[itemIndex].querySelectorAll("[name=Serial]")[0].value;
				allItems[itemIndex].querySelectorAll("[name=OldSerial]")[0].style.color = "black";
				allSerials[itemIndex] = allItems[itemIndex].querySelectorAll("[name=OldSerial]")[0].innerHTML;
			}
			if (allItems[itemIndex].querySelectorAll("[name=OldAssetTag]").length > 0){
				allItems[itemIndex].querySelectorAll("[name=OldAssetTag]")[0].style.color = "black";
			}
			if (allItems[itemIndex].querySelectorAll("[name=MfgMonth]").length > 0){
				allItems[itemIndex].querySelectorAll("[name=MfgMonth]")[0].style.display = "none";
				allItems[itemIndex].querySelectorAll("[name=MfgYear]")[0].style.display = "none";
			}
		};
		
		document.getElementById("Main").insertAdjacentHTML("afterend", `<div id="OuterBulkWindowDiv" style="position: absolute; display: none; top: 0px;"></div>`);
		openBulkWindow = function (){
			backupBulkWindowHTML = `<div style="
			  height: 100vh;
			  width: 100vw;
			  position: absolute;
			  top: 0;
			  left: 0;
			  background-color: #0000002b;
			  "><div style="
			  height: 100vh;
			  width: 100vw;
			  position: absolute;
			  top: 0;
			  left: 0;
			  display: none;
			  " id="bulkControlsBlocker"></div>
				<div id="ActualBulkWindow" style="
				width: 75vw;
				height: 75vh;
				margin-top: 12vh;
				margin-left: 12vw;
				background-color: #ffffff;
				padding: 0.5vw;
				"><span class="Title">Bulk Receive</span><button style="float:right" class="Title" onclick="closeBulkWindow()">X</button><br><br><br><span style="margin-left: 12%;">Paste Serials:</span><span style="float: right; margin-right: 40%;">Paste Model Numbers:</span><br>
			<textarea style="width:30%;margin-left: 10%;" rows="30" id="SerialNumberPastingBox" class=""></textarea><textarea style="width:30%;float: right; margin-right: 25%;" rows="30" id="ModelNumberPastingBox" class=""></textarea><br><br><br><br><a href="javascript:;" onclick="notFoundAll();">"Not Found" All Items</a><a style="margin-left: 2%;" href="javascript:;" onclick="handleAll40A2s();">Receive all 40A2s</a><a style="margin-left: 5px;" href="javascript:;" onclick="handleAll40AJs();">40AJs</a><button style="float:right" id="bulkRcvButton" onclick="bulkRcvButtonFunction()">Receive All</button></div></div>`;
			document.getElementById("OuterBulkWindowDiv").innerHTML = backupBulkWindowHTML;
			document.getElementById("OuterBulkWindowDiv").style.display = "block";
			window.scrollTo(0, 0);
			document.body.style.overflowX = "hidden";
			document.body.style.overflowY = "hidden";
			document.getElementById("SerialNumberPastingBox").select();
		};
		
		closeBulkWindow = function(){
			document.getElementById("OuterBulkWindowDiv").innerHTML = '';
			document.getElementById("OuterBulkWindowDiv").style.display = "none";
			document.body.style.overflowX = "scroll";
			document.body.style.overflowY = "scroll";
		};
		
		bulkRcvButtonFunction = function(){
			serialsTextBox = document.getElementById("SerialNumberPastingBox");
			modelsTextBox = document.getElementById("ModelNumberPastingBox");
			if (typeof serialsTextBox === "undefined" || typeof modelsTextBox === "undefined"){
				alert("Something went wrong. Try again.");
			}
			else{
				tempBulkList = serialsTextBox.value.replace(/^\n|\n$/g, '').split("\n");
				convertedSerialsText = [];
				for (let i  = 0; i < tempBulkList.length; i++){
					tempBulkList[i] = tempBulkList[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
					if (tempBulkList[i].trim('') != ''){ convertedSerialsText.push(tempBulkList[i].trim('')); }
				}
				tempBulkList = [];
				tempBulkList = modelsTextBox.value.replace(/^\n|\n$/g, '').split("\n");
				convertedModelsText = [];
				for (let i  = 0; i < tempBulkList.length; i++){
					if (tempBulkList[i].trim('') != ''){ convertedModelsText.push(tempBulkList[i].trim('')); }
				}
				if (convertedSerialsText.length == convertedModelsText.length){
					totalMatches = 0;
					for (let i = 0; i < allSerials.length; i++){
						if (convertedSerialsText.includes(allSerials[i]) || convertedSerialsText.includes(allSerials[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase())){
							totalMatches += 1;
						}
					}
					HTMLtimeToTimeout = 0000 + (totalMatches * 500);
					document.getElementById("bulkControlsBlocker").style.display = "block";
					document.getElementById("bulkRcvButton").innerText = "Please wait...";
					document.body.style.cursor='progress';
					resultsFromBulkRcving = bulkReceive(convertedSerialsText, convertedModelsText);
					setTimeout(function(){ waitforReceiving(totalMatches); }, HTMLtimeToTimeout);
				}
				else{
					alert("Amount of serials does not match amount of models. Please check again.");
				}
			}
		};
		
		waitforReceiving = function(itemsLength){
			if (currentRcvAttemptCount >= itemsLength){
				bulkButtonPart2();
			}
			else{
				setTimeout(function () {
					waitforReceiving(itemsLength);
				}, 5000);
			}
		};
		
		bulkButtonPart2 = function () {
			backupBulkResultsHTML = `<div style="  height: 100vh;  width: 100vw;  position: absolute;  top: 0;  left: 0;  background-color: #0000002b;  ">    <div id="ActualBulkWindow" style="    width: 75vw;    height: 75vh;    margin-top: 12vh;    margin-left: 12vw;    background-color: #ffffff;    padding: 0.5vw;    "><span class="Title">Bulk Receive</span><button style="float:right" class="Title" onclick="closeBulkWindow()">X</button><br><br><br><span style="margin-left: 10%;">Completed Serials:</span><span style="margin-left: 15%;">Errors:</span><span style="margin-left: 20%;">Remaining:</span><span style="margin-left: 15%;">Remaining Models:</span><br><textarea readonly="" style="width:20%;margin-left: 5%;" rows="30" id="CompletedSerialsCopying" class=""></textarea><textarea readonly="" style="width:20%;margin-left: 2%;" rows="30" id="ErroredSerialsCopying" class=""></textarea><textarea readonly="" style="width:20%;margin-left: 2%;" rows="30" id="RemainingSerialsCopying" class=""></textarea><textarea readonly="" style="width:20%;margin-left: 2%;" rows="30" id="RemainingModelsCopying" class=""></textarea></div></div>`;
			document.getElementById("OuterBulkWindowDiv").innerHTML = backupBulkResultsHTML;
			document.getElementById("CompletedSerialsCopying").value = "The following serial numbers have been RECEIVED\n\n";
			document.getElementById("ErroredSerialsCopying").value = "These serial numbers may not have been received. Please check manually.\n\n";
			document.getElementById("RemainingSerialsCopying").value = "These serials are in another Shiplink\n\n";
			document.getElementById("RemainingModelsCopying").value = "Model numbers for the remaining serials\n\n";
			for (let i = 0; i < todoList.length; i++){
				if (resultsFromBulkRcving[4][i] != "SKIPTHISONE"){
					if (allItems[i].querySelectorAll('.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
						if (resultsFromBulkRcving[1].includes(resultsFromBulkRcving[4][i])){}
						else{ resultsFromBulkRcving[1].push(resultsFromBulkRcving[4][i]); }
					}
					else{
						resultsFromBulkRcving[0].push(resultsFromBulkRcving[4][i]);
					}
				}
			}
			if (resultsFromBulkRcving[0].length == 0){
				document.getElementById("CompletedSerialsCopying").value = "Nothing was received";
			}
			if (resultsFromBulkRcving[1].length == 0){
				document.getElementById("ErroredSerialsCopying").value = "No errors";
			}
			if (resultsFromBulkRcving[2].length == 0){
				document.getElementById("RemainingSerialsCopying").value = "No serials remaining";
				document.getElementById("RemainingModelsCopying").value = "";
			}
			document.body.style.cursor='auto';
			for (let i = 0; i < resultsFromBulkRcving[0].length; i++){
				document.getElementById("CompletedSerialsCopying").value = document.getElementById("CompletedSerialsCopying").value + resultsFromBulkRcving[0][i] + '\n';
			}
			for (let i = 0; i < resultsFromBulkRcving[1].length; i++){
				document.getElementById("ErroredSerialsCopying").value = document.getElementById("ErroredSerialsCopying").value + resultsFromBulkRcving[1][i] + '\n';
			}
			for (let i = 0; i < resultsFromBulkRcving[2].length; i++){
				document.getElementById("RemainingSerialsCopying").value = document.getElementById("RemainingSerialsCopying").value + resultsFromBulkRcving[2][i] + '\n';
			}
			for (let i = 0; i < resultsFromBulkRcving[3].length; i++){
				document.getElementById("RemainingModelsCopying").value = document.getElementById("RemainingModelsCopying").value + resultsFromBulkRcving[3][i] + '\n';
			}
			currentRcvAttemptCount = 0;
			erroredList = [];
		};
		
		guessMake = function (itemIndex){
			givenMake = allItems[itemIndex].querySelectorAll("[name=OldMake]")[0].innerHTML;
			if (givenMake.trim('') == ''){
				return '1.UNDEFINED';
			}
			allMakes = [];
			allMakesCaps = [];
			for (let i = 0; i < allItems[itemIndex].querySelectorAll("[name=Make]")[0].options.length; i++){
				allMakes[i] = allItems[itemIndex].querySelectorAll("[name=Make]")[0].options[i].value;
				allMakesCaps[i] = allItems[itemIndex].querySelectorAll("[name=Make]")[0].options[i].value.toUpperCase();
			}
			if (allMakes.includes(givenMake)){
				return givenMake;
			}
			if (allMakesCaps.includes(givenMake.toUpperCase())){
				return allMakes[allMakesCaps.indexOf(givenMake.toUpperCase())];
			}
			if (givenMake.toUpperCase() == "LENEVO"){
				return "Lenovo";
			}
			if (givenMake.toUpperCase().includes("LENEVO")){
				return "Lenovo";
			}
			if (givenMake.toUpperCase().includes("LENEVE") || givenMake.toUpperCase().includes("LENOVE")){
				return "Lenovo";
			}
			for (let i = 0; i < allMakesCaps.length; i++){
				if (givenMake.toUpperCase().includes(allMakesCaps[i])){
					return allMakes[i];
				}
			}
			givenModelX = allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML;
			for (let i = 0; i < allMakesCaps.length; i++){
				if (givenModelX.toUpperCase().includes(allMakesCaps[i])){
					return allMakes[i];
				}
			}
			return '1.UNDEFINED';
		};
		
		guessModel = function (itemIndex, givenModel){
			if (typeof givenModel == 'undefined'){
				givenModel = allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML;
			}
			if (givenModel == "autofilling"){
				givenModel = allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML;
			}
			if (givenModel.trim('') == ''){
				return '1.UNDEFINED';
			}
			// majorMakes = ["Lenovo", "Dell", "HP"];
			// for (let i = 0; i < majorMakes.length; i++){
				// if (givenModel.toUpperCase().includes(majorMakes[i].toUpperCase())){ return majorMakes[i]; }
			// }
			allModels = [];
			allModelsCaps = [];
			for (let i = 0; i < allItems[itemIndex].querySelectorAll("[name=Model]")[0].options.length; i++){
				allModels[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value;
				allModelsCaps[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value.toUpperCase();
			}
			if (allModels.includes(givenModel)){
				return givenModel;
			}
			if (allModelsCaps.includes(givenMake.toUpperCase())){
				return allModels[allModelsCaps.indexOf(givenMake.toUpperCase())];
			}
			if (allModelsCaps.includes(givenMake.toUpperCase().replace("1S", ""))){
				return allModels[allModelsCaps.indexOf(givenMake.toUpperCase().replace("1S", ""))];
			}
			for (let i = 0; i < allModelsCaps.length; i++){
				if (givenModel.toUpperCase().includes(allModelsCaps[i])){
					return allModels[i];
				}
			}
			for (let i = 0; i < allModelsCaps.length; i++){
				if (allModelsCaps[i].includes(givenModel.toUpperCase())){
					return allModels[i];
				}
			}
			return '1.UNDEFINED';
		};
		
		guessMakeUnknown = function (itemIndex, givenModel){
			if (typeof givenModel == 'undefined'){
				givenModel = allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML;
			}
			if (givenModel == "autofilling"){
				givenModel = allItems[itemIndex].querySelectorAll("[name=OldModel]")[0].innerHTML;
			}
			if (givenModel.trim('') == ''){
				return '1.UNDEFINED';
			}
			allMakes = [];
			for (let i = 0; i < allItems[itemIndex].querySelectorAll("[name=Make]")[0].options.length; i++){
				allMakes[i] = allItems[itemIndex].querySelectorAll("[name=Make]")[0].options[i].value;
			}
			majorMakes = ["Lenovo", "Dell", "HP"];
			for (let i = 0; i < majorMakes.length; i++){
				allItems[itemIndex].querySelectorAll("[name=Make]")[0].value = majorMakes[i];
				allItems[itemIndex].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
				allModels = [];
				allModelsCaps = [];
				for (let i = 0; i < allItems[itemIndex].querySelectorAll("[name=Model]")[0].options.length; i++){
					allModels[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value;
					allModelsCaps[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value.toUpperCase();
				}
				if (allModels.includes(givenModel)){
					return majorMakes[i];
				}
				if (allModelsCaps.includes(givenModel.toUpperCase())){
					return majorMakes[i];
				}
				if (allModelsCaps.includes(givenModel.toUpperCase().replace("1S", ""))){
					return majorMakes[i];
				}
				for (let i = 0; i < allModelsCaps.length; i++){
					if (givenModel.toUpperCase().includes(allModelsCaps[i])){
						return majorMakes[i];
					}
				}
			}
			for (let i = 0; i < allMakes.length; i++){
				allItems[itemIndex].querySelectorAll("[name=Make]")[0].value = allMakes[i];
				allItems[itemIndex].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
				allModels = [];
				allModelsCaps = [];
				for (let i = 0; i < allItems[itemIndex].querySelectorAll("[name=Model]")[0].options.length; i++){
					allModels[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value;
					allModelsCaps[i] = allItems[itemIndex].querySelectorAll("[name=Model]")[0].options[i].value.toUpperCase();
				}
				if (allModels.includes(givenModel)){
					return allMakes[i];
				}
				if (allModelsCaps.includes(givenModel.toUpperCase())){
					return allMakes[i];
				}
				if (allModelsCaps.includes(givenModel.toUpperCase().replace("1S", ""))){
					return allMakes[i];
				}
				for (let i = 0; i < allModelsCaps.length; i++){
					if (givenModel.toUpperCase().includes(allModelsCaps[i])){
						return allMakes[i];
					}
				}
			}
			return '1.UNDEFINED';
		};
		
		bulkReceive = function (serialsList, modelsList){
			callingBulkRN = true;
			currentRcvAttemptCount = 0;
			
			todoList = [];
			todoModels = [];
			completedList = [];
			erroredList = [];
			remainingList = [];
			remainingModelsList = [];
			
			if (serialsList.length == modelsList.length){
				for (let i = 0; i < allSerials.length; i++){
					if (serialsList.includes(allSerials[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase())){
						if (todoList.includes(allSerials[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase())){
							erroredList.push(allSerials[i]);
							todoList[i] = "SKIPTHISONE";
							todoModels[i] = "SKIPTHISONE";
						}
						else{
							todoList[i] = allSerials[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
							todoModels[i] = modelsList[ serialsList.indexOf(allSerials[i].replace("-", "").replace("o", "0").replace("O", "0").toUpperCase()) ];
						}
					}
					else{
						todoList[i] = "SKIPTHISONE";
						todoModels[i] = "SKIPTHISONE";
					}
				}
				for (let i = 0; i < serialsList.length; i++){
					if (!(todoList.includes(serialsList[i]))){
						remainingList.push(serialsList[i]);
						remainingModelsList.push(modelsList[i]);
					}
				}
				for (let i = 0; i < todoList.length; i++){
					if (todoList[i] != "SKIPTHISONE"){
						if (allItems[i].querySelectorAll('.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
							allItems[i].querySelectorAll("[name=Make]")[0].value = guessMake(i);
							if (allItems[i].querySelectorAll("[name=Make]")[0].value == '1.UNDEFINED' || allItems[i].querySelectorAll("[name=Make]")[0].value == ''){
								allItems[i].querySelectorAll("[name=Make]")[0].value = guessMakeUnknown(i, todoModels[i]);
							}
							allItems[i].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
							if (allItems[i].querySelectorAll("[name=Make]")[0].value != '1.UNDEFINED' && allItems[i].querySelectorAll("[name=Make]")[0].value != ''){
								allItems[i].querySelectorAll("[name=Model]")[0].value = guessModel(i, todoModels[i]);
								if (allItems[i].querySelectorAll("[name=Model]")[0].value == '1.UNDEFINED' || allItems[i].querySelectorAll("[name=Model]")[0].value == ''){
									allItems[i].querySelectorAll("[name=Make]")[0].value = guessMakeUnknown(i, todoModels[i]);
									allItems[i].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
									allItems[i].querySelectorAll("[name=Model]")[0].value = guessModel(i, todoModels[i]);
								}
								if (allItems[i].querySelectorAll("[name=Model]")[0].value != '1.UNDEFINED' && allItems[i].querySelectorAll("[name=Model]")[0].value != ''){
									allItems[i].querySelectorAll("[name=Serial]")[0].value = allItems[i].querySelectorAll("[name=OldSerial]")[0].innerHTML.replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
									allItems[i].querySelectorAll('[name="AssetTag"]')[0].value = allItems[i].querySelectorAll('[name="OldAssetTag"]')[0].innerText;
									if (allItems[i].querySelectorAll('[name="Media"]').length > 0){
										allItems[i].querySelectorAll('[name="Media"]')[0].value = "No Media Found";
									}
									allItems[i].querySelectorAll('[name="Create"]')[0].dispatchEvent(fireReceiveEvent);
								}
								else{
									allItems[i].querySelectorAll("[name=Make]")[0].value = guessMake(i);
									allItems[i].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
									erroredList.push(allSerials[i]);
									currentRcvAttemptCount++;
								}
							}
							else{
								erroredList.push(allSerials[i]);
								currentRcvAttemptCount++;
								allItems[i].querySelectorAll("[name=Model]")[0].value = '1.UNDEFINED';
							}
						}
					}
				}
			}
			
			callingBulkRN = false;
			return [completedList, erroredList, remainingList, remainingModelsList, todoList];
		};
		
		doAutoFill = function (itemIndex){
			allItems[itemIndex].querySelectorAll("[name=Make]")[0].value = guessMake(itemIndex);
			if (allItems[itemIndex].querySelectorAll("[name=Make]")[0].value == '1.UNDEFINED' || allItems[itemIndex].querySelectorAll("[name=Make]")[0].value == ''){
				allItems[itemIndex].querySelectorAll("[name=Make]")[0].value = guessMakeUnknown(itemIndex);
			}
			allItems[itemIndex].querySelectorAll("[name=Make]")[0].dispatchEvent(e);
			if (allItems[itemIndex].querySelectorAll("[name=Make]")[0].value != '1.UNDEFINED' || allItems[itemIndex].querySelectorAll("[name=Make]")[0].value != ''){
				allItems[itemIndex].querySelectorAll("[name=Model]")[0].value = guessModel(itemIndex);
			}
			allItems[itemIndex].querySelectorAll("[name=Serial]")[0].value = allItems[itemIndex].querySelectorAll("[name=OldSerial]")[0].innerHTML.replace("-", "").replace("o", "0").replace("O", "0").toUpperCase();
			allItems[itemIndex].querySelectorAll('[name="AssetTag"]')[0].value = allItems[itemIndex].querySelectorAll('[name="OldAssetTag"]')[0].innerText;
			if (allItems[itemIndex].querySelectorAll('[name="Media"]').length > 0){
				allItems[itemIndex].querySelectorAll('[name="Media"]')[0].value = "No Media Found";
			}
		};
		
		notFoundAll = function (){
			if (document.querySelectorAll('.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
				var enteredPassword = window.prompt('This will "Not Found" every single device in the Shiplink. Enter the password:');
				if (enteredPassword == "Password"){
					var currDeleting = 0;
					$('[name=DeleteSl]').each(function(i,e){
						var RelationId = $(this).parents('.ItemProperties').children('input[name="RelationId"]').val();    
						CallJSONMethodNODIALOG('Incoming','DeleteSl', {RelationId: RelationId}, "test");
						currItem = notReceived[currDeleting].querySelectorAll("[name=myItemID]")[0].value;
						currDeleting++;
						allItems[currItem].style.display = "none";
						allSerials[currItem] = "deletedThisSerial";
					});
				}
				else{
					alert("Wrong.");
				}
			}
			else{
				alert("Nothing to delete");
			}
		};
		
		handleAll40A2s = function (){
			completed40A2s = [];
			for (let i = 0; i < allItems.length; i++){
				if (allItems[i].querySelectorAll("[name=OldModel]").length > 0){
					if (allItems[i].querySelectorAll("[name=OldModel]")[0].innerHTML.toUpperCase() == "40A2" && allItems[i].querySelectorAll( '.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
						if (completed40A2s.includes(allSerials[i])){
							deleting40A2srn = true;
							allItems[i].querySelectorAll('[name="DeleteSl"]')[0].dispatchEvent(fireReceiveEvent);
							deleting40A2srn = false;
						}
						else{
							callingBulkRN = true;
							allItems[i].querySelectorAll('[name="Make"]')[0].value = "Lenovo";
							allItems[i].querySelectorAll('[name="Make"]')[0].dispatchEvent(e);
							allItems[i].querySelectorAll('[name="Model"]')[0].value = "40A2";
							allItems[i].querySelectorAll('[name="Serial"]')[0].value = allSerials[i];
							allItems[i].querySelectorAll('[name="AssetTag"]')[0].value = "N/A";
							allItems[i].querySelectorAll('[name="Media"]')[0].value = "No Media Found";
							allItems[i].querySelectorAll('[name="Create"]')[0].dispatchEvent(fireReceiveEvent);
							completed40A2s.push(allSerials[i]);
							callingBulkRN = false;
						}
					}
				}
			}
			if (completed40A2s.length > 0){
				document.getElementById("bulkControlsBlocker").style.display = "block";
				document.body.style.cursor='progress';
				setTimeout(function () {
					alert("Done");
					document.getElementById("bulkControlsBlocker").style.display = "none";
					document.body.style.cursor='auto';
				}, 5000);
			}
			else{ alert("No 40A2s."); }
		};
		handleAll40AJs = function (){
			completed40AJs = [];
			for (let i = 0; i < allItems.length; i++){
				if (allItems[i].querySelectorAll("[name=OldModel]").length > 0){
					if (allItems[i].querySelectorAll("[name=OldModel]")[0].innerHTML.toUpperCase() == "40AJ" && allItems[i].querySelectorAll( '.ItemProperties:not(.Confirmed):not(.Done)').length > 0){
						if (completed40AJs.includes(allSerials[i])){
							deleting40A2srn = true;
							allItems[i].querySelectorAll('[name="DeleteSl"]')[0].dispatchEvent(fireReceiveEvent);
							deleting40A2srn = false;
						}
						else{
							callingBulkRN = true;
							allItems[i].querySelectorAll('[name="Make"]')[0].value = "Lenovo";
							allItems[i].querySelectorAll('[name="Make"]')[0].dispatchEvent(e);
							allItems[i].querySelectorAll('[name="Model"]')[0].value = "40AJ";
							allItems[i].querySelectorAll('[name="Serial"]')[0].value = allSerials[i];
							allItems[i].querySelectorAll('[name="AssetTag"]')[0].value = "N/A";
							allItems[i].querySelectorAll('[name="Media"]')[0].value = "No Media Found";
							allItems[i].querySelectorAll('[name="Create"]')[0].dispatchEvent(fireReceiveEvent);
							completed40AJs.push(allSerials[i]);
							callingBulkRN = false;
						}
					}
				}
			}
			if (completed40AJs.length > 0){
				document.getElementById("bulkControlsBlocker").style.display = "block";
				document.body.style.cursor='progress';
				setTimeout(function () {
					alert("Done");
					document.getElementById("bulkControlsBlocker").style.display = "none";
					document.body.style.cursor='auto';
				}, 5000);
			}
			else{ alert("No 40AJs."); }
		};
		
		checkSerialNODIALOG = function (form){
			if (form[0].Serial == undefined){
				  CallJSONMethodNODIALOG('Incoming','CreateAsset', form.serialize(), [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);  
				  return;
			}
			var serial = form[0].Serial.value;
			var model = form[0].Model.value;
			$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=Incoming&Action=CheckSerial',
				{
					Serial: serial,
					Model: model
				},
				function(data){
					if (data.Result == 'FatalError'){
						erroredList.push(serial);
						currentRcvAttemptCount++;
						return data.Result;
					}
					else if (data.Result == "Local Asset"){
						erroredList.push(serial);
						currentRcvAttemptCount++;
						return data.Result;
					}
					else if (data.Result == "Found Asset"){
						CallJSONMethodNODIALOG('Incoming','ProcessReturn',{assetId: data.Id, tableId: form[0].RelationId.value}, [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);
					}
					else{
						CallJSONMethodNODIALOG('Incoming','CreateAsset', form.serialize(), [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);
					}
				}
			);
		};
		$('input[name="Create"]').bind("animationiteration", function(){
			if (callingBulkRN){
				var form = $(this).parents('form');
				if (form[0].Product != undefined){
					return CallJSONMethodNODIALOG('Incoming','CreateProduct',form.serialize(), [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);
				}
				else{
					return checkSerialNODIALOG(form);
				}
			}
		});
		checkSerial = function (form){
			if (form[0].Serial == undefined)
			{
				  CallJSONMethod('Incoming','CreateAsset', form.serialize(), true);  
				  return "Success";
			}
			var serial = form[0].Serial.value;
			var model = form[0].Model.value;
			$.getJSON('/Flowlink/' + cityforFlowlink + '/Ajax/AjaxGateway.php?Screen=Incoming&Action=CheckSerial',
				{
					Serial: serial,
					Model: model
				},
				function(data)
				{
				   if (data.Result == 'FatalError')
				   {
					   DisplayError(data.Message, data.File, data.Line, data.Trace);
					   return "Error";
				   }
				   else if (data.Result == "Local Asset")
				   {
						 $('#Dialog') 
							.html('This asset already exists and is in the warehouse.<br/>' + 
								  'It is located at: ' + data.Location)
							.dialog('open');
						return "Error";
				   }
				   else if (data.Result == "Found Asset")
				   {
						$('#Dialog')
							.html(
								'<div style="font-size: larger; font-weight: bold">This asset already exists as:</div>' +
								'<div><span style="display: inline-block; font-weight: bold; width: 10em;">Type:</span><span style="padding-left: 1em;" >' + data.Type + '</span></div>' +
								'<div><span style="display: inline-block;font-weight: bold; width: 10em;">Make:</span><span style="padding-left: 1em;" >' + data.Make + '</span></div>' +
								'<div><span style="display: inline-block;font-weight: bold; width: 10em;">Model:</span><span style="padding-left: 1em;" >' + data.Model + '</span></div>' +
								'<div><span style="display: inline-block;font-weight: bold; width: 10em;">Serial:</span><span style="padding-left: 1em;" >' + data.Serial + '</span></div>' +
								'<div><span style="display: inline-block;font-weight: bold; width: 10em;">Asset Tag:</span><span style="padding-left: 1em;" >' + data.Tag + '</span></div>' +
								'Is this the <b>exact same</b> asset?');
							
							$('#Dialog').dialog('option','buttons', 
							{
								'Yes': function()
								 {
									 $('#Dialog').dialog('close');
									 currResult = CallJSONMethod('Incoming','ProcessReturn',{assetId: data.Id, tableId: form[0].RelationId.value}, [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);
								 },
								 'No': function() 
								 {
									 $('#Dialog').dialog('close');
									 return "Error";
								 }
							});
							
							$('#Dialog').dialog('open');
					}
					else
					{
						currResult = CallJSONMethod('Incoming','CreateAsset', form.serialize(), [form[0].querySelectorAll("[name=myItemID]")[0].value, "purple"]);
					}
				});
			
		};
		
		$('input[name="Create"]').click(function(){
			document.body.style.cursor='progress';
			var form = $(this).parents('form');
			if (form[0].Product != undefined){
				CallJSONMethod('Incoming','CreateProduct',form.serialize(), true);
			}
			else{
				if (form[0].Media != undefined && form[0].Media.value == 'Media Found')
				{
					$('#Dialog').html('Please enter description of found media: <br/><input type="text" id="MediaNote"/>');
					$('#Dialog').dialog('option','buttons',
					 {
						 'OK':function()
								{
									form.append('<input type="hidden" name="MediaFound" id="MediaFound" value="' + $('#MediaNote').val() + '"/>');
								   checkSerial(form);
								},
						 'Cancel': function() {$('#Dialog').dialog('close');}
					 });
					$('#Dialog').dialog('open');

				}
				else{
					checkSerial(form);
				}
			}
		});
		$('input[name=DeleteSl]').click(function(){
			if (confirm('Are you sure this product does not exist? (This will log a discrepancy)')){
				var RelationId = $(this).parents('.ItemProperties').children('input[name="RelationId"]').val();  
				var form = $(this).parents('form');				
				CallJSONMethod('Incoming','DeleteSl', {RelationId: RelationId}, [form[0].querySelectorAll("[name=myItemID]")[0].value, "delete"]);
			}
			
		});
		$('input[name=DeleteSl]').bind("animationiteration", function(){
			if (deleting40A2srn){
				var RelationId = $(this).parents('.ItemProperties').children('input[name="RelationId"]').val();  
				var form = $(this).parents('form');				
				CallJSONMethodNODIALOG('Incoming','DeleteSl', {RelationId: RelationId}, [form[0].querySelectorAll("[name=myItemID]")[0].value, "delete"]);
			}
		});
		
		
		document.getElementById("ListDevices").addEventListener("click", openListWindow);
		document.getElementById("BulkReceive").addEventListener("click", openBulkWindow);
	
	}
	else{ //No unreceived items
		document.getElementById("AddMedia").insertAdjacentHTML('afterend', '<input type="button" value="List Devices" id="ListDevices">');
		document.getElementById("ListDevices").addEventListener("click", openListWindow);
	}
	}	}	}
	}
//-------------------------------------------------------------------------------------------------------------------------
}
