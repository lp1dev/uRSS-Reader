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
	mainContainer.style.marginLeft = navigationDrawer.style.width;
	navigationDrawer.className = "drawer shadowed";
}

function closeDrawer(){
	var navigationDrawer = document.getElementById("drawer");
	var mainContainer = document.getElementById("mainContainer");
	mainContainer.style.marginLeft = 0;
	navigationDrawer.className = "drawer shadowed closed";
}

