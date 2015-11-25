
function getHightlightCoords() {
    var pageIndex = window.PDFViewerApplication.pdfViewer.currentPageNumber - 1;
    var page = window.PDFViewerApplication.pdfViewer._pages[pageIndex];
    var pageRect = page.canvas.getClientRects()[0];
    var selectionRects=RangeFix.getClientRects(window.getSelection().getRangeAt(0))
    var viewport = page.viewport;
    var selected = _.map(selectionRects, function (r) {
        return viewport.convertToPdfPoint(r.left - pageRect.left, r.top - pageRect.top).concat(
            viewport.convertToPdfPoint(r.right - pageRect.left, r.bottom - pageRect.top));
    })
    var uniqueArray=[]
     for(var i=0;i<selected.length;i++){
     if(uniqueArray.length===0){
     //console.log('called once')
     uniqueArray.push(selected[i]);
     }
     else{
     //console.log(uniqueArray.length);
     for(var a=0;a<uniqueArray.length;a++){
     //console.log('called'+a+'times')
     if((Math.abs(Math.round(uniqueArray[a][0])-Math.round(selected[i][0]))<=1) && (Math.abs(Math.round(uniqueArray[a][1])-Math.round(selected[i][1]))<=1) && (Math.abs(Math.round(uniqueArray[a][2])-Math.round(selected[i][2]))<=1) && (Math.abs(Math.round(uniqueArray[a][3])-Math.round(selected[i][3]))<=1)){
     break;
     }
     if(a+1 == uniqueArray.length){
     uniqueArray.push(selected[i]);
     }
     }
     }
     }

    return {page: pageIndex, coords: uniqueArray};
}
//highlights the selected div with given color
function showHighlight(selected) {
    var pageIndex = selected.page;
    var page = window.PDFViewerApplication.pdfViewer._pages[pageIndex];
	//var pageElement = page.canvas.parentElement;
	var pageElement = page.canvas.parentNode.nextSibling;
    var viewport = page.viewport;
    var color=document.getElementById('colorPicker').value;
    selected.coords.forEach(function (rect) {
        var bounds = viewport.convertToViewportRectangle(rect);
        var el = document.createElement('div');
        el.setAttribute('style', 'position: absolute; border:none; background-color:'+color+';' +
            'left:' + Math.min(bounds[0], bounds[2]) + 'px; top:' + Math.min(bounds[1], bounds[3]) + 'px;' +
            'width:' + Math.abs(bounds[0] - bounds[2]) + 'px; height:' + Math.abs(bounds[1] - bounds[3]) + 'px;z-index:90;');
        pageElement.appendChild(el);
      
    })

}