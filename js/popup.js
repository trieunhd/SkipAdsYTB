
const set_isOnOff = ()=> {
    var isOn = localStorage.isOn;
    if(isOn){
        var isOnOff = localStorage.isOn=="true"?true:false;
        var isText = localStorage.isOn=="true"?"Đang Bật":"Đang Tắt";
        $("#SwitchCheck").prop("checked",isOnOff);
        $('[for="SwitchCheck"]').text(isText);
        if(isOnOff==true){
            $('[for="SwitchCheck"]').addClass("on_text");
        }
        else{
            $('[for="SwitchCheck"]').removeClass("on_text");
        }
    }
}

$("#SwitchCheck").click( async function(){
    var isOnval = $(this).prop("checked");
    localStorage.setItem("isOn",isOnval);
    set_isOnOff();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    function setItemStorage(isOnval) {
        localStorage.setItem("isOn",isOnval);
        window.location.reload();
    }
    chrome.scripting.executeScript(
        {
            target: {tabId:tabs[0].id},
            func: setItemStorage,
            args: [isOnval],
        },
        () => { setItemStorage});
    });
})

set_isOnOff();