var isDrawerOpened = false;
var mainContainer, contentDisplay, navigationDrawer, filter;
document.addEventListener("DOMContentLoaded", function(event) {
    mainContainer = document.getElementById("mainContainer");
    contentDisplay = document.getElementById("contentDisplay");
    navigationDrawer = document.getElementById("drawer");
    filter = document.getElementById("filter");
    mainContainer.style.marginLeft = 0;
});

function drawer(){
    if (isDrawerOpened)
	closeDrawer();
    else
	openDrawer();
    isDrawerOpened = !isDrawerOpened;
}

function openDrawer(){
    navigationDrawer.className = "drawer shadowed";
    filter.style.visibilty = "visible";
}

function closeDrawer(){
    navigationDrawer.className = "drawer shadowed closed";
    filter.style.visibility = "hidden";
}
