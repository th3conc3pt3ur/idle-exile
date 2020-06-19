function gameStart() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#CrusaderUpgrade").hide();
	$("#HunterUpgrade").hide();
	$("#RedeemerUpgrade").hide();
	$("#WarlordUpgrade").hide();
	$(".craft").hide();

	$("#loader").hide();

}

function welcome() {

	$("#welcomePre").hide();
	$("#main").removeClass("hidden");
	$("#guild").removeClass("hidden");
	$("#crafting").removeClass("hidden");
	$("#delving").removeClass("hidden");
	$("#info").removeClass("hidden");
	showGuild();
}

//----------------------------------Menu
function showMain() {

	$("#main").show();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#divBuyCurrency").hide();
	$("#divSellCurrency").hide();
	$("#divTheorycrafting").show();
	$("#divSingularity").hide();
	$("#divFlipping").hide();
	$("#MainCurrency").removeClass("mdl-cell--4-col");
	$("#MainCurrency").removeClass("mdl-cell--4-col-tablet");
	$("#MainCurrency").addClass("mdl-cell--3-col");
	$("#MainCurrency").addClass("mdl-cell--3-col-tablet");
}

function showGuild() {

	$("#main").hide();
	$("#guild").show();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();

}

function showFlipping() {

	$("#main").show();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#divBuyCurrency").show();
	$("#divSellCurrency").show();
	$("#divTheorycrafting").hide();
	$("#divSingularity").show();
	$("#divFlipping").show();
	$("#MainCurrency").removeClass("mdl-cell--3-col");
	$("#MainCurrency").removeClass("mdl-cell--3-col-tablet");
	$("#MainCurrency").addClass("mdl-cell--4-col");
	$("#MainCurrency").addClass("mdl-cell--4-col-tablet");

}

function showCrafting() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").show();
	$("#delving").hide();
	$("#info").hide();

}

function showDelving() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").show();
	$("#info").hide();

}

function showInfo() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").show();

}

//---Show upgrades
function showAllUpgrades() {
	$("#UpgradeTable").show();
	$("#UpgradeGearTable").show();
	$("#UpgradeLinksTable").show();
}
function showGeneralUpgrades() {
	$("#UpgradeTable").show();
	$("#UpgradeGearTable").hide();
	$("#UpgradeLinksTable").hide();
}
function showGearUpgrades() {
	$("#UpgradeTable").hide();
	$("#UpgradeGearTable").show();
	$("#UpgradeLinksTable").hide();
}
function showLinksUpgrades() {
	$("#UpgradeTable").hide();
	$("#UpgradeGearTable").hide();
	$("#UpgradeLinksTable").show();
}

//---Misc.

//---Snackbar
function SnackBar(input) {
	if (snackBarTimer <= 0) {
		'use strict';
		var snackbarContainer = document.querySelector('#snackBar');
		var data = {message: input, timeout: 1500};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		snackBarTimer = 1500;
	}
}

//---Hover Menu Contrast Fix
function hoverMenu() {
    $('.menuHover').hover(
        function () {
        $(".material-icons").addClass('mdl-color-text--blue-grey-600');
        }, function () {
        $(".material-icons").removeClass('mdl-color-text--blue-grey-600');
        }
    );
}

//----------------------------------Start Functions
gameStart();
hoverMenu();
$(document).ready(function() {
	load_game();
});

//---File Handling
window.setInterval(function saveGame() {
   console.log("saveGame");
   localStorage['goeSaveCurrency'] = JSON.stringify(currencyData);
   localStorage['goeSaveExiles'] = JSON.stringify(exileData);
}, 30000);

function saveGameManual() {
   localStorage['goeSaveCurrency'] = JSON.stringify(currencyData);
   localStorage['goeSaveExiles'] = JSON.stringify(exileData);
}

function load_game() {
	console.log("load_game");
    if (!localStorage['goeSaveCurrency']) return;

	var goeSaveCurrency = JSON.parse(localStorage['goeSaveCurrency']);
	var goeSaveExiles = JSON.parse(localStorage['goeSaveExiles']);
	
	
    //Currency = goeSaveCurrency;
	//Exiles = goeSaveExiles;
	exileData = [];
	
	for(var i = 0;i < goeSaveExiles.length;i++) {
		exileData.push(
			eval(goeSaveExiles[i].name+ " = new Exile('"+goeSaveExiles[i].name+"',"+goeSaveExiles[i].level+","+goeSaveExiles[i].exp+","+goeSaveExiles[i].expToLevel+","+goeSaveExiles[i].dropRate+","+goeSaveExiles[i].gear+","+goeSaveExiles[i].links+","+goeSaveExiles[i].rerollLevel+")")	
		);
		if(goeSaveExiles[i].level > 0) {
			$('.'+goeSaveExiles[i].name+'Buy').remove();
			$('.'+goeSaveExiles[i].name+'Hide').remove();
		}

		$("#UpgradeGearTable").append(
			'<tr id="'+goeSaveExiles[i].name+'GearUpgrade">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+goeSaveExiles[i].name+'GearButton" onclick="buyGear('+goeSaveExiles[i].name+');">'+goeSaveExiles[i].name+' Gear'+'</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+goeSaveExiles[i].name+' flasks to Magic rarity</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+0.1 ('+goeSaveExiles[i].name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">5 Transmutation<br>5 Augmentation</td>'+
            '</tr>'
		);
		$("#UpgradeLinksTable").append(
			'<tr id="'+goeSaveExiles[i].name+'LinksUpgrade">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+goeSaveExiles[i].name+'LinksButton" onclick="buyLinks('+goeSaveExiles[i].name+');">'+goeSaveExiles[i].name+' Links</button></td>'+
                '<td class="mdl-data-table__cell--non-numeric">Upgrade '+goeSaveExiles[i].name+' links to 4L</td>'+
                '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+goeSaveExiles[i].name+')</td>'+
                '<td class="mdl-data-table__cell--non-numeric">10 Jeweller<br>10 Fusing</td>'+
            '</tr>'
		);
		
		eval(goeSaveExiles[i].name).lvlGear(true);
		eval(goeSaveExiles[i].name).lvlLinks(true)

	}    
	currencyData = [];
	for(var i = 0;i < goeSaveCurrency.length;i++) {
		currencyData.push(
			eval(goeSaveCurrency[i].name+"  = new Currency('"+goeSaveCurrency[i].name+"',"+goeSaveCurrency[i].rate+","+goeSaveCurrency[i].total+","+goeSaveCurrency[i].sellRate+","+goeSaveCurrency[i].sellPercent+","+goeSaveCurrency[i].buyRate+","+goeSaveCurrency[i].buyPercent+")")
		);
	}
	console.log("data_load");
	welcome();
//update all info on screen

}

// function delete_game() {
//     localStorage.clear();
//     window.location.reload();
// }
