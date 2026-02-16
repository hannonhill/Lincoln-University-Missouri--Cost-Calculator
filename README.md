# 🧮 Lincoln University of Missouri Cost Calculator

A web-based net price calculator for graduate programs at Lincoln University of Missouri. This tool helps prospective students estimate tuition, program fees, and book costs based on their enrollment details.

## Overview

The calculator allows users to:
- Select between online (LUO) and in-seat (on-campus) enrollment
- Choose their residency status (for in-seat students)
- Pick from various graduate programs in Education, Business, Nursing, and other fields
- Adjust credit hours (1-12) using an interactive slider

## Features

- **Dynamic cost calculation** based on enrollment type, residency, program, and credit hours
- **Interactive UI** with real-time updates and form validation
- **Enrollment-based program filtering** that shows only relevant programs based on online/in-seat selection
- **Smooth scrolling** to results section after calculation and to errors when validation fails
- **Flexible configuration** via `data-` attributes for easy rate adjustments
- **Responsive design** matching Lincoln University's visual style with optimized layout across devices

## Project Structure

- `prototype.html` - Scraped page used as a containerized template to render the graduate cost calculator in a layout matching Lincoln University
- `assets/cost-calculator.js` - Calculator logic (tuition, program fees, books) with query string parameter features
- `assets/cost-calculator.css` - Custom styling for the calculator
- `assets/prototype-isolated.html` - Standalone mockup with the client-approved design
- `Academics _ Lincoln University of Missouri_files/` - Downloaded Lincoln University assets (fonts, CSS, etc.)
- `Functional Requirements.png` - Visual specification of calculator requirements
- `README-dev.md` - Developer-focused implementation notes

## Tuition Rates

- **Online (LUO)**: $372/credit hour
- **In-seat Missouri resident**: $372/credit hour
- **In-seat Non-Missouri resident**: $690/credit hour

## Location Fees

- **Online (LUO)**:
  - 9+ credit hours: $840 flat fee ($840 ÷ credit hours)
  - Below 9 credit hours: $94/credit hour
- **In-seat Missouri resident**: $59.50/credit hour
- **In-seat Non-Missouri resident**: $59.50/credit hour

## Program Fees (per credit hour)

- **School of Arts and Sciences**: $0/hr
- **School of Education** (ECD, HED, MED.K12, MEd.COU): $15/hr
- **School of Business** (MBA, MBA.MGT): $20/hr
- **School of Nursing** (MSN): $125/hr
- **College of Agricultural, Environmental, and Human Sciences** (AGR, NS): $15/hr
- **Other programs** (HIS, SOC/SCJ): No fee

## Configuration

Adjustable values are stored in the `data-` attributes of the `#costCalculator` form element in both `prototype.html` and `assets/prototype-isolated.html`. These values include:

- `data-online-cost` - Online tuition rate per credit hour
- `data-in-state-cost` - In-state tuition rate per credit hour
- `data-out-of-state-cost` - Out-of-state tuition rate per credit hour
- `data-art-sci-fee` - Arts & Sciences program fee per credit hour
- `data-edu-fee` - Education program fee per credit hour
- `data-bus-fee` - Business program fee per credit hour
- `data-nur-fee` - Nursing program fee per credit hour
- `data-aehs-fee` - Agricultural, Environmental, and Human Sciences program fee per credit hour
- `data-other-programs-fee` - Other programs fee per credit hour
- `data-books-cost` - Book cost per course
- `data-online-boundary-hours` - Credit hour threshold for online location fee calculation
- `data-online-upper-boundary-fee` - Flat location fee for online students at or above boundary hours
- `data-online-lower-boundary-fee` - Per-credit-hour location fee for online students below boundary
- `data-in-state-fee` - Location fee per credit hour for in-state students
- `data-out-of-state-fee` - Location fee per credit hour for out-of-state students

Program options also include enrollment filtering attributes:
- `data-enrollment` - Specifies availability: `"online"` or `"inseat"`

Example:
```html
<form id="costCalculator"
    data-online-cost="372"
    data-in-state-cost="372"
    data-out-of-state-cost="690"
    data-art-sci-fee="0"
    data-edu-fee="15"
    data-bus-fee="20"
    data-nur-fee="125"
    data-aehs-fee="15"
    data-other-programs-fee="0"
    data-books-cost="90"
    data-online-boundary-hours="9"
    data-online-upper-boundary-fee="840"
    data-online-lower-boundary-fee="94"
    data-in-state-fee="59.5"
    data-out-of-state-fee="59.5">
```

## Usage

1. Open `prototype.html` or `assets/prototype-isolated.html` in a web browser
2. Select your academic term
3. Select your enrollment type (Online or In-seat)
4. Choose residency status (if applicable)
5. Select your graduate program
6. Adjust credit hours using the slider
7. Click "Calculate Total Cost" to see your estimate

## Development Notes

- The calculator uses vanilla JavaScript with no external dependencies
- Form validation ensures all required fields are completed before calculation
- Program options dynamically filter based on enrollment type selection (online/in-seat)
- Smooth scrolling automatically guides users to results after calculation or to error messages when validation fails
- Book costs are estimated at $90 per course (3 credit hours = 1 course)
- Query string parameters can be used to pre-populate form values
- Responsive layout adapts to various screen sizes with optimized breakpoints
- Reset functionality clears all selections and scrolls back to the top of the calculator
- All cost figures are estimates and may vary based on actual enrollment

## Disclaimer

These figures are estimates only and may change based on course-specific or lab fees. Financial aid is not reflected in this calculator. Students should connect with Financial Services for personalized guidance.
