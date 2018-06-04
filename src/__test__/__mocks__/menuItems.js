const menuItems  = [
        {
          'Id': 3892,
          'Path': '/Root/Sites/Profil/Menu/MenuItem1',
          'Name': 'MenuItem1',
          'Type': 'ProfilMenuItem',
          'IconName': 'flaticon-pirate',
          'DisplayName': 'Menu Item 1'
        },
        {
          'Id': 3891,
          'Path': '/Root/Sites/Profil/Menu/MenuItem100',
          'Name': 'MenuItem100',
          'Type': 'ProfilMenuItem',
          'IconName': 'flaticon-island',
          'DisplayName': 'Menu Item 100'
        },
        {
          'Id': 3893,
          'Path': '/Root/Sites/Profil/Menu/Menu Item 2',
          'Name': 'Menu Item 2',
          'Type': 'ProfilMenuItem',
          'IconName': 'flaticon-youtube',
          'DisplayName': 'Menu Item 2'
        }
      ];


export default function getMenuItems(path, id) {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>
        menuItems[id]
            ? resolve(menuItems[id])
            : reject({
                error: 'Menu item with id = ' + id + ' not found.',
              }),
      );
    });
  }