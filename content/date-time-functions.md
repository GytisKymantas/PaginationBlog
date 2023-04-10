---
title: 'Essential Date Functions for Google Sheets'
date: '2021-08-23T01:10:10.000Z'
slug: '/google-sheets-date-functions-210823'
category: 'Internet'
description: 'Master all the important date functions for Google Sheets with working formula examples. Whether you are looking to calculate the number of working days before the project is due or days until your upcoming birthday, this is the place to start.'
tags:
  - 'Google Sheets'
  - 'Formulas and Functions'
  - 'Archives'
---

Dates are internally stored as sequential serial numbers in Google Sheets. This serial number represents the number of days elapsed since December 31, 1899.

You can use the `DATEVALUE` function to convert any date input to a number that represents the date. For instance, both the functions `DATEVALUE("Jan 1")` and `DATEVALUE("01-Jan-2021")` return the same number (44197) though the inputs have vastly different formats.

The function `TODAY()` returns the current date while the function `NOW()` returns the current date and time. Both these functions do not require any arguments and they update when any cell in the Google Sheet is changed.

The function `NOW() + 2` returns the current date and time plus two days while `NOW() - 9/24` returns the date and time 9 hours ago since 1 = 24 hours.

The functions `YEAR()`, `MONTH()` and `DAY()` can be used extract the year, month and day of the date that is passed as an argument.

The `DAYS()` function calculates the number of days between two dates. Internally, it calculates the `DATEVALUE` of the first date and the `DATEVALUE` of the second date and subtracts the two numbers.

If you want to calculate the number of months between two dates, you can use the `DATEDIF()` function with the third argument set to `M`. For instance, the function `=DATEDIF("Jan 1, 1951", TODAY(), "M")` returns the number of months between January 1951 and today.

The `YEARFRAC()` function calculates the number of years that has passed between two dates.

**Tip:** You may use these date functions in Google Sheets with [Array Formulas](/internet/arrayformula-copy-formulas-in-entire-column/29711/) to [schedule emails](https://digitalinspiration.com/docs/mail-merge/schedule-emails) with [Gmail Mail Merge](https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203).

Use the `EDATE()` function to calculate a date that is a specified number of months before or after a specified date. For instance, `EDATE(TODAY(), -1)` returns the date that is one month before the current date.

The `EOMONTH()` function helps you calculate the last day of the given month. For instance, `EOMONTH(TODAY(), -1)` returns the last day of the previous month. Add `1` to the result, `=EOMONTH(TODAY(),-1)+1`, and you'll get the first day of the current month.

The `WEEKDAY()` function returns the day of the week corresponding to a date with Sunday representing 1, the first day of the week. Set the second argument to `2` and days of the week will be numbered starting with Monday.

The `WORKDAY()` function calculates the date that is a specified number of days before or after a specified date, excluding weekends. For instance, `WORKDAY(TODAY(), -7)` returns the date that is 7 working days before the current date.

Likewise, the `NETWORKDAYS()` function calculates the number of working days between two dates provided as arguments. Combine this with `EOMONTH` to calculate the number of working days that are left till the end of the the current month `=NETWORKDAYS(TODAY(), EOMONTH(TODAY(),0))`

## Google Sheets Date Formulas for Common Scenarios

| Task                                             | Working Formula                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Add number of days to a date                     | `=A1 + 5`                                                                    |
| Get a day that is 6 months prior to a date       | `=EDATE(A1, -5)`                                                             |
| Add number of years to a date                    | `=DATE(YEAR(A1) + 5, MONTH(A1), DAY(A1))`                                    |
| Difference in days between two dates             | `=DAYS(A1, A2)`                                                              |
| Total working days between two dates             | `=NETWORKDAYS(A1, A2)`                                                       |
| Get a date that is 10 working days from now      | `=WORKDAY(TODAY(), 10)`                                                      |
| Get the total number of months between two dates | `=DATEIF(A1, A2, "M")`                                                       |
| Get the difference in years between two dates    | `=DATEIF(A1, A2, "Y")`                                                       |
| Get the number of days in the current month      | `=EOMONTH(TODAY(), 0) - (EOMONTH(TODAY(), -1) + 1)`                          |
| Print the day of the week                        | `=TEXT(TODAY(), "ddddd")`                                                    |
| Calculate the age in years                       | `=ROUNDDOWN(YEARFRAC(A1, TODAY(), 1))`                                       |
| Days until your next birthday                    | `=DAYS(DATE(YEAR(A1)+DATEDIF(A1,TODAY(),"Y")+1, MONTH(A1),DAY(A1), TODAY())` |
| Months and days between two dates                | `=DATEDIF(A1,A2,"YM")&" months, "&DATEDIF(A1,A2,"MD")&" days"`               |

You can copy this [Google Sheet](https://docs.google.com/spreadsheets/d/1xf1JUasvQ4BSV87AqMX_sTOqEVId6YTe_6S_Udwu7sQ/edit#gid=0) to get all the working formulas mentioned in this tutorial.
