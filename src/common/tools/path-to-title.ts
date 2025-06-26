export const pathToTitle = (pathname: string) : string => {
  const pathToTitle = {
    '/profile': 'Профиль',
    '/admin': 'Администрирование',
    '/admin/users': 'Пользователи',
    '/admin/usefulservices': 'Сервисы',
    '/admin/events': 'События',
    '/usefulservices': 'Полезные сервисы',
    '/certificates': 'Сертификаты',
    '/events': 'События',
  };
  
  return pathToTitle[pathname as keyof typeof pathToTitle] || 'Ого, а как ты сюда попал?';
};