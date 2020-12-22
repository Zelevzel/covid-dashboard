import { tabsContent, tabs, sideBar, dataListInput } from './globalDOMElements';

document.addEventListener('DOMContentLoaded', () => {
  function hideTabContent() {
    tabsContent.forEach((tabContent) => {
      tabContent.classList.add('hide');
      tabContent.classList.remove('show');
    });
    tabs.forEach((tab) => {
      tab.classList.remove('selected');
    });
  }

  function showTabContent(i = 0) {
    tabs[i].classList.add('selected');
    tabsContent[i].classList.add('show');
  }

  hideTabContent();
  showTabContent();

  sideBar.addEventListener('click', (event) => {
    const globalCountries = document.querySelectorAll('.global-country-cases');
    const globalProvince = document.querySelectorAll('.global-province-cases');

    globalCountries.forEach((item) => {
      item.classList.remove('hide');
    });

    globalProvince.forEach((item) => {
      item.classList.remove('hide');
    });

    if (event.target && event.target.classList.contains('sidebar-tab')) {
      tabs.forEach((item, index) => {
        if (event.target === item) {
          hideTabContent();
          showTabContent(index);
          dataListInput.value = '';
        }
      });
    }
  });
});
