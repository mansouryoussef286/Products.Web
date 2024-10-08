export class Constants {
  public static PasswordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z=!@#$%^&*_+)(-]{8,}$/;
  public static EmailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static PhonePattern: RegExp =
    /^(?:(?:\+|00)([1-9]\d{0,2}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
  public static NumericPattern: RegExp = /^[0-9]\d*$/;
  public static DateFormat = 'mediumDate';
  public static DateTimeFormat = 'MMM d, y h:mm a';
  public static WeekDateFormat = 'EEEE, MMM d, y';
  public static TimeFormat = 'h:mm a';

  public static Genders = [
    { Id: 'M', Name: 'Male' },
    { Id: 'F', Name: 'Female' },
  ];
  public static Months = [
    { Id: 0, Name: 'January' },
    { Id: 1, Name: 'February' },
    { Id: 2, Name: 'March' },
    { Id: 3, Name: 'April' },
    { Id: 4, Name: 'May' },
    { Id: 5, Name: 'June' },
    { Id: 6, Name: 'July' },
    { Id: 7, Name: 'August' },
    { Id: 8, Name: 'September' },
    { Id: 9, Name: 'October' },
    { Id: 10, Name: 'November' },
    { Id: 11, Name: 'December' },
  ];

  public static Years = function () {
    let years = [];
    let year = new Date().getFullYear();
    for (let i = year; i >= year - 100; i--) {
      years.push({ Id: i, Name: i });
    }
    return years;
  };

  public static Days = function () {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ Id: i, Name: i });
    }
    return days;
  };

  public static GetInitialName(firstName: string, lastName: string) {
    let initNames = '';
    if (firstName) {
      initNames = firstName.charAt(0).toUpperCase();
      lastName
        ? (initNames = initNames + lastName.charAt(0).toUpperCase())
        : (initNames = initNames + firstName.charAt(1).toLowerCase());
    }
    return initNames;
  }

  public static GetYear() {
    return new Date().getFullYear();
  }
}
