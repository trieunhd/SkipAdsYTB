async function OpenRun(){
    await new Promise(r => setTimeout(r, 1000));
    var isrun = localStorage.isOn;
    if(isrun=="true" && window.location.host.includes("youtube.com")==true){
        setInterval( async () => { await AutoSkip()}, 500);
        removeAdsHocde();
    }
}

async function AutoSkip(){
    var list_al_ads = [
        "button.ytp-ad-skip-button-modern.ytp-button",
    ]
    list_al_ads.map( async (item,index)=>{
        await $(item).click();
    })
    const defined = v => v !== null && v !== undefined;
    const ad = [...document.querySelectorAll('.ad-showing')][0];
    if (defined(ad)) {
        const video = document.querySelector('video');
        if (defined(video)) {
            video.currentTime = video.duration;
        }
    }
}

function removeAdsHocde() {
    const adblocker = true;
    const removePopup = false;
    let currentUrl = window.location.href;
    let isAdFound = false;
    let adLoop = 0;
    if (adblocker) removeAds();
    if (removePopup) popupRemover();
    function popupRemover() {
        setInterval(() => {
            const modalOverlay = document.querySelector("tp-yt-iron-overlay-backdrop");
            const popup = document.querySelector(".style-scope ytd-enforcement-message-view-model");
            const popupButton = document.getElementById("dismiss-button");

            var video = document.querySelector('video');

            const bodyStyle = document.body.style;
            bodyStyle.setProperty('overflow-y', 'auto', 'important');

            if (modalOverlay) {
                modalOverlay.removeAttribute("opened");
                modalOverlay.remove();
            }

            if (popup) {

                if(popupButton) popupButton.click();

                popup.remove();
                video.play();

                setTimeout(() => {
                    video.play();
                }, 500);

                log("Popup removed");
            }
            if (!video.paused) return;
            video.play();

        }, 1000);
    }
    function removeAds()
    {

        var videoPlayback = 1;

        setInterval(() =>{

            var video = document.querySelector('video');
            const ad = [...document.querySelectorAll('.ad-showing')][0];
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removePageAds();
            }

            if (ad)
            {
                isAdFound = true;
                adLoop = adLoop + 1;
                if(adLoop < 10){
                    const openAdCenterButton = document.querySelector('.ytp-ad-button-icon');
                    openAdCenterButton?.click();

                    const blockAdButton = document.querySelector('[label="Block ad"]');
                    blockAdButton?.click();

                    const blockAdButtonConfirm = document.querySelector('.Eddif [label="CONTINUE"] button');
                    blockAdButtonConfirm?.click();

                    const closeAdCenterButton = document.querySelector('.zBmRhe-Bz112c');
                    closeAdCenterButton?.click();
                }
                else{
                    if (video) video.play();
                }

              var popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
              if (popupContainer)
                if (popupContainer.style.display == "")
                  popupContainer.style.display = 'none';
                const skipButtons = ['ytp-ad-skip-button-container', 'ytp-ad-skip-button-modern', '.videoAdUiSkipButton', '.ytp-ad-skip-button', '.ytp-ad-skip-button-modern', '.ytp-ad-skip-button', '.ytp-ad-skip-button-slot' ];
                if (video){

                    video.playbackRate = 10;
                    video.volume = 0;
                    skipButtons.forEach(selector => {
                        const elements = document.querySelectorAll(selector);
                        if (elements && elements.length > 0) {
                          elements.forEach(element => {
                            element?.click();
                          });
                        }
                    });
                    video.play();

                    let randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
                    video.currentTime = video.duration + randomNumber || 0;
                }

            } else {

                if(video && video?.playbackRate == 10){
                    video.playbackRate = videoPlayback;
                }

                if (isAdFound){
                    isAdFound = false;

                    if (videoPlayback == 10) videoPlayback = 1;
                    if(video && isFinite(videoPlayback)) video.playbackRate = videoPlayback;
                    adLoop = 0;
                }
                else{
                    if(video) videoPlayback = video.playbackRate;
                }
            }

        }, 50)

        removePageAds();
    }

    function removePageAds(){

        const sponsor = document.querySelectorAll("div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy");
        const style = document.createElement('style');

        style.textContent = `
            ytd-action-companion-ad-renderer,
            ytd-display-ad-renderer,
            ytd-video-masthead-ad-advertiser-info-renderer,
            ytd-video-masthead-ad-primary-video-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-ad-slot-renderer,
            yt-about-this-ad-renderer,
            yt-mealbar-promo-renderer,
            ytd-statement-banner-renderer,
            ytd-ad-slot-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-banner-promo-renderer-background
            statement-banner-style-type-compact,
            .ytd-video-masthead-ad-v3-renderer,
            div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
            div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
            div#main-container.style-scope.ytd-promoted-video-renderer,
            div#player-ads.style-scope.ytd-watch-flexy,
            ad-slot-renderer,
            ytm-promoted-sparkles-web-renderer,
            masthead-ad,
            tp-yt-iron-overlay-backdrop,

            #masthead-ad {
                display: none !important;
            }
        `;

        document.head.appendChild(style);

        sponsor?.forEach((element) => {
             if (element.getAttribute("id") === "rendering-content") {
                element.childNodes?.forEach((childElement) => {
                  if (childElement?.data.targetId && childElement?.data.targetId !=="engagement-panel-macro-markers-description-chapters"){
                        element.style.display = 'none';
                    }
                   });
            }
         });

    }
};

OpenRun();

