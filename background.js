chrome.tabs.onActivated.addListener((tab) => {

  chrome.tabs.get(tab.tabId).then(currentTab => {

    console.log(currentTab);

    if (currentTab.url.includes("zetflix")) {
      console.log("this is zetflix: " + currentTab.url)

      const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      let nowDate = new Date().toLocaleDateString().split('.'); 
      let nowDay = nowDate[0];
      let nowMonth = nowDate[1];
      
      if (nowDay.startsWith('0')) {
        nowDay = nowDay.replace('0', '');
      }
      if (nowMonth.startsWith('0')) {
        nowMonth = nowMonth.replace('0', '');
      }

      let newDateForAddress = `${nowDay}${months[nowMonth - 1]}`;
      console.log("new date for address: " + newDateForAddress)

      if (currentTab.url.includes(newDateForAddress)){
        return;
      }

      let hostStartsWith = currentTab.url.split('.')[0];
      console.log("hostStartwith " + hostStartsWith)

      if (location.host.startsWith(newDateForAddress) === false) {
        let newUrl = currentTab.url.replace(hostStartsWith, "https://" + newDateForAddress);
        console.log("redirect to: " + newUrl);

        let oldTabId = currentTab.id;
        setTimeout(() => {
          // chrome.tabs.remove(Number(oldTabId))
          // chrome.tabs.create({ url: newUrl, active: true, index: currentTab.index }, () => { })
        }, 200)

      }
    } else {
      console.log("this is not zetflix page")
    }

  })

});
