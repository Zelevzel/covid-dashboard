import { tabsContent, tabs, sideBar } from './globalDOMElements';
import renderTabContent from './getDataListFunctions';

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

  function showTabContent(i) {
    tabs[i].classList.add('selected');
    tabsContent[i].classList.add('show');
  }

  hideTabContent();
  showTabContent(0);

  sideBar.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('sidebar-tab')) {
      tabs.forEach((item, index) => {
        if (event.target === item) {
          hideTabContent();
          showTabContent(index);
        }
        renderTabContent(index);
      });
    }
  });
});
