var isDrawerOpened = true;

function drawer(){
	if (isDrawerOpened == true)
		closeDrawer();
	else
		openDrawer();
	isDrawerOpened = !isDrawerOpened;
}

function openDrawer(){
	var navigationDrawer = document.getElementById("drawer");
	var mainContainer = document.getElementById("mainContainer");
	var contentDisplay = document.getElementById("contentDisplay");
	mainContainer.style.marginLeft = navigationDrawer.style.width;
	contentDisplay.style.marginLeft = navigationDrawer.style.width;
	navigationDrawer.className = "drawer shadowed";
}

function closeDrawer(){
	var navigationDrawer = document.getElementById("drawer");
	var mainContainer = document.getElementById("mainContainer");
	var contentDisplay = document.getElementById("contentDisplay");
	contentDisplay.style.marginLeft = 0;
	mainContainer.style.marginLeft = 0;
	navigationDrawer.className = "drawer shadowed closed";
}

